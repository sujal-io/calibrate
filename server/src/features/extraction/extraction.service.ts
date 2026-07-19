import { gemini } from "../../config/gemini.js";
import {ResumeSchema,JobDescriptionSchema} from "./extraction.schema.js";
import {RESUME_EXTRACTION_PROMPT,JOB_DESCRIPTION_EXTRACTION_PROMPT} from "./extraction.prompt.js";

export const extractStructuredResume = async (resumeText: string) => {
  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: `${RESUME_EXTRACTION_PROMPT}

Resume:

${resumeText}`,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  // Gemini sometimes wraps JSON in ```json ... ```
  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleanedText);

  return ResumeSchema.parse(parsed);
};

export const extractStructuredJobDescription = async (
  jobDescription: string
) => {
  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: `${JOB_DESCRIPTION_EXTRACTION_PROMPT}

Job Description:

${jobDescription}`,
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  const cleanedText = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const parsed = JSON.parse(cleanedText);

  return JobDescriptionSchema.parse(parsed);
};