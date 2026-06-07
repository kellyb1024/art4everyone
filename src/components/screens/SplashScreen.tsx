export function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <button
      onClick={onStart}
      className="relative w-full h-full flex flex-col items-center bg-background active:bg-muted transition"
    >
      <div className="flex-1 flex items-center justify-center w-full">
        <svg
          viewBox="0 0 138 94"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-1/2 max-w-[220px] h-auto"
          aria-label="Art4Everyone"
        >
          <path
            d="M74.3885 32.9982C74.3885 32.9982 46.2757 26.6293 32.4215 32.9982C11.5831 42.5777 9.37434 66.8421 27.7584 78.7879C41.4068 87.6564 58.6717 88.9997 74.3885 82.1797C97.0648 72.3398 74.3885 32.9982 74.3885 32.9982ZM74.3885 32.9982C74.3885 32.9982 105.156 67.9724 113.416 73.6446C119.032 77.5007 124.807 76.3291 128.532 69.5007C131.532 64.0007 111.532 32.9982 117.532 21.5007C123.179 10.6791 134.532 16.5007 137.032 16.5007M74.3885 32.9982C74.3885 32.9982 58.8734 6.08352 44.0847 7.55925C27.0893 9.25519 0.0316152 9.36877 0.0316152 9.36877"
            stroke="#439C25"
            strokeWidth="15"
          />
        </svg>
      </div>
      <p className="text-base text-muted-foreground/60 font-medium mb-10">
        화면을 눌러 시작하세요
      </p>
    </button>
  );
}