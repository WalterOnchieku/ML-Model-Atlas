
"use client";

// components/models/ModelCard.js
// Reusable model card displaying a model's summary, family, task types,
// tags, and a link to its individual detail page.

import Link from "next/link";
import { ArrowRight, BrainCircuit } from "lucide-react";

const FAMILY_COLORS = {
  "Traditional Machine Learning":
    "border-[#02BFA7]/30 text-[#8AE9DB]",
  "Deep Learning":
    "border-[#FF4D2E]/30 text-[#FF9A85]",
  "Computer Vision":
    "border-[#02BFA7]/30 text-[#8AE9DB]",
  "Natural Language Processing":
    "border-[#DAFBF5]/20 text-[#DAFBF5]",
};

function formatLabel(value) {
  return String(value ?? "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function ModelCard({ model }) {
  const categories = Array.isArray(model.categories)
    ? model.categories
    : [];

  const problemTypes = Array.isArray(model.problemTypes)
    ? model.problemTypes
    : [];

  const tags = Array.isArray(model.tags) ? model.tags : [];

  const familyClass =
    FAMILY_COLORS[model.family] ??
    "border-[#DAFBF5]/15 text-[#A8C4C0]";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/65 transition duration-300 hover:-translate-y-1 hover:border-[#02BFA7]/40 hover:bg-[#102A2B]">
      {/* Model family and icon */}
      <div className="flex items-start justify-between gap-3 border-b border-[#DAFBF5]/8 px-5 py-4">
        <span
          className={`rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${familyClass}`}
        >
          {model.family || "Machine Learning"}
        </span>

        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#02BFA7]/20 bg-[#02BFA7]/8 text-[#02BFA7]">
          <BrainCircuit size={18} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-lg font-semibold tracking-tight text-[#DAFBF5] transition group-hover:text-[#02BFA7]">
          {model.name}
        </h2>

        {model.shortName && model.shortName !== model.name && (
          <p className="mt-1 text-xs font-medium text-[#02BFA7]">
            {model.shortName}
          </p>
        )}

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#A8C4C0]">
          {model.summary ||
            model.description ||
            "Explore how this model works and when to use it."}
        </p>

        {/* Problem types */}
        <div className="mt-5">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#72918D]">
            Problem types
          </p>

          <div className="flex flex-wrap gap-2">
            {problemTypes.slice(0, 3).map((type) => (
              <span
                key={type}
                className="rounded-md bg-[#071719] px-2 py-1 text-[11px] text-[#B8D2CE]"
              >
                {formatLabel(type)}
              </span>
            ))}
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="text-[10px] text-[#72918D]"
              >
                #{formatLabel(category).replaceAll(" ", "")}
              </span>
            ))}
          </div>
        )}

        {/* Searchable descriptive tags */}
        {tags.length > 0 && (
          <p className="mt-3 line-clamp-1 text-xs text-[#72918D]">
            {tags.slice(0, 3).join(" · ")}
          </p>
        )}

        {/* Push the link to the bottom for consistent card heights */}
        <div className="mt-auto pt-6">
          <Link
            href={`/models/${model.slug}`}
            className="flex items-center justify-between rounded-xl border border-[#DAFBF5]/10 px-4 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40 hover:text-[#02BFA7]"
          >
            Explore model
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
