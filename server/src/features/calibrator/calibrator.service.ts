import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import { EvidenceExtractionSchema } from "./calibrator.schema.js";
import { EVIDENCE_EXTRACTION_PROMPT } from "./prompts/evidenceExtraction.prompt.js";

export const extractEvidence = async (
  resumeBullets: string[],
) => {
  const prompt = `${EVIDENCE_EXTRACTION_PROMPT}

Resume Bullets:

${resumeBullets.map((bullet) => `- ${bullet}`).join("\n")}
`;

  return generateStructuredResponse(
    prompt,
    EvidenceExtractionSchema,
  );
};