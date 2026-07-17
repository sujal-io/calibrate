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
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-bold">Calibrate</h1>

          <UserButton />

          <input
            type="file"
            accept=".pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const token = await getToken();

              const formData = new FormData();
              formData.append("resume", file);

              try {
                const response = await api.post("/resume/upload", formData, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });

                console.log(response.data);
              } catch (err) {
                console.error(err);
              }
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
