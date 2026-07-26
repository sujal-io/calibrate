import { generateStructuredResponse } from "../../utils/geminiHelper.js";
import { EvidenceExtractionSchema } from "./calibrator.schema.js";
import { EVIDENCE_EXTRACTION_PROMPT } from "./prompts/evidenceExtraction.prompt.js";
import {CalibrationResultSchema,EvidenceExtraction,} from "./calibrator.schema.js";
import { SENIORITY_CALIBRATION_PROMPT } from "./prompts/seniorityCalibration.prompt.js";

const statedRoleLevels = [
  { pattern: /\b(?:staff|lead)\b/i, level: "Staff-level" },
  { pattern: /\b(?:senior|sr)\b/i, level: "Senior-level" },
  { pattern: /\b(?:junior|jr)\b/i, level: "Junior-level" },
  { pattern: /\bintern\b/i, level: "Intern-level" },
] as const;

const getImpliedLevelFromRole = (statedRole: string) =>
  statedRoleLevels.find(({ pattern }) => pattern.test(statedRole))?.level;

export const createSeniorityComparison = (
  statedRole: string,
  inferredLevel: string,
) => {
  if (statedRole === "No formal work experience listed") {
    return `No formal work experience listed — your project work reads as ${inferredLevel}.`;
  }

  const impliedLevel = getImpliedLevelFromRole(statedRole);

  if (impliedLevel && impliedLevel !== inferredLevel) {
    return `Your resume lists you as a ${statedRole}, and your work reads as ${inferredLevel}.`;
  }

  return `Your resume lists you as a ${statedRole}, and your work reads as ${inferredLevel}.`;
};

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

  const result = await generateStructuredResponse(
    prompt,
    CalibrationResultSchema,
  );

  const averageScore =
    (
      evidence.taskVsOutcome.score +
      evidence.scope.score +
      evidence.autonomy.score
    ) / 3;

  const confidence = Math.min(95,Math.round((averageScore / 5) * 100),);

  return {
    ...result,
    confidence,
  };
};
