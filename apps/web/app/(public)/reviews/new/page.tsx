import { AppShell } from "../../../../components/app-shell";
import { ReviewComposer } from "../../../../features/reviews/review-composer";
import { Badge, Card, SectionTitle } from "../../../../components/ui";

export default function AddReviewPage() {
  return (
    <AppShell title="Add a review" subtitle="Dish-first, evidence-backed, and designed for speed on mobile.">
      <section className="grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
        <ReviewComposer />
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle eyebrow="Flow" title="Clean multi-step review UX" body="A review system built around real dining context, not just star ratings." />
            <div className="mt-5 grid gap-3">
              {[
                "1. Choose restaurant",
                "2. Choose dish",
                "3. Add ratings",
                "4. Add tags and media",
                "5. Upload bill for verification"
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-stone-50 px-4 py-4 text-sm font-medium text-stone-800">
                  {item}
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <SectionTitle eyebrow="Trust" title="Verification perks" body="Stronger evidence increases review confidence and ranking influence." />
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "Verified bill badge",
                "Photo and video support",
                "Higher trust score",
                "More leaderboard points"
              ].map((item) => (
                <Badge key={item} tone="accent" className="px-4 py-2 text-sm">{item}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </AppShell>
  );
}
