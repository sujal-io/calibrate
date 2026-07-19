import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import { RecommendationSchema } from "./recommendation.schema.js";
import { RECOMMENDATION_PROMPT } from "./recommendation.prompt.js";

import { ResumeData, JobDescriptionData } from "../extraction/extraction.schema.js";
import { MatchResult } from "../matching/matching.types.js";

export const generateRecommendations = async (
  resume: ResumeData,
  jobDescription: JobDescriptionData,
  matchResult: MatchResult
) => {
  const prompt = `${RECOMMENDATION_PROMPT}

Resume:
${JSON.stringify(resume, null, 2)}

Job Description:
${JSON.stringify(jobDescription, null, 2)}

Match Result:
${JSON.stringify(matchResult, null, 2)}
`;

return generateStructuredResponse(
  prompt,
  RecommendationSchema
);
};