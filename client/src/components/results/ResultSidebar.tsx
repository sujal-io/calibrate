type Props = {
  activeSection: string;
  onSectionChange: (section: string) => void;
};

const sections = [
  {
    id: "overview",
    label: "Overview",
  },
  {
    id: "recommendations",
    label: "Recommendations",
  },
  {
    id: "evidence",
    label: "Evidence",
  },
  {
    id: "seniority",
    label: "Seniority",
  },
  {
    id: "breakdown",
    label: "Breakdown",
  },
];

const ResultsSidebar = ({ activeSection, onSectionChange }: Props) => {
  return (
    <aside className="sticky top-28 hidden h-fit lg:block">
      <div className="surface-elevated w-[250px] rounded-[28px] p-7">
        <p className="label">CALIBRATION REPORT</p>

        <h2
          className="mt-3 text-2xl tracking-[-0.03em]"
          style={{
            fontFamily: '"DM Serif Display", serif',
          }}
        >
          Sections
        </h2>

        <div className="divider my-7" />

        <nav className="space-y-2">
          {sections.map((section) => {
            const active = activeSection === section.id;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => {
                  onSectionChange(section.id);

                  document.getElementById(section.id)?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-200 ${
                  active
                    ? "bg-[var(--accent-soft)]"
                    : "hover:bg-[var(--surface-soft)]"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    active ? "bg-[var(--accent)]" : "bg-[var(--border-strong)]"
                  }`}
                />

                <span
                  className={`font-medium transition-colors ${
                    active
                      ? "text-[var(--text)]"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {section.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="divider my-7" />

        <p className="text-sm leading-7 text-[var(--text-secondary)]">
          Navigate through each section of your calibration report without
          endless scrolling.
        </p>
      </div>
    </aside>
  );
};

export default ResultsSidebar;
