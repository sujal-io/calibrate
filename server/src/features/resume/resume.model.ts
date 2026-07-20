import { Schema, model } from "mongoose";

const ResumeSchema = new Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },

    fileName: {
      type: String,
      required: true,
    },

    rawText: {
      type: String,
      required: true,
    },

    structuredData: {
      type: Schema.Types.Mixed,
      default: null,
    },
    bullets: [
      {
        bulletId: String,

        section: String,

        company: String,

        role: String,

        duration: String,

        text: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Resume = model("Resume", ResumeSchema);
