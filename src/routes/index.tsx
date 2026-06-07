import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { SplashScreen } from "@/components/screens/SplashScreen";
import { LocationScreen } from "@/components/screens/LocationScreen";
import { MuseumScreen } from "@/components/screens/MuseumScreen";
import { DurationScreen } from "@/components/screens/DurationScreen";
import { ExhibitionScreen } from "@/components/screens/ExhibitionScreen";
import { RouteReadyScreen } from "@/components/screens/RouteReadyScreen";
import { GuideScreen } from "@/components/screens/GuideScreen";
import { CautionScreen } from "@/components/screens/CautionScreen";
import { ARScreen } from "@/components/screens/ARScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Art4Everyone — 박물관 동행 가이드" },
      { name: "description", content: "큰 글씨, 음성 안내, 휴식 공간 안내까지. 박물관을 누구나 편하게." },
      { property: "og:title", content: "Art4Everyone" },
      { property: "og:description", content: "큰 글씨, 음성 안내, 휴식 공간 안내까지." },
    ],
  }),
  component: Index,
});

export type Step =
  | "splash"
  | "location"
  | "museum"
  | "duration"
  | "exhibition"
  | "route"
  | "guide"
  | "caution"
  | "ar";

const ORDER: Step[] = [
  "splash",
  "location",
  "museum",
  "duration",
  "exhibition",
  "route",
  "guide",
  "caution",
  "ar",
];

function Index() {
  const [step, setStep] = useState<Step>("splash");
  const [duration, setDuration] = useState<string | null>(null);
  const [exhibition, setExhibition] = useState<string | null>(null);
  const [voiceGuide, setVoiceGuide] = useState(true);

  const idx = ORDER.indexOf(step);
  const go = (s: Step) => setStep(s);
  const next = () => setStep(ORDER[Math.min(idx + 1, ORDER.length - 1)]);
  const back = () => setStep(ORDER[Math.max(idx - 1, 0)]);

  const render = () => {
    switch (step) {
      case "splash":
        return <SplashScreen onStart={() => go("location")} />;
      case "location":
        return <LocationScreen onAllow={() => go("museum")} />;
      case "museum":
        return <MuseumScreen onNext={() => go("duration")} onBack={back} />;
      case "duration":
        return (
          <DurationScreen
            value={duration}
            onChange={setDuration}
            onNext={() => go("exhibition")}
            onBack={back}
          />
        );
      case "exhibition":
        return (
          <ExhibitionScreen
            value={exhibition}
            onChange={setExhibition}
            onNext={() => go("route")}
            onBack={back}
          />
        );
      case "route":
        return (
          <RouteReadyScreen
            exhibition={exhibition ?? "명품 30선"}
            voiceGuide={voiceGuide}
            onToggleVoice={setVoiceGuide}
            onNext={() => go("guide")}
            onBack={back}
          />
        );
      case "guide":
        return <GuideScreen onNext={() => go("caution")} onBack={back} />;
      case "caution":
        return <CautionScreen onStart={() => go("ar")} onBack={back} />;
      case "ar":
        return <ARScreen voiceGuide={voiceGuide} onRestart={() => go("splash")} />;
    }
  };

  return (
    <main className="min-h-dvh w-full bg-secondary flex items-center justify-center p-0 sm:p-6">
      <PhoneFrame>{render()}</PhoneFrame>
    </main>
  );
}
