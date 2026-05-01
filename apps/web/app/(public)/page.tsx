import Link from "next/link";
import { ArrowRight, Map, Sparkles, Trophy, Users } from "lucide-react";
import { AppShell } from "../../components/app-shell";
import { DishCard } from "../../components/dish-card";
import { RestaurantCard } from "../../components/restaurant-card";
import { ReviewCard } from "../../components/review-card";
import { ReviewComposer } from "../../features/reviews/review-composer";
import {
  dishBattle,
  featuredRestaurants,
  foodCategories,
  hiddenGemDishes,
  hiddenGemRestaurants,
  homeSignals,
  leaderboard,
  nearbyRestaurants,
  recommendationOfTheDay,
  reviewFeed,
  topReviewedDishes,
  topReviewers,
  trendingDishes
} from "../../lib/mock-data";
import { Badge, Button, Card, SearchBar, SectionTitle, buttonStyles } from "../../components/ui";

export default function HomePage() {
  return (
    <AppShell title="Find the dish, not just the place" subtitle="Premium food discovery built around taste, trust, and value.">
      <section className="grid gap-6 xl:grid-cols-[1.18fr,0.82fr]">
        <Card className="overflow-hidden p-0">
          <div className="bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.18),_transparent_28%),linear-gradient(135deg,_#1c1917_0%,_#7c2d12_48%,_#fdba74_100%)] px-5 py-6 text-white sm:px-8 sm:py-8">
            <Badge tone="default" className="border-white/15 bg-white/10 text-white">2026 dish-first discovery</Badge>
            <h2 className="mt-4 max-w-3xl font-[var(--font-serif)] text-5xl leading-none sm:text-6xl">
              Find best biryani under <span className="text-amber-200">₹200</span> near me.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Search by craving, compare dishes across restaurants, and see which reviews are actually trustworthy before you order.
            </p>
            <div className="mt-6 max-w-2xl">
              <SearchBar defaultValue="Find best biryani under ₹200 near me" />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button tone="secondary">Start exploring</Button>
              <Link href="/reviews/new" className={buttonStyles("glass")}>Add your review</Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ["1.8k+", "Dish-level reviews"],
                ["82%", "Verified trust signals"],
                ["320+", "Nearby dish comparisons"]
              ].map(([value, label]) => (
                <div key={label} className="rounded-[24px] border border-white/12 bg-white/10 p-4 backdrop-blur">
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-sm text-white/70">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Today" title={recommendationOfTheDay.headline} body={recommendationOfTheDay.reason} />
            <p className="mt-5 rounded-[24px] bg-gradient-to-br from-orange-50 to-amber-50 p-5 text-base font-medium leading-7 text-stone-900">
              {recommendationOfTheDay.recommendation}
            </p>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Battle" title={dishBattle.title} body={dishBattle.subtitle} />
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[dishBattle.left, dishBattle.right].map((entry) => (
                <div key={entry.name} className="rounded-[24px] bg-stone-50 p-4">
                  <p className="text-sm font-semibold text-stone-950">{entry.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{entry.dish}</p>
                  <div className="mt-4 h-2 rounded-full bg-stone-200">
                    <div className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-300" style={{ width: `${entry.score}%` }} />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-stone-900">{entry.score}% vote share</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Signals" title="Why Dishcovery feels smarter" body="Richer ranking inputs than a basic review website, with startup-style product layers around trust, discovery, and comparison." />
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {homeSignals.map((signal) => (
            <Card key={signal.title} className="p-6">
              <Sparkles className="h-5 w-5 text-orange-500" />
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-stone-950">{signal.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{signal.copy}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Trending" title="Trending dishes" body="The most talked-about dish experiences near you, ranked with taste, value, and verification in mind." action={<Link href="/search" className="text-sm font-semibold text-stone-700">Explore all</Link>} />
        <div className="mt-6 grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {trendingDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-br from-stone-950 to-stone-800 p-6 text-white sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <SectionTitle eyebrow="Heatmap" title="Food heatmap" body="Map placeholder for neighborhood concentration, trending density, and dish demand." />
              <Badge tone="default" className="border-white/12 bg-white/10 text-white">Map beta</Badge>
            </div>
            <div className="mt-6 grid min-h-[360px] place-items-center rounded-[28px] bg-heatmap-grid bg-[length:42px_42px] bg-center bg-stone-900/70 p-6">
              <div className="w-full max-w-md space-y-4">
                {nearbyRestaurants.map((restaurant, index) => (
                  <div key={restaurant.slug} className="rounded-[24px] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur" style={{ marginLeft: `${index * 14}px` }}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{restaurant.name}</p>
                        <p className="text-sm text-white/65">{restaurant.distance}</p>
                      </div>
                      <Map className="h-4 w-4 text-amber-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Categories" title="Food categories" body="Jump straight into the kind of food you actually want." />
            <div className="mt-5 flex flex-wrap gap-3">
              {foodCategories.map((category) => (
                <Badge key={category} tone="accent" className="px-4 py-2 text-sm">{category}</Badge>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Leaderboard" title="Top reviewers" body="Gamified community rankings with specialty badges and higher trust influence." />
            <div className="mt-5 space-y-3">
              {topReviewers.map((reviewer, index) => (
                <div key={reviewer.username} className="flex items-center justify-between rounded-[24px] bg-stone-50 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-stone-950">#{index + 1} {reviewer.name}</p>
                    <p className="mt-1 text-sm text-stone-600">{reviewer.badge} · {reviewer.specialty}</p>
                  </div>
                  <Badge tone="dark">{reviewer.points} pts</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle eyebrow="Nearby" title="Nearby restaurants" body="High-signal places close to you, not just the loudest names." />
        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          {nearbyRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1.06fr,0.94fr]">
        <div>
          <SectionTitle eyebrow="Deep cuts" title="Hidden gems" body="Small-review-count spots with strong trust and value signals." />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {hiddenGemDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
        <Card className="p-6">
          <SectionTitle eyebrow="Top reviewed" title="Most reviewed dishes" body="Community volume meets premium discovery curation." />
          <div className="mt-5 space-y-4">
            {topReviewedDishes.slice(0, 4).map((dish, index) => (
              <div key={dish.id} className="flex items-center justify-between rounded-[24px] bg-stone-50 px-4 py-4">
                <div>
                  <p className="text-sm font-semibold text-stone-950">#{index + 1} {dish.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{dish.restaurantName} · {dish.reviewCount} reviews</p>
                </div>
                <Badge tone="accent">{dish.worthItScore}/10</Badge>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1fr,0.95fr]">
        <div>
          <SectionTitle eyebrow="Community" title="Latest trusted reviews" body="Bill verification, media evidence, and owner replies help separate signal from noise." />
          <div className="mt-6 grid gap-5">
            {reviewFeed.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Hidden gem restaurants" title="Worth a detour" body="Places you might miss if you only sort by popularity." />
            <div className="mt-5 space-y-4">
              {hiddenGemRestaurants.map((restaurant) => (
                <div key={restaurant.slug} className="rounded-[24px] bg-stone-50 p-4">
                  <p className="text-base font-semibold text-stone-950">{restaurant.name}</p>
                  <p className="mt-1 text-sm text-stone-600">{restaurant.highlight}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Leaderboard" title="Community standings" body="Weekly points from helpful reviews, verified bills, and photo evidence." />
            <div className="mt-5 space-y-3">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-3">
                  <p className="text-sm font-semibold text-stone-900">#{entry.rank} {entry.name}</p>
                  <Badge tone="default">{entry.score}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-12 grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <ReviewComposer />
        <Card className="bg-gradient-to-br from-stone-950 via-stone-900 to-orange-700 p-6 text-white sm:p-7">
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
            <Trophy className="h-4 w-4" />
            Creator loop
          </div>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight">Help the next diner make a smarter choice.</h3>
          <p className="mt-3 text-sm leading-7 text-white/75">
            Add review photos, upload your bill, and warn people about overpriced dishes, hygiene complaints, or slow service when it matters.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              "Dish-based review scoring",
              "Verified bill badge for stronger trust",
              "Photo and video context",
              "Badges and points for helpful reviews"
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/12 bg-white/10 px-4 py-4 text-sm text-white/85">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/reviews/new" className={buttonStyles("secondary")}>Add review now</Link>
            <Link href="/profile/ayesharahman" className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <Users className="h-4 w-4" />
              See reviewer profiles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </section>
    </AppShell>
  );
}
