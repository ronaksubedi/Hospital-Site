import express from "express";
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  toggleServiceStatus,
} from "../controllers/serviceController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadServiceImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", verifyToken, isAdmin, uploadServiceImage, createService);
router.put("/:id", verifyToken, isAdmin, uploadServiceImage, updateService);
router.delete("/:id", verifyToken, isAdmin, deleteService);
router.patch("/:id/toggle", verifyToken, isAdmin, toggleServiceStatus);

export default router;