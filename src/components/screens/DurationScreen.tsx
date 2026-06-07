import { ScreenShell, NavRow, NextHint } from "./_shared";

const OPTIONS = [
  { id: "30", label: "30 분", shade: 0 },
  { id: "60", label: "1 시간", shade: 1 },
  { id: "120", label: "2 시간", shade: 2 },
  { id: "120+", label: "2 시간 +", shade: 3, recommended: true },
];

const SHADES = [
  "oklch(0.78 0.09 142)",
  "oklch(0.66 0.12 142)",
  "oklch(0.55 0.13 142)",
  "oklch(0.42 0.12 142)",
];
const SELECTED = "oklch(0.30 0.10 142)";

export function DurationScreen({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: string | null;
  onChange: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <ScreenShell step={1} total={4}>
      <h1 className="text-3xl font-black leading-tight">
        관람 시간을<br />선택해주세요
      </h1>
      <div className="mt-8 flex flex-col gap-4">
        {OPTIONS.map((o) => {
          const active = value === o.id;
          const bg = active ? SELECTED : SHADES[o.shade];
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className="w-full rounded-full py-5 text-center text-2xl font-bold text-[oklch(0.97_0.01_85)] transition active:scale-[0.98] relative"
              style={{ backgroundColor: bg, boxShadow: active ? "0 8px 24px -8px oklch(0.30 0.10 142 / 0.5)" : "none" }}
            >
              {o.label}
              {o.recommended && (
                <span className="absolute -top-2 right-4 rounded-full bg-accent text-foreground text-xs font-bold px-2.5 py-1 shadow">
                  추천
                </span>
              )}
            </button>
          );
        })}
      </div>
      <NextHint text="관심 있는 전시 주제를 골라요" />
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </ScreenShell>
  );
}