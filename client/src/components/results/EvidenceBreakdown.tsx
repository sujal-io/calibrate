type EvidenceCategory = {
  score: number;
  maxScore: number;
  reasoning: string;
  evidence: string[];
};

type Evidence = {
  autonomy: EvidenceCategory;
  scope: EvidenceCategory;
  taskVsOutcome: EvidenceCategory;
};

type Props = {
  evidence: Evidence;
};

const categories = [
  {
    title: "Autonomy",
    key: "autonomy",
  },
  {
    title: "Scope",
    key: "scope",
  },
  {
    title: "Task vs Outcome",
    key: "taskVsOutcome",
  },
] as const;

const EvidenceBreakdown = ({ evidence }: Props) => {
  return (
    <section className="mt-12 mb-16">
      <div className="surface-elevated rounded-[30px] p-10">
        <p className="label">
          EVIDENCE BREAKDOWN
        </p>

        <h2
          className="mt-3 text-4xl tracking-[-0.03em]"
          style={{
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          Why the AI reached this conclusion
        </h2>

        <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[var(--text-secondary)]">
          The seniority assessment is based on three dimensions
          extracted from your resume. Each dimension contributes
          to the overall calibration.
        </p>

        <div className="mt-10 space-y-8">
          {categories.map((category) => {
            const item = evidence[category.key];

            const percentage =
              (item.score / item.maxScore) * 100;

            return (
              <div
                key={category.key}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-soft)] p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div>
                    <h3 className="text-2xl font-semibold">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-[15px] leading-7 text-[var(--text-secondary)]">
                      {item.reasoning}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-center">
                    <p className="label">
                      SCORE
                    </p>

                    <h4 className="mt-2 text-2xl font-semibold">
                      {item.score}/{item.maxScore}
                    </h4>
                  </div>

                </div>

                {/* Progress */}

                <div className="mt-5">
                  <div className="h-2 overflow-hidden rounded-full bg-[var(--border)]">
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Evidence */}

                <div className="mt-6">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                    Supporting Evidence
                  </h4>

                  <ul className="mt-4 space-y-3">
                    {item.evidence.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />

                        <span className="leading-6">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EvidenceBreakdown;