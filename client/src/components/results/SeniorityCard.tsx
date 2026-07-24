type CalibrationResult = {
  level: string;
  confidence: number;
  strengths: string[];
  gaps: string[];
  nextLevelSuggestions: string[];
};

type Props = {
  result: CalibrationResult;
};

const SeniorityCard = ({ result }: Props) => {
  return (
    <section className="mt-12">
      <div className="surface-elevated rounded-[30px] p-10">
        <p className="label">
          SENIORITY ASSESSMENT
        </p>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              className="text-4xl tracking-[-0.03em]"
              style={{
                fontFamily: '"DM Serif Display", serif',
              }}
            >
              {result.level}
            </h2>

            <p className="mt-3 max-w-2xl text-[16px] leading-8 text-[var(--text-secondary)]">
              Based on your resume evidence and the supplied job
              description, the AI estimates your current experience
              level with the following confidence.
            </p>
          </div>

          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] px-8 py-6 text-center">
            <p className="label">
              CONFIDENCE
            </p>

            <h3 className="mt-3 text-5xl font-semibold">
              {result.confidence}%
            </h3>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">

          {/* Strengths */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Strengths
            </h3>

            <ul className="mt-5 space-y-4">
              {result.strengths.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-green-500" />

                  <span className="leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Gaps */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Gaps
            </h3>

            <ul className="mt-5 space-y-4">
              {result.gaps.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-red-500" />

                  <span className="leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Level */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Next Level Suggestions
            </h3>

            <ul className="mt-5 space-y-4">
              {result.nextLevelSuggestions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3"
                >
                  <span className="mt-2 h-2 w-2 rounded-full bg-[var(--accent)]" />

                  <span className="leading-7">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeniorityCard;