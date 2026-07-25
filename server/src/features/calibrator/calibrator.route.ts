import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { calibrationLimiter } from "../../middleware/rateLimiter.js";
import { calibrate } from "./calibrator.contoller.js";

const router = Router();

router.post( "/", calibrationLimiter,requireAuth,calibrate);
export default router;