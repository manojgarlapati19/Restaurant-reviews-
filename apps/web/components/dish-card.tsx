import Link from "next/link";
import { ArrowUpRight, Clock3, Flame, MapPin } from "lucide-react";
import { Badge, Card, Chip, Rating } from "./ui";
import type { DishPreview } from "../lib/mock-data";

export function DishCard({ dish }: { dish: DishPreview }) {
  return (
    <Card className="group overflow-hidden p-0 transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(15,23,42,0.14)]">
      <div className={`relative h-40 w-full bg-gradient-to-br ${dish.gradient}`}>
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          <Badge tone="dark">{dish.category}</Badge>
          <Badge tone={dish.isVeg ? "success" : "warning"}>{dish.isVeg ? "Veg" : "Non-veg"}</Badge>
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">{dish.cuisine}</p>
            <Link href={`/dishes/${dish.id}`} className="mt-1 block text-xl font-semibold tracking-tight text-stone-950">
              {dish.name}
            </Link>
            <Link href={`/restaurants/${dish.restaurantSlug}`} className="mt-1 inline-flex text-sm text-stone-600 hover:text-stone-950">
              {dish.restaurantName}
            </Link>
          </div>
          <Rating rating={dish.rating} count={dish.reviewCount} className="shrink-0" />
        </div>
        <p className="text-sm leading-6 text-stone-600">{dish.summary}</p>
        <div className="flex flex-wrap gap-2">
          {dish.tags.map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
          {dish.warningLabels.map((warning) => (
            <Badge key={warning} tone="warning">
              {warning}
            </Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm text-stone-600 sm:grid-cols-4">
          <div className="rounded-2xl bg-stone-50 px-3 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Price</p>
            <p className="mt-1 font-semibold text-stone-900">{dish.price}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 px-3 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Worth it</p>
            <p className="mt-1 font-semibold text-stone-900">{dish.worthItScore}/10</p>
          </div>
          <div className="rounded-2xl bg-stone-50 px-3 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">ETA</p>
            <p className="mt-1 inline-flex items-center gap-1 font-semibold text-stone-900">
              <Clock3 className="h-3.5 w-3.5" />
              {dish.deliveryTime}
            </p>
          </div>
          <div className="rounded-2xl bg-stone-50 px-3 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-stone-400">Distance</p>
            <p className="mt-1 inline-flex items-center gap-1 font-semibold text-stone-900">
              <MapPin className="h-3.5 w-3.5" />
              {dish.distance}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-stone-900">
          <span className="inline-flex items-center gap-1">
            <Flame className="h-4 w-4 text-orange-500" />
            {dish.heat} heat
          </span>
          <Link href={`/dishes/${dish.id}`} className="inline-flex items-center gap-1 text-stone-700 transition group-hover:text-stone-950">
            View dish
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
