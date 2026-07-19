import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import {ResumeSchema,JobDescriptionSchema} from "./extraction.schema.js";
import {RESUME_EXTRACTION_PROMPT,JOB_DESCRIPTION_EXTRACTION_PROMPT} from "./extraction.prompt.js";

export const extractStructuredResume = async (resumeText: string) => {
  const prompt = `${RESUME_EXTRACTION_PROMPT}

Resume:

${resumeText}`;

  return generateStructuredResponse(prompt, ResumeSchema);
}

export const extractStructuredJobDescription = async (
  jobDescription: string
) => {
  const prompt = `${JOB_DESCRIPTION_EXTRACTION_PROMPT}

Job Description:

${jobDescription}`;

  return generateStructuredResponse(
    prompt,
    JobDescriptionSchema
  );
};