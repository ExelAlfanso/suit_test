import { useState } from "react";
import PaginationButton from "./buttons/PaginationButton";
import Loading from "./Loading";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 4) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 text-black bg-white">
      <PaginationButton
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(1)}
      >
        {"<<"}
      </PaginationButton>

      <PaginationButton
        disabled={currentPage === 1 || isLoading}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </PaginationButton>
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index}>...</span>
        ) : (
          <PaginationButton
            key={index}
            className={page === currentPage ? "font-bold underline" : ""}
            onClick={() => {
              if (!isLoading) {
                onPageChange(page);
              }
            }}
          >
            {page}
          </PaginationButton>
        )
      )}

      <PaginationButton
        disabled={currentPage === totalPages || isLoading}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === totalPages || isLoading}
        onClick={() => onPageChange(totalPages)}
      >
        {">>"}
      </PaginationButton>
    </div>
  );
}
