type MatchResult = {
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: string[];
  extraSkills: string[];
};

type CalibrationResult = {
  level: string;
  confidence: number;
};

type Props = {
  matchResult: MatchResult;
  calibration: CalibrationResult;
};

const MatchOverview = ({
  matchResult,
  calibration,
}: Props) => {
  return (
    <section className="space-y-8">

      {/* Overall Match */}

      <div className="surface-elevated rounded-[30px] px-10 py-12 text-center">
        <p className="label">
          OVERALL MATCH
        </p>

        <h2
          className="mt-5 text-7xl tracking-[-0.05em]"
          style={{
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          {matchResult.matchPercentage}%
        </h2>

        <p className="mt-4 text-[16px] text-[var(--text-secondary)]">
          Resume compatibility with the supplied role.
        </p>
      </div>

      {/* Summary */}

      <div className="grid gap-6 lg:grid-cols-4">

        <div className="surface-elevated rounded-[26px] p-7">
          <p className="label">
            MATCHING SKILLS
          </p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.matchingSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Skills aligned with the job requirements.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-7">
          <p className="label">
            MISSING SKILLS
          </p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.missingSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Skills you should consider adding.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-7">
          <p className="label">
            EXTRA SKILLS
          </p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.extraSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Additional skills beyond this role.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-7">
          <p className="label">
            SENIORITY
          </p>

          <h3 className="mt-4 text-3xl font-semibold">
            {calibration.level}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {calibration.confidence}% confidence
          </p>
        </div>

      </div>

      {/* Skills Lists */}

      <div className="grid gap-6 lg:grid-cols-1">

        <div className="surface-elevated rounded-[26px] p-7">
          <h3 className="text-lg font-semibold">
            Matching Skills
          </h3>

          <div className="mt-5 flex flex-wrap gap-2">
            {matchResult.matchingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="surface-elevated rounded-[26px] p-7">
          <h3 className="text-lg font-semibold">
            Missing Skills
          </h3>

          <div className="mt-5 flex flex-wrap gap-2">
            {matchResult.missingSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="surface-elevated rounded-[26px] p-7">
          <h3 className="text-lg font-semibold">
            Extra Skills
          </h3>

          <div className="mt-5 flex flex-wrap gap-2">
            {matchResult.extraSkills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};

export default MatchOverview;