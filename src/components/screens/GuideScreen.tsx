import { NavRow } from "./_shared";

export function GuideScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="h-full flex flex-col px-7 py-8">
      <h1 className="text-3xl font-black">이용 안내</h1>
      <p className="mt-2 text-lg text-muted-foreground">아래처럼 사용해 보세요</p>

      <div className="mt-6 rounded-3xl bg-muted p-6 grid place-items-center aspect-square">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path d="M70 40 Q80 30 95 35 L100 70 L92 130 L100 175 L80 175 L72 130 L78 90 Z" fill="oklch(0.7 0.02 150)" />
          <circle cx="83" cy="35" r="14" fill="oklch(0.7 0.02 150)" />
          <rect x="105" y="80" width="14" height="22" rx="3" fill="oklch(0.55 0.15 142)" />
          <path d="M119 90 L160 150 L130 160 Z" fill="none" stroke="oklch(0.4 0.04 150)" strokeWidth="2" strokeDasharray="5 4" />
          <rect x="70" y="180" width="120" height="14" fill="oklch(0.55 0.15 142)" rx="3" />
        </svg>
      </div>

      <p className="mt-6 text-xl font-bold text-center leading-snug">
        경로가 보일 때까지<br />카메라를 바닥에 비춰 주세요
      </p>
      <p className="mt-2 text-base text-muted-foreground text-center">
        바닥의 <b className="text-primary-deep">초록 길</b>을 따라가면 돼요.
      </p>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
}