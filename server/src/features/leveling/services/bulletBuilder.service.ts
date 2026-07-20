import { ResumeBullet } from "../schemas/bullet.schema.js";

export function buildBulletDocuments(
  structuredResume: any
): ResumeBullet[] {
  const bullets: ResumeBullet[] = [];

  // Experience
  const experiences = structuredResume?.experience ?? [];

  experiences.forEach((exp: any, expIndex: number) => {
    const descriptions = Array.isArray(exp.description)
      ? exp.description
      : [];

    descriptions.forEach((text: string, bulletIndex: number) => {
      bullets.push({
        bulletId: `exp_${expIndex + 1}_${bulletIndex + 1}`,
        section: "Experience",
        company: exp.company ?? "",
        role: exp.role ?? "",
        duration: exp.duration ?? "",
        text,
      });
    });
  });

  // Projects
  const projects = structuredResume?.projects ?? [];

  projects.forEach((project: any, projectIndex: number) => {
    const descriptions = Array.isArray(project.description)
      ? project.description
      : [];

    descriptions.forEach((text: string, bulletIndex: number) => {
      bullets.push({
        bulletId: `proj_${projectIndex + 1}_${bulletIndex + 1}`,
        section: "Projects",
        company: "",
        role: project.name ?? "",
        duration: "",
        text,
      });
    });
  });

  return bullets;
}