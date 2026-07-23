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