import { useState, useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, X, Map, Volume2, Armchair, Camera, MapPin, Info } from "lucide-react";
import type { Artwork } from "./museums";
import { CourseMap } from "./CourseMap";

export function ARScreen({
  voiceGuide,
  route,
  onFinish,
}: {
  voiceGuide: boolean;
  route: Artwork[];
  /** 관람을 마칠 때 호출. viewedCount = 지금까지 관람한 작품 수 */
  onFinish: (viewedCount: number) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<"art" | "seat" | "map">("art");
  const [camStatus, setCamStatus] = useState<"prompt" | "granted" | "denied">("prompt");
  const [camNotice, setCamNotice] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const artwork = route[idx];
  const isLast = idx >= route.length - 1;
  const next = !isLast ? route[idx + 1] : null;

  const goNext = () => {
    if (isLast) {
      onFinish(route.length);
      return;
    }
    setIdx((i) => i + 1);
    setView("art");
    setOpen(true);
  };
  const goPrev = () => {
    if (idx === 0) return;
    setIdx((i) => i - 1);
    setView("art");
    setOpen(true);
  };

  const requestCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = stream;
      setCamStatus("granted");
    } catch {
      setCamStatus("denied");
      setCamNotice(true);
      setTimeout(() => setCamNotice(false), 3500);
    }
  };

  // video 요소가 화면에 렌더된 뒤(granted) 카메라 스트림을 연결한다.
  useEffect(() => {
    if (camStatus === "granted" && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [camStatus]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // 추천 작품이 없는 경우(예: 데이터 준비 중 전시)에도 안전하게 종료할 수 있도록.
  if (!artwork) {
    return (
      <div className="h-full grid place-items-center bg-background p-8 text-center">
        <div>
          <p className="text-lg text-muted-foreground">표시할 작품이 없어요.</p>
          <button
            onClick={() => onFinish(0)}
            className="mt-5 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  const nextStepText = next
    ? `다음 작품: ${next.title} · ${next.place}`
    : "마지막 작품이에요. 관람을 마치면 ‘관람 종료’를 눌러 주세요.";

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
      {/* AR 바닥 경로(목업): 소실점에서 발 앞까지 이어지는 반투명 원근 경로. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[14%]"
        style={{
          clipPath: "polygon(48.5% 0%, 51.5% 0%, 87% 100%, 13% 100%)",
          filter: "drop-shadow(0 0 18px oklch(0.55 0.22 142 / 0.55))",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.6_0.22_142/0.8),oklch(0.78_0.16_142/0.08))]" />
        <div className="absolute inset-0 art4-ar-path" />
      </div>

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
        <button
          onClick={goPrev}
          disabled={idx === 0}
          aria-label="이전 작품"
          className="size-11 rounded-full bg-background/80 grid place-items-center disabled:opacity-40"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="rounded-full bg-background/80 px-4 py-1.5 text-sm font-bold">
          작품 {idx + 1} / {route.length}
        </div>
        <button onClick={() => onFinish(idx + 1)} aria-label="관람 종료" className="size-11 rounded-full bg-background/80 grid place-items-center">
          <X className="size-5" />
        </button>
      </div>

      {!open && view === "art" && (
        <button
          onClick={() => setOpen(true)}
          className="absolute left-1/2 -translate-x-1/2 top-24 z-10 rounded-full bg-primary text-primary-foreground px-5 py-3 text-base font-bold shadow-lg shadow-primary/30 inline-flex items-center gap-2 active:scale-[0.98] transition"
        >
          <Info className="size-5" /> 작품 설명 다시 보기
        </button>
      )}

      {open && view === "art" && (
        <div className="absolute left-4 right-4 top-24 rounded-3xl bg-primary text-primary-foreground p-5 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="text-sm opacity-80 flex items-center gap-1.5">
                <MapPin className="size-3.5" /> {artwork.place}
              </div>
              <div className="text-2xl font-black leading-tight">{artwork.title}</div>
            </div>
            {artwork.treasure && (
              <span className="shrink-0 rounded-full bg-primary-foreground/20 text-xs font-bold px-2.5 py-1">
                {artwork.treasure}
              </span>
            )}
            <button onClick={() => setOpen(false)} aria-label="카드 닫기" className="shrink-0 size-9 rounded-full bg-primary-foreground/15 grid place-items-center">
              <X className="size-5" />
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
            <b>다음 단계:</b> {nextStepText}
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
              <div className="text-sm opacity-80">{artwork.place}</div>
            </div>
            <button onClick={() => setView("art")} className="text-sm font-semibold underline opacity-90">닫기</button>
          </div>
          <div className="mt-3 rounded-2xl bg-background p-3 max-h-[40vh] overflow-y-auto">
            <CourseMap route={route} currentKey={`${artwork.floor}-${artwork.room}`} />
          </div>
          <p className="mt-3 text-[15px] leading-relaxed bg-primary-foreground/10 rounded-2xl p-3">
            {nextStepText}
          </p>
        </div>
      )}

      <div className="absolute left-3 right-3 bottom-3 rounded-3xl bg-background/95 backdrop-blur p-3 shadow-2xl">
        <div className="grid grid-cols-2 gap-2">
          <ActionBtn icon={<Map className="size-6" />} label="지도 열기" onClick={() => { setView("map"); setOpen(true); }} />
          <ActionBtn icon={<Armchair className="size-6" />} label="가까운 좌석" onClick={() => setView("seat")} />
        </div>
        <button
          onClick={goNext}
          className="mt-2 w-full rounded-2xl bg-primary py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
        >
          {isLast ? "관람 종료" : "다음 작품으로"}
          {!isLast && <ArrowRight className="size-5" />}
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

function ActionBtn({ icon, label, onClick }: { icon: ReactNode; label: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl py-3 flex flex-col items-center gap-1 font-semibold text-sm transition active:scale-[0.97] bg-primary/10 text-primary-deep border-2 border-primary/30"
    >
      {icon}
      {label}
    </button>
  );
}
