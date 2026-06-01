import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

// GET ALL DOCTORS
export const getDoctors = async (req, res) => {
  try {
    const { search, specialty, available } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialty: { $regex: search, $options: "i" } },
      ];
    }

    if (specialty) {
      query.specialty = { $regex: specialty, $options: "i" };
    }

    if (available !== undefined) {
      query.available = available === "true";
    }

    const doctors = await Doctor.find(query).populate("department", "name");
    res.status(200).json({ success: true, count: doctors.length, doctors });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET DOCTOR BY ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department", "name");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json({ success: true, doctor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ADD DOCTOR admin only
export const addDoctor = async (req, res) => {
  try {
    const { name, email, phone, specialty, department, bio, experience } = req.body;

    // check if doctor with email already exists
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Doctor with this email already exists" });
    }

    let photo = "";
    let photoPublicId = "";

    if (req.file) {
      photo = req.file.path;
      photoPublicId = req.file.filename;
    }

    const doctor = await Doctor.create({
      name,
      email,
      phone,
      specialty,
      department,
      bio,
      experience,
      photo,
      photoPublicId,
    });

    res.status(201).json({ success: true, message: "Doctor added successfully", doctor });
  } catch (error) {
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE DOCTOR admin only
export const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // if new photo uploaded, delete old one from cloudinary
    if (req.file && doctor.photoPublicId) {
      await cloudinary.uploader.destroy(doctor.photoPublicId);
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.photo = req.file.path;
      updateData.photoPublicId = req.file.filename;
    } else {
      delete updateData.photo;
      delete updateData.photoPublicId;
    }

    const updated = await Doctor.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ success: true, message: "Doctor updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE DOCTOR admin only
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    // delete photo from cloudinary
    if (doctor.photoPublicId) {
      await cloudinary.uploader.destroy(doctor.photoPublicId);
    }

    // if doctor has a linked user, reset their role to patient
    if (doctor.user) {
      await User.findByIdAndUpdate(doctor.user, { role: "patient" });
    }

    await doctor.deleteOne();
    res.status(200).json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// TOGGLE AVAILABILITY doctor or admin
export const toggleAvailability = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    doctor.available = !doctor.available;
    await doctor.save();

    res.status(200).json({
      success: true,
      message: `Doctor is now ${doctor.available ? "available" : "unavailable"}`,
      available: doctor.available,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// ASSIGN DOCTOR ROLE admin only
export const assignDoctorRole = async (req, res) => {
  try {
    const { userId, specialty, department, bio, experience, phone } = req.body;

    // find the user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // check if already a doctor
    const existingDoctor = await Doctor.findOne({ user: userId });
    if (existingDoctor) {
      return res.status(400).json({ message: "User is already a doctor" });
    }

    // update user role to doctor
    await User.findByIdAndUpdate(userId, { role: "doctor" });

    // create doctor profile
    const doctor = await Doctor.create({
      user: userId,
      name: user.name,
      email: user.email,
      phone: phone || user.phone,
      specialty,
      department,
      bio,
      experience,
    });

    res.status(201).json({
      success: true,
      message: "Doctor role assigned successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// RATE DOCTOR patient only
export const rateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const { rating } = req.body;
    const userId = req.user._id.toString();

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const existingRating = (doctor.ratedBy || []).find((r) => r.userId === userId);

    if (existingRating) {
      // update existing rating
      const oldRating = existingRating.rating;
      const newRating =
        ((doctor.rating * doctor.ratingCount) - oldRating + Number(rating)) /
        doctor.ratingCount;

      const updated = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
          rating: Math.round(newRating * 10) / 10,
          $set: { "ratedBy.$[elem].rating": Number(rating) },
        },
        {
          new: true,
          arrayFilters: [{ "elem.userId": userId }],
        }
      );
      return res.status(200).json({ success: true, message: "Rating updated", updated });
    } else {
      // new rating
      const newCount = doctor.ratingCount + 1;
      const newRating =
        ((doctor.rating * doctor.ratingCount) + Number(rating)) / newCount;

      const updated = await Doctor.findByIdAndUpdate(
        req.params.id,
        {
          rating: Math.round(newRating * 10) / 10,
          ratingCount: newCount,
          $push: { ratedBy: { userId, rating: Number(rating) } },
        },
        { new: true }
      );
      return res.status(200).json({ success: true, message: "Rating submitted", updated });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};