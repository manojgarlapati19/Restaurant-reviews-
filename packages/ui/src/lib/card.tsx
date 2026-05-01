import type { HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    elevated?: boolean;
  }
>;

export function Card({ children, className, elevated = true, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-[28px] border border-black/5 bg-white/90 backdrop-blur",
        elevated && "shadow-[0_20px_50px_rgba(15,23,42,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
