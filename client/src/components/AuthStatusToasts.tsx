import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useToast } from "../hooks/useToast";

export function AuthStatusToasts() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { show } = useToast();

  useEffect(() => {
    if (!isLoaded) return;

    const lastSeenUserId = window.localStorage.getItem("__calibrate_last_uid");

    if (isSignedIn && userId) {
      if (lastSeenUserId !== userId) {
        window.localStorage.setItem("__calibrate_last_uid", userId);
        show({
          message: "Signed in successfully.",
          type: "success",
          duration: 2500,
        });
      }
    } else {
      if (lastSeenUserId) {
        window.localStorage.removeItem("__calibrate_last_uid");
        show({
          message: "Signed out.",
          type: "info",
          duration: 2200,
        });
      }
    }
  }, [isLoaded, isSignedIn, userId, show]);

  return null;
}
