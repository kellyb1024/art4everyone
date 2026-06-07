import { AlertTriangle } from "lucide-react";
import { NavRow } from "./_shared";

export function CautionScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="h-full flex flex-col px-7 py-8">
      <h1 className="text-3xl font-black">유의 사항</h1>

      <div className="mt-6 rounded-3xl bg-muted p-6 grid place-items-center aspect-square relative">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M70 40 Q80 30 95 35 L100 70 L92 130 L100 175 L80 175 L72 130 L78 90 Z" fill="oklch(0.7 0.02 150)" />
          <circle cx="83" cy="35" r="14" fill="oklch(0.7 0.02 150)" />
          <rect x="105" y="80" width="14" height="22" rx="3" fill="oklch(0.55 0.15 142)" />
          <path d="M119 90 L160 140 L135 155 Z" fill="none" stroke="oklch(0.4 0.04 150)" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="155" y="100" width="40" height="80" fill="oklch(0.78 0.02 85)" />
          <path d="M155 100 l-20 -10 l20 30 l-25 0 z" fill="oklch(0.65 0.22 30)" />
        </svg>
        <div className="absolute top-4 right-4 size-12 rounded-full bg-accent grid place-items-center">
          <AlertTriangle className="size-7 text-foreground" />
        </div>
      </div>

      <p className="mt-6 text-xl font-bold text-center">주변을 살피며 이동해 주세요</p>
      <ul className="mt-4 space-y-2 text-base text-foreground/80">
        <li>• 다른 관람객과 부딪히지 않도록 천천히 걸어요</li>
        <li>• 작품 보호선 안으로 들어가지 마세요</li>
        <li>• 도슨트가 필요하면 <b className="text-primary-deep">하단 “도슨트” 버튼</b>을 눌러요</li>
      </ul>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onStart} nextLabel="시작하기" />
      </div>
    </div>
  );
}