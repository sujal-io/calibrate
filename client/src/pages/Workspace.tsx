import {
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { useEffect } from "react";
import api from "../lib/api";

const Workspace = () => {
  const { getToken, isSignedIn } = useAuth();

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
          }
        );
      } catch (err) {
        console.error(err);
      }
    };

    syncUser();
  }, [isSignedIn, getToken]);

  return (
    <main className="min-h-screen bg-[#F6F7F5]">

      <nav className="h-20 border-b border-[#E6E7E5] bg-white">

        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-8">

          <h1 className="text-2xl font-semibold tracking-tight">
            Calibrate
          </h1>

          <UserButton />

        </div>

      </nav>

      <div className="mx-auto max-w-7xl px-8 py-12">

        <div className="rounded-3xl border border-[#E6E7E5] bg-white p-8">

          <h2 className="text-3xl font-semibold">
            Upload Resume
          </h2>

          <p className="mt-2 text-gray-500">
            Upload your resume to begin calibration.
          </p>

          <input
            className="mt-8"
            type="file"
            accept=".pdf"
            onChange={async (e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const token = await getToken();

              const formData = new FormData();
              formData.append("resume", file);

              try {
                const response = await api.post(
                  "/resume/upload",
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                console.log(response.data);
              } catch (err) {
                console.error(err);
              }
            }}
          />

        </div>

      </div>

    </main>
  );
};

export default Workspace;