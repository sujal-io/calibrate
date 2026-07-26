import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { ArrowRight } from "lucide-react";

import ResultsSidebar from "../components/results/ResultSidebar";
import BottomNav from "../components/results/BottomNav";
import MatchOverview from "../components/results/MatchOverview";
import Recommendations from "../components/results/Recommendations";
import EvidenceList from "../components/results/EvidenceList";
import SeniorityCard from "../components/results/SeniorityCard";
import EvidenceBreakdown from "../components/results/EvidenceBreakdown";
import { useState, useEffect } from "react";

const Results = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  useEffect(() => {
    const sectionIds: Array<
      "overview" | "recommendations" | "evidence" | "seniority" | "breakdown"
    > = ["overview", "recommendations", "evidence", "seniority", "breakdown"];

    const activationLine = 140;

    let rafId = 0;
    let lastSection = "";

    const updateActive = () => {
      rafId = 0;

      let active = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= activationLine) {
          active = id;
        } else {
          break;
        }
      }

      if (active !== lastSection) {
        lastSection = active;
        setActiveSection(active);
      }
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateActive);
      }
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const report =
    state ??
    (() => {
      const saved = localStorage.getItem("latest-calibration");

      return saved ? JSON.parse(saved) : null;
    })();

  if (!report) {
    return <Navigate to="/" replace />;
  }

  const { analysis, context, calibration } = report;

  const handleNewCalibration = () => {
    localStorage.removeItem("latest-calibration");

    navigate("/");
  };

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

      <section className="mx-auto max-w-[1350px] px-8 pt-10">
        {/* Hero */}

        <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Left */}

          <div>
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
              generated a complete report with evidence, recommendations and
              seniority insights.
            </p>
          </div>

          {/* Right */}

          <div className="surface-elevated rounded-[30px] p-5">

            <h3
              className="text-2xl"
              style={{
                fontFamily: '"DM Serif Display", serif',
              }}
            >
              Ready for another calibration?
            </h3>

            <p className="mt-1 leading-7 text-[var(--text-secondary)]">
              Upload another resume or compare a different job description.
            </p>

            <button
              onClick={handleNewCalibration}
              className="primary-btn mt-5 w-full"
            >
              New Calibration
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Layout */}

        <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}

          <ResultsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          {/* Content */}

          <div className="space-y-14 pb-20 lg:pb-0">
            <section id="overview">
              <MatchOverview
                matchResult={analysis.data.matchResult}
                calibration={calibration.result}
              />
            </section>

            <section id="recommendations">
              <Recommendations
                recommendations={analysis.data.recommendations}
              />
            </section>

            <section id="evidence">
              <EvidenceList
                bullets={context.retrievedBullets}
                structuredJobDescription={
                  analysis.data.structuredJobDescription
                }
              />
            </section>

            <section id="seniority">
              <SeniorityCard
                result={{
                  ...calibration.result,
                  statedRole: calibration.statedRole,
                  comparison: calibration.comparison,
                }}
              />
            </section>

            <section id="breakdown">
              <EvidenceBreakdown evidence={calibration.evidence} />
            </section>
          </div>
        </div>
      </section>

      <BottomNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </main>
  );
};

export default Results;
