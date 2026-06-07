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
        <div className="mb-6 text-center text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          Step {step + 1} of {total}
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
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary-deep border-2 border-primary/30 px-6 py-4 text-lg font-semibold active:scale-[0.98] transition"
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
    <div className="mt-4 rounded-2xl bg-accent/40 border border-accent px-4 py-3 text-base text-foreground/80">
      <b>다음 단계:</b> {text}
    </div>
  );
}