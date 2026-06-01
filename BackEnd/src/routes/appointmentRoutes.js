import express from "express";
import {
  bookAppointment,
  getMyAppointments,
  getDoctorAppointments,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import { verifyToken, isAdmin, isDoctor } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, bookAppointment);
router.get("/my", verifyToken, getMyAppointments);
router.get("/doctor", verifyToken, isDoctor, getDoctorAppointments);
router.get("/all", verifyToken, isAdmin, getAllAppointments);
router.get("/:id", verifyToken, getAppointmentById);
router.patch("/:id/cancel", verifyToken, cancelAppointment);
router.patch("/:id/status", verifyToken, isAdmin, updateAppointmentStatus);

export default router;