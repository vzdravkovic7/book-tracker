import React from "react";
import type { BookFilters } from "../../hooks/useBookSearch";
import FilterCardSection from "../common/FilterCardSection";
import FilterField from "../common/FilterField";

interface Props {
  filters: BookFilters;
  onChange: (key: keyof BookFilters, value: any) => void;
  onReset: () => void;
  genres: string[];
  authors: string[];
}

const BookFilterControls: React.FC<Props> = ({
  filters,
  onChange,
  onReset,
  genres,
  authors,
}) => {
  return (
    <div className="mb-8 bg-white dark:bg-background rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
      {/* Basic Filters */}
      <FilterCardSection title="Basic Filters" open>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FilterField label="Search">
            <input
              type="text"
              placeholder="Search books..."
              value={filters.searchTerm}
              onChange={(e) => onChange("searchTerm", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            />
          </FilterField>

          <FilterField label="Sort By">
            <select
              value={filters.sortBy}
              onChange={(e) => onChange("sortBy", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="createdAt">Date Added</option>
            </select>
          </FilterField>

          <FilterField label="Sort Direction">
            <select
              value={filters.sortDirection}
              onChange={(e) => onChange("sortDirection", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </FilterField>

          <FilterField label="Genre">
            <select
              value={filters.genre}
              onChange={(e) => onChange("genre", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            >
              <option value="">All Genres</option>
              {genres.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Author">
            <select
              value={filters.author}
              onChange={(e) => onChange("author", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            >
              <option value="">All Authors</option>
              {authors.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </FilterField>

          <FilterField label="Status">
            <select
              value={filters.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            >
              <option value="">All Statuses</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
              <option value="Wishlist">Wishlist</option>
            </select>
          </FilterField>

          <FilterField label="Review Contains">
            <input
              type="text"
              value={filters.review}
              onChange={(e) => onChange("review", e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
            />
          </FilterField>

          <FilterField label="Rating">
            <input
              type="number"
              min={1}
              max={5}
              value={filters.rating}
              onChange={(e) =>
                onChange(
                  "rating",
                  e.target.value === "" ? "" : parseInt(e.target.value)
                )
              }
              className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700 w-24"
            />
          </FilterField>
        </div>
      </FilterCardSection>

      {/* Date Filters */}
      <FilterCardSection title="Date Filters">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Date Added From", "dateAddedFrom"],
            ["Date Added To", "dateAddedTo"],
            ["Date Completed From", "dateCompletedFrom"],
            ["Date Completed To", "dateCompletedTo"],
          ].map(([label, key]) => (
            <FilterField key={key} label={label}>
              <input
                type="date"
                value={filters[key as keyof BookFilters]}
                onChange={(e) =>
                  onChange(key as keyof BookFilters, e.target.value)
                }
                className="border px-3 py-2 rounded-lg text-sm dark:bg-background dark:border-gray-700"
              />
            </FilterField>
          ))}
        </div>
      </FilterCardSection>

      {/* Reset Button */}
      <div className="mt-6 text-center">
        <button
          onClick={onReset}
          className="text-sm px-4 py-2 rounded-lg transition-colors duration-300 
              bg-red-500 hover:bg-red-600 text-white 
              dark:bg-red-400 dark:hover:bg-red-600 dark:text-gray-900"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default BookFilterControls;
