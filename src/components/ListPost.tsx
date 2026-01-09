import SizeDropdown from "./dropdowns/SizeDropdown";
import SortDropdown from "./dropdowns/SortDropdown";
import IdeaCard from "./IdeaCard";
import Pagination from "./Pagination";

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
  return (
    <section className="min-h-screen px-30 ">
      <div className="flex flex-row items-center justify-between py-10 space-y-6">
        <div className="text-black">
          Showing {meta.from}-{meta.to} of {meta.total}
        </div>
        <div className="flex flex-row items-center space-x-4">
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
      <div className="grid grid-cols-1 gap-6 px-4 pb-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {ideas &&
          ideas.map((idea: any) => {
            return <IdeaCard key={idea.id} idea={idea} />;
          })}
      </div>
      <Pagination
        currentPage={Number(page)}
        totalPages={Math.ceil(Number(meta.total) / Number(size))}
        onPageChange={(page) => updateQuery({ page })}
      ></Pagination>
    </section>
  );
}
