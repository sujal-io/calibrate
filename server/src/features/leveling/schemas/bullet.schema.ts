import { z } from "zod";

export const ResumeBulletSchema = z.object({
  bulletId: z.string(),

  section: z.string(),

  company: z.string().optional(),

  role: z.string().optional(),

  duration: z.string().optional(),

  text: z.string(),

  embedding: z.array(z.number()).optional(),
});

export const ResumeBulletListSchema = z.array(ResumeBulletSchema);

export type ResumeBullet = z.infer<typeof ResumeBulletSchema>;