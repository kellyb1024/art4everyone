import { Check } from "lucide-react";
import { ScreenShell, NavRow, NextHint } from "./_shared";

const EXHIBITS = [
  {
    id: "myeongpum30",
    title: "명품 30선",
    subtitle: "Top 30 Treasures",
    blurb: "고려청자 · 금동대향로 · 반가사유상 등 국보급 30점",
    tags: ["국보", "도자기", "불교 조각"],
    emoji: "🏺",
    color: "oklch(0.94 0.05 230)",
  },
  {
    id: "korean24",
    title: "한국 문화의 독창성 24선",
    subtitle: "Uniquely Korean · 24 works",
    blurb: "한글 · 백자 · 민속 조각으로 보는 한국만의 시선",
    tags: ["민속", "한글", "회화"],
    emoji: "📜",
    color: "oklch(0.93 0.06 95)",
  },
];

export function ExhibitionScreen({
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
    <ScreenShell step={2} total={4}>
      <h1 className="text-3xl font-black leading-tight">
        관심 있는<br />전시를 골라 주세요
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        무엇을 보게 될지 <b className="text-foreground">미리 확인</b>할 수 있어요.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {EXHIBITS.map((e) => {
          const active = value === e.id;
          return (
            <button
              key={e.id}
              onClick={() => onChange(e.id)}
              className={`w-full text-left rounded-3xl overflow-hidden border-2 transition ${
                active ? "border-primary shadow-xl shadow-primary/20" : "border-border"
              }`}
            >
              <div className="p-5 flex items-start gap-4" style={{ background: e.color }}>
                <div className="text-5xl">{e.emoji}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xl font-black text-foreground">{e.title}</div>
                      <div className="text-sm text-foreground/60 font-medium">{e.subtitle}</div>
                    </div>
                    {active && (
                      <div className="size-7 rounded-full bg-primary grid place-items-center shrink-0">
                        <Check className="size-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-[15px] text-foreground/80 leading-relaxed">{e.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="text-xs font-semibold bg-background/60 rounded-full px-2.5 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <NextHint text="가장 편한 동선을 만들어 드려요" />
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </ScreenShell>
  );
}