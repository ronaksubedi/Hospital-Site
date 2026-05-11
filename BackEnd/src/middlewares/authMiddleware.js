import jwt from "jsonwebtoken";
import User from "../models/User.js";

// verify token — all protected routes
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// admin only
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access only" });
  next();
};

// doctor only
export const isDoctor = (req, res, next) => {
  if (req.user.role !== "doctor")
    return res.status(403).json({ message: "Doctor access only" });
  next();
};

// doctor or admin
export const isDoctorOrAdmin = (req, res, next) => {
  if (req.user.role !== "doctor" && req.user.role !== "admin")
    return res.status(403).json({ message: "Doctor or Admin access only" });
  next();
};