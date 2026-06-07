import { NavRow } from "./_shared";
import cautionImg from "@/assets/ar-caution.png.asset.json";

export function CautionScreen({ onBack, onStart }: { onBack: () => void; onStart: () => void }) {
  return (
    <div className="h-full flex flex-col px-7 py-8">
      <h1 className="text-3xl font-black">유의 사항</h1>

      <div className="mt-6 rounded-3xl bg-background p-4 grid place-items-center">
        <img src={cautionImg.url} alt="주변에 주의하며 이동" className="w-full max-h-[340px] object-contain" />
      </div>

      <p className="mt-6 text-xl font-bold text-center">주변을 살피며 이동해 주세요</p>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onStart} nextLabel="시작하기" />
      </div>
    </div>
  );
}