import Skeleton from "@/components/skeleton"

export default function Loading() {
  return <>
    <h1 className="text-4xl font-semibold mb-8">
      Settings
    </h1>
    <div className="space-y-4">
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
      <Skeleton className="h-12" />
    </div>
  </>
}