import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

const Landing = () => {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[rgba(246,247,245,0.88)] backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-[1400px] items-center justify-between px-8">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.03em]">
              Calibrate
            </h2>

            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              AI Application Strategist
            </p>
          </div>

          <nav className="hidden items-center gap-10 text-sm text-[var(--text-secondary)] lg:flex">
            <a
              href="#how-it-works"
              className="transition hover:text-[var(--text)]"
            >
              How it Works
            </a>

            <SignInButton mode="modal">
              <button className="primary-btn">Sign In</button>
            </SignInButton>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 px-6 pt-4 pb-14 lg:px-8 lg:pt-8 lg:pb-16 xl:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT */}

        <div>
          <h1
            style={{
              fontFamily: '"DM Serif Display", serif',
            }}
            className="
            mt-8
        max-w-[680px]
        text-[2.9rem]
        leading-[0.94]
        tracking-[-0.045em]
        md:text-[3.5rem]
        lg:text-[4.1rem]
        xl:text-[4.5rem]
      "
          >
            Your resume says intern.
            <br />
            Your projects say SDE-1.
            <br />
            Calibrate tells you why.
          </h1>

          <p className="muted mt-8 max-w-[540px] text-base leading-7">
            Measure your resume against real job descriptions. Understand where
            you stand, what evidence supports that conclusion, and what is
            actually missing before you apply.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <SignInButton mode="modal">
            <button className="primary-btn">
              Start Calibrating
              <ArrowRight size={18} />
            </button>
            </SignInButton>

            <a href="https://github.com/sujal-io/calibrate" target="_blank" rel="noopener noreferrer">
              <button className="secondary-btn">View Github</button>
            </a>
          </div>

          <div className="mt-12 grid max-w-[500px] grid-cols-3 gap-6">
            <div>
              <h2 className="text-2xl font-semibold">86%</h2>

              <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                Average Match Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">AI</h2>

              <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                Evidence Driven
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">4</h2>

              <p className="mt-2 text-xs leading-5 text-[var(--text-secondary)]">
                Seniority Levels
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="flex justify-center xl:justify-end">
          <div className="surface-elevated w-full max-w-[390px] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="label">CALIBRATION REPORT</p>

                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  Generated just now
                </p>
              </div>

              <CheckCircle2 size={22} color="var(--success)" />
            </div>

            <div className="divider my-3" />

            <p className="label">MATCH INDEX</p>

            <div className="mt-2.5 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-[-0.04em]">
                86
              </span>

              <span className="mb-1 text-base text-[var(--text-secondary)]">
                /100
              </span>
            </div>

            <p className="mt-2 text-base font-medium">Strong SDE-1 Candidate</p>

            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
              Your experience aligns well with most entry-level software
              engineering roles.
            </p>

            <div className="divider my-3" />

            <div className="flex items-center justify-between">
              <p className="label evidence">EVIDENCE</p>

              <span className="text-xs text-[var(--text-secondary)]">
                3 Signals
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {[
                {
                  id: "001",
                  title: "React + TypeScript",
                  source: "Projects",
                },
                {
                  id: "002",
                  title: "Node.js + Express",
                  source: "Experience",
                },
                {
                  id: "003",
                  title: "JWT Authentication",
                  source: "Resume",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border border-[var(--border)] px-4 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[var(--evidence)]">
                      {item.id}
                    </span>

                    <span className="text-sm font-medium">{item.title}</span>
                  </div>

                  <span className="text-xs text-[var(--text-secondary)]">
                    {item.source}
                  </span>
                </div>
              ))}
            </div>

            <div className="divider my-3" />

            <div className="rounded-xl bg-[var(--accent-soft)] p-3.5">
              <p className="label">NEXT ACTION</p>

              <p className="mt-3 text-sm leading-6">
                Add measurable impact to your internship and strengthen one
                backend project to push your calibration score above 90.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}

      <section className="border-y border-[var(--border)] bg-[var(--surface-soft)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap justify-center lg:justify-between gap-x-10 gap-y-6 px-8 py-10 text-sm uppercase tracking-[0.18em] text-[var(--text-secondary)]">
          {[
            "Resume Parsing",
            "Semantic Matching",
            "Evidence Engine",
            "Gap Analysis",
            "Seniority Calibrator",
          ].map((item) => (
            <span key={item} className="w-44 text-center whitespace-nowrap">
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}

      <section id="how-it-works" className="mx-auto max-w-[1400px] px-8 py-24">
        <p className="label text-center">HOW IT WORKS</p>

        <h2
          style={{ fontFamily: '"DM Serif Display", serif' }}
          className="mx-auto mt-6 max-w-3xl text-center text-4xl leading-tight tracking-[-0.03em]"
        >
          Decisions backed by evidence,
          <br />
          not generic AI feedback.
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Upload",
              text: "Upload your resume and paste any job description.",
            },
            {
              step: "02",
              title: "Calibrate",
              text: "Our engine compares experience, skills, and project evidence.",
            },
            {
              step: "03",
              title: "Improve",
              text: "Receive targeted recommendations that improve your actual match.",
            },
          ].map((card) => (
            <div key={card.step} className="surface p-8">
              <span className="font-mono text-sm text-[var(--evidence)]">
                {card.step}
              </span>

              <h3 className="mt-5 text-2xl font-semibold">{card.title}</h3>

              <p className="mt-4 leading-8 text-[var(--text-secondary)]">
                {card.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}

      <section className="px-8 pb-24">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-[var(--border)] bg-[var(--surface)] px-10 py-16 text-center">
          <p className="label">READY TO CALIBRATE?</p>

          <h2
            style={{ fontFamily: '"DM Serif Display", serif' }}
            className="mt-6 text-4xl leading-tight tracking-[-0.03em]"
          >
            Apply with confidence,
            <br />
            backed by measurable evidence.
          </h2>
         <SignInButton mode="modal">
          <button className="primary-btn mx-auto mt-10">
            Start Calibrating
            <ArrowRight size={18} />
          </button>
          </SignInButton>
        </div>
      </section>
    </main>
  );
};

export default Landing;
