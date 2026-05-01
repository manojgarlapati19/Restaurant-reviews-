import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, MapPin, ShieldCheck } from "lucide-react";
import { AppShell } from "../../../../components/app-shell";
import { DishCard } from "../../../../components/dish-card";
import { ReviewCard } from "../../../../components/review-card";
import { featuredRestaurants, restaurantDetails, reviewFeed, trendingDishes } from "../../../../lib/mock-data";
import { Badge, Button, Card, SectionTitle, buttonStyles } from "../../../../components/ui";

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = featuredRestaurants.find((entry) => entry.slug === slug);

  if (!restaurant) {
    notFound();
  }

  return (
    <AppShell title={restaurant.name} subtitle={`${restaurant.neighborhood}, ${restaurant.city}`}>
      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card className="overflow-hidden p-0">
          <div className={`h-72 bg-gradient-to-br ${restaurant.coverGradient}`} />
          <div className="space-y-6 p-6 sm:p-7">
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine) => (
                <Badge key={cuisine} tone="accent">{cuisine}</Badge>
              ))}
              <Badge tone="dark">{restaurant.priceRange}</Badge>
              <Badge tone={restaurant.openNow ? "success" : "warning"}>{restaurant.openNow ? "Open now" : "Closed"}</Badge>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[24px] bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Rating</p>
                <p className="mt-2 text-2xl font-semibold text-stone-950">{restaurantDetails.ratingSummary}</p>
              </div>
              <div className="rounded-[24px] bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Hours</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-stone-900"><Clock3 className="h-4 w-4" />{restaurantDetails.hours}</p>
              </div>
              <div className="rounded-[24px] bg-stone-50 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Location</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-stone-900"><MapPin className="h-4 w-4" />{restaurantDetails.location}</p>
              </div>
            </div>
            <p className="text-sm leading-7 text-stone-700">{restaurant.highlight}</p>
            <div className="rounded-[28px] bg-gradient-to-br from-orange-50 to-amber-50 p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900"><ShieldCheck className="h-4 w-4 text-orange-500" />AI review summary</div>
              <p className="mt-3 text-sm leading-7 text-stone-700">{restaurantDetails.aiSummary}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-4">
              {restaurantDetails.stats.map((stat) => (
                <div key={stat.label} className="rounded-2xl bg-stone-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{stat.label}</p>
                  <p className="mt-2 text-2xl font-semibold text-stone-950">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Planning" title="Visit planning" body="Useful context before you commit." />
            <div className="mt-5 space-y-3">
              {[
                ["Best time", "Before 7:30 PM for shorter waits"],
                ["Peak hours", "8 PM to 10 PM"],
                ["Warning labels", restaurantDetails.warnings.join(" · ")],
                ["Price band", restaurantDetails.priceRange]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-stone-200 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{label}</p>
                  <p className="mt-2 text-sm font-medium text-stone-900">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <Link href="/reviews/new" className={buttonStyles()}>Add review</Link>
              <Button tone="ghost">Claim restaurant</Button>
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Gallery" title="Photo gallery" body="Visual context around the place and its hero dishes." />
            <div className="mt-5 grid grid-cols-2 gap-3">
              {restaurantDetails.gallery.map((item, index) => (
                <div key={item} className={`rounded-[24px] bg-gradient-to-br ${index % 2 === 0 ? "from-orange-200 to-amber-100" : "from-stone-200 to-rose-100"} p-4 text-sm font-semibold text-stone-900`}>
                  {item}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Menu stars" title="Popular dishes" body="The dishes that drive saves, reviews, and repeat visits." />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trendingDishes.map((dish) => (
            <DishCard key={dish.id} dish={{ ...dish, restaurantName: restaurant.name, restaurantSlug: restaurant.slug }} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Community" title="Verified user reviews" body="Trust-backed opinions, media context, and owner responses." />
        <div className="mt-6 grid gap-5">
          {reviewFeed.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
