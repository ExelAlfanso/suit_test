import { useState } from "react";
import SizeDropdown from "./dropdowns/SizeDropdown";
import SortDropdown from "./dropdowns/SortDropdown";
import IdeaCard from "./IdeaCard";
import Pagination from "./Pagination";
import SkeletonCard from "./SkeletonCard";
import Loading from "./Loading";

interface QueryMeta {
  page: string | number;
  size: string | number;
  sort: string | number;
}
interface ListPostProps extends QueryMeta {
  ideas: any;
  meta: { from: string; to: string; total: string };
  updateQuery: (params: Partial<QueryMeta>) => void;
  isLoading: boolean;
}

export default function ListPost({
  page,
  size,
  sort,
  ideas,
  meta,
  isLoading,
  updateQuery,
}: ListPostProps) {
  const [initialLoad, setInitialLoad] = useState(true);
  if (!isLoading && initialLoad) {
    setInitialLoad(false);
  }
  return (
    <section className="min-h-screen px-30 ">
      <div className="flex flex-col md:flex-row items-start md:items-center  justify-between py-10 ">
        <h2 className="text-lg font-medium text-gray-700">
          Showing {meta.from}-{meta.to} of {meta.total}
        </h2>
        <div className="flex flex-col md:flex-row items-start  gap-4">
          <SizeDropdown
            value={size}
            updateQuery={updateQuery}
            options={[
              { label: "10", value: 10 },
              { label: "20", value: 20 },
              { label: "50", value: 50 },
            ]}
          ></SizeDropdown>
          <SortDropdown
            value={sort}
            options={[
              { label: "Newest", value: "published_at" },
              { label: "Oldest", value: "-published_at" },
            ]}
            updateQuery={updateQuery}
          ></SortDropdown>
        </div>
      </div>
      <div
        className={`${
          !initialLoad && isLoading
            ? "flex items-center justify-center h-50"
            : "grid grid-cols-1 gap-6 px-4 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {initialLoad && isLoading
          ? Array.from({ length: Number(size) || 6 }).map((_, idx) => (
              <SkeletonCard key={`skeleton-${idx}`} />
            ))
          : ideas &&
            ideas.map((idea: any) => {
              return <IdeaCard key={idea.id} idea={idea} />;
            })}
        {!initialLoad && isLoading && <Loading />}
      </div>
      <Pagination
        currentPage={Number(page)}
        totalPages={Math.ceil(Number(meta.total) / Number(size))}
        isLoading={isLoading}
        onPageChange={(page) => updateQuery({ page })}
      ></Pagination>
    </section>
  );
}
