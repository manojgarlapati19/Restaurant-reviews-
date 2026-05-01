import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale, ShieldCheck } from "lucide-react";
import { AppShell } from "../../../../components/app-shell";
import { ReviewCard } from "../../../../components/review-card";
import { dishDetails, reviewFeed, trendingDishes } from "../../../../lib/mock-data";
import { Badge, Button, Card, SectionTitle, buttonStyles } from "../../../../components/ui";

export default async function DishPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dish = trendingDishes.find((entry) => entry.id === id);

  if (!dish) {
    notFound();
  }

  return (
    <AppShell title={dish.name} subtitle={dish.restaurantName}>
      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="overflow-hidden p-0">
          <div className={`h-80 bg-gradient-to-br ${dish.gradient}`} />
          <div className="space-y-6 p-6 sm:p-7">
            <div className="flex flex-wrap gap-2">
              {dishDetails.tags.map((tag) => (
                <Badge key={tag} tone="accent">{tag}</Badge>
              ))}
              {dish.warningLabels.map((warning) => (
                <Badge key={warning} tone="warning">{warning}</Badge>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {dishDetails.attributeRatings.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-stone-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-stone-950">{stat.value}</p>
                </div>
              ))}
            </div>
            <p className="text-sm leading-7 text-stone-700">{dish.summary}</p>
            <div className="rounded-[28px] bg-gradient-to-br from-orange-50 to-amber-50 p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900"><ShieldCheck className="h-4 w-4 text-orange-500" />Worth it summary</div>
              <p className="mt-3 text-sm leading-7 text-stone-700">{dishDetails.aiSummary}</p>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Score" title="Worth it?" body="A fast read on whether this dish earns a repeat order." />
            <p className="mt-5 text-5xl font-semibold tracking-tight text-stone-950">{dish.worthItScore}/10</p>
            <div className="mt-5 space-y-3">
              {[
                ["Price", dish.price],
                ["Distance", dish.distance],
                ["Review confidence", `${dish.reviewCount} reviews`],
                ["Heat level", dish.heat]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-stone-200 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{label}</p>
                  <p className="mt-2 text-sm font-medium text-stone-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <Link href="/reviews/new" className={buttonStyles()}>Add review</Link>
              <Button tone="ghost">Save dish</Button>
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Media" title="Review photos and videos" body="Visual proof from real diners." />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {dishDetails.gallery.map((item, index) => (
                <div key={item} className={`rounded-[24px] p-4 text-sm font-semibold text-stone-900 ${index % 2 === 0 ? "bg-gradient-to-br from-orange-200 to-amber-100" : "bg-gradient-to-br from-stone-200 to-rose-100"}`}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Card className="p-6">
          <SectionTitle eyebrow="Comparison" title="Similar dishes nearby" body="See where else you could order the same craving." />
          <div className="mt-5 space-y-3">
            {dishDetails.comparison.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between rounded-2xl bg-stone-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-stone-900">{entry.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{entry.distance}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-stone-900">{entry.price}</p>
                  <p className="mt-1 text-sm text-stone-600">Worth it {entry.worthIt}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <SectionTitle eyebrow="Warnings" title="Context before ordering" body="Signals that help diners avoid regret." />
          <div className="mt-5 space-y-3">
            {[
              "Overpriced if you care more about quantity than flavor depth",
              "Weekend dine-in waits can stretch beyond the average estimate",
              "Best for spice-seeking groups rather than mild eaters"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-stone-200 px-4 py-4 text-sm leading-6 text-stone-700">
                <div className="inline-flex items-center gap-2 font-semibold text-stone-900"><Scale className="h-4 w-4 text-orange-500" />Warning label</div>
                <p className="mt-2">{item}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Reviews" title="Verified community reviews" body="Dish-level context with trust scores and richer evidence." />
        <div className="mt-6 grid gap-5">
          {reviewFeed.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
