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

const BottomNav = ({ activeSection, onSectionChange }: Props) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)] px-4 py-3 lg:hidden">
      <div className="flex gap-2 overflow-x-auto">
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
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "bg-[var(--accent)] text-black"
                  : "bg-[var(--surface-soft)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
