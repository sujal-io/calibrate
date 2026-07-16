import { Router } from "express";
import { syncUser } from "./auth.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/sync", requireAuth, syncUser);

export default router;