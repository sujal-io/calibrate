import { Request, Response } from "express";

export const calibrate = async (
  req: Request,
  res: Response,
): Promise<void> => {
  res.status(501).json({
    success: false,
    message: "Not implemented.",
  });
};