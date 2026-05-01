import Link from "next/link";
import { ArrowUpRight, Clock3, MapPin } from "lucide-react";
import { Badge, Card, Chip, Rating } from "./ui";
import type { RestaurantPreview } from "../lib/mock-data";

export function RestaurantCard({ restaurant }: { restaurant: RestaurantPreview }) {
  return (
    <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
      <div className={`h-36 bg-gradient-to-br ${restaurant.coverGradient} p-4 text-white`}>
        <div className="flex items-center justify-between gap-3">
          <Badge tone="dark">{restaurant.priceRange}</Badge>
          <Badge tone={restaurant.openNow ? "success" : "warning"}>{restaurant.openNow ? "Open now" : "Opens later"}</Badge>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link href={`/restaurants/${restaurant.slug}`} className="block text-xl font-semibold tracking-tight text-stone-950">
              {restaurant.name}
            </Link>
            <p className="mt-1 text-sm text-stone-600">{restaurant.neighborhood}, {restaurant.city}</p>
          </div>
          <Rating rating={restaurant.rating} count={restaurant.reviewCount} className="shrink-0" />
        </div>
        <div className="flex flex-wrap gap-2">
          {restaurant.cuisines.map((cuisine) => (
            <Chip key={cuisine}>{cuisine}</Chip>
          ))}
          {restaurant.qualitySignals.map((signal) => (
            <Badge key={signal} tone="accent">
              {signal}
            </Badge>
          ))}
        </div>
        <p className="text-sm leading-6 text-stone-600">{restaurant.highlight}</p>
        <div className="rounded-[24px] bg-stone-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">AI summary</p>
          <p className="mt-2 text-sm leading-6 text-stone-700">{restaurant.summary}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm font-medium text-stone-700">
          <span>{restaurant.popularDish}</span>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{restaurant.eta}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{restaurant.distance}</span>
          </div>
        </div>
        <Link href={`/restaurants/${restaurant.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700 transition group-hover:text-stone-950">
          View restaurant
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}
