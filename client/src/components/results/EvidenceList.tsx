import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Copy, Loader2, Sparkles } from "lucide-react";

import { rewriteBullet } from "../../services/calibration";

type ResumeBullet = {
  bulletId: string;
  text: string;
  similarity: number;
};

type Props = {
  bullets: ResumeBullet[];
  structuredJobDescription: unknown;
};

type RewriteState = {
  loading: boolean;
  rewritten?: string;
};

const EvidenceList = ({
  bullets,
  structuredJobDescription,
}: Props) => {
  const { getToken } = useAuth();

  const [rewrites, setRewrites] = useState<
    Record<string, RewriteState>
  >({});

  const handleRewrite = async (
    bullet: ResumeBullet,
  ) => {
    try {
      setRewrites((prev) => ({
        ...prev,
        [bullet.bulletId]: {
          ...prev[bullet.bulletId],
          loading: true,
        },
      }));

      const token = await getToken();

      if (!token) {
        throw new Error("Unauthorized");
      }

      const response = await rewriteBullet(
        bullet.bulletId,
        structuredJobDescription,
        token,
      );

      setRewrites((prev) => ({
        ...prev,
        [bullet.bulletId]: {
          loading: false,
          rewritten: response.rewrittenBullet,
        },
      }));
    } catch (error) {
      console.error(error);

      setRewrites((prev) => ({
        ...prev,
        [bullet.bulletId]: {
          ...prev[bullet.bulletId],
          loading: false,
        },
      }));
    }
  };

  const copyToClipboard = async (
    text: string,
  ) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <section className="mt-12">
      <div className="surface-elevated rounded-[30px] p-10">
        <p className="label">
          RETRIEVED EVIDENCE
        </p>

        <h2
          className="mt-3 text-4xl tracking-[-0.03em]"
          style={{
            fontFamily:
              '"DM Serif Display", serif',
          }}
        >
          Resume evidence used for calibration
        </h2>

        <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[var(--text-secondary)]">
          These resume bullets were selected because
          they best matched the supplied job
          description.
        </p>

        <div className="mt-10 space-y-6">
          {bullets.map((bullet, index) => {
            const rewrite =
              rewrites[bullet.bulletId];

            return (
              <div
                key={bullet.bulletId}
                className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] p-7"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="label">
                      Evidence #{index + 1}
                    </p>

                    <p className="mt-2 text-sm text-[var(--text-secondary)]">
                      Similarity Score
                    </p>
                  </div>

                  <div className="rounded-full border border-[var(--border)] px-4 py-2 font-medium">
                    {(bullet.similarity * 100).toFixed(
                      0,
                    )}
                    %
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-[var(--border)]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${bullet.similarity * 100}%`,
                      background:
                        "var(--accent)",
                    }}
                  />
                </div>

                <div className="mt-8">
                  <p className="label">
                    ORIGINAL BULLET
                  </p>

                  <div className="mt-3 rounded-2xl bg-white p-6">
                    <p className="leading-8">
                      {bullet.text}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() =>
                      handleRewrite(bullet)
                    }
                    disabled={rewrite?.loading}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                    style={{
                      background:
                        "var(--text)",
                    }}
                  >
                    {rewrite?.loading ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />
                        Rewriting...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Rewrite with AI
                      </>
                    )}
                  </button>
                </div>
                                {rewrite?.rewritten && (
                  <div className="mt-8 rounded-3xl border border-[var(--border)] bg-white p-7">
                    <div className="flex items-center gap-2">
                      <Sparkles
                        size={18}
                        style={{
                          color: "var(--accent)",
                        }}
                      />

                      <h3 className="text-lg font-semibold">
                        AI Rewrite
                      </h3>
                    </div>

                    <div className="mt-5 rounded-2xl bg-[var(--surface-soft)] p-6">
                      <p className="leading-8">
                        {rewrite.rewritten}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          copyToClipboard(
                            rewrite.rewritten!,
                          )
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-3 font-medium transition hover:bg-[var(--surface-soft)]"
                      >
                        <Copy size={18} />
                        Copy
                      </button>

                      <button
                        onClick={() =>
                          handleRewrite(bullet)
                        }
                        disabled={rewrite.loading}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                        style={{
                          background:
                            "var(--text)",
                        }}
                      >
                        {rewrite.loading ? (
                          <>
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                            Regenerating...
                          </>
                        ) : (
                          <>
                            <Sparkles size={18} />
                            Regenerate
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EvidenceList;