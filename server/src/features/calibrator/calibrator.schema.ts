import { z } from "zod";

const DimensionSchema = z.object({
  score: z.number().min(1).max(5),
  maxScore: z.literal(5),
  evidence: z.array(z.string()),
  reasoning: z.string(),
});

export const EvidenceExtractionSchema = z.object({
  taskVsOutcome: DimensionSchema,
  scope: DimensionSchema,
  autonomy: DimensionSchema,
});

export type EvidenceExtraction = z.infer<
  typeof EvidenceExtractionSchema
>;

export const CalibrationResultSchema = z.object({
  level: z.enum([
    "Intern",
    "Junior",
    "Mid-Level",
    "Senior",
    "Staff",
  ]),

confidence: z.number().min(0).max(100),
  strengths: z.array(z.string()),

  gaps: z.array(z.string()),

  nextLevelSuggestions: z.array(z.string()),
});

export type CalibrationResult = z.infer<
  typeof CalibrationResultSchema
>;