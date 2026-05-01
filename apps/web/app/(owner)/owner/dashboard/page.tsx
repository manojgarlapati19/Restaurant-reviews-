import { AppShell } from "../../../../components/app-shell";
import { ownerDashboard } from "../../../../lib/mock-data";
import { Badge, Card, SectionTitle } from "../../../../components/ui";

export default function OwnerDashboardPage() {
  return (
    <AppShell title="Restaurant owner dashboard" subtitle="Menu updates, review replies, analytics, and dish promotion.">
      <section className="grid gap-6 lg:grid-cols-4">
        {ownerDashboard.stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{stat.value}</p>
            <p className="mt-2 text-sm text-stone-500">{stat.trend}</p>
          </Card>
        ))}
      </section>
      <section className="mt-10 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Card className="p-6">
          <SectionTitle eyebrow="Actions" title="What needs attention" body="The next moves to keep visibility and trust strong." />
          <div className="mt-5 space-y-3">
            {ownerDashboard.actions.map((item) => (
              <div key={item} className="rounded-[24px] border border-stone-200 px-4 py-4 text-sm font-medium text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle eyebrow="Tools" title="Owner controls" body="The product surfaces available for restaurant growth." />
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Update menu",
              "Reply to reviews",
              "Analytics cards",
              "Promote dish"
            ].map((item) => (
              <Badge key={item} tone="accent" className="px-4 py-2 text-sm">{item}</Badge>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Top converting photo: hero biryani angle",
              "New badge unlocked: trusted late-night spot",
              "Low signal alert: unverified review spike",
              "Suggested promo: lunch combo under ₹249"
            ].map((item) => (
              <div key={item} className="rounded-2xl bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-700">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
