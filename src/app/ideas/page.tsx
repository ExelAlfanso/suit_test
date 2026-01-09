"use client";

import Banner from "@/src/components/Banner";
import ListPost from "@/src/components/ListPost";
import { useUpdateQuery } from "@/src/hooks/useUpdateQuery";
import { fetchIdeas } from "@/src/service/IdeaService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function IdeasPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const size = parseInt(searchParams.get("size") || "10");
  const sort = searchParams.get("sort") || "published_at";

  const sanitizedPage = Math.max(Number(page), 1);
  const sanitizedSize = Math.min(Math.max(Number(size), 10), 50);
  const sanitizedSort =
    sort === "published_at" ? "published_at" : "-published_at";
  console.log("sanitized", { sanitizedPage, sanitizedSize, sanitizedSort });
  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["ideas", { sanitizedPage, sanitizedSize, sanitizedSort }],
    queryFn: async () => {
      const res = await fetchIdeas(
        sanitizedPage.toString(),
        sanitizedSize,
        sanitizedSort
      );
      return res;
    },
  });
  const updateQuery = useUpdateQuery();
  return (
    <div className="min-h-screen text-white">
      <Banner></Banner>
      <ListPost
        ideas={ideas?.data || []}
        meta={{
          from: ideas?.meta?.from || "1",
          to: ideas?.meta?.to || "10",
          total: ideas?.meta?.total || "28",
        }}
        page={sanitizedPage}
        size={sanitizedSize}
        sort={sanitizedSort}
        isLoading={isLoading}
        updateQuery={updateQuery}
      ></ListPost>
    </div>
  );
}
