import { z } from "zod";


   //Resume Schema


export const ResumeSchema = z.object({
  name: z.string(),

  title: z.string(),

  summary: z.string(),

  skills: z.array(z.string()),

  experience: z.array(
  z.object({
    company: z.string(),
    role: z.string(),
    duration: z.string(),
    description: z.array(z.string()),
  })
),

  education: z.array(
    z.object({
      degree: z.string(),
      institute: z.string(),
      year: z.string(),
    })
  ),

  projects: z.array(
  z.object({
    name: z.string(),
    technologies: z.array(z.string()),
    description: z.array(z.string()),
  })
),
});

export type ResumeData = z.infer<typeof ResumeSchema>;


   //Job Description Schema


export const JobDescriptionSchema = z.object({
  company: z.string(),

  role: z.string(),

  requiredSkills: z.array(z.string()),

  preferredSkills: z.array(z.string()),

  responsibilities: z.array(z.string()),

  qualifications: z.array(z.string()),
});

export type JobDescriptionData = z.infer<typeof JobDescriptionSchema>;