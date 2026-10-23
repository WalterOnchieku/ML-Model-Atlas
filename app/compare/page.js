/*
 * app/compare/page.js
 * Interactive side-by-side comparison of models in the ML Model Atlas.
 * Uses the existing model catalogue and supports changing either selection.
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  Check,
  GitCompareArrows,
  Info,
  Search,
  Scale,
  X,
} from "lucide-react";

import models from "@/data/models";

function formatLabel(value) {
  return String(value ?? "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function toText(value) {
  if (value === null || value === undefined || value === "") {
    return "Not specified in the catalogue.";
  }

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toText).filter(Boolean).join(", ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => `${formatLabel(key)}: ${toText(item)}`)
      .join("\n");
  }

  return String(value);
}

function ValueList({ value, emptyLabel = "Not specified in the catalogue." }) {
  if (value === null || value === undefined || value === "") {
    return <p className="text-sm leading-6 text-[#A8C4C0]">{emptyLabel}</p>;
  }

  if (Array.isArray(value)) {
    return (
      <ul className="space-y-2">
        {value.map((item, index) => (
          <li
            key={`${toText(item)}-${index}`}
            className="flex items-start gap-2.5 text-sm leading-6 text-[#D4E7E3]"
          >
            <Check size={15} className="mt-1 shrink-0 text-[#02BFA7]" />
            <span>{toText(item)}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <dl className="space-y-3">
        {Object.entries(value).map(([key, item]) => (
          <div key={key}>
            <dt className="text-xs font-bold uppercase tracking-wider text-[#02BFA7]">
              {formatLabel(key)}
            </dt>
            <dd className="mt-1 whitespace-pre-line text-sm leading-6 text-[#D4E7E3]">
              {toText(item)}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <p className="whitespace-pre-line text-sm leading-6 text-[#D4E7E3]">
      {toText(value)}
    </p>
  );
}

function ModelSelect({ label, selectedSlug, onChange, options, excludeSlug }) {
  return (
    <div className="min-w-0">
      <label
        htmlFor={label}
        className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-[#A8C4C0]"
      >
        {label === "model-a" ? "First model" : "Second model"}
      </label>

      <select
        id={label}
        value={selectedSlug}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[#DAFBF5]/15 bg-[#071719] px-4 py-3 text-sm text-[#DAFBF5] outline-none transition focus:border-[#02BFA7] focus:ring-2 focus:ring-[#02BFA7]/20"
      >
        {options.map((model) => (
          <option
            key={model.slug}
            value={model.slug}
            disabled={model.slug === excludeSlug}
          >
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
}

function ComparisonCard({ model, index }) {
  const accent = index === 0 ? "#02BFA7" : "#FF8068";

  return (
    <div className="min-w-0 overflow-hidden rounded-2xl border border-[#DAFBF5]/15 bg-[#102A2B]/65">
      <div
        className="border-b border-[#DAFBF5]/10 p-5 sm:p-6"
        style={{ borderTop: `3px solid ${accent}` }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          {index === 0 ? "Approach A" : "Approach B"}
        </p>

        <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#DAFBF5] sm:text-2xl">
          {model.name}
        </h2>

        <p className="mt-2 text-xs font-medium text-[#A8C4C0]">
          {model.family ? toText(model.family) : "Model family not specified"}
        </p>

        <p className="mt-4 text-sm leading-6 text-[#D4E7E3]">
          {model.summary || model.description || "No summary available yet."}
        </p>

        <Link
          href={`/models/${model.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#02BFA7] transition hover:text-[#DAFBF5]"
        >
          Explore model <ArrowRight size={15} />
        </Link>
      </div>

      <div className="space-y-0 divide-y divide-[#DAFBF5]/10">
        <ComparisonSection title="Problem types" value={model.problemTypes || model.categories} />
        <ComparisonSection title="Best use cases" value={model.useCases || model.bestFor} />
        <ComparisonSection title="Strengths" value={model.strengths} />
        <ComparisonSection title="Limitations" value={model.limitations || model.weaknesses} />
        <ComparisonSection title="Data requirements" value={model.dataRequirements} />
        <ComparisonSection title="Evaluation & validation" value={model.evaluation} />
        <ComparisonSection title="Interpretability" value={model.interpretability} />
        <ComparisonSection title="Computational requirements" value={model.compute} />
        <ComparisonSection title="Real-world example" value={model.projectExample || model.historicalExample} />
      </div>
    </div>
  );
}

function ComparisonSection({ title, value }) {
  return (
    <section className="p-5 sm:p-6">
      <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-[#02BFA7]">
        {title}
      </h3>
      <ValueList value={value} />
    </section>
  );
}

export default function ComparePage() {
  const availableModels = useMemo(
    () => (Array.isArray(models) ? models.filter((model) => model.slug && model.name) : []),
    []
  );

  const [firstSlug, setFirstSlug] = useState(availableModels[0]?.slug || "");
  const [secondSlug, setSecondSlug] = useState(availableModels[1]?.slug || availableModels[0]?.slug || "");
  const [search, setSearch] = useState("");

  const firstModel = availableModels.find((model) => model.slug === firstSlug);
  const secondModel = availableModels.find((model) => model.slug === secondSlug);

  const filteredModels = availableModels.filter((model) =>
    `${model.name} ${model.family || ""} ${(model.categories || []).join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  function swapModels() {
    setFirstSlug(secondSlug);
    setSecondSlug(firstSlug);
  }

  if (availableModels.length === 0) {
    return (
      <main className="min-h-screen bg-[#071719] px-5 py-20 text-[#DAFBF5]">
        <div className="mx-auto max-w-2xl rounded-2xl border border-[#FF4D2E]/30 bg-[#102A2B] p-8">
          <h1 className="text-2xl font-semibold">Model catalogue unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-[#D4E7E3]">
            No models with valid names and slugs were found. Check the default export in data/models.js.
          </p>
          <Link href="/models" className="mt-5 inline-flex text-sm font-semibold text-[#02BFA7]">
            Return to the model library →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-[#A8C4C0]">
          <Link href="/" className="transition hover:text-[#02BFA7]">Home</Link>
          <span>/</span>
          <Link href="/models" className="transition hover:text-[#02BFA7]">Model library</Link>
          <span>/</span>
          <span className="text-[#DAFBF5]">Compare</span>
        </nav>

        <section className="relative overflow-hidden rounded-3xl border border-[#DAFBF5]/15 bg-[#102A2B]">
          <div className="pointer-events-none absolute -right-16 -top-20 size-72 rounded-full border border-[#02BFA7]/20 sm:size-96" />
          <div className="pointer-events-none absolute -right-4 -top-8 size-48 rounded-full border border-[#DAFBF5]/10 sm:size-64" />

          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div className="max-w-3xl">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#02BFA7]">
                <GitCompareArrows size={15} /> Model decision studio
              </p>

              <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Compare the
                <span className="block text-[#02BFA7]">trade-offs.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#C1D8D3] sm:text-base">
                Put two machine learning approaches side by side. Understand where they differ,
                what they need, and which trade-offs matter for your problem.
              </p>
            </div>

            <div className="flex size-16 items-center justify-center rounded-2xl bg-[#DAFBF5] text-[#102A2B]">
              <Scale size={29} />
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#DAFBF5]/15 bg-[#102A2B]/65 p-5 sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#02BFA7]">
                Build your comparison
              </p>
              <h2 className="mt-2 text-xl font-semibold text-[#DAFBF5]">
                Choose two models
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#A8C4C0]">
                Start with the defaults or select another approach from the catalogue.
              </p>
            </div>

            <span className="rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/10 px-3 py-1.5 text-xs font-medium text-[#02BFA7]">
              {availableModels.length} models available
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <ModelSelect
              label="model-a"
              selectedSlug={firstSlug}
              onChange={setFirstSlug}
              options={availableModels}
              excludeSlug={secondSlug}
            />

            <button
              type="button"
              onClick={swapModels}
              aria-label="Swap compared models"
              title="Swap models"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DAFBF5]/15 px-4 text-sm font-semibold text-[#DAFBF5] transition hover:border-[#02BFA7]/60 hover:bg-[#02BFA7]/10 hover:text-[#02BFA7]"
            >
              <ArrowLeftRight size={17} />
              <span className="md:hidden">Swap models</span>
            </button>

            <ModelSelect
              label="model-b"
              selectedSlug={secondSlug}
              onChange={setSecondSlug}
              options={availableModels}
              excludeSlug={firstSlug}
            />
          </div>

          <div className="mt-6 border-t border-[#DAFBF5]/10 pt-5">
            <label htmlFor="model-search" className="mb-2 block text-xs font-semibold text-[#A8C4C0]">
              Find a model in the catalogue
            </label>

            <div className="relative">
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#72918D]" />
              <input
                id="model-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, family, or category..."
                className="w-full rounded-xl border border-[#DAFBF5]/15 bg-[#071719] py-3 pl-11 pr-11 text-sm text-[#DAFBF5] outline-none transition placeholder:text-[#72918D] focus:border-[#02BFA7] focus:ring-2 focus:ring-[#02BFA7]/20"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear model search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-[#A8C4C0] hover:text-[#DAFBF5]"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {search.trim() && (
              <div className="mt-3 flex flex-wrap gap-2">
                {filteredModels.length > 0 ? filteredModels.map((model) => (
                  <button
                    key={model.slug}
                    type="button"
                    onClick={() => {
                      if (model.slug === firstSlug) {
                        setSecondSlug(availableModels.find((item) => item.slug !== firstSlug)?.slug || firstSlug);
                      } else {
                        setSecondSlug(model.slug);
                      }
                      setSearch("");
                    }}
                    className={`rounded-full border px-3 py-2 text-xs font-medium transition ${
                      model.slug === firstSlug || model.slug === secondSlug
                        ? "border-[#02BFA7]/40 bg-[#02BFA7]/10 text-[#02BFA7]"
                        : "border-[#DAFBF5]/15 text-[#D4E7E3] hover:border-[#02BFA7]/40 hover:text-[#02BFA7]"
                    }`}
                  >
                    {model.name}
                  </button>
                )) : (
                  <p className="text-sm text-[#A8C4C0]">No matching models found.</p>
                )}
              </div>
            )}
          </div>
        </section>

        {firstModel && secondModel && (
          <>
            <div className="my-8 flex items-start gap-3 rounded-xl border border-[#02BFA7]/20 bg-[#02BFA7]/[0.06] p-4">
              <Info size={18} className="mt-0.5 shrink-0 text-[#02BFA7]" />
              <p className="text-xs leading-6 text-[#BBD3CE]">
                <strong className="text-[#DAFBF5]">A note on evaluation:</strong> performance depends on
                the dataset, target, preprocessing, and validation method. Compare models using the
                same split and metrics before drawing conclusions. Missing catalogue information is
                labelled rather than guessed.
              </p>
            </div>

            <div className="grid items-start gap-5 lg:grid-cols-2">
              <ComparisonCard model={firstModel} index={0} />
              <ComparisonCard model={secondModel} index={1} />
            </div>

            <section className="mt-8 rounded-2xl border border-[#DAFBF5]/15 bg-[#DAFBF5] p-6 text-[#102A2B] sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#02BFA7]">
                  <BookOpen size={21} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#087F72]">
                    Make the decision
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">
                    Let the problem guide the choice.
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-[#315957]">
                    Define what success means, establish a baseline, and evaluate both approaches
                    under the same conditions. Consider interpretability, latency, data availability,
                    and the cost of mistakes—not just a single performance score.
                  </p>
                  <Link
                    href="/how-to-use"
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#102A2B] px-4 py-3 text-sm font-semibold text-[#DAFBF5] transition hover:bg-[#174342]"
                  >
                    Read the usage guide <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#DAFBF5]/10 pt-6">
          <Link href="/models" className="inline-flex items-center gap-2 text-sm font-medium text-[#A8C4C0] transition hover:text-[#02BFA7]">
            <ArrowLeftRight size={16} /> Back to model library
          </Link>

          <p className="text-xs text-[#72918D]">ML Model Atlas · Compare thoughtfully.</p>
        </footer>
      </div>
    </main>
  );
}
