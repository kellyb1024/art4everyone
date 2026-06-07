import { Armchair, Clock } from "lucide-react";
import { ScreenShell, NavRow, NextHint } from "./_shared";

const OPTIONS = [
  { id: "30", label: "30 분", note: "핵심 3작품 · 좌석 1회", seats: 1 },
  { id: "60", label: "1 시간", note: "추천 6작품 · 좌석 2회", seats: 2 },
  { id: "120", label: "2 시간", note: "여유롭게 · 좌석 4회", seats: 4 },
  { id: "120+", label: "2 시간 이상", note: "전체 코스 · 좌석 6회+", seats: 6 },
];

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
        얼마나 머무실<br />계획인가요?
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        시간에 맞춰 <b className="text-foreground">앉아 쉴 자리</b>도 함께 추천해 드려요.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        {OPTIONS.map((o) => {
          const active = value === o.id;
          return (
            <button
              key={o.id}
              onClick={() => onChange(o.id)}
              className={`w-full rounded-2xl px-5 py-5 text-left transition border-2 ${
                active
                  ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/30"
                  : "bg-card border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="size-6" />
                  <span className="text-2xl font-bold">{o.label}</span>
                </div>
                <span className={`inline-flex items-center gap-1 text-sm font-semibold ${active ? "text-primary-foreground/90" : "text-primary-deep"}`}>
                  <Armchair className="size-4" /> ×{o.seats}
                </span>
              </div>
              <div className={`mt-1.5 text-base ${active ? "text-primary-foreground/85" : "text-muted-foreground"}`}>
                {o.note}
              </div>
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