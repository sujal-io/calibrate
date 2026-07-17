import { Schema, model } from "mongoose";

const resumeSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      index: true,
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

export const Resume = model("Resume", resumeSchema);