import type { PropsWithChildren } from "react";

export function SectionTitle({ children }: PropsWithChildren) {
  return <h2 className="text-xl font-semibold tracking-tight text-stone-950">{children}</h2>;
}
