import { z } from "zod";

export const RewriteBulletSchema = z.object({
  rewrittenBullet: z.string(),
});

export type RewriteBulletResponse = z.infer<
  typeof RewriteBulletSchema
>;