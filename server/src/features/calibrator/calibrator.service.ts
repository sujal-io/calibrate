import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import { EvidenceExtractionSchema } from "./calibrator.schema.js";
import { EVIDENCE_EXTRACTION_PROMPT } from "./prompts/evidenceExtraction.prompt.js";
import {CalibrationResultSchema,EvidenceExtraction,} from "./calibrator.schema.js";
import { SENIORITY_CALIBRATION_PROMPT } from "./prompts/seniorityCalibration.prompt.js";

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

export const calibrateSeniority = async (
  evidence: EvidenceExtraction,
) => {
  const prompt = `${SENIORITY_CALIBRATION_PROMPT}

Evaluation:

${JSON.stringify(evidence, null, 2)}
`;

  return generateStructuredResponse(
    prompt,
    CalibrationResultSchema,
  );
};