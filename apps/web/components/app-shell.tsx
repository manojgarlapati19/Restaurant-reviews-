import Link from "next/link";
import { Compass, Flame, Home, PlusCircle, ShieldCheck, Store, UserRound } from "lucide-react";
import { appConfig } from "@dishcovery/config";
import { buttonStyles } from "./ui";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/search", label: "Explore", icon: Compass },
  { href: "/reviews/new", label: "Review", icon: PlusCircle },
  { href: "/profile/ayesharahman", label: "Profile", icon: UserRound },
  { href: "/owner/dashboard", label: "Owner", icon: Store },
  { href: "/admin", label: "Admin", icon: ShieldCheck }
] as const;

export function AppShell({
  children,
  title,
  subtitle
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-28 pt-4 sm:px-6 lg:px-8">
      <header className="glass-panel sticky top-4 z-30 mb-8 rounded-[32px] border border-white/70 px-4 py-4 shadow-float sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 font-[var(--font-serif)] text-3xl font-semibold tracking-tight text-stone-950">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-stone-950 text-white">
                <Flame className="h-5 w-5" />
              </span>
              {appConfig.name}
            </Link>
            <p className="mt-1 text-sm text-stone-600">{subtitle ?? appConfig.tagline}</p>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-950 hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link href="/reviews/new" className={buttonStyles("secondary")}>
              Add review
            </Link>
          </div>
        </div>
        {title ? (
          <div className="mt-5 max-w-3xl">
            <h1 className="font-[var(--font-serif)] text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
              {title}
            </h1>
          </div>
        ) : null}
      </header>
      <main className="flex-1">{children}</main>
      <nav className="glass-panel fixed bottom-4 left-1/2 z-30 flex w-[min(94vw,560px)] -translate-x-1/2 items-center justify-between rounded-full border border-white/70 px-4 py-3 shadow-float lg:hidden">
        {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex min-w-0 flex-col items-center gap-1 text-[11px] font-semibold text-stone-700">
            <Icon className="h-4 w-4" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
