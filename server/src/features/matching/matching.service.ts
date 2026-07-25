import { closest, distance } from "fastest-levenshtein";
import {ResumeData,JobDescriptionData,
} from "../extraction/extraction.schema.js";
import { MatchResult } from "./matching.types.js";
import { normalizeSkill } from "./skillAliases.js";

const isSkillMatch = (
  requiredSkill: string,
  resumeSkills: string[]
): boolean => {
  const required = normalizeSkill(requiredSkill);

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

  return similarity >= 0.9;
};

export const calculateMatch = (
  resume: ResumeData,
  jobDescription: JobDescriptionData
): MatchResult => {
  // Normalize resume skills
  const resumeSkills = resume.skills.map(normalizeSkill);

  // Matching skills
  const matchingSkills = jobDescription.requiredSkills.filter((skill) =>
    isSkillMatch(skill, resumeSkills)
  );

  // Missing skills
  const missingSkills = jobDescription.requiredSkills.filter(
    (skill) => !isSkillMatch(skill, resumeSkills)
  );

  // Normalize JD skills
  const requiredSkillSet = new Set(
    jobDescription.requiredSkills.map(normalizeSkill)
  );

  // Extra skills
  const extraSkills = resume.skills.filter(
    (skill) => !requiredSkillSet.has(normalizeSkill(skill))
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