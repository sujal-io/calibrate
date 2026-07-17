import { Request, Response } from "express";
import { getAuth } from "@clerk/express";
import {
  extractResumeText,
  saveResume,
} from "./resume.service.js";

export const uploadResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No resume uploaded.",
      });
      return;
    }

    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const extractedText = await extractResumeText(req.file.buffer);

    const resume = await saveResume(
      userId,
      req.file.originalname,
      extractedText
    );

    res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
};