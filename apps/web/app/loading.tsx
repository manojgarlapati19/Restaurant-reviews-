import { Card, StateCard } from "../components/ui";

export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid w-full gap-6 md:grid-cols-2">
        <StateCard title="Preparing your food map" body="Loading trending dishes, trust signals, and nearby recommendations." />
        <Card className="space-y-4 p-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-24 animate-pulse rounded-[24px] bg-stone-100" />
          ))}
        </Card>
      </div>
    </div>
  );
}
