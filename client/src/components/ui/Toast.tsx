import {
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import clsx from "clsx";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
};

export type ShowToastInput = {
  message: string;
  type?: ToastType;
  duration?: number;
};

export type ToastContextValue = {
  show: (input: ShowToastInput) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 4000;

const toastStyles: Record<ToastType, { bg: string; icon: typeof CheckCircle2; iconColor: string }> = {
  success: {
    bg: "bg-[var(--success-soft)]",
    icon: CheckCircle2,
    iconColor: "text-[var(--success)]",
  },
  error: {
    bg: "bg-red-50",
    icon: AlertCircle,
    iconColor: "text-[var(--danger)]",
  },
  info: {
    bg: "bg-[var(--accent-soft)]",
    icon: Info,
    iconColor: "text-[var(--accent)]",
  },
  warning: {
    bg: "bg-amber-50",
    icon: AlertTriangle,
    iconColor: "text-[var(--warning)]",
  },
};

export { ToastContext, DEFAULT_DURATION };

export function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    ({ message, type = "info", duration = DEFAULT_DURATION }: ShowToastInput) => {
      const id = Math.random().toString(36).slice(2, 10);

      setToasts((prev) => [...prev, { id, message, type, duration }]);

      if (duration > 0) {
        window.setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
      }

      return id;
    },
    [],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 left-4 right-4 z-[100] flex flex-col items-stretch gap-3 sm:bottom-6 sm:left-auto sm:right-6 sm:items-end sm:max-w-sm"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => {
            const styles = toastStyles[toast.type];
            const Icon = styles.icon;

            return (
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 16, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 32, transition: { duration: 0.15 } }}
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
                className={clsx(
                  "pointer-events-auto w-full flex items-start gap-3 rounded-2xl border border-[var(--border)] p-4 pr-3 shadow-lg",
                  styles.bg,
                )}
                role={toast.type === "error" || toast.type === "warning" ? "alert" : "status"}
              >
                <Icon
                  size={20}
                  className={clsx("mt-0.5 shrink-0", styles.iconColor)}
                  aria-hidden="true"
                />

                <p className="flex-1 text-sm leading-6 text-[var(--text)]">
                  {toast.message}
                </p>

                <button
                  type="button"
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 rounded-full p-1 text-[var(--text-secondary)] transition hover:bg-black/5 hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                  aria-label="Dismiss notification"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
