export function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="relative w-full h-full flex flex-col items-center justify-center gap-10 bg-background active:bg-muted transition"
    >
      <div className="size-32 rounded-3xl bg-primary grid place-items-center shadow-2xl shadow-primary/30">
        <span className="text-6xl font-black text-primary-foreground select-none" style={{ fontFamily: "serif" }}>A4E</span>
      </div>
      <div className="text-center px-8">
        <div className="text-3xl font-black tracking-tight text-foreground">Art4Everyone</div>
        <div className="mt-2 text-lg text-muted-foreground">박물관, 누구나 편하게</div>
      </div>
      <div className="absolute bottom-12 text-xl font-medium text-muted-foreground animate-pulse">
        화면을 눌러 시작하세요
      </div>
    </button>
  );
}