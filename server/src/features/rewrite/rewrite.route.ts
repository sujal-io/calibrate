import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { rewriteBulletController } from "./rewrite.controller.js";
import { rewriteLimiter } from "../../middleware/rateLimiter.js";

const router = Router();

router.post("/", rewriteLimiter, requireAuth, rewriteBulletController);

export default router;