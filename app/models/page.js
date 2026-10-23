
"use client";

// app/models/page.js
// Model library page with search, family filters, problem-type filters,
// category filters, result counts, and responsive model cards.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  Code2,
  Cpu,
  Database,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import models from "@/data/models";
import ModelCard from "@/components/models/ModelCard";
import ModelFilters from "@/components/models/ModelFilters";

const ALL = "all";

const PROBLEM_TYPES = [
  { value: "classification", label: "Classification" },
  { value: "regression", label: "Regression" },
  { value: "clustering", label: "Clustering" },
  { value: "forecasting", label: "Forecasting" },
  { value: "anomaly-detection", label: "Anomaly detection" },
  { value: "dimensionality-reduction", label: "Dimensionality reduction" },
  { value: "computer-vision", label: "Computer vision" },
  { value: "natural-language-processing", label: "Natural language processing" },
  { value: "generation", label: "Generation" },
  { value: "recommendation", label: "Recommendation systems" },
];

const CATEGORY_LABELS = {
  "traditional-ml": "Traditional ML",
  "deep-learning": "Deep learning",
  "computer-vision": "Computer vision",
  nlp: "NLP",
  "generative-ai": "Generative AI",
  forecasting: "Forecasting",
  "recommendation-systems": "Recommendation systems",
  "reinforcement-learning": "Reinforcement learning",
};

const FAMILY_COLORS = {
  "Traditional Machine Learning": "border-[#02BFA7]/30 text-[#8AE9DB]",
  "Deep Learning": "border-[#FF4D2E]/30 text-[#FF9A85]",
  "Computer Vision": "border-[#02BFA7]/30 text-[#8AE9DB]",
  "Natural Language Processing": "border-[#DAFBF5]/20 text-[#DAFBF5]",
};

function normalise(value) {
  return String(value ?? "")
    .toLowerCase()
    .replaceAll("_", "-")
    .replaceAll(" ", "-");
}

function formatLabel(value) {
  return String(value ?? "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function matchesProblem(model, selectedProblem) {
  if (selectedProblem === ALL) return true;

  const terms = [
    ...(Array.isArray(model.problemTypes) ? model.problemTypes : []),
    ...(Array.isArray(model.categories) ? model.categories : []),
    ...(Array.isArray(model.tags) ? model.tags : []),
  ].map(normalise);

  return terms.includes(normalise(selectedProblem));
}


export default function ModelsPage() {
  const [search, setSearch] = useState("");
  const [selectedFamily, setSelectedFamily] = useState(ALL);
  const [selectedProblem, setSelectedProblem] = useState(ALL);
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [showFilters, setShowFilters] = useState(true);

  const families = useMemo(() => {
    const values = [...new Set(models.map((model) => model.family).filter(Boolean))];

    return [
      { value: ALL, label: "All model families" },
      ...values.sort().map((family) => ({
        value: family,
        label: family,
      })),
    ];
  }, []);

  const categories = useMemo(() => {
    const values = [
      ...new Set(models.flatMap((model) => model.categories || [])),
    ].sort();

    return [
      { value: ALL, label: "All categories" },
      ...values.map((category) => ({
        value: category,
        label:
          CATEGORY_LABELS[normalise(category)] || formatLabel(category),
      })),
    ];
  }, []);

  const availableProblems = useMemo(() => {
    const values = [
      ...new Set(models.flatMap((model) => model.problemTypes || [])),
    ];

    return [
      { value: ALL, label: "All problem types" },
      ...values.sort().map((problem) => ({
        value: problem,
        label: formatLabel(problem),
      })),
    ];
  }, []);

  const filteredModels = useMemo(() => {
    const query = search.trim().toLowerCase();

    return models.filter((model) => {
      const searchableText = [
        model.name,
        model.shortName,
        model.summary,
        model.description,
        model.family,
        ...(model.categories || []),
        ...(model.problemTypes || []),
        ...(model.tags || []),
        ...(model.useCases || []),
        ...(model.whenToUse || []),
        ...(model.projectExample
          ? [
              model.projectExample.title,
              model.projectExample.context,
            ]
          : []),
      ]
        .map((value) => {
          if (typeof value === "string") return value;
          if (value && typeof value === "object") {
            return Object.values(value).filter(
              (item) => typeof item === "string"
            ).join(" ");
          }
          return "";
        })
        .join(" ")
        .toLowerCase();

      const matchesSearch = !query || searchableText.includes(query);
      const matchesFamily =
        selectedFamily === ALL || model.family === selectedFamily;
      const matchesCategory =
        selectedCategory === ALL ||
        (model.categories || []).some(
          (category) =>
            normalise(category) === normalise(selectedCategory)
        );

      return (
        matchesSearch &&
        matchesFamily &&
        matchesProblem(model, selectedProblem) &&
        matchesCategory
      );
    });
  }, [search, selectedFamily, selectedProblem, selectedCategory]);

  const hasActiveFilters =
    search.trim() !== "" ||
    selectedFamily !== ALL ||
    selectedProblem !== ALL ||
    selectedCategory !== ALL;

  function resetFilters() {
    setSearch("");
    setSelectedFamily(ALL);
    setSelectedProblem(ALL);
    setSelectedCategory(ALL);
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        {/* Page heading */}
        <section className="relative overflow-hidden rounded-3xl border border-[#DAFBF5]/10 bg-gradient-to-br from-[#102A2B] via-[#0B2021] to-[#071719] p-6 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full border border-[#02BFA7]/10 sm:size-80" />
          <div className="pointer-events-none absolute -right-2 -top-6 size-48 rounded-full border border-[#02BFA7]/10 sm:size-64" />

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/8 px-3 py-1.5 text-xs font-medium text-[#02BFA7]">
              <Database size={14} />
              THE MODEL LIBRARY
            </div>

            <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Find the right model for the{" "}
              <span className="text-[#02BFA7]">problem you have.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#A8C4C0] sm:text-base">
              Explore machine learning algorithms, deep learning
              architectures, computer vision models, and language models.
              Learn how they work, when to use them, and what trade-offs to
              expect.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/how-to-use"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF4D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#ff654b]"
              >
                <BookOpen size={16} />
                How to use this library
                <ArrowRight size={15} />
              </Link>

              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl border border-[#DAFBF5]/15 px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/50"
              >
                Compare models
              </Link>
            </div>
          </div>
        </section>

        {/* Catalogue summary */}
        <section className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            {
              label: "Models in library",
              value: models.length,
              icon: BrainCircuit,
            },
            {
              label: "Model families",
              value: families.length - 1,
              icon: LayersIcon,
            },
            {
              label: "Problem types",
              value: availableProblems.length - 1,
              icon: SlidersHorizontal,
            },
            {
              label: "Search & filter",
              value: "Explore",
              icon: Search,
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/50 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-[#A8C4C0] sm:text-sm">
                    {item.label}
                  </span>
                  <Icon size={17} className="shrink-0 text-[#02BFA7]" />
                </div>
                <p className="mt-3 text-2xl font-semibold tracking-tight">
                  {item.value}
                </p>
              </div>
            );
          })}
        </section>

        {/* Search and filters */}
        <ModelFilters
        search={search}
        setSearch={setSearch}
        selectedFamily={selectedFamily}
        setSelectedFamily={setSelectedFamily}
        selectedProblem={selectedProblem}
        setSelectedProblem={setSelectedProblem}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        families={families}
        availableProblems={availableProblems}
        categories={categories}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        hasActiveFilters={hasActiveFilters}
        resetFilters={resetFilters}
        />

        {/* Results heading */}
        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[#A8C4C0]" aria-live="polite">
              Showing{" "}
              <span className="font-semibold text-[#DAFBF5]">
                {filteredModels.length}
              </span>{" "}
              of {models.length} models
            </p>

            <div className="inline-flex items-center gap-2 text-xs text-[#72918D]">
              <ArrowDownWideNarrow size={14} />
              Catalogue order
            </div>
          </div>

          {filteredModels.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredModels.map((model) => (
                <ModelCard key={model.id || model.slug} model={model} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#DAFBF5]/15 bg-[#102A2B]/30 px-6 py-16 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[#02BFA7]/10 text-[#02BFA7]">
                <Search size={22} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">
                No models found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#A8C4C0]">
                Try a different search phrase or clear one or more filters.
                You can search for a task, model family, or application.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#02BFA7] px-4 py-2.5 text-sm font-semibold text-[#071719] transition hover:bg-[#55DCC9]"
              >
                <Check size={15} />
                Reset search and filters
              </button>
            </div>
          )}
        </section>

        {/* Learning prompt */}
        <section className="mt-12 flex flex-col justify-between gap-5 rounded-2xl border border-[#02BFA7]/20 bg-[#02BFA7]/5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden size-11 shrink-0 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7] sm:flex">
              <Code2 size={21} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                Not sure where to start?
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8C4C0]">
                Start with the problem you want to solve, then compare
                candidate models by their assumptions, data needs,
                interpretability, and computational cost.
              </p>
            </div>
          </div>

          <Link
            href="/how-to-use"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-[#02BFA7] transition hover:text-[#DAFBF5]"
          >
            Read the guide
            <ArrowRight size={16} />
          </Link>
        </section>
      </div>
    </main>
  );
}

function LayersIcon(props) {
  return <Cpu {...props} />;
}
