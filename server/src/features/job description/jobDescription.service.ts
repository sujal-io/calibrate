import { Resume } from "../resume/resume.model.js";
import { extractStructuredJobDescription } from "../extraction/extraction.service.js";
import { calculateMatch } from "../matching/matching.service.js";
export const analyzeJobDescription = async (
  clerkId: string,
  jobDescription: string
) => {
  const resume = await Resume.findOne({ clerkId });

  if (!resume) {
    throw new Error("Resume not found.");
  }

  const structuredJobDescription =
    await extractStructuredJobDescription(jobDescription);

  const matchResult = calculateMatch(
    resume.structuredData,
    structuredJobDescription
  );

  return {
    structuredJobDescription,
    matchResult,
  };
};