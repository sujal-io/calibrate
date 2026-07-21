import pdfParse from "pdf-parse";
import { Resume } from "./resume.model.js";
import { extractStructuredResume } from "../extraction/extraction.service.js";
import { buildBulletDocuments } from "../leveling/services/bulletBuilder.service.js";
import { generateEmbedding } from "../embeddings/services/embedding.service.js";
import { ResumeBullet } from "../leveling/schemas/bullet.schema.js";
export const extractResumeText = async (buffer: Buffer): Promise<string> => {
  const parsed = await pdfParse(buffer);
  return parsed.text;
};

export const processResume = async (
  clerkId: string,
  fileName: string,
  buffer: Buffer,
) => {
  //  Extract text from PDF
  const rawText = await extractResumeText(buffer);

  //  Convert raw text into structured JSON using Gemini
  const structuredData = await extractStructuredResume(rawText);

  const bullets = buildBulletDocuments(structuredData);

  const bulletsWithEmbeddings = await Promise.all(
  bullets.map(async (bullet) => ({
    ...bullet,
    embedding: await generateEmbedding(bullet.text),
  }))
);
  //  Save everything to MongoDB
  return await saveResume(clerkId, fileName, rawText, structuredData, bulletsWithEmbeddings,);
};

export const saveResume = async (
  clerkId: string,
  fileName: string,
  rawText: string,
  structuredData: unknown,
  bullets: ResumeBullet[],
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
    },
  );
};
