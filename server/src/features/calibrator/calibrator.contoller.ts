import { Request, Response } from "express";
import { extractEvidence } from "./calibrator.service.js";

export const calibrate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { bullets } = req.body;

    if (!Array.isArray(bullets) || bullets.length === 0) {
      res.status(400).json({
        success: false,
        message: "Bullets are required.",
      });
      return;
    }

    const result = await extractEvidence(bullets);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to extract evidence.",
    });
  }
};