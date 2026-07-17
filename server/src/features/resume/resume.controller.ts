import { Request, Response } from "express";

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

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      fileName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Upload failed.",
    });
  }
};