import { Resume } from "../resume/resume.model.js";
import { extractStructuredJobDescription } from "../extraction/extraction.service.js";
import { calculateMatch } from "../matching/matching.service.js";
import { generateRecommendations } from "../recommendations/recommendation.service.js";

export const analyzeJobDescription = async (
  clerkId: string,
  jobDescription: string
) => {
  // Get user's resume
  const resume = await Resume.findOne({ clerkId });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  // Extract structured job description
  const structuredJobDescription =
    await extractStructuredJobDescription(jobDescription);

  // Calculate resume match
  const matchResult = calculateMatch(
    resume.structuredData,
    structuredJobDescription
  );

  // Generate AI recommendations
  const recommendations = await generateRecommendations(
    resume.structuredData,
    structuredJobDescription,
    matchResult
  );

  return {
    structuredJobDescription,
    matchResult,
    recommendations,
  };
};