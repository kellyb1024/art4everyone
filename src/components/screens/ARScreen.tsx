import { useState, useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, X, Map, Volume2, Armchair, Camera } from "lucide-react";
import type { Artwork } from "./museums";

export function ARScreen({
  voiceGuide,
  artwork,
  onRestart,
}: {
  voiceGuide: boolean;
  artwork: Artwork;
  onRestart: () => void;
}) {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<"art" | "seat" | "map">("art");
  const [camStatus, setCamStatus] = useState<"prompt" | "granted" | "denied">("prompt");
  const [camNotice, setCamNotice] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCamStatus("granted");
    } catch {
      setCamStatus("denied");
      setCamNotice(true);
      setTimeout(() => setCamNotice(false), 3500);
    }
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="h-full relative bg-[oklch(0.86_0.02_75)] overflow-hidden">
      {camStatus === "granted" ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,oklch(0.92_0.02_75),oklch(0.78_0.03_75))]" />
      )}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-12 bg-primary opacity-90"
        style={{ clipPath: "polygon(35% 0, 65% 0, 100% 100%, 0% 100%)" }}
      />

      {camStatus === "prompt" && (
        <div className="absolute inset-0 z-20 bg-foreground/60 backdrop-blur-sm grid place-items-center p-6">
          <div className="w-full rounded-3xl bg-card p-7 shadow-2xl">
            <div className="flex justify-center mb-4">
              <div className="size-16 rounded-2xl bg-primary/15 grid place-items-center">
                <Camera className="size-8 text-primary" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center leading-snug">
              카메라를<br />사용해도 될까요?
            </h2>
            <p className="mt-3 text-center text-base text-muted-foreground leading-relaxed">
              작품 위에 안내를 겹쳐 보여드리기 위해 카메라가 필요해요.
            </p>
            <button
              onClick={requestCamera}
              className="mt-6 w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.98] transition"
            >
              카메라 허용
            </button>
            <button
              onClick={() => {
                setCamStatus("denied");
                setCamNotice(true);
                setTimeout(() => setCamNotice(false), 3500);
              }}
              className="mt-3 w-full rounded-2xl bg-primary/10 text-primary-deep border-2 border-primary/30 py-4 text-lg font-semibold"
            >
              나중에 하기
            </button>
          </div>
        </div>
      )}

      {camNotice && (
        <div className="absolute top-20 left-4 right-4 z-30 rounded-2xl bg-foreground/85 text-background px-4 py-3 text-sm text-center shadow-xl">
          카메라 없이 안내를 계속할게요.
        </div>
      )}

      <div className="relative flex items-center justify-between p-4">
        <button className="size-11 rounded-full bg-background/80 grid place-items-center">
          <ArrowLeft className="size-5" />
        </button>
        <button onClick={onRestart} className="size-11 rounded-full bg-background/80 grid place-items-center">
          <X className="size-5" />
        </button>
      </div>

      {open && view === "art" && (
        <div className="absolute left-4 right-4 top-24 rounded-3xl bg-primary text-primary-foreground p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm opacity-80">{artwork.badge}</div>
              <div className="text-2xl font-black leading-tight">{artwork.title}</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-sm font-semibold underline opacity-90">
              닫기
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            {artwork.meta.map((m) => (
              <Meta key={m.k} k={m.k} v={m.v} />
            ))}
          </div>
          <p className="mt-3 text-[15px] leading-relaxed bg-primary-foreground/10 rounded-2xl p-3">
            {artwork.description}
          </p>
          {voiceGuide && (
            <button className="mt-3 w-full rounded-2xl bg-primary-foreground text-primary py-3 font-bold inline-flex items-center justify-center gap-2">
              <Volume2 className="size-5" /> 음성 설명 듣기 (2분)
            </button>
          )}
          <div className="mt-3 text-[13px] opacity-90">
            <b>다음 단계:</b> {artwork.nextStep}
          </div>
        </div>
      )}

      {view === "seat" && (
        <div className="absolute left-4 right-4 top-24 rounded-3xl bg-primary text-primary-foreground p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <Armchair className="size-7" />
            <div className="flex-1">
              <div className="text-sm opacity-80">가까운 휴식 공간</div>
              <div className="text-2xl font-black leading-tight">12m 앞 벤치</div>
            </div>
            <button onClick={() => setView("art")} className="text-sm font-semibold underline opacity-90">닫기</button>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed bg-primary-foreground/10 rounded-2xl p-3">
            바로 앞 통로 오른쪽에 빈 좌석 3개가 있어요. 천천히 이동해 편히 쉬어 가세요.
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <Meta k="거리" v="약 12m" />
            <Meta k="좌석" v="3개" />
            <Meta k="도착" v="20초" />
          </div>
        </div>
      )}

      {view === "map" && (
        <div className="absolute left-4 right-4 top-24 rounded-3xl bg-primary text-primary-foreground p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <Map className="size-7" />
            <div className="flex-1">
              <div className="text-2xl font-black leading-tight">지도</div>
              <div className="text-sm opacity-80">현재 위치와 다음 작품</div>
            </div>
            <button onClick={() => setView("art")} className="text-sm font-semibold underline opacity-90">닫기</button>
          </div>
          <p className="mt-3 text-[15px] leading-relaxed bg-primary-foreground/10 rounded-2xl p-3">
            초록 경로를 따라 두 번째 전시실로 이동하세요. 중간에 휴식 좌석 1곳이 있어요.
          </p>
        </div>
      )}

      <div className="absolute left-3 right-3 bottom-3 rounded-3xl bg-background/95 backdrop-blur p-3 shadow-2xl">
        <div className="grid grid-cols-2 gap-2">
          <ActionBtn icon={<Map className="size-6" />} label="지도 열기" primary onClick={() => { setView("art"); setOpen(true); }} />
          <ActionBtn icon={<Armchair className="size-6" />} label="가까운 좌석" onClick={() => setView("seat")} />
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

function ActionBtn({ icon, label, primary, onClick }: { icon: ReactNode; label: string; primary?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl py-3 flex flex-col items-center gap-1 font-semibold text-sm transition active:scale-[0.97] ${
        primary ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-primary/10 text-primary-deep border-2 border-primary/30"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}