import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: "primary" | "secondary" | "ghost";
  }
>;

export function Button({ children, className, tone = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition",
        tone === "primary" && "bg-[var(--color-accent)] text-stone-950 hover:opacity-90",
        tone === "secondary" && "bg-stone-900 text-stone-50 hover:bg-stone-800",
        tone === "ghost" && "bg-white/10 text-white hover:bg-white/15",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
