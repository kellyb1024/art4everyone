import { MapPin, ShieldCheck } from "lucide-react";
import mapBg from "@/assets/location-map-bg.png.asset.json";

export function LocationScreen({ onAllow, onChoose }: { onAllow: () => void; onChoose: () => void }) {
  return (
    <div className="h-full flex flex-col bg-background relative">
      <img
        src={mapBg.url}
        alt="지도 배경"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-background/30" />
      <div className="relative mt-auto m-5 rounded-3xl bg-card p-7 shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="size-16 rounded-2xl bg-primary/15 grid place-items-center">
            <MapPin className="size-8 text-primary" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center leading-snug">
          위치를 한 번만<br />사용해도 될까요?
        </h2>
        <p className="mt-3 text-center text-base text-muted-foreground leading-relaxed">
          가장 가까운 박물관을 찾기 위해서만 사용해요.<br />
          <b className="text-foreground">이번 방문에만</b> 적용되며 저장되지 않아요.
        </p>
        <div className="mt-5 flex items-center gap-2 justify-center text-sm text-muted-foreground">
          <ShieldCheck className="size-4" /> 어떤 선택을 해도 앱은 계속 사용할 수 있어요
        </div>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onAllow}
            className="w-full rounded-2xl bg-primary py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/30 active:scale-[0.98] transition"
          >
            이번 한 번만 허용
          </button>
          <button
            onClick={onChoose}
            className="w-full rounded-2xl bg-primary/10 text-primary-deep border-2 border-primary/30 py-4 text-lg font-semibold"
          >
            직접 박물관 선택
          </button>
        </div>
      </div>
    </div>
  );
}