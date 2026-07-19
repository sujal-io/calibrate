import { extractStructuredJobDescription } from "../extraction/extraction.service.js";

export const analyzeJobDescription = async (jobDescription: string) => {
  return await extractStructuredJobDescription(jobDescription);
};