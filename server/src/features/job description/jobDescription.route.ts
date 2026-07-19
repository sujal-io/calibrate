import { Router } from "express";
import { analyzeJobDescriptionController } from "./jobDescription.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/analyze",
  requireAuth,
  analyzeJobDescriptionController
);

export default router;