import { Request, Response } from "express";
import { AnalyzeJobDescriptionSchema } from "./jobDescription.validation.js";
import { analyzeJobDescription } from "./jobDescription.service.js";

export const analyzeJobDescriptionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { jobDescription } = AnalyzeJobDescriptionSchema.parse(req.body);

    const structuredData = await analyzeJobDescription(jobDescription);

    res.status(200).json({
      success: true,
      data: structuredData,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to analyze job description.",
    });
  }
};