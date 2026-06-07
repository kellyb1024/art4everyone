import type { ReactNode } from "react";

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full max-w-[420px] h-dvh sm:h-[860px] sm:rounded-[44px] bg-background sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)] overflow-hidden sm:border sm:border-border flex flex-col">
      <div className="hidden sm:flex h-9 items-center justify-between px-7 pt-2 text-sm font-semibold text-foreground/80">
        <span>6:23</span>
        <span className="flex gap-1.5 items-center">
          <span className="size-1.5 rounded-full bg-foreground/70" />
          <span className="size-1.5 rounded-full bg-foreground/70" />
          <span className="size-1.5 rounded-full bg-foreground/70" />
        </span>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
    </div>
  );
}