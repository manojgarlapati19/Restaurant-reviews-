import Link from "next/link";
import { AppShell } from "../components/app-shell";
import { StateCard, buttonStyles } from "../components/ui";

export default function NotFound() {
  return (
    <AppShell title="We couldn't plate that page" subtitle="The dish or restaurant you requested is missing or no longer available.">
      <div className="py-8">
        <StateCard title="Nothing here yet" body="Try heading back to discovery and searching by dish, restaurant, or craving instead." actionLabel="Back to explore" />
        <div className="mt-6 flex justify-center">
          <Link href="/search" className={buttonStyles()}>Go to explore</Link>
        </div>
      </div>
    </AppShell>
  );
}
