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

// export upload middlewares
export const uploadDoctorPhoto = multer({
  storage: doctorStorage,
  fileFilter,
}).single("photo");

export const uploadBlogImage = multer({
  storage: blogStorage,
  fileFilter,
}).single("coverImage");

export const uploadServiceImage = multer({
  storage: serviceStorage,
  fileFilter,
}).single("image");

export const uploadAvatar = multer({
  storage: avatarStorage,
  fileFilter,
}).single("avatar");

export { cloudinary };