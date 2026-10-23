"use client";

// Interactive model selector for ML Model Atlas.
// Filters the existing model catalogue using the user's task, data type,
// priorities, and compute constraints.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronRight,
  Cpu,
  Database,
  Gauge,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

import models from "@/data/models";

const TASKS = [
  {
    id: "classification",
    label: "Classification",
    description: "Predict a category or class.",
    example: "Spam detection, sentiment analysis",
  },
  {
    id: "regression",
    label: "Regression",
    description: "Predict a numeric value.",
    example: "House prices, demand forecasting",
  },
  {
    id: "clustering",
    label: "Clustering",
    description: "Discover groups without labels.",
    example: "Customer segmentation",
  },
  {
    id: "anomaly",
    label: "Anomaly detection",
    description: "Find unusual observations.",
    example: "Suspicious transactions",
  },
  {
    id: "dimensionality",
    label: "Dimensionality reduction",
    description: "Represent data with fewer features.",
    example: "Visualisation, feature compression",
  },
  {
    id: "generation",
    label: "Generation",
    description: "Generate text, images, or other content.",
    example: "Chatbots, image generation",
  },
];

const DATA_TYPES = [
  { id: "tabular", label: "Tabular data", description: "Rows and columns" },
  { id: "text", label: "Text", description: "Messages, documents, language" },
  { id: "image", label: "Images", description: "Photos and visual inputs" },
  { id: "time-series", label: "Time series", description: "Values over time" },
  { id: "mixed", label: "Mixed or other", description: "Multiple data formats" },
];

const PRIORITIES = [
  {
    id: "interpretable",
    label: "Easy to interpret",
    description: "Understand why the model predicts something.",
    icon: ShieldCheck,
  },
  {
    id: "lightweight",
    label: "CPU and memory friendly",
    description: "Train and run with limited computing resources.",
    icon: Cpu,
  },
  {
    id: "performance",
    label: "Predictive performance",
    description: "Prioritise model quality and allow more experimentation.",
    icon: Gauge,
  },
];

const TASK_TERMS = {
  classification: [
    "classification",
    "classifier",
    "classify",
    "categorical prediction",
    "spam",
    "sentiment",
  ],
  regression: [
    "regression",
    "regressor",
    "continuous prediction",
    "numeric prediction",
    "forecasting",
  ],
  clustering: [
    "clustering",
    "cluster",
    "unsupervised grouping",
    "segmentation",
  ],
  anomaly: [
    "anomaly detection",
    "outlier detection",
    "outlier",
    "novelty detection",
  ],
  dimensionality: [
    "dimensionality reduction",
    "feature reduction",
    "dimensionality",
    "visualization",
    "visualisation",
  ],
  generation: [
    "generative",
    "generation",
    "language model",
    "text generation",
    "image generation",
  ],
};

const DATA_TERMS = {
  tabular: ["tabular", "structured data", "structured", "numerical features"],
  text: ["text", "nlp", "natural language", "document", "language"],
  image: ["image", "computer vision", "visual", "convolutional", "cnn"],
  "time-series": [
    "time series",
    "timeseries",
    "temporal",
    "sequence",
    "forecasting",
  ],
  mixed: ["multimodal", "mixed data", "multiple modalities"],
};

function toText(value) {
  if (value === null || value === undefined) return "";

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(toText).join(" ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => `${key} ${toText(item)}`)
      .join(" ");
  }

  return "";
}

function normalise(value) {
  return toText(value)
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getModelText(model) {
  return normalise({
    name: model.name,
    slug: model.slug,
    type: model.type,
    family: model.family,
    categories: model.categories,
    problemTypes: model.problemTypes,
    learningParadigm: model.learningParadigm,
    tags: model.tags,
    summary: model.summary,
    whenToUse: model.whenToUse,
    useCases: model.useCases,
    dataRequirements: model.dataRequirements,
    compute: model.compute,
    interpretability: model.interpretability,
    strengths: model.strengths,
    description: model.description,
  });
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(normalise(term)));
}

function scoreModel(model, answers) {
  const text = getModelText(model);
  let score = 0;
  const reasons = [];

  const taskTerms = TASK_TERMS[answers.task] || [];

  const taskMatches = taskTerms.filter((term) =>
    text.includes(normalise(term))
  );

  if (taskMatches.length > 0) {
    score += 8;
    reasons.push("Matches your selected problem type");
  } else {
    // A model that does not explicitly support the task should not
    // be recommended merely because its name is popular.
    return { score: 0, reasons: [] };
  }

  const dataTerms = DATA_TERMS[answers.data] || [];

  if (includesAny(text, dataTerms)) {
    score += 3;
    reasons.push(`Relevant to ${DATA_TYPES.find((item) => item.id === answers.data)?.label.toLowerCase()}`);
  }

  if (answers.priorities.includes("interpretable")) {
    if (
      includesAny(text, [
        "interpretable",
        "interpretability",
        "explainable",
        "transparent",
        "linear model",
        "decision tree",
      ]) ||
      /logistic regression|linear regression|decision tree/i.test(model.name || "")
    ) {
      score += 3;
      reasons.push("Potentially easier to interpret");
    }
  }

  if (answers.priorities.includes("lightweight")) {
    if (
      includesAny(text, [
        "low compute",
        "lightweight",
        "efficient",
        "low memory",
        "cpu friendly",
        "fast inference",
      ]) ||
      /linear regression|logistic regression|naive bayes|knn|k nearest/i.test(
        model.name || ""
      )
    ) {
      score += 3;
      reasons.push("Potentially suitable for limited compute");
    }

    if (
      /transformer|large language model|deep neural|efficientnet|resnet/i.test(
        `${model.name || ""} ${model.family || ""}`
      )
    ) {
      score -= 2;
    }
  }

  if (answers.priorities.includes("performance")) {
    if (
      includesAny(text, [
        "high performance",
        "complex patterns",
        "nonlinear",
        "non linear",
        "ensemble",
        "deep learning",
      ]) ||
      /random forest|gradient boosting|xgboost|lightgbm|catboost|transformer/i.test(
        model.name || ""
      )
    ) {
      score += 2;
      reasons.push("Worth testing when predictive quality is the priority");
    }
  }

  return { score, reasons };
}

function SectionHeading({ number, title, description }) {
  return (
    <div className="mb-6">
      <div className="mb-3 flex items-center gap-3">
        <span className="font-mono text-xs text-[#02BFA7]">{number}</span>
        <span className="h-px w-7 bg-[#02BFA7]/60" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A8C4C0]">
          Selector step
        </span>
      </div>
      <h2 className="text-xl font-semibold tracking-tight text-[#DAFBF5] sm:text-2xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8C4C0]">
        {description}
      </p>
    </div>
  );
}

function ChoiceCard({ selected, onClick, title, description, example }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`group rounded-xl border p-4 text-left transition duration-200 ${
        selected
          ? "border-[#02BFA7]/70 bg-[#02BFA7]/[0.09]"
          : "border-[#DAFBF5]/10 bg-[#102A2B]/45 hover:border-[#DAFBF5]/25 hover:bg-[#102A2B]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`text-sm font-semibold ${
            selected ? "text-[#02BFA7]" : "text-[#DAFBF5]"
          }`}
        >
          {title}
        </span>
        <span
          className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#02BFA7] bg-[#02BFA7] text-[#071719]"
              : "border-white/20 text-transparent"
          }`}
        >
          <Check size={12} />
        </span>
      </div>
      <p className="mt-2 text-xs leading-5 text-[#A8C4C0]">{description}</p>
      {example && (
        <p className="mt-3 text-[11px] leading-5 text-[#789590]">{example}</p>
      )}
    </button>
  );
}

function RecommendationCard({ model, rank, reasons }) {
  const isTopPick = rank === 1;

  return (
    <article className="rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/55 p-5 transition hover:border-[#02BFA7]/40 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-[#A8C4C0]">
          CANDIDATE / {String(rank).padStart(2, "0")}
        </span>
        {isTopPick && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#02BFA7]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#02BFA7]">
            <Sparkles size={12} /> Best match by criteria
          </span>
        )}
      </div>

      <h3 className="mt-4 text-xl font-semibold text-[#DAFBF5]">
        {model.name}
      </h3>

      {model.family && (
        <p className="mt-1 text-xs text-[#02BFA7]">{model.family}</p>
      )}

      <p className="mt-3 text-sm leading-6 text-[#A8C4C0]">
        {model.summary ||
          model.description ||
          "Open the model guide to learn about its approach and practical use cases."}
      </p>

      {reasons.length > 0 && (
        <div className="mt-5 border-t border-white/[0.08] pt-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#A8C4C0]">
            Why it appeared
          </p>
          <ul className="space-y-2">
            {reasons.slice(0, 3).map((reason) => (
              <li
                key={reason}
                className="flex items-start gap-2 text-xs leading-5 text-[#DAFBF5]"
              >
                <Check size={14} className="mt-0.5 shrink-0 text-[#02BFA7]" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={`/models/${model.slug}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/30 px-4 py-2.5 text-xs font-semibold text-[#02BFA7] transition hover:bg-[#02BFA7]/10"
      >
        Explore model guide <ArrowUpRight size={14} />
      </Link>
    </article>
  );
}

export default function ModelSelectorPage() {
  const [task, setTask] = useState("");
  const [data, setData] = useState("");
  const [priorities, setPriorities] = useState(["lightweight"]);
  const [showResults, setShowResults] = useState(false);

  const canRecommend = Boolean(task && data);

  const recommendations = useMemo(() => {
    if (!canRecommend) return [];

    return (Array.isArray(models) ? models : [])
      .map((model) => ({
        model,
        ...scoreModel(model, { task, data, priorities }),
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [task, data, priorities, canRecommend]);

  function togglePriority(priority) {
    setPriorities((current) =>
      current.includes(priority)
        ? current.filter((item) => item !== priority)
        : [...current, priority]
    );
  }

  function resetSelector() {
    setTask("");
    setData("");
    setPriorities(["lightweight"]);
    setShowResults(false);
  }

  function findModels() {
    if (!canRecommend) return;
    setShowResults(true);
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 sm:py-10 lg:px-10">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-[#A8C4C0]">
          <Link href="/" className="transition hover:text-[#02BFA7]">
            Atlas
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#DAFBF5]">Model selector</span>
        </nav>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-[#DAFBF5]/10 bg-[#102A2B]/60 p-6 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-20 -top-24 size-80 rounded-full bg-[#02BFA7]/[0.08] blur-[100px]" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_280px] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/[0.07] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
                <Sparkles size={13} /> Guided discovery
              </div>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Find a model that fits
                <span className="text-[#02BFA7]"> your problem.</span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#A8C4C0] sm:text-base">
                Answer a few questions about your task, data, and practical
                constraints. The selector will rank candidate models from the
                Atlas catalogue to help you choose where to start.
              </p>

              <div className="mt-7 flex flex-wrap gap-4 text-xs text-[#A8C4C0]">
                <span className="inline-flex items-center gap-2">
                  <Target size={15} className="text-[#02BFA7]" /> Task-driven
                </span>
                <span className="inline-flex items-center gap-2">
                  <Database size={15} className="text-[#02BFA7]" /> Data-aware
                </span>
                <span className="inline-flex items-center gap-2">
                  <Cpu size={15} className="text-[#02BFA7]" /> Resource-conscious
                </span>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-white/[0.08] bg-[#071719]/65 p-6 lg:block">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                <BrainCircuit size={25} />
              </div>
              <p className="mt-6 font-mono text-xs text-[#02BFA7]">
                THE PRINCIPLE
              </p>
              <p className="mt-2 text-lg font-medium leading-7 text-[#DAFBF5]">
                Start with the problem, not the algorithm.
              </p>
              <p className="mt-3 text-xs leading-6 text-[#A8C4C0]">
                A recommendation is a starting hypothesis. Validate it with
                data, baselines, and appropriate evaluation metrics.
              </p>
            </div>
          </div>
        </section>

        {/* Selector form */}
        <section className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-10">
            {/* Step 1 */}
            <section>
              <SectionHeading
                number="01"
                title="What are you trying to do?"
                description="Choose the main outcome you need. If your problem does not fit neatly into one category, start with the closest match."
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {TASKS.map((item) => (
                  <ChoiceCard
                    key={item.id}
                    selected={task === item.id}
                    onClick={() => {
                      setTask(item.id);
                      setShowResults(false);
                    }}
                    title={item.label}
                    description={item.description}
                    example={item.example}
                  />
                ))}
              </div>
            </section>

            {/* Step 2 */}
            <section>
              <SectionHeading
                number="02"
                title="What kind of data do you have?"
                description="Your input format affects which model families are practical starting points."
              />

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {DATA_TYPES.map((item) => (
                  <ChoiceCard
                    key={item.id}
                    selected={data === item.id}
                    onClick={() => {
                      setData(item.id);
                      setShowResults(false);
                    }}
                    title={item.label}
                    description={item.description}
                  />
                ))}
              </div>
            </section>

            {/* Step 3 */}
            <section>
              <SectionHeading
                number="03"
                title="What matters most?"
                description="Choose any priorities that apply. If you do not have a strong preference, leave the default lightweight option selected."
              />

              <div className="space-y-3">
                {PRIORITIES.map((item) => {
                  const Icon = item.icon;
                  const selected = priorities.includes(item.id);

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        togglePriority(item.id);
                        setShowResults(false);
                      }}
                      className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition sm:p-5 ${
                        selected
                          ? "border-[#02BFA7]/60 bg-[#02BFA7]/[0.07]"
                          : "border-[#DAFBF5]/10 bg-[#102A2B]/40 hover:border-white/20"
                      }`}
                    >
                      <div
                        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
                          selected
                            ? "bg-[#02BFA7]/15 text-[#02BFA7]"
                            : "bg-white/[0.04] text-[#A8C4C0]"
                        }`}
                      >
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-[#DAFBF5]">
                          {item.label}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#A8C4C0]">
                          {item.description}
                        </p>
                      </div>

                      <span
                        className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded border ${
                          selected
                            ? "border-[#02BFA7] bg-[#02BFA7] text-[#071719]"
                            : "border-white/20 text-transparent"
                        }`}
                      >
                        <Check size={12} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
              <button
                type="button"
                onClick={findModels}
                disabled={!canRecommend}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#02BFA7] px-6 py-3.5 text-sm font-semibold text-[#071719] transition hover:bg-[#39D9C3] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Find candidate models <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={resetSelector}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-[#DAFBF5] transition hover:border-white/30"
              >
                <RotateCcw size={15} /> Reset choices
              </button>
            </div>

            {!canRecommend && (
              <p className="text-xs text-[#A8C4C0]">
                Choose a task and data type to get started.
              </p>
            )}
          </div>

          {/* Summary sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-white/[0.09] bg-[#102A2B]/55 p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#02BFA7]">
                Your selection
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#789590]">
                    Problem type
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#DAFBF5]">
                    {TASKS.find((item) => item.id === task)?.label ||
                      "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#789590]">
                    Data format
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#DAFBF5]">
                    {DATA_TYPES.find((item) => item.id === data)?.label ||
                      "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#789590]">
                    Priorities
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {priorities.length ? (
                      priorities.map((priority) => (
                        <span
                          key={priority}
                          className="rounded-full border border-[#02BFA7]/20 bg-[#02BFA7]/[0.07] px-2.5 py-1 text-[10px] text-[#02BFA7]"
                        >
                          {PRIORITIES.find((item) => item.id === priority)?.label}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#A8C4C0]">
                        No specific priority
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#FF4D2E]/20 bg-[#FF4D2E]/[0.045] p-5">
              <div className="flex items-center gap-2 text-[#FF8068]">
                <Zap size={17} />
                <p className="text-xs font-semibold">Keep in mind</p>
              </div>
              <p className="mt-3 text-xs leading-6 text-[#A8C4C0]">
                Data quality, dataset size, class balance, and evaluation
                strategy can change which model works best. The selector
                narrows the search; experiments determine the winner.
              </p>
            </div>

            <Link
              href="/how-to-use"
              className="flex items-center justify-between rounded-xl border border-white/[0.08] p-4 text-xs text-[#A8C4C0] transition hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
            >
              Read the selection guide <ArrowUpRight size={14} />
            </Link>
          </aside>
        </section>

        {/* Results */}
        {showResults && (
          <section
            id="recommendations"
            aria-live="polite"
            className="mt-16 scroll-mt-8 border-t border-white/10 pt-10"
          >
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
                  <Sparkles size={15} /> Your shortlist
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-[#DAFBF5]">
                  Models worth exploring.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-[#A8C4C0]">
                  Ranked by the selected task and available catalogue
                  descriptions. Review the model guides before making a final
                  decision.
                </p>
              </div>
              <span className="text-xs text-[#A8C4C0]">
                {recommendations.length} candidate
                {recommendations.length === 1 ? "" : "s"} found
              </span>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendations.map(({ model, reasons }, index) => (
                  <RecommendationCard
                    key={model.slug || model.id || model.name}
                    model={model}
                    rank={index + 1}
                    reasons={reasons}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-[#102A2B]/50 p-8 text-center">
                <Search className="mx-auto text-[#02BFA7]" size={28} />
                <h3 className="mt-4 text-lg font-semibold text-[#DAFBF5]">
                  No clear match in the current catalogue
                </h3>
                <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8C4C0]">
                  The catalogue may not yet describe a model for this exact
                  combination of task and data type. Browse the full catalogue
                  or adjust your choices.
                </p>
                <Link
                  href="/models"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/30 px-5 py-3 text-sm font-semibold text-[#02BFA7] transition hover:bg-[#02BFA7]/10"
                >
                  Browse all models <ArrowRight size={15} />
                </Link>
              </div>
            )}

            <p className="mt-6 text-xs leading-6 text-[#789590]">
              These suggestions are heuristic matches based on the catalogue's
              documented fields, not benchmark results or a guarantee of
              predictive performance. A model's absence from the shortlist does
              not prove that it cannot solve the task.
            </p>
          </section>
        )}

        {/* Footer navigation */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-6">
          <Link
            href="/how-to-use"
            className="inline-flex items-center gap-2 text-xs text-[#A8C4C0] transition hover:text-[#02BFA7]"
          >
            <ArrowLeft size={14} /> How to use the Atlas
          </Link>
          <Link
            href="/models"
            className="inline-flex items-center gap-2 text-xs text-[#A8C4C0] transition hover:text-[#02BFA7]"
          >
            Browse complete catalogue <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
