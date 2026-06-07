import { Armchair, Volume2, VolumeX } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";

export function RouteReadyScreen({
  exhibition,
  voiceGuide,
  onToggleVoice,
  onBack,
  onNext,
}: {
  exhibition: string;
  voiceGuide: boolean;
  onToggleVoice: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const label = exhibition === "korean24" ? "한국 문화의 독창성 24선" : "명품 30선";
  return (
    <ScreenShell step={3} total={4}>
      <h1 className="text-3xl font-black text-center leading-tight">
        경로가<br />준비되었어요!
      </h1>
      <div className="mt-3 text-center text-lg font-semibold text-primary-deep">{label}</div>

      <div className="mt-5 rounded-3xl bg-muted p-4 relative aspect-[4/3]">
        <svg viewBox="0 0 300 220" className="w-full h-full">
          <rect x="0" y="0" width="300" height="220" fill="oklch(0.95 0.01 85)" rx="14" />
          {[
            [20, 20, 80, 60],
            [110, 20, 90, 60],
            [210, 20, 70, 60],
            [20, 100, 80, 50],
            [110, 100, 90, 50],
            [210, 100, 70, 50],
            [20, 165, 130, 40],
            [160, 165, 120, 40],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} fill="oklch(0.88 0.02 85)" rx="4" />
          ))}
          <path
            d="M250 30 Q230 90 170 100 T70 130 L70 190"
            stroke="oklch(0.55 0.15 142)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="250" cy="30" r="10" fill="oklch(0.85 0.15 85)" stroke="white" strokeWidth="3" />
          <g transform="translate(165 95)">
            <circle r="13" fill="oklch(0.72 0.15 350)" />
            <text textAnchor="middle" dy="5" fontSize="14">🪑</text>
          </g>
          <g transform="translate(70 185)">
            <circle r="13" fill="oklch(0.72 0.15 350)" />
            <text textAnchor="middle" dy="5" fontSize="14">🪑</text>
          </g>
          <g transform="translate(40 40)">
            <circle r="13" fill="oklch(0.7 0.15 230)" />
            <text textAnchor="middle" dy="5" fontSize="12" fill="white">WC</text>
          </g>
        </svg>
        <div className="absolute top-2 right-3 text-xs font-semibold text-foreground/70 bg-background/80 rounded-full px-2 py-1">
          현재 위치 📍
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Pill emoji="🟢" label="초록 경로" />
        <Pill emoji="🪑" label="휴식 2곳" />
        <Pill emoji="🚻" label="화장실 1곳" />
      </div>

      <button
        onClick={() => onToggleVoice(!voiceGuide)}
        className={`mt-4 w-full rounded-2xl px-5 py-4 flex items-center justify-between border-2 transition ${
          voiceGuide ? "border-primary bg-primary/5" : "border-border bg-card"
        }`}
      >
        <span className="flex items-center gap-3">
          {voiceGuide ? <Volume2 className="size-6 text-primary" /> : <VolumeX className="size-6 text-muted-foreground" />}
          <span className="text-left">
            <div className="text-lg font-bold">음성 안내</div>
            <div className="text-sm text-muted-foreground">작품 앞에서 자동 재생</div>
          </span>
        </span>
        <span className={`relative h-7 w-12 rounded-full transition ${voiceGuide ? "bg-primary" : "bg-muted-foreground/30"}`}>
          <span className={`absolute top-0.5 size-6 rounded-full bg-white shadow transition ${voiceGuide ? "left-5" : "left-0.5"}`} />
        </span>
      </button>

      <div className="mt-4 rounded-2xl bg-accent/40 border border-accent px-4 py-3 text-base flex gap-2 items-start">
        <Armchair className="size-5 mt-0.5" />
        <span>경로 중간 <b>휴식 좌석 2곳</b>이 포함되어 있어요. 언제든 쉬어 가세요.</span>
      </div>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextLabel="시작 안내 보기" />
      </div>
    </ScreenShell>
  );
}

function Pill({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="rounded-full bg-muted py-2 text-sm font-semibold">
      <span className="mr-1">{emoji}</span>
      {label}
    </div>
  );
}