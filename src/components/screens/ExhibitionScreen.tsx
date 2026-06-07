import { Check } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";
import myeongpumImg from "@/assets/exhibit-myeongpum.png.asset.json";
import koreanImg from "@/assets/exhibit-korean.png.asset.json";

const EXHIBITS = [
  {
    id: "myeongpum30",
    title: "명품 30선",
    subtitle: "Top 30 Treasures",
    blurb: "고려청자 · 금동대향로 · 반가사유상 등 국보급 30점",
    tags: ["국보", "도자기", "불교 조각"],
    image: myeongpumImg.url,
  },
  {
    id: "korean24",
    title: "한국 문화의 독창성 24선",
    subtitle: "Uniquely Korean · 24 works",
    blurb: "한글 · 백자 · 민속 조각으로 보는 한국만의 시선",
    tags: ["민속", "한글", "회화"],
    image: koreanImg.url,
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
              <div className="bg-[oklch(0.96_0.01_85)]">
                <img src={e.image} alt={e.title} className="w-full aspect-[16/9] object-contain bg-[oklch(0.96_0.01_85)]" />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-lg font-black text-foreground">{e.title}</div>
                      <div className="text-xs text-foreground/60 font-medium">{e.subtitle}</div>
                    </div>
                    {active && (
                      <div className="size-7 rounded-full bg-primary grid place-items-center shrink-0">
                        <Check className="size-4 text-primary-foreground" />
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-foreground/80 leading-relaxed">{e.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span key={t} className="text-xs font-semibold bg-muted rounded-full px-2.5 py-1">
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
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </ScreenShell>
  );
}