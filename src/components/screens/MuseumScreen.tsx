import { MapPin } from "lucide-react";
import { ScreenShell, NavRow, NextHint } from "./_shared";

export function MuseumScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <ScreenShell step={0} total={4}>
      <h1 className="text-4xl font-black leading-tight">
        국립<br />중앙 박물관
      </h1>
      <div className="mt-3 inline-flex items-center gap-1.5 text-lg text-primary-deep font-semibold">
        <MapPin className="size-5" /> 용산구, 서울
      </div>
      <div className="mt-6 rounded-3xl overflow-hidden bg-muted aspect-[4/3] grid place-items-center text-muted-foreground">
        <div className="text-center px-6">
          <div className="text-6xl mb-2">🏛️</div>
          <div className="text-sm">국립중앙박물관 전경</div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 text-center text-sm">
        <Stat label="오늘 휴관" value="아니오" />
        <Stat label="입장료" value="무료" />
        <Stat label="휴식 공간" value="12곳" />
      </div>
      <NextHint text="방문 시간을 골라 동선을 짧게 만들 거예요" />
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} />
      </div>
    </ScreenShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted py-3 px-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-base font-bold mt-0.5">{value}</div>
    </div>
  );
}