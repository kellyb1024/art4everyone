import { MapPin, Check } from "lucide-react";
import { ScreenShell, NavRow } from "./_shared";
import { MUSEUMS } from "./museums";

export function MuseumSelectScreen({
  value,
  onChange,
  onBack,
  onNext,
}: {
  value: string | null;
  onChange: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <ScreenShell step={0} total={5}>
      <h1 className="text-3xl font-black leading-tight">
        어느 박물관을<br />방문하세요?
      </h1>
      <p className="mt-2 text-base text-muted-foreground">
        가까운 박물관을 골라 주세요.
      </p>
      <div className="mt-5 flex flex-col gap-4">
        {MUSEUMS.map((m) => {
          const active = value === m.id;
          return (
            <button
              key={m.id}
              onClick={() => onChange(m.id)}
              className={`w-full text-left rounded-3xl overflow-hidden border-2 transition ${
                active ? "border-primary shadow-xl shadow-primary/20" : "border-border"
              }`}
            >
              <img src={m.image} alt={m.name} className="w-full aspect-[16/9] object-cover" />
              <div className="p-4 flex items-start justify-between gap-2">
                <div>
                  <div className="text-lg font-black">{m.name}</div>
                  <div className="mt-1 inline-flex items-center gap-1 text-sm text-primary-deep font-semibold">
                    <MapPin className="size-4" /> {m.location}
                  </div>
                </div>
                {active && (
                  <div className="size-7 rounded-full bg-primary grid place-items-center shrink-0">
                    <Check className="size-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div className="mt-auto">
        <NavRow onBack={onBack} onNext={onNext} nextDisabled={!value} />
      </div>
    </ScreenShell>
  );
}