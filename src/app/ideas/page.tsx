"use client";

import Banner from "@/src/components/Banner";
import Header from "@/src/components/Header";
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
  const { data: ideas = [], isLoading } = useQuery({
    queryKey: ["ideas", { page, size, sort }],
    queryFn: async () => {
      const res = await fetchIdeas(page, size, sort);
      console.log(res.data);
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
        page={page}
        size={size}
        sort={sort}
        isLoading={isLoading}
        updateQuery={updateQuery}
      ></ListPost>
    </div>
  );
}
