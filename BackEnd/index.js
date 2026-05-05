import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config(
  {
    quiet: true
  }
);

const app = express();


//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRoutes);

//connect to db and start server
mongoose
  .connect(process.env.DB_URL)
  .then((val) => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
      console.log("Connected to MongoDB");
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });