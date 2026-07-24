import { Navigate, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";

import MatchOverview from "../components/results/MatchOverview";
import Recommendations from "../components/results/Recommendations";
import EvidenceList from "../components/results/EvidenceList";
import SeniorityCard from "../components/results/SeniorityCard";
import EvidenceBreakdown from "../components/results/EvidenceBreakdown";

const Results = () => {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" replace />;
  }

  const { analysis, context, calibration } = state;

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Header */}

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(246,247,245,0.90)] backdrop-blur-xl">
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

      <section className="mx-auto max-w-[1200px] px-8 py-10">
        {/* Hero */}

        <div className="mb-10">
          <p className="label">CALIBRATION REPORT</p>

          <h1
            className="mt-3 text-5xl tracking-[-0.04em]"
            style={{
              fontFamily: '"DM Serif Display", serif',
            }}
          >
            Your application analysis.
          </h1>

          <p className="mt-4 max-w-[720px] text-[17px] leading-8 text-[var(--text-secondary)]">
            We analyzed your resume against the supplied job description and
            generated a detailed report with evidence, recommendations and
            seniority insights.
          </p>
        </div>

        {/* Overall Match */}

        <MatchOverview
          matchResult={analysis.data.matchResult}
          calibration={calibration.result}
        />

        {/* Recommendations */}

        <Recommendations recommendations={analysis.data.recommendations} />

        {/* Retrieved Evidence */}

        <EvidenceList
          bullets={context.retrievedBullets}
          structuredJobDescription={analysis.data.structuredJobDescription}
        />

        {/* Seniority */}

        <SeniorityCard result={calibration.result} />

        {/* Evidence */}

        <EvidenceBreakdown evidence={calibration.evidence} />
      </section>
    </main>
  );
};

export default Results;
