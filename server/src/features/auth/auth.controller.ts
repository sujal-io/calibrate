import { Request, Response } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import { syncUserService } from "./auth.service.js";

export const syncUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const clerkUser = await clerkClient.users.getUser(userId);

    const user = await syncUserService({
      clerkId: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
      fullName: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to sync user",
    });
  }
};