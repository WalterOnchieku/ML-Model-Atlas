
"use client";

// components/models/ModelFilters.js
// Controlled search and filtering interface for the model catalogue.

import {
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

function FilterSelect({ label, value, onChange, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-2">
      <span className="text-xs font-medium text-[#A8C4C0]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#DAFBF5]/12 bg-[#102A2B] px-3 py-3 text-sm text-[#DAFBF5] outline-none transition focus:border-[#02BFA7]/60"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function ModelFilters({
  search,
  setSearch,
  selectedFamily,
  setSelectedFamily,
  selectedProblem,
  setSelectedProblem,
  selectedCategory,
  setSelectedCategory,
  families,
  availableProblems,
  categories,
  showFilters,
  setShowFilters,
  hasActiveFilters,
  resetFilters,
}) {
  return (
    <section>
      {/* Section heading and filter visibility control */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
            Explore the catalogue
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Model explorer
          </h2>

          <p className="mt-2 text-sm text-[#A8C4C0]">
            Search by name, task, technique, or real-world application.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowFilters((current) => !current)}
          aria-expanded={showFilters}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#DAFBF5]/15 px-4 py-2.5 text-sm text-[#DAFBF5] transition hover:border-[#02BFA7]/50 sm:self-auto"
        >
          <Filter size={16} />
          {showFilters ? "Hide filters" : "Show filters"}
        </button>
      </div>

      {/* Search field */}
      <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#DAFBF5]/12 bg-[#102A2B]/60 px-4 transition focus-within:border-[#02BFA7]/50">
        <Search size={19} className="shrink-0 text-[#02BFA7]" />

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Try spam detection, image classification, or Logistic Regression…"
          aria-label="Search machine learning models"
          className="min-w-0 flex-1 bg-transparent py-4 text-sm text-[#DAFBF5] outline-none placeholder:text-[#72918D]"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            aria-label="Clear search"
            className="rounded-lg p-1.5 text-[#A8C4C0] hover:bg-[#DAFBF5]/5 hover:text-[#DAFBF5]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Optional filter controls */}
      {showFilters && (
        <div className="mt-4 rounded-2xl border border-[#DAFBF5]/10 bg-[#0B2021] p-4 sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal
              size={16}
              className="text-[#02BFA7]"
            />
            <h3 className="text-sm font-semibold">
              Refine your results
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <FilterSelect
              label="Problem type"
              value={selectedProblem}
              onChange={setSelectedProblem}
              options={availableProblems}
            />

            <FilterSelect
              label="Model family"
              value={selectedFamily}
              onChange={setSelectedFamily}
              options={families}
            />

            <FilterSelect
              label="Category"
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={categories}
            />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#02BFA7] transition hover:text-[#DAFBF5]"
            >
              <X size={14} />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </section>
  );
}
