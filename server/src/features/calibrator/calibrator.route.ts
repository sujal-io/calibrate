import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { calibrate } from "./calibrator.contoller.js";

const router = Router();

router.post("/", requireAuth, calibrate);

export default router;