import mongoose from "mongoose";
import express from "express";

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,   // unique,"one user can only be one doctor"
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
    },
    bio: {
      type: String,
      default: "",
    },
    experience: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: "",
    },
    photoPublicId: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    ratedBy: [
      {
        userId: String,
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", doctorSchema);