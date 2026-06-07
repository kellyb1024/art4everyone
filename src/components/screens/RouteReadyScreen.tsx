import { Armchair, Volume2, VolumeX } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";
import mapImg from "@/assets/map.png.asset.json";

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
    <ScreenShell step={4} total={5}>
      <h1 className="text-3xl font-black text-center leading-tight">
        경로가<br />준비되었어요!
      </h1>
      <div className="mt-3 text-center text-lg font-semibold text-primary-deep">{label}</div>

      <div className="mt-5 rounded-3xl bg-background relative">
        <img src={mapImg.url} alt="박물관 경로 지도" className="w-full h-auto object-contain block" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Pill label="초록 경로" color="oklch(0.55 0.15 142)" />
        <Pill label="휴식 2곳" color="oklch(0.72 0.15 350)" />
        <Pill label="화장실 1곳" color="oklch(0.7 0.15 230)" />
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

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <div className="rounded-full bg-muted py-2 text-sm font-semibold inline-flex items-center justify-center gap-1.5">
      <span className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
      {label}
    </div>
  );
}