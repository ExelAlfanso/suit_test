import Image from "next/image";
export default function SkeletonCard() {
  return (
    <div className="relative overflow-hidden bg-white rounded-lg shadow-md">
      <div className="relative aspect-4/3 w-full bg-gray-300 animate-pulse rounded"></div>
      <div className="p-4 space-y-2">
        <div className="h-3 w-28 bg-gray-200 animate-pulse rounded" />
        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded" />
      </div>
    </div>
  );
}
