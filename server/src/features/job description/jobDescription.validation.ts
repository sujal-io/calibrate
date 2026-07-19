import { z } from "zod";

export const AnalyzeJobDescriptionSchema = z.object({
  jobDescription: z
    .string()
    .min(50, "Job description is too short.")
    .max(20000, "Job description is too long."),
});

export type AnalyzeJobDescriptionInput = z.infer<
  typeof AnalyzeJobDescriptionSchema
>;