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

const SkillPill = ({ skill }: { skill: string }) => (
  <span
    key={skill}
    className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-sm break-words"
  >
    {skill}
  </span>
);

const SkillGroup = ({
  title,
  skills,
  emptyMessage,
}: {
  title: string;
  skills: string[];
  emptyMessage: string;
}) => (
  <div className="surface-elevated rounded-[26px] p-6 sm:p-7">
    <h3 className="text-lg font-semibold">{title}</h3>

    <div className="mt-5">
      {skills.length === 0 ? (
        <p className="text-sm leading-6 text-[var(--text-secondary)]">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <SkillPill key={skill} skill={skill} />
          ))}
        </div>
      )}
    </div>
  </div>
);

const MatchOverview = ({
  matchResult,
  calibration,
}: Props) => {
  return (
    <section className="space-y-8">
      <div className="surface-elevated rounded-[30px] px-6 sm:px-10 py-10 sm:py-12 text-center">
        <p className="label">OVERALL MATCH</p>

        <h2
          className="mt-5 text-6xl sm:text-7xl tracking-[-0.05em]"
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="surface-elevated rounded-[26px] p-6 sm:p-7">
          <p className="label">MATCHING SKILLS</p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.matchingSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Skills aligned with the job requirements.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-6 sm:p-7">
          <p className="label">MISSING SKILLS</p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.missingSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Skills you should consider adding.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-6 sm:p-7">
          <p className="label">EXTRA SKILLS</p>

          <h3 className="mt-4 text-4xl font-semibold">
            {matchResult.extraSkills.length}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            Additional skills beyond this role.
          </p>
        </div>

        <div className="surface-elevated rounded-[26px] p-6 sm:p-7">
          <p className="label">SENIORITY</p>

          <h3 className="mt-4 text-2xl sm:text-3xl font-semibold break-words">
            {calibration.level}
          </h3>

          <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
            {calibration.confidence}% confidence
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <SkillGroup
          title="Matching Skills"
          skills={matchResult.matchingSkills}
          emptyMessage="No matching skills found yet."
        />
        <SkillGroup
          title="Missing Skills"
          skills={matchResult.missingSkills}
          emptyMessage="No missing skills detected. Nice work!"
        />
        <SkillGroup
          title="Extra Skills"
          skills={matchResult.extraSkills}
          emptyMessage="No extra skills detected."
        />
      </div>
    </section>
  );
};

export default MatchOverview;
