import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// doctor photo storage
const doctorStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital/doctors",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// blog cover image storage
const blogStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital/blogs",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// service image storage
const serviceStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital/services",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// user avatar storage
const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hospital/avatars",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

// file filter — images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// upload middlewares — wrapped for Express 5 compatibility
export const uploadDoctorPhoto = (req, res, next) => {
  multer({ storage: doctorStorage, fileFilter }).single("photo")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

export const uploadBlogImage = (req, res, next) => {
  multer({ storage: blogStorage, fileFilter }).single("coverImage")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

export const uploadServiceImage = (req, res, next) => {
  multer({ storage: serviceStorage, fileFilter }).single("image")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

export const uploadAvatar = (req, res, next) => {
  multer({ storage: avatarStorage, fileFilter }).single("avatar")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

export { cloudinary };