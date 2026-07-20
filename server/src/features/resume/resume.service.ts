import pdfParse from "pdf-parse";
import { Resume } from "./resume.model.js";
import { extractStructuredResume } from "../extraction/extraction.service.js";
import { buildBulletDocuments } from "../leveling/services/bulletBuilder.service.js";
export const extractResumeText = async (buffer: Buffer): Promise<string> => {
  const parsed = await pdfParse(buffer);
  return parsed.text;
};

export const processResume = async (
  clerkId: string,
  fileName: string,
  buffer: Buffer
) => {
  // Step 1: Extract text from PDF
  const rawText = await extractResumeText(buffer);

  // Step 2: Convert raw text into structured JSON using Gemini
  const structuredData = await extractStructuredResume(rawText);

  const bullets = buildBulletDocuments(structuredData);

  //  Save everything to MongoDB
  return await saveResume(
    clerkId,
    fileName,
    rawText,
    structuredData,
    bullets
  );
};

export const saveResume = async (
  clerkId: string,
  fileName: string,
  rawText: string,
  structuredData: unknown,
  bullets: unknown
) => {
  return Resume.findOneAndUpdate(
    { clerkId },
    {
      clerkId,
      fileName,
      rawText,
      structuredData,
      bullets,
    },
    {
      returnDocument: "after",
      upsert: true,
    }
  );
};
