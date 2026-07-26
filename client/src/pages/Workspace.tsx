import { useState, useRef } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import ResumeUpload from "../components/ResumeUpload";
import JobDescriptionInput from "../components/JobDescriptionInput";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

import {
  uploadResume,
  analyzeJobDescription,
  retrieveContext,
  calibrateResume,
} from "../services/calibration";
import { useToast } from "../hooks/useToast";

const Workspace = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const { show } = useToast();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef(false);

  const hasSavedCalibration =
    typeof window !== "undefined" &&
    !!localStorage.getItem("latest-calibration");

  if (hasSavedCalibration) {
    return <Navigate to="/results" replace />;
  }

  const canCalibrate =
    !isLoading && resume !== null && jobDescription.trim().length > 0;

  const handleCalibrate = async () => {
    if (!resume) return;
    if (isLoadingRef.current) return;

    try {
      isLoadingRef.current = true;
      setIsLoading(true);

      const token = await getToken();

      if (!token) {
        show({
          message: "Please sign in to continue.",
          type: "warning",
        });
        return;
      }

      try {
        await uploadResume(resume, token);
      } catch {
        show({
          message: "Couldn't upload your resume. Please try again.",
          type: "error",
        });
        return;
      }

      let analysis;
      try {
        analysis = await analyzeJobDescription(jobDescription, token);
      } catch {
        show({
          message: "Couldn't analyze that job description. Please try again.",
          type: "error",
        });
        return;
      }

      let context;
      try {
        context = await retrieveContext(jobDescription, token);
      } catch {
        show({
          message: "Couldn't match your resume. Please try again.",
          type: "error",
        });
        return;
      }

      let calibration;
      try {
        calibration = await calibrateResume(token);
      } catch {
        show({
          message: "Couldn't calibrate. Please try again in a moment.",
          type: "error",
        });
        return;
      }

      localStorage.setItem(
        "latest-calibration",
        JSON.stringify({
          analysis,
          context,
          calibration,
        }),
      );

      show({
        message: "Calibration complete. Showing results...",
        type: "success",
        duration: 2500,
      });

      navigate("/results", {
        state: {
          analysis,
          context,
          calibration,
        },
      });
    } catch {
      show({
        message: "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(246,247,245,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1300px] items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold">Calibrate</h2>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              AI APPLICATION STRATEGIST
            </p>
          </div>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-11 w-11 ring-1 ring-[var(--border)] shadow-sm",
              },
            }}
          />
        </div>
      </header>

      <section className="mx-auto max-w-[1300px] px-8 py-8">
        {/* Hero */}

        <div className="mb-8 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[720px]">
            <p className="label">WORKSPACE</p>

            <h1
              style={{
                fontFamily: '"DM Serif Display", serif',
              }}
              className="mt-3 text-5xl leading-tight tracking-[-0.04em]"
            >
              Let's calibrate your application.
            </h1>

            <p className="mt-4 text-[17px] leading-8 text-[var(--text-secondary)]">
              Upload your resume and paste the job description. Calibrate will
              compare both documents and generate evidence-backed
              recommendations before you apply.
            </p>
          </div>

          <div className="flex shrink-0 lg:pt-10">
            <button
              type="button"
              disabled={!canCalibrate}
              aria-disabled={!canCalibrate}
              onClick={handleCalibrate}
              className={`primary-btn px-8 py-4 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${
                !canCalibrate ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                    aria-hidden="true"
                  />
                  Calibrating...
                </>
              ) : (
                <>
                  Calibrate
                  <ArrowRight size={18} aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Workspace */}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <ResumeUpload file={resume} setFile={setResume} />

          <JobDescriptionInput
            value={jobDescription}
            onChange={setJobDescription}
          />
        </div>
      </section>
    </main>
  );
};

export default Workspace;
