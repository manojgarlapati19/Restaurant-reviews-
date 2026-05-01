import { AppShell } from "../../../components/app-shell";
import { DishCard } from "../../../components/dish-card";
import { RestaurantCard } from "../../../components/restaurant-card";
import { featuredRestaurants, filterGroups, hiddenGemDishes, topReviewedDishes, trendingDishes } from "../../../lib/mock-data";
import { Badge, Card, FilterChips, SearchBar, SectionTitle } from "../../../components/ui";

export default function SearchPage() {
  return (
    <AppShell title="Explore dishes and restaurants" subtitle="Search by craving, cuisine, budget, trust, and context.">
      <section className="grid gap-6 xl:grid-cols-[0.76fr,1.24fr]">
        <div className="space-y-6">
          <Card className="p-5 sm:p-6">
            <SectionTitle eyebrow="Search" title="Find your next bite" body="A dish-first discovery surface with structured filters and AI-style query understanding." />
            <div className="mt-5">
              <SearchBar defaultValue="Best biryani under ₹200 near me" />
            </div>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Cuisine</p>
                <div className="mt-2"><FilterChips items={filterGroups.cuisine} activeItem="Biryani" /></div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Budget</p>
                <div className="mt-2"><FilterChips items={filterGroups.budget} activeItem="Under ₹200" /></div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Quick filters</p>
                <div className="mt-2"><FilterChips items={filterGroups.quick} activeItem="Open now" /></div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Dietary</p>
                <div className="mt-2"><FilterChips items={filterGroups.dietary} /></div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Sort</p>
                <div className="mt-2"><FilterChips items={filterGroups.sort} activeItem="Trending" /></div>
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="AI parsing" title="Prompt understanding" body="Structured intent extraction from a natural language food query." />
            <div className="mt-5 space-y-3">
              {[
                ["Query", "Best biryani under ₹200 near me"],
                ["Detected intent", "Dish search · Budget cap · Nearby ranking · Open now bias"],
                ["Summary", "Taste leaders rise first, but places with slow-service warnings get down-ranked for dine-in intent."]
              ].map(([label, value]) => (
                <div key={label} className="rounded-[24px] bg-stone-50 px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">{label}</p>
                  <p className="mt-2 text-sm font-medium text-stone-900">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-8">
          <section>
            <SectionTitle eyebrow="Dishes" title="Top dish matches" body="Results optimized for flavor, value, and confidence rather than raw popularity." />
            <div className="mt-5 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {trendingDishes.map((dish) => (
                <DishCard key={dish.id} dish={dish} />
              ))}
            </div>
          </section>
          <section>
            <SectionTitle eyebrow="Restaurants" title="Restaurant matches" body="Nearby places that align with the dish results and your filter stack." />
            <div className="mt-5 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.slug} restaurant={restaurant} />
              ))}
            </div>
          </section>
          <section className="grid gap-6 xl:grid-cols-[1fr,0.9fr]">
            <Card className="p-6">
              <SectionTitle eyebrow="Comparisons" title="Worth-it leaderboard" body="Quick comparison of top-reviewed dishes in this search context." />
              <div className="mt-5 space-y-3">
                {topReviewedDishes.slice(0, 4).map((dish) => (
                  <div key={dish.id} className="flex items-center justify-between rounded-2xl border border-stone-200 px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-stone-900">{dish.name}</p>
                      <p className="mt-1 text-sm text-stone-600">{dish.restaurantName}</p>
                    </div>
                    <Badge tone="accent">{dish.worthItScore}/10</Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <SectionTitle eyebrow="Alt picks" title="Hidden gems nearby" body="Less obvious matches with strong signal quality." />
              <div className="mt-5 space-y-3">
                {hiddenGemDishes.map((dish) => (
                  <div key={dish.id} className="rounded-2xl bg-stone-50 px-4 py-4">
                    <p className="text-sm font-semibold text-stone-900">{dish.name}</p>
                    <p className="mt-1 text-sm text-stone-600">{dish.summary}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </section>
    </AppShell>
  );
}
