type CalibrationResult = {
  level: string;
  confidence: number;
  strengths: string[];
  gaps: string[];
  nextLevelSuggestions: string[];
  statedRole: string;
  comparison: string;
};

type Props = {
  result: CalibrationResult;
};

type ListProps = {
  title: string;
  items: string[];
  dotColor: string;
  emptyMessage: string;
};

const BulletList = ({ title, items, dotColor, emptyMessage }: ListProps) => (
  <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-6">
    <h3 className="text-lg font-semibold">{title}</h3>

    {items.length === 0 ? (
      <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">
        {emptyMessage}
      </p>
    ) : (
      <ul className="mt-5 space-y-4 lg:flex lg:flex-wrap lg:gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 lg:flex lg:items-center lg:gap-2 lg:rounded-full lg:border lg:border-[var(--border)] lg:bg-[var(--background)] lg:px-4 lg:py-2 lg:text-sm"
          >
            <span
              className={`mt-2 h-2 w-2 shrink-0 rounded-full lg:mt-0 lg:h-1.5 lg:w-1.5 ${dotColor}`}
              aria-hidden="true"
            />
            <span className="leading-7 lg:leading-5 break-words">{item}</span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const SeniorityCard = ({ result }: Props) => {
  return (
    <section className="mt-12">
      <div className="surface-elevated rounded-[30px] p-6 sm:p-10">
        <p className="label">SENIORITY ASSESSMENT</p>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2
              className="text-3xl sm:text-4xl tracking-[-0.03em]"
              style={{
                fontFamily: '"DM Serif Display", serif',
              }}
            >
              {result.level}
            </h2>

            <p className="mt-3 max-w-2xl text-[16px] leading-8 text-[var(--text-secondary)]">
              Based on your resume evidence, the AI estimates your current
              experience level with the following confidence.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] px-6 py-6 text-center sm:max-w-56">
              <p className="label">STATED ROLE</p>

              <h3 className="mt-3 text-xl font-semibold leading-7 break-words">
                {result.statedRole}
              </h3>
            </div>

            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] px-8 py-6 text-center shrink-0">
              <p className="label">CONFIDENCE</p>

              <h3 className="mt-3 text-5xl font-semibold">
                {result.confidence}%
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">
          <p className="label">TITLE AND EVIDENCE</p>
          <p className="mt-2 text-[16px] leading-7 text-[var(--text-secondary)]">
            {result.comparison}
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          <BulletList
            title="Strengths"
            items={result.strengths}
            dotColor="bg-green-500"
            emptyMessage="No strengths identified."
          />
          <BulletList
            title="Gaps"
            items={result.gaps}
            dotColor="bg-red-500"
            emptyMessage="No gaps identified."
          />
          <BulletList
            title="Next Level Suggestions"
            items={result.nextLevelSuggestions}
            dotColor="bg-[var(--accent)]"
            emptyMessage="No next-level suggestions at this time."
          />
        </div>
      </div>
    </section>
  );
};

export default SeniorityCard;
