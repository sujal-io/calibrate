import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import { Resume } from "../resume/resume.model.js";
import {
  calibrateSeniority,
  extractEvidence,
} from "./calibrator.service.js";

export const calibrate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId: clerkId } = getAuth(req);

    if (!clerkId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
      return;
    }

    const resume = await Resume.findOne({ clerkId });

    if (!resume) {
      res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
      return;
    }

    const experience = Array.isArray(resume.structuredData?.experience)
      ? resume.structuredData.experience
      : [];
    const statedRole =
      experience[0]?.role ?? "No formal work experience listed";

    const bullets = resume.bullets
      .map((bullet) => bullet.text)
      .filter(
        (text): text is string =>
          typeof text === "string" && text.trim().length > 0,
      );

    if (bullets.length === 0) {
      res.status(400).json({
        success: false,
        message: "Resume contains no bullets.",
      });
      return;
    }

    const evidence = await extractEvidence(bullets);

    const result = await calibrateSeniority(evidence);

    res.status(200).json({
      success: true,
      evidence,
      result,
      statedRole,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to calibrate resume.",
    });
  }
};
