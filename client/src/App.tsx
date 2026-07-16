import {
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";

import { useEffect } from "react";
import api from "./lib/api";

function App() {
  const { isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn) return;

      try {
        const token = await getToken();

        await api.post(
          "/auth/sync",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log("User Synced");
      } catch (err) {
        console.error(err);
      }
    };

    syncUser();
  }, [isSignedIn, getToken]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignedOut>
        <SignIn />
      </SignedOut>

      <SignedIn>
        <div className="text-center space-y-5">
          <h1 className="text-4xl font-bold">Welcome to Calibrate 🚀</h1>

          <UserButton afterSignOutUrl="/" />

          <p className="text-gray-500">Authentication Successful</p>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
