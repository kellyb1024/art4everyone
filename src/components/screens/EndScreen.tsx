import type { ReactNode } from "react";
import { Check, Volume2, Clock, Landmark, Image, RotateCcw, Home } from "lucide-react";
import type { Museum } from "./museums";

const DURATION_LABEL: Record<string, string> = {
  "30": "30분",
  "60": "1시간",
  "120": "2시간",
  "120+": "2시간 이상",
};

export function EndScreen({
  museum,
  exhibitionTitle,
  duration,
  voiceGuide,
  onReplay,
  onRestart,
}: {
  museum: Museum;
  exhibitionTitle: string;
  duration: string | null;
  voiceGuide: boolean;
  onReplay: () => void;
  onRestart: () => void;
}) {
  return (
    <div className="h-full flex flex-col bg-background px-7 py-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="size-20 rounded-3xl bg-primary/15 grid place-items-center">
          <Check className="size-11 text-primary" />
        </div>
        <h1 className="mt-6 text-3xl font-black leading-tight">
          관람을<br />마쳤어요 🎉
        </h1>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          오늘도 편안한 관람 되셨길 바라요.<br />수고 많으셨어요.
        </p>

        <div className="mt-8 w-full rounded-3xl bg-primary/5 border border-primary/15 p-5 text-left">
          <Row icon={<Landmark className="size-5 text-primary" />} label="관람한 곳" value={museum.name} />
          <Row icon={<Image className="size-5 text-primary" />} label="관람한 전시" value={exhibitionTitle} />
          {duration && (
            <Row
              icon={<Clock className="size-5 text-primary" />}
              label="관람 시간"
              value={DURATION_LABEL[duration] ?? duration}
            />
          )}
          <Row
            icon={<Volume2 className="size-5 text-primary" />}
            label="음성 안내"
            value={voiceGuide ? "사용함" : "사용 안 함"}
            last
          />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onRestart}
          className="w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
        >
          <Home className="size-6" /> 처음으로
        </button>
        <button
          onClick={onReplay}
          className="w-full rounded-2xl bg-primary/10 text-primary-deep border-2 border-primary/30 py-4 text-lg font-semibold inline-flex items-center justify-center gap-2"
        >
          <RotateCcw className="size-5" /> AR 다시 보기
        </button>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
  last,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 py-3 ${last ? "" : "border-b border-primary/10"}`}>
      <div className="shrink-0">{icon}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="ml-auto text-base font-bold text-foreground text-right">{value}</div>
    </div>
  );
}
