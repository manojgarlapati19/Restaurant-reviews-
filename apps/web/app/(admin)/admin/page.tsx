import { AppShell } from "../../../components/app-shell";
import { adminDashboard } from "../../../lib/mock-data";
import { Badge, Card, SectionTitle } from "../../../components/ui";

export default function AdminPage() {
  return (
    <AppShell title="Admin dashboard" subtitle="Moderation, approvals, trust, and verification operations.">
      <section className="grid gap-6 lg:grid-cols-4">
        {adminDashboard.stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">{stat.value}</p>
            <p className="mt-2 text-sm text-stone-500">{stat.trend}</p>
          </Card>
        ))}
      </section>
      <section className="mt-10 grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="p-6">
          <SectionTitle eyebrow="Queue" title="Moderation queue" body="Cases that need human review right now." />
          <div className="mt-5 space-y-3">
            {adminDashboard.moderationQueue.map((item) => (
              <div key={item} className="rounded-[24px] bg-stone-50 px-4 py-4 text-sm leading-6 text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle eyebrow="Controls" title="Approval surfaces" body="The core operational levers for trust and quality." />
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Review moderation",
              "Restaurant approvals",
              "Reported reviews",
              "Bill verification"
            ].map((item) => (
              <Badge key={item} tone="accent" className="px-4 py-2 text-sm">{item}</Badge>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            {[
              "Trust score anomalies",
              "Duplicate media detection",
              "New hygiene complaint cluster"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 px-4 py-4 text-sm font-medium text-stone-800">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
