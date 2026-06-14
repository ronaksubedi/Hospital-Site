import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./src/routes/authRoutes.js";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import serviceRoutes from "./src/routes/serviceRoutes.js";
import blogRoutes from "./src/routes/blogRoutes.js";
import contactRoutes from "./src/routes/contactRoutes.js";
import { notFound, errorHandler } from "./src/middlewares/errorMiddleware.js";

dotenv.config();

const app = express();

// middlewares
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://hospitalsite.ronaksubedi.com.np",
  ],
  credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

// connect to db and start server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
      console.log("Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });