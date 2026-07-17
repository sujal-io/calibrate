import pdfParse from "pdf-parse";
import { Resume } from "./resume.model.js";

export const extractResumeText = async (buffer: Buffer): Promise<string> => {
  const parsed = await pdfParse(buffer);
  return parsed.text;
};

export const saveResume = async (
  clerkId: string,
  fileName: string,
  extractedText: string,
) => {
  return await Resume.findOneAndUpdate(
    { clerkId }, // Find the user's existing resume
    {
      clerkId,
      fileName,
      extractedText,
    },
    {
      new: true, // Return the updated document
      upsert: true, // Create one if it doesn't exist
    },
  );
};
