import express from "express";
import {
  getDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
  assignDoctorRole,
  rateDoctor,
} from "../controllers/doctorController.js";
import { verifyToken, isAdmin, isDoctorOrAdmin } from "../middlewares/authMiddleware.js";
import { uploadDoctorPhoto } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.post("/", verifyToken, isAdmin, uploadDoctorPhoto, addDoctor);
router.put("/:id", verifyToken, isAdmin, uploadDoctorPhoto, updateDoctor);
router.delete("/:id", verifyToken, isAdmin, deleteDoctor);
router.patch("/:id/availability", verifyToken, isDoctorOrAdmin, toggleAvailability);
router.post("/assign-role", verifyToken, isAdmin, assignDoctorRole);
router.post("/:id/rate", verifyToken, rateDoctor);

export default router;