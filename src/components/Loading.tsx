export default function Loading() {
  return (
    <span className="flex items-center gap-2 pr-2 text-sm text-gray-500 h-full">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
      Loading...
    </span>
  );
}
