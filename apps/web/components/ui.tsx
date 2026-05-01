import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, PropsWithChildren, ReactNode } from "react";
import { clsx } from "clsx";
import { ChevronRight, Search, Sparkles, Star } from "lucide-react";

type ButtonTone = "primary" | "secondary" | "ghost" | "glass";

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: ButtonTone;
  }
>;

export function buttonStyles(tone: ButtonTone = "primary", className?: string) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300",
    tone === "primary" &&
      "bg-stone-950 text-white shadow-[0_16px_40px_rgba(28,25,23,0.24)] hover:-translate-y-0.5 hover:bg-stone-900",
    tone === "secondary" &&
      "bg-gradient-to-r from-orange-400 to-amber-300 text-stone-950 shadow-[0_16px_40px_rgba(251,146,60,0.32)] hover:-translate-y-0.5",
    tone === "ghost" && "bg-stone-950/5 text-stone-800 hover:bg-stone-950/10",
    tone === "glass" &&
      "border border-white/60 bg-white/60 text-stone-900 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl hover:bg-white/80",
    className
  );
}

export function Button({ children, className, tone = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={buttonStyles(tone, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({
  children,
  className,
  elevated = true,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>> & { elevated?: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-[30px] border border-white/70 bg-white/78 backdrop-blur-xl",
        elevated && "shadow-[0_22px_80px_rgba(15,23,42,0.1)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className,
  tone = "default",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement>> & {
  tone?: "default" | "accent" | "success" | "warning" | "dark";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-[0.02em]",
        tone === "default" && "border border-stone-200 bg-stone-50 text-stone-700",
        tone === "accent" && "bg-orange-100 text-orange-800",
        tone === "success" && "bg-emerald-100 text-emerald-800",
        tone === "warning" && "bg-rose-100 text-rose-700",
        tone === "dark" && "bg-stone-950 text-white",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Chip({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLSpanElement>>) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border border-stone-200/80 bg-white/80 px-3 py-1.5 text-xs font-medium text-stone-700 backdrop-blur",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function Rating({ rating, count, className }: { rating: number; count?: number; className?: string }) {
  return (
    <div className={clsx("inline-flex items-center gap-2", className)}>
      <span className="inline-flex items-center gap-1 rounded-full bg-stone-950 px-2.5 py-1 text-xs font-semibold text-white">
        <Star className="h-3.5 w-3.5 fill-current" />
        {rating.toFixed(1)}
      </span>
      {count ? <span className="text-xs text-stone-500">{count} reviews</span> : null}
    </div>
  );
}

export function SearchBar({
  className,
  placeholder = "Search dishes, restaurants, cuisines, or cravings",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label
      className={clsx(
        "flex items-center gap-3 rounded-[26px] border border-white/70 bg-white/84 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl",
        className
      )}
    >
      <Search className="h-5 w-5 text-stone-400" />
      <input
        className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
        placeholder={placeholder}
        {...props}
      />
      <div className="hidden rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700 sm:block">
        AI search
      </div>
    </label>
  );
}

export function FilterChips({ items, activeItem }: { items: readonly string[] | string[]; activeItem?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <Chip
          key={item}
          className={clsx(
            "cursor-default transition",
            activeItem === item && "border-orange-200 bg-orange-100 text-orange-800"
          )}
        >
          {item}
        </Chip>
      ))}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
  action
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl">{title}</h2>
        {body ? <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">{body}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Card className="p-4 sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">{value}</p>
      {hint ? <p className="mt-2 text-sm text-stone-500">{hint}</p> : null}
    </Card>
  );
}

export function InsightRow({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="rounded-[24px] border border-white/70 bg-white/72 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-sm font-semibold text-stone-900">
        <Sparkles className="h-4 w-4 text-orange-500" />
        {title}
      </div>
      <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
    </div>
  );
}

export function StateCard({
  title,
  body,
  actionLabel
}: {
  title: string;
  body: string;
  actionLabel?: string;
}) {
  return (
    <Card className="bg-gradient-to-br from-white via-orange-50 to-amber-50 p-6 text-center sm:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-950 text-white">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-stone-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
      {actionLabel ? (
        <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-900">
          {actionLabel}
          <ChevronRight className="h-4 w-4" />
        </div>
      ) : null}
    </Card>
  );
}
