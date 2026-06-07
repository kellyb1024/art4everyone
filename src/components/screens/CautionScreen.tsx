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
      <ul className="mt-4 space-y-2 text-base text-foreground/80 list-disc pl-5">
        <li>다른 관람객과 부딪히지 않도록 천천히 걸어요</li>
        <li>작품 보호선 안으로 들어가지 마세요</li>
        <li>도슨트가 필요하면 하단 <b className="text-primary-deep">도슨트</b> 버튼을 눌러요</li>
      </ul>

      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onStart} nextLabel="시작하기" />
      </div>
    </div>
  );
}