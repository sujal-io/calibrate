type RecommendationsData = {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendedProjects: string[];
};

type Props = {
  recommendations: RecommendationsData;
};

const Recommendations = ({ recommendations }: Props) => {
  return (
    <section className="mt-12">
      <div className="surface-elevated rounded-[30px] p-10">
        <p className="label">
          RECOMMENDATIONS
        </p>

        <h2
          className="mt-3 text-4xl tracking-[-0.03em]"
          style={{
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          How to strengthen your application
        </h2>

        <p className="mt-5 max-w-4xl text-[16px] leading-8 text-[var(--text-secondary)]">
          {recommendations.summary}
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-1">

          {/* Strengths */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Strengths
            </h3>

            <ul className="mt-5 space-y-4 lg:flex lg:flex-wrap lg:gap-3">
              {recommendations.strengths.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 lg:flex lg:items-center lg:gap-2 lg:rounded-full lg:border lg:border-[var(--border)] lg:bg-[var(--background)] lg:px-4 lg:py-2 lg:text-sm"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-green-500 lg:mt-0 lg:h-1.5 lg:w-1.5" />
                  <span className="leading-7 lg:leading-5">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Improvements
            </h3>

            <ul className="mt-5 space-y-4 lg:flex lg:flex-wrap lg:gap-3">
              {recommendations.improvements.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 lg:flex lg:items-center lg:gap-2 lg:rounded-full lg:border lg:border-[var(--border)] lg:bg-[var(--background)] lg:px-4 lg:py-2 lg:text-sm"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500 lg:mt-0 lg:h-1.5 lg:w-1.5" />
                  <span className="leading-7 lg:leading-5">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Projects */}

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
            <h3 className="text-lg font-semibold">
              Recommended Projects
            </h3>

            <ul className="mt-5 space-y-4 lg:flex lg:flex-wrap lg:gap-3">
              {recommendations.recommendedProjects.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 lg:flex lg:items-center lg:gap-2 lg:rounded-full lg:border lg:border-[var(--border)] lg:bg-[var(--background)] lg:px-4 lg:py-2 lg:text-sm"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500 lg:mt-0 lg:h-1.5 lg:w-1.5" />
                  <span className="leading-7 lg:leading-5">
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

export default Recommendations;