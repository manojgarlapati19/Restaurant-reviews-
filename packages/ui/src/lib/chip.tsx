import type { HTMLAttributes, PropsWithChildren } from "react";
import { clsx } from "clsx";

export function Chip({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-700",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
