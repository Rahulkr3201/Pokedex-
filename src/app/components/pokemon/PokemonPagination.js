"use client";

import { PAGE_SIZE } from "../../lib/constants";

export default function PokemonPagination({ page, totalCount, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  const getPages = () => {
    const pages = [];

    pages.push(1);

    if (page > 3) pages.push("left-ell");

    for (let p = page - 1; p <= page + 1; p++) {
      if (p > 1 && p < totalPages) pages.push(p);
    }

    if (page < totalPages - 2) pages.push("right-ell");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 rounded-lg bg-white text-black border text-sm font-semibold transition ${
          page === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-yellow-300 cursor-pointer"
        }`}
      >
        ◀ previous
      </button>

      {pages.map((p, index) =>
        typeof p === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-lg border cursor-pointer text-sm font-semibold transition ${
              p === page
                ? "bg-yellow-400 border-yellow-500 text-black"
                : "bg-white text-black hover:bg-yellow-200"
            }`}
          >
            {p}
          </button>
        ) : (
          <span key={index} className="px-2 text-white text-lg">
            …
          </span>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 rounded-lg bg-white text-black border text-sm font-semibold transition ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-yellow-300 cursor-pointer"
        }`}
      >
        Next ▶
      </button>
    </div>
  );
}
