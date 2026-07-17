import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Resume = mongoose.model("Resume", resumeSchema);