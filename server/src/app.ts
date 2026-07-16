import express from "express";
import authRoutes from "./features/auth/auth.route.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(clerkMiddleware());

app.use("/api/auth", authRoutes);

app.get("/", (_req, res) => {
  res.send("🚀 Calibrate API is running");
});

export default app;