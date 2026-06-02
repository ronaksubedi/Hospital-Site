import Blog from "../models/Blog.js";
import { cloudinary } from "../middlewares/uploadMiddleware.js";

// GET ALL BLOGS
export const getBlogs = async (req, res) => {
  try {
    const { search, category, tag } = req.query;

    let query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      query.category = { $regex: category, $options: "i" };
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    const blogs = await Blog.find(query)
      .populate("author", "name avatar")
      .sort({ publishedAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET ALL BLOGS FOR ADMIN (including unpublished)
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET BLOG BY SLUG
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate(
      "author",
      "name avatar"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// GET BLOG BY ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name avatar");
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// CREATE BLOG — admin only
export const createBlog = async (req, res) => {
  try {
    const { title, content, excerpt, category, tags, isPublished } = req.body;

    let coverImage = "";
    let coverImagePublicId = "";

    if (req.file) {
      coverImage = req.file.path;
      coverImagePublicId = req.file.filename;
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      isPublished: isPublished === "true",
      publishedAt: isPublished === "true" ? new Date() : null,
      coverImage,
      coverImagePublicId,
      author: req.user._id,
    });

    res.status(201).json({ success: true, message: "Blog created successfully", blog });
  } catch (error) {
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// UPDATE BLOG — admin only
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.file && blog.coverImagePublicId) {
      await cloudinary.uploader.destroy(blog.coverImagePublicId);
    }

    let updateData = { ...req.body };

    if (updateData.tags) {
      updateData.tags = updateData.tags.split(",").map((t) => t.trim());
    }

    if (updateData.isPublished === "true" && !blog.publishedAt) {
      updateData.publishedAt = new Date();
    }

    if (req.file) {
      updateData.coverImage = req.file.path;
      updateData.coverImagePublicId = req.file.filename;
    } else {
      delete updateData.coverImage;
      delete updateData.coverImagePublicId;
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({ success: true, message: "Blog updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// DELETE BLOG — admin only
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.coverImagePublicId) {
      await cloudinary.uploader.destroy(blog.coverImagePublicId);
    }

    await blog.deleteOne();
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

// TOGGLE PUBLISH — admin only
export const togglePublish = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.isPublished = !blog.isPublished;
    if (blog.isPublished && !blog.publishedAt) {
      blog.publishedAt = new Date();
    }
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog is now ${blog.isPublished ? "published" : "unpublished"}`,
      isPublished: blog.isPublished,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};