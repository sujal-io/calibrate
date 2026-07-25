import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  RefreshCcw,
  AlertCircle,
} from "lucide-react";
import { useToast } from "../hooks/useToast";

type Props = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const ResumeUpload = ({ file, setFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [formatError, setFormatError] = useState<string | null>(null);
  const { show } = useToast();

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      const message = "Please upload a PDF resume.";
      setFormatError(message);
      show({ message, type: "warning" });
      return;
    }

    setFormatError(null);
    setFile(selectedFile);
  };

  return (
    <div className="surface-elevated h-fit rounded-[28px]">
      {/* Header */}

      <div className="border-b border-[var(--border)] px-6 py-4">
        <p className="label">RESUME</p>

        <h2 className="mt-2 text-xl font-semibold">
          Upload Resume
        </h2>

        <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">
          Upload your latest resume in PDF format.
        </p>
      </div>

      {/* Body */}

      <div className="p-5">

        {!file ? (
          <div
            role="button"
            tabIndex={0}
            aria-label="Upload resume PDF. Drag and drop or click to browse."
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              handleFile(e.dataTransfer.files[0]);
            }}
            className="
              cursor-pointer
              rounded-2xl
              border-2
              border-dashed
              border-[var(--border)]
              bg-[var(--surface-soft)]
              p-7
              transition
              hover:border-[var(--accent)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--accent)]
              focus-visible:ring-offset-2
            "
          >
            <div className="flex flex-col items-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                <Upload
                  size={24}
                  className="text-[var(--accent)]"
                  aria-hidden="true"
                />
              </div>

              <h3 className="mt-4 font-semibold">
                Drop PDF here
              </h3>

              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                Drag & drop or click to browse
              </p>

              <button
                type="button"
                className="secondary-btn mt-4"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                tabIndex={-1}
              >
                Choose File
              </button>

            </div>
          </div>
        ) : (
          <div className="space-y-5">

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-5">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--success-soft)]">
                  <CheckCircle2
                    size={22}
                    className="text-[var(--success)]"
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">
                    <FileText
                      size={18}
                      className="text-[var(--accent)] shrink-0"
                      aria-hidden="true"
                    />

                    <p className="truncate font-medium" title={file.name}>
                      {file.name}
                    </p>
                  </div>

                  <p className="mt-2 text-sm text-[var(--text-secondary)]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                </div>

              </div>

            </div>

            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="secondary-btn w-full justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
            >
              <RefreshCcw size={16} aria-hidden="true" />

              Replace Resume
            </button>

          </div>
        )}

        {formatError && (
          <div
            role="alert"
            className="mt-4 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4"
          >
            <AlertCircle
              size={18}
              className="mt-0.5 shrink-0 text-[var(--danger)]"
              aria-hidden="true"
            />
            <p className="text-sm leading-6 text-[var(--danger)]">
              {formatError}
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf,application/pdf"
          aria-label="Upload resume PDF file"
          onChange={(e) =>
            handleFile(e.target.files?.[0] ?? null)
          }
        />

      </div>
    </div>
  );
};

export default ResumeUpload;