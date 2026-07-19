import { z } from "zod";
import { gemini } from "../config/gemini.js";

export const generateStructuredResponse = async <T>(
  prompt: string,
  schema: z.ZodSchema<T>
): Promise<T> => {
  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: prompt,
  });

  const text = response.text ?? "";

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleanedText);

  return schema.parse(parsed);
};