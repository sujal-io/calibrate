type Props = {
  value: string;
  onChange: (value: string) => void;
};

const JobDescriptionInput = ({
  value,
  onChange,
}: Props) => {
  const words =
    value.trim().length === 0
      ? 0
      : value.trim().split(/\s+/).length;

  return (
    <div className="surface-elevated flex h-full flex-col rounded-[28px]">
      {/* Header */}

      <div className="border-b border-[var(--border)] px-7 py-4">
        <p className="label">JOB DESCRIPTION</p>

        <h2 className="mt-2 text-2xl font-semibold">
          Paste Job Description
        </h2>

        <p className="mt-1text-sm leading-6 text-[var(--text-secondary)]">
          Paste the complete job description to compare your
          resume against the required skills and
          responsibilities.
        </p>
      </div>

      {/* Body */}

      <div className="flex flex-1 flex-col p-6">

        <textarea
          
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste the complete job description here..."
          className="
            min-h-[200px]
            flex-1
            resize-none
            rounded-2xl
            border
            border-[var(--border)]
            bg-[var(--surface-soft)]
            p-5
            text-[15px]
            leading-7
            outline-none
            transition
            placeholder:text-[var(--text-secondary)]
            focus:border-[var(--accent)]
          "
        />

        <div className="mt-5 flex items-center justify-between">

          <span className="text-sm text-[var(--text-secondary)]">
            {words} words
          </span>

          <div className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
            Paste complete JD
          </div>

        </div>

      </div>
    </div>
  );
};

export default JobDescriptionInput;