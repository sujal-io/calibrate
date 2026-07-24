import { useRef } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";

type Props = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const ResumeUpload = ({ file, setFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File | null) => {
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF resume.");
      return;
    }

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
            onClick={() => inputRef.current?.click()}
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
            "
          >
            <div className="flex flex-col items-center text-center">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                <Upload
                  size={24}
                  className="text-[var(--accent)]"
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
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <div className="flex items-center gap-2">
                    <FileText
                      size={18}
                      className="text-[var(--accent)]"
                    />

                    <p className="truncate font-medium">
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
              onClick={() => inputRef.current?.click()}
              className="secondary-btn w-full justify-center"
            >
              <RefreshCcw size={16} />

              Replace Resume
            </button>

          </div>
        )}

        <input
          ref={inputRef}
          hidden
          type="file"
          accept=".pdf"
          onChange={(e) =>
            handleFile(e.target.files?.[0] ?? null)
          }
        />

      </div>
    </div>
  );
};

export default ResumeUpload;