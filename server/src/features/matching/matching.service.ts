import { ResumeData, JobDescriptionData } from "../extraction/extraction.schema.js";
import { MatchResult } from "./matching.types.js";

export const calculateMatch = (
  resume: ResumeData,
  jobDescription: JobDescriptionData
): MatchResult => {
  const resumeSkillSet = new Set(
    resume.skills.map((skill) => skill.toLowerCase())
  );

  const requiredSkillSet = new Set(
    jobDescription.requiredSkills.map((skill) => skill.toLowerCase())
  );

  const matchingSkills = jobDescription.requiredSkills.filter((skill) =>
    resumeSkillSet.has(skill.toLowerCase())
  );

  const missingSkills = jobDescription.requiredSkills.filter(
    (skill) => !resumeSkillSet.has(skill.toLowerCase())
  );

  const extraSkills = resume.skills.filter(
    (skill) => !requiredSkillSet.has(skill.toLowerCase())
  );

  const matchPercentage =
    jobDescription.requiredSkills.length === 0
      ? 0
      : Math.round(
          (matchingSkills.length / jobDescription.requiredSkills.length) * 100
        );

  return {
    matchPercentage,
    matchingSkills,
    missingSkills,
    extraSkills,
  };
};