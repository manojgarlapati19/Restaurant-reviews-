import { MessageSquareText, ShieldCheck, Video } from "lucide-react";
import { Badge, Card, Chip } from "./ui";
import type { ReviewPreview } from "../lib/mock-data";

export function ReviewCard({ review }: { review: ReviewPreview }) {
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 to-rose-300 text-sm font-semibold text-stone-950">
            {review.avatarHint}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900">{review.author}</p>
            <p className="text-sm text-stone-500">{review.context}</p>
          </div>
        </div>
        <Badge tone="success">{review.verification}</Badge>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <Badge tone="dark">Trust {review.trustScore}</Badge>
        <Badge tone="accent">Worth it {review.worthItScore}/10</Badge>
        <Badge tone="default">{review.mediaCount} media</Badge>
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-950">{review.title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone-700">{review.body}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {review.tags.map((tag) => (
          <Chip key={tag}>{tag}</Chip>
        ))}
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
          <div className="inline-flex items-center gap-2 font-semibold text-stone-900">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Trust-backed review
          </div>
          <p className="mt-2 text-sm leading-6">Signal boosted because this review includes stronger verification context.</p>
        </div>
        <div className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-700">
          <div className="inline-flex items-center gap-2 font-semibold text-stone-900">
            <Video className="h-4 w-4 text-orange-500" />
            Media context
          </div>
          <p className="mt-2 text-sm leading-6">Short-form media helps validate portion size, plating, and actual dining conditions.</p>
        </div>
      </div>
      {review.ownerReply ? (
        <div className="mt-5 rounded-[24px] border border-orange-100 bg-orange-50/80 p-4 text-sm text-stone-700">
          <p className="inline-flex items-center gap-2 font-semibold text-stone-900">
            <MessageSquareText className="h-4 w-4 text-orange-500" />
            Owner reply
          </p>
          <p className="mt-2 leading-6">{review.ownerReply}</p>
        </div>
      ) : null}
    </Card>
  );
}
