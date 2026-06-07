import { useState, type ReactNode } from "react";
import { ArrowLeft, X, Map, Volume2, Armchair, User2 } from "lucide-react";

export function ARScreen({
  voiceGuide,
  onRestart,
}: {
  voiceGuide: boolean;
  onRestart: () => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="h-full relative bg-[oklch(0.86_0.02_75)] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,oklch(0.92_0.02_75),oklch(0.78_0.03_75))]" />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 bg-primary opacity-90"
        style={{ clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0% 100%)" }}
      />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-7xl select-none">👟👟</div>

      <div className="relative flex items-center justify-between p-4">
        <button className="size-11 rounded-full bg-background/80 grid place-items-center">
          <ArrowLeft className="size-5" />
        </button>
        <button onClick={onRestart} className="size-11 rounded-full bg-background/80 grid place-items-center">
          <X className="size-5" />
        </button>
      </div>

      {open && (
        <div className="absolute left-4 right-4 top-24 rounded-3xl bg-primary text-primary-foreground p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-2xl bg-primary-foreground/15 grid place-items-center">🔔</div>
            <div className="flex-1">
              <div className="text-sm opacity-80">작품 #1 도착</div>
              <div className="text-2xl font-black leading-tight">금동 반가사유상</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-sm font-semibold underline opacity-90">
              닫기
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <Meta k="시대" v="삼국 7C" />
            <Meta k="국보" v="제 83호" />
            <Meta k="재질" v="금동" />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed bg-primary-foreground/10 rounded-2xl p-3">
            깊은 명상에 잠긴 보살의 미소. 한국 불교 조각의 정수로 꼽히는 작품이에요.
          </p>
          {voiceGuide && (
            <button className="mt-3 w-full rounded-2xl bg-primary-foreground text-primary py-3 font-bold inline-flex items-center justify-center gap-2">
              <Volume2 className="size-5" /> 음성 설명 듣기 (2분)
            </button>
          )}
          <div className="mt-3 text-[13px] opacity-90 flex items-start gap-1.5">
            <span>👉</span>
            <span><b>다음 단계:</b> 초록 길을 따라 두 번째 전시실로 이동하세요 (약 40초).</span>
          </div>
        </div>
      )}

      <div className="absolute left-3 right-3 bottom-3 rounded-3xl bg-background/95 backdrop-blur p-3 shadow-2xl">
        <div className="grid grid-cols-3 gap-2">
          <ActionBtn icon={<Map className="size-6" />} label="지도 열기" primary />
          <ActionBtn icon={<Armchair className="size-6" />} label="가까운 좌석" />
          <ActionBtn icon={<User2 className="size-6" />} label="도슨트 호출" />
        </div>
        <button onClick={onRestart} className="mt-2 w-full text-sm text-muted-foreground py-1.5">
          처음으로 돌아가기
        </button>
      </div>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-xl bg-primary-foreground/10 py-1.5">
      <div className="opacity-70">{k}</div>
      <div className="font-bold">{v}</div>
    </div>
  );
}

function ActionBtn({ icon, label, primary }: { icon: ReactNode; label: string; primary?: boolean }) {
  return (
    <button
      className={`rounded-2xl py-3 flex flex-col items-center gap-1 font-semibold text-sm transition active:scale-[0.97] ${
        primary ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}