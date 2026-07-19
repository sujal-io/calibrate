import { closest, distance } from "fastest-levenshtein";
import {
  ResumeData,
  JobDescriptionData,
} from "../extraction/extraction.schema.js";
import { MatchResult } from "./matching.types.js";

const isSkillMatch = (
  requiredSkill: string,
  resumeSkills: string[]
): boolean => {
  const required = requiredSkill.trim().toLowerCase();

  // Exact match
  if (resumeSkills.includes(required)) {
    return true;
  }

  // Find the closest resume skill
  const nearest = closest(required, resumeSkills);

  if (!nearest) {
    return false;
  }

  const maxLength = Math.max(required.length, nearest.length);
  const similarity = 1 - distance(required, nearest) / maxLength;

  return similarity >= 0.85;
};

export const calculateMatch = (
  resume: ResumeData,
  jobDescription: JobDescriptionData
): MatchResult => {
  const resumeSkills = resume.skills.map((skill) =>
    skill.trim().toLowerCase()
  );

  const matchingSkills = jobDescription.requiredSkills.filter((skill) =>
    isSkillMatch(skill, resumeSkills)
  );

  const missingSkills = jobDescription.requiredSkills.filter(
    (skill) => !isSkillMatch(skill, resumeSkills)
  );

  const requiredSkillSet = new Set(
    jobDescription.requiredSkills.map((skill) => skill.toLowerCase())
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