import { gemini } from "../../config/gemini.js";

import { RecommendationSchema } from "./recommendation.schema.js";
import { RECOMMENDATION_PROMPT } from "./recommendation.prompt.js";

import { ResumeData, JobDescriptionData } from "../extraction/extraction.schema.js";
import { MatchResult } from "../matching/matching.types.js";

export const generateRecommendations = async (
  resume: ResumeData,
  jobDescription: JobDescriptionData,
  matchResult: MatchResult
) => {
  const response = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL!,
    contents: `${RECOMMENDATION_PROMPT}

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${JSON.stringify(jobDescription, null, 2)}

Match Result:
${JSON.stringify(matchResult, null, 2)}
`,
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

  return RecommendationSchema.parse(parsed);
};