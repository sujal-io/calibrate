import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { rewriteBulletController } from "./rewrite.controller.js";

const router = Router();

router.post("/", requireAuth, rewriteBulletController);

export default router;