import { NavRow } from "./_shared";
import guideImg from "@/assets/ar-guide.png.asset.json";

export function GuideScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="h-full flex flex-col px-7 py-8">
      <h1 className="text-3xl font-black">이용 안내</h1>
      <p className="mt-2 text-lg text-muted-foreground">아래처럼 사용해 보세요</p>

      <div className="mt-6 rounded-3xl bg-background p-4 grid place-items-center">
        <img src={guideImg.url} alt="카메라를 바닥에 비추는 안내" className="w-full max-h-[360px] object-contain" />
      </div>

      <p className="mt-4 text-xl font-bold text-center leading-snug">
        경로가 보일 때까지<br />카메라를 바닥에 비춰주세요
      </p>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} />
      </div>
    </div>
  );
}