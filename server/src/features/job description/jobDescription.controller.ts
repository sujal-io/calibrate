import { Request, Response } from "express";
import { getAuth } from "@clerk/express";

import { AnalyzeJobDescriptionSchema } from "./jobDescription.validation.js";
import { analyzeJobDescription } from "./jobDescription.service.js";

export const analyzeJobDescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    // Validate request body
    const { jobDescription } = AnalyzeJobDescriptionSchema.parse(req.body);

    // Get authenticated user's Clerk ID
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Analyze the job description and calculate resume match
    const result = await analyzeJobDescription(userId, jobDescription);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze job description.",
    });
  }
};