import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ScreenShell({
  children,
  step,
  total,
}: {
  children: ReactNode;
  step?: number;
  total?: number;
}) {
  return (
    <div className="flex flex-col h-full px-7 py-8">
      {typeof step === "number" && typeof total === "number" && (
        <div className="flex gap-2 mb-8 justify-center">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === step
                  ? "w-10 bg-foreground"
                  : i < step
                  ? "w-6 bg-foreground/60"
                  : "w-6 bg-foreground/15"
              }`}
            />
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

export function NavRow({
  onBack,
  onNext,
  nextDisabled,
  nextLabel = "다음",
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
  nextLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3 pt-6">
      {onBack ? (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-full bg-muted px-6 py-4 text-lg font-semibold text-foreground/70 active:scale-[0.98] transition"
        >
          <ArrowLeft className="size-5" /> 뒤로
        </button>
      ) : (
        <span />
      )}
      {onNext && (
        <button
          onClick={onNext}
          disabled={nextDisabled}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 disabled:opacity-40 disabled:shadow-none active:scale-[0.98] transition"
        >
          {nextLabel} <ArrowRight className="size-5" />
        </button>
      )}
    </div>
  );
}

export function NextHint({ text }: { text: string }) {
  return (
    <div className="mt-4 rounded-2xl bg-accent/40 border border-accent px-4 py-3 text-base text-foreground/80 flex gap-2 items-start">
      <span className="mt-0.5">👉</span>
      <span><b>다음 단계:</b> {text}</span>
    </div>
  );
}