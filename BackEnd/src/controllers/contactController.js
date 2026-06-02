import Contact from "../models/Contact.js";

// SUBMIT CONTACT FORM for public
export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET ALL CONTACTS for admin only
export const getAllContacts = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status) query.status = status;

    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: contacts.length, contacts });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET CONTACT BY ID for admin only
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({ success: true, contact });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE CONTACT STATUS for admin only
export const updateContactStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["unread", "read", "replied"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: "Contact not found" });

    res.status(200).json({
      success: true,
      message: "Contact status updated",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE CONTACT for admin only
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });

    await contact.deleteOne();
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};