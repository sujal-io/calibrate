import { Router } from "express";
import { upload } from "../../middleware/upload.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { uploadResume } from "./resume.controller.js";

const router = Router();

router.post(
  "/upload",
  requireAuth,
  upload.single("resume"),
  uploadResume
);

export default router;