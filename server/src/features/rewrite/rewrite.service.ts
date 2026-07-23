import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import { JobDescriptionData } from "../extraction/extraction.schema.js";
import { RewriteBulletSchema } from "./rewrite.schema.js";
import { REWRITE_BULLET_PROMPT } from "./rewrite.prompt.js";

export const rewriteBullet = async (
  originalBullet: string,
  jobDescription: JobDescriptionData
) => {
  const prompt = `${REWRITE_BULLET_PROMPT}

Original Resume Bullet:
${originalBullet}

Structured Job Description:
${JSON.stringify(jobDescription, null, 2)}
`;

  return generateStructuredResponse(
    prompt,
    RewriteBulletSchema
  );
};