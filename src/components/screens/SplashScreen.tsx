import logo from "@/assets/logo.png.asset.json";

export function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="relative w-full h-full flex items-center justify-center bg-background active:bg-muted transition"
    >
      <img src={logo.url} alt="Art4Everyone" className="w-3/4 max-w-xs object-contain" />
    </button>
  );
}