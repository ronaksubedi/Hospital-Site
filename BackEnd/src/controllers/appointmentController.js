import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// BOOK APPOINTMENT for patient only
export const bookAppointment = async (req, res) => {
  try {
    const { doctor, service, date, timeSlot, notes } = req.body;

    // check if doctor exists and is available
    const doctorExists = await Doctor.findById(doctor);
    if (!doctorExists) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    if (!doctorExists.available) {
      return res.status(400).json({ message: "Doctor is not available" });
    }

    // check if slot already booked
    const slotTaken = await Appointment.findOne({
      doctor,
      date: new Date(date),
      timeSlot,
      status: { $in: ["pending", "confirmed"] },
    });
    if (slotTaken) {
      return res.status(400).json({ message: "This time slot is already booked" });
    }

    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor,
      service,
      date: new Date(date),
      timeSlot,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET MY APPOINTMENTS for patient
export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user._id })
      .populate("doctor", "name specialty photo")
      .populate("service", "name")
      .sort({ date: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET DOCTOR APPOINTMENTS for doctor sees their own appointments
export const getDoctorAppointments = async (req, res) => {
  try {
    // find doctor profile linked to logged in user
    const doctor = await Doctor.findOne({ user: req.user._id });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "name email phone")
      .populate("service", "name")
      .sort({ date: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET ALL APPOINTMENTS for admin only
export const getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;

    let query = {};
    if (status) query.status = status;
    if (date) query.date = new Date(date);

    const appointments = await Appointment.find(query)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty")
      .populate("service", "name")
      .sort({ date: -1 });

    res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET APPOINTMENT BY ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialty photo")
      .populate("service", "name");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // only patient, the doctor, or admin can view
    const isPatient = appointment.patient._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";
    const doctor = await Doctor.findOne({ user: req.user._id });
    const isDoctor = doctor && appointment.doctor._id.toString() === doctor._id.toString();

    if (!isPatient && !isAdmin && !isDoctor) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// CANCEL APPOINTMENT patient can cancel their own
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // only the patient who booked can cancel
    if (appointment.patient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    if (appointment.status === "cancelled") {
      return res.status(400).json({ message: "Appointment already cancelled" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// Update Appointment Status for admin only
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Appointment status updated",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};