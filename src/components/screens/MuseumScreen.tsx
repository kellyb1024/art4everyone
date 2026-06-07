import { MapPin } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";
import museumImg from "@/assets/museum.png.asset.json";

export function MuseumScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <ScreenShell step={0} total={4}>
      <h1 className="text-4xl font-black leading-tight">
        국립<br />중앙 박물관
      </h1>
      <div className="mt-3 inline-flex items-center gap-1.5 text-lg text-primary-deep font-semibold">
        <MapPin className="size-5" /> 용산구, 서울
      </div>
      <div className="mt-6 rounded-3xl bg-background flex items-center justify-center">
        <img src={museumImg.url} alt="국립중앙박물관 전경" className="w-full h-auto object-contain" />
      </div>
      <div className="mt-5 rounded-2xl bg-primary/10 border border-primary/20 px-4 py-3 text-center">
        <div className="text-xs font-semibold text-primary-deep uppercase tracking-wide">추천 관람 시간</div>
        <div className="mt-1 text-xl font-bold text-foreground">2시간 이상</div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-sm">
        <Stat label="오늘 휴관" value="아니오" />
        <Stat label="입장료" value="무료" />
        <Stat label="휴식 공간" value="12곳" />
      </div>
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} />
      </div>
    </ScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-primary/10 py-3 px-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-bold mt-0.5">{value}</div>
    </div>
  );
}