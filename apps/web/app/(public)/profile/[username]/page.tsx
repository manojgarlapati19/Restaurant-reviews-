import { AppShell } from "../../../../components/app-shell";
import { ReviewCard } from "../../../../components/review-card";
import { profileSummary, reviewFeed } from "../../../../lib/mock-data";
import { Badge, Card, SectionTitle } from "../../../../components/ui";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return (
    <AppShell title={`@${username}`} subtitle="Reviewer profile, badges, favorites, and trust impact.">
      <section className="grid gap-6 xl:grid-cols-[0.84fr,1.16fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="h-24 w-24 rounded-[28px] bg-gradient-to-br from-orange-300 to-rose-300" />
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-stone-950">{profileSummary.name}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-700">{profileSummary.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {profileSummary.badges.map((badge) => (
                <Badge key={badge} tone="accent">{badge}</Badge>
              ))}
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-2">
            {profileSummary.stats.map((stat) => (
              <Card key={stat.label} className="p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold text-stone-950">{stat.value}</p>
              </Card>
            ))}
          </div>
          <Card className="p-6">
            <SectionTitle eyebrow="Favorites" title="Favorite dishes" />
            <div className="mt-5 space-y-3">
              {profileSummary.favorites.map((favorite) => (
                <div key={favorite} className="rounded-2xl bg-stone-50 px-4 py-4 text-sm font-medium text-stone-800">
                  {favorite}
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="space-y-5">
          <SectionTitle eyebrow="Reviews" title="Recent reviews" body="A stronger profile surface for community credibility and tastemaker identity." />
          {reviewFeed.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
