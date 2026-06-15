import type { ReactNode } from "react";
import { Armchair, Volume2, VolumeX, Clock, MapPin } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";
import type { Recommendation } from "./recommend";
import { TIER_LABEL } from "./recommend";
import { CourseMap } from "./CourseMap";

const DURATION_LABEL: Record<string, string> = {
  "30": "30분",
  "60": "1시간",
  "120": "2시간",
  "120+": "2시간 이상",
};

export function RouteReadyScreen({
  exhibitTitle,
  recommendation,
  duration,
  voiceGuide,
  onToggleVoice,
  onBack,
  onNext,
}: {
  exhibitTitle: string;
  recommendation: Recommendation;
  duration: string | null;
  voiceGuide: boolean;
  onToggleVoice: (v: boolean) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { route, count, minutes, total } = recommendation;
  const durationLabel = duration ? (DURATION_LABEL[duration] ?? duration) : null;

  if (count === 0) {
    return (
      <ScreenShell step={4} total={5}>
        <h1 className="text-3xl font-black text-center leading-tight">
          이 전시는<br />작품 안내 준비 중이에요
        </h1>
        <p className="mt-4 text-center text-base text-muted-foreground leading-relaxed">
          곧 작품별 추천 동선을 제공할 예정이에요.<br />다른 전시를 선택해 주세요.
        </p>
        <div className="mt-auto">
          <NavRow onBack={onBack} />
        </div>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell step={4} total={5}>
      <h1 className="text-3xl font-black text-center leading-tight">
        경로가<br />준비되었어요!
      </h1>
      <div className="mt-3 text-center text-lg font-semibold text-primary-deep">{exhibitTitle}</div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat icon={<MapPin className="size-5" />} value={`작품 ${count}점`} sub={`전체 ${total}점 중`} />
        <Stat
          icon={<Clock className="size-5" />}
          value={`약 ${minutes}분`}
          sub={durationLabel ? `${durationLabel} 코스` : "추천 코스"}
        />
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold text-muted-foreground mb-2">코스 지도</div>
        <CourseMap route={route} />
      </div>

      <div className="mt-4">
        <div className="text-sm font-bold text-muted-foreground mb-2">관람 순서</div>
        <ol className="flex flex-col gap-2">
          {route.map((a, i) => (
            <li key={a.id} className="flex items-center gap-3 rounded-2xl bg-card border border-border px-3 py-2.5">
              <span className="shrink-0 size-7 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-bold">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-[15px] truncate">{a.title}</span>
                <span className="block text-xs text-muted-foreground truncate">{a.place}</span>
              </span>
              {a.treasure && (
                <span className="shrink-0 rounded-full bg-accent text-foreground text-[11px] font-bold px-2 py-0.5">
                  {a.treasure}
                </span>
              )}
              <span className="shrink-0 text-[11px] font-semibold text-primary-deep">{TIER_LABEL[a.tier]}</span>
            </li>
          ))}
        </ol>
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
        <span>경로 중간 <b>휴식 좌석</b>이 포함되어 있어요. 언제든 쉬어 가세요.</span>
      </div>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextLabel="시작 안내 보기" />
      </div>
    </ScreenShell>
  );
}

function Stat({ icon, value, sub }: { icon: ReactNode; value: string; sub: string }) {
  return (
    <div className="rounded-2xl bg-primary/5 border border-primary/15 px-4 py-3">
      <div className="flex items-center gap-2 text-primary-deep">
        {icon}
        <span className="text-xl font-black">{value}</span>
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground">{sub}</div>
    </div>
  );
}
