import express from "express";
import {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
} from "../controllers/contactController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", submitContact);
router.get("/", verifyToken, isAdmin, getAllContacts);
router.get("/:id", verifyToken, isAdmin, getContactById);
router.patch("/:id/status", verifyToken, isAdmin, updateContactStatus);
router.delete("/:id", verifyToken, isAdmin, deleteContact);

export default router;