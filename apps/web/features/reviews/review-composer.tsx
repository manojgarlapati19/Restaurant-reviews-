"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewSchema } from "@dishcovery/types";
import { Camera, Receipt, Sparkles, Star, UtensilsCrossed } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Badge, Button, Card } from "../../components/ui";

const composerSchema = createReviewSchema.pick({
  targetType: true,
  title: true,
  body: true,
  worthItScore: true
});

type ComposerValues = z.infer<typeof composerSchema>;

const steps = [
  { label: "Pick place", icon: UtensilsCrossed },
  { label: "Rate dish", icon: Star },
  { label: "Write review", icon: Sparkles },
  { label: "Upload media", icon: Camera },
  { label: "Verify bill", icon: Receipt }
];

export function ReviewComposer() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful }
  } = useForm<ComposerValues>({
    resolver: zodResolver(composerSchema),
    defaultValues: {
      targetType: "dish",
      worthItScore: 8
    }
  });

  const onSubmit = (_values: ComposerValues) => {
    reset();
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="bg-gradient-to-br from-stone-950 via-orange-900 to-amber-500 p-6 text-white sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-white/65">Add review</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Multi-step review flow</h3>
            <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">
              Capture dish-level nuance with ratings, bill proof, tags, and media so discovery can rank taste and trust together.
            </p>
          </div>
          <Badge tone="default" className="bg-white/15 text-white border-white/10">Step 3 of 5</Badge>
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          {steps.map(({ label, icon: Icon }, index) => (
            <div key={label} className="rounded-2xl border border-white/12 bg-white/10 p-3 text-sm">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Icon className="h-4 w-4" />
                {index + 1}. {label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <form className="space-y-5 p-6 sm:p-7" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-stone-700">
            Review type
            <select {...register("targetType")} className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none">
              <option value="dish">Dish review</option>
              <option value="restaurant">Restaurant review</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-stone-700">
            Worth-it score
            <input
              type="number"
              min={1}
              max={10}
              {...register("worthItScore", { valueAsNumber: true })}
              className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
            />
          </label>
        </div>
        <label className="block space-y-2 text-sm font-medium text-stone-700">
          Review title
          <input
            {...register("title")}
            placeholder="Ex: Smoky biryani with surprising depth for the price"
            className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 outline-none"
          />
          {errors.title ? <span className="text-xs text-rose-600">{errors.title.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-medium text-stone-700">
          Why should people order it?
          <textarea
            {...register("body")}
            rows={6}
            placeholder="Talk taste, quantity, value, consistency, and whether you would reorder it."
            className="w-full rounded-[24px] border border-stone-200 bg-white px-4 py-3 outline-none"
          />
          {errors.body ? <span className="text-xs text-rose-600">{errors.body.message}</span> : null}
        </label>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "Upload dish photo or video",
            "Attach bill for trust boost",
            "Add tags like spicy, oily, family friendly"
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-stone-50 px-4 py-4 text-sm text-stone-700">
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-stone-500">Validated locally against the existing review contract in `@dishcovery/types`.</p>
          <div className="flex gap-3">
            <Button tone="ghost" type="button">Preview</Button>
            <Button type="submit">Save draft</Button>
          </div>
        </div>
        {isSubmitSuccessful ? (
          <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            Draft validated locally. Hook this up to `POST /v1/reviews` once the API environment is active.
          </p>
        ) : null}
      </form>
    </Card>
  );
}
