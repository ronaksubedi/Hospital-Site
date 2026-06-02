import express from "express";
import {
  getBlogs,
  getAllBlogsAdmin,
  getBlogBySlug,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  togglePublish,
} from "../controllers/blogController.js";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware.js";
import { uploadBlogImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/admin", verifyToken, isAdmin, getAllBlogsAdmin);
router.get("/slug/:slug", getBlogBySlug);
router.get("/:id", getBlogById);
router.post("/", verifyToken, isAdmin, uploadBlogImage, createBlog);
router.put("/:id", verifyToken, isAdmin, uploadBlogImage, updateBlog);
router.delete("/:id", verifyToken, isAdmin, deleteBlog);
router.patch("/:id/toggle", verifyToken, isAdmin, togglePublish);

export default router;