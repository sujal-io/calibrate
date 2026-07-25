type RecommendationsData = {
  summary: string;
  strengths: string[];
  improvements: string[];
  recommendedProjects: string[];
};

type Props = {
  recommendations: RecommendationsData;
};

type BulletListProps = {
  title: string;
  items: string[];
  dotColor: string;
  emptyMessage: string;
};

const BulletList = ({ title, items, dotColor, emptyMessage }: BulletListProps) => (
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

const Recommendations = ({ recommendations }: Props) => {
  return (
    <section className="mt-12">
      <div className="surface-elevated rounded-[30px] p-6 sm:p-10">
        <p className="label">RECOMMENDATIONS</p>

        <h2
          className="mt-3 text-3xl sm:text-4xl tracking-[-0.03em"
          style={{
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          How to strengthen your application
        </h2>

        <p className="mt-5 max-w-4xl text-[16px] leading-8 text-[var(--text-secondary)]">
          {recommendations.summary}
        </p>

        <div className="mt-10 grid gap-6">
          <BulletList
            title="Strengths"
            items={recommendations.strengths}
            dotColor="bg-green-500"
            emptyMessage="No strengths identified yet."
          />
          <BulletList
            title="Improvements"
            items={recommendations.improvements}
            dotColor="bg-amber-500"
            emptyMessage="No improvements identified."
          />
          <BulletList
            title="Recommended Projects"
            items={recommendations.recommendedProjects}
            dotColor="bg-blue-500"
            emptyMessage="No project recommendations at this time."
          />
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
