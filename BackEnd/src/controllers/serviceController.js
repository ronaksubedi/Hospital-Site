import Service from "../models/Service.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

// GET ALL SERVICES
export const getServices = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    const services = await Service.find(query).populate("doctors", "name specialty photo");
    res.status(200).json({ success: true, count: services.length, services });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET SERVICE BY ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "doctors",
      "name specialty photo available"
    );
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ success: true, service });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// CREATE SERVICE for admin only
export const createService = async (req, res) => {
  try {
    const { name, description, category, icon } = req.body;

    let image = "";
    let imagePublicId = "";

    if (req.file) {
      image = req.file.path;
      imagePublicId = req.file.filename;
    }

    const service = await Service.create({
      name,
      description,
      category,
      icon,
      image,
      imagePublicId,
    });

    res.status(201).json({ success: true, message: "Service created successfully", service });
  } catch (error) {
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE SERVICE for admin only
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (req.file && service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    } else {
      delete updateData.image;
      delete updateData.imagePublicId;
    }

    const updated = await Service.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ success: true, message: "Service updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE SERVICE for admin only
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    await service.deleteOne();
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// TOGGLE SERVICE ACTIVE STATUS for admin only
export const toggleServiceStatus = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });

    service.isActive = !service.isActive;
    await service.save();

    res.status(200).json({
      success: true,
      message: `Service is now ${service.isActive ? "active" : "inactive"}`,
      isActive: service.isActive,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};