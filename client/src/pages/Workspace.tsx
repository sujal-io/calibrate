import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ResumeUpload from "../components/ResumeUpload";
import JobDescriptionInput from "../components/JobDescriptionInput";
import { UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

import {uploadResume,analyzeJobDescription,retrieveContext,calibrateResume} from "../services/calibration";

const Workspace = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const canCalibrate =
    !isLoading &&
    resume !== null &&
    jobDescription.trim().length > 0;

  const handleCalibrate = async () => {
  if (!resume) return;

  try {
    setIsLoading(true);

    const token = await getToken();

    if (!token) {
      throw new Error("Unable to authenticate user.");
    }

    await uploadResume(resume, token);

    const analysis = await analyzeJobDescription(
      jobDescription,
      token,
    );

    const context = await retrieveContext(
      jobDescription,
      token,
    );

    const bullets = context.retrievedBullets.map(
  (bullet: { text: string }) => bullet.text,
);

const calibration = await calibrateResume(
  bullets,
  token,
);

    console.log("Analysis:", analysis);
console.log("Context:", context);
console.log("Calibration:", calibration);

    navigate("/results", {
      state: {
        analysis,
        context,
        calibration,
      },
    });
  } catch (error) {
    console.error(error);
    alert("Failed to generate calibration report.");
  } finally {
    setIsLoading(false);
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
                avatarBox:
                  "h-11 w-11 ring-1 ring-[var(--border)] shadow-sm",
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
              Upload your resume and paste the job description.
              Calibrate will compare both documents and generate
              evidence-backed recommendations before you apply.
            </p>
          </div>

          <div className="flex shrink-0 lg:pt-10">
            <button
              disabled={!canCalibrate}
              onClick={handleCalibrate}
              className={`primary-btn px-8 py-4 text-base ${
                !canCalibrate
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              {isLoading ? "Analyzing..." : "Calibrate"}

              {!isLoading && <ArrowRight size={18} />}
            </button>
          </div>
        </div>

        {/* Workspace */}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <ResumeUpload
            file={resume}
            setFile={setResume}
          />

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