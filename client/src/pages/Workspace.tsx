import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import ResumeUpload from "../components/ResumeUpload";
import JobDescriptionInput from "../components/JobDescriptionInput";
import { UserButton } from "@clerk/clerk-react";

const Workspace = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");

  const canCalibrate = resume !== null && jobDescription.trim().length > 0;

  const handleCalibrate = () => {
    console.log({
      resume,
      jobDescription,
    });

    // Commit 3
    // Upload Resume
    // Analyze JD
    // Retrieve Resume
    // Generate Calibration
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(246,247,245,0.9)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1300px] items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold">Calibrate</h2>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              AI Application Strategist
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
              Upload your resume and paste the job description. Calibrate will
              compare both documents and generate evidence-backed
              recommendations before you apply.
            </p>
          </div>

          {/* Primary Action */}

          <div className="flex shrink-0 lg:pt-10">
            <button
              disabled={!canCalibrate}
              onClick={handleCalibrate}
              className={`primary-btn px-8 py-4 text-base ${
                !canCalibrate ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              
              Calibrate
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Workspace */}

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          {/* Left */}

          <ResumeUpload file={resume} setFile={setResume} />

          {/* Right */}

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