import { z } from "zod";

export const RecommendationSchema = z.object({
  summary: z.string(),

  strengths: z.array(z.string()),

  improvements: z.array(z.string()),

  recommendedProjects: z.array(z.string()),
});

export type RecommendationData = z.infer<typeof RecommendationSchema>;