
"use client";

// app/interview-qa/page.js
// Searchable AI and software engineering interview questions.
// Includes category filters, expandable answers, practical examples,
// and related concepts.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  ChevronDown,
  ChevronUp,
  Code2,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import QUESTIONS from "@/data/interview-qa";


const CATEGORIES = [
  "All",
  "Machine Learning",
  "Deep Learning",
  "AI Engineering",
  "LLMs & RAG",
  "MLOps & Infrastructure",
  "System Design",
  "Python & Software Engineering",
];

const CATEGORY_STYLES = {
  "Machine Learning":
    "text-[#02BFA7] bg-[#02BFA7]/10 border-[#02BFA7]/20",
  "Deep Learning":
    "text-pink-300 bg-pink-400/10 border-pink-400/20",
  "AI Engineering":
    "text-orange-300 bg-orange-400/10 border-orange-400/20",
  "LLMs & RAG":
    "text-violet-300 bg-violet-400/10 border-violet-400/20",
  "MLOps & Infrastructure":
    "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  "System Design":
    "text-amber-300 bg-amber-400/10 border-amber-400/20",
  "Python & Software Engineering":
    "text-sky-300 bg-sky-400/10 border-sky-400/20",
};

const DIFFICULTY_STYLES = {
  Beginner: "text-emerald-300 bg-emerald-400/10",
  Intermediate: "text-amber-300 bg-amber-400/10",
  Advanced: "text-orange-300 bg-orange-400/10",
};

function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}

function QuestionCard({
  item,
  index,
  expanded,
  onToggle,
  onSearchRelated,
}) {
  return (
    <article className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/65 transition duration-200 hover:border-[#02BFA7]/35 hover:bg-[#102A2B]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] font-mono text-xs text-[#02BFA7]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-[#DAFBF5] sm:text-lg">
              {item.question}
            </span>
          </span>

          <span className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                CATEGORY_STYLES[item.category] ??
                "border-white/10 bg-white/5 text-white/60"
              }`}
            >
              {item.category}
            </span>
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                DIFFICULTY_STYLES[item.difficulty]
              }`}
            >
              {item.difficulty}
            </span>
          </span>
        </span>

        <span className="mt-1 shrink-0 text-slate-500 transition group-hover:text-[#02BFA7]">
          {expanded ? (
            <ChevronUp size={19} />
          ) : (
            <ChevronDown size={19} />
          )}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-white/[0.08] px-5 pb-6 pt-5 sm:px-6">
          <div className="rounded-xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.055] p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#02BFA7]">
              Suggested answer
            </p>
            <p className="text-sm leading-7 text-slate-200">
              {item.answer}
            </p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">
                Practical example
              </p>
              <p className="text-sm leading-6 text-slate-300">
                {item.example}
              </p>
            </div>

            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
                Key points to remember
              </p>
              <ul className="space-y-2">
                {item.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-2 text-sm leading-6 text-slate-300"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#02BFA7]" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Explore related concepts
            </p>
            <div className="flex flex-wrap gap-2">
              {item.related.map((related) => (
                <button
                  key={related}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSearchRelated(related);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300 transition hover:border-[#02BFA7]/40 hover:text-[#02BFA7]"
                >
                  {related}
                  <ArrowRight className="ml-1 inline" size={11} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function InterviewQAPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [expandedQuestion, setExpandedQuestion] = useState(
    "What is Retrieval-Augmented Generation (RAG)?"
  );
  const [sortOrder, setSortOrder] = useState("original");

  const filteredQuestions = useMemo(() => {
    const search = normalize(query);

    const result = QUESTIONS.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.question,
        item.category,
        item.difficulty,
        item.answer,
        item.example,
        ...item.keyPoints,
        ...item.related,
      ]
        .map(normalize)
        .join(" ");

      return matchesCategory && (!search || searchableText.includes(search));
    });

    if (sortOrder === "alphabetical") {
      result.sort((a, b) =>
        a.question.localeCompare(b.question)
      );
    }

    return result;
  }, [query, category, sortOrder]);

  function selectRelatedConcept(term) {
    setQuery(term);
    setCategory("All");
    setExpandedQuestion(null);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setSortOrder("original");
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#02BFA7]/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-orange-500/[0.045] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/[0.07] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#02BFA7]">
            <BookOpen size={14} />
            THE INTERVIEW PREPARATION DESK
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Prepare to explain what you know
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#DAFBF5] sm:text-6xl lg:text-7xl">
                Know the answer.
                <span className="block text-[#02BFA7]">
                  Explain the why.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                A practical interview preparation library covering machine
                learning, AI engineering, LLM applications, infrastructure
                and software development. Explore questions, understand
                the reasoning, and learn how to communicate your answers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:pb-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="font-mono text-3xl font-semibold text-[#02BFA7]">
                  {QUESTIONS.length}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Interview questions
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="font-mono text-3xl font-semibold text-orange-300">
                  {CATEGORIES.length - 1}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Technical categories
                </p>
              </div>

              <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-[#102A2B]/65 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                    <Sparkles size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#DAFBF5]">
                      Learn beyond definitions
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Suggested answers, examples and key points.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
              Build your technical confidence
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
              Explore interview questions
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Search a question, technical concept or keyword.
            </p>
          </div>

          <label className="relative block w-full lg:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “RAG”, “overfitting” or “Docker”…"
              aria-label="Search interview questions"
              className="w-full rounded-xl border border-white/[0.12] bg-[#102A2B]/70 py-3.5 pl-11 pr-11 text-sm text-[#DAFBF5] outline-none transition placeholder:text-slate-500 focus:border-[#02BFA7]/60 focus:ring-2 focus:ring-[#02BFA7]/10"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                  active
                    ? "border-[#02BFA7]/50 bg-[#02BFA7]/10 text-[#02BFA7]"
                    : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-[#DAFBF5]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <p className="text-xs text-slate-400" aria-live="polite">
            <span className="font-semibold text-[#DAFBF5]">
              {filteredQuestions.length}
            </span>{" "}
            {filteredQuestions.length === 1 ? "question" : "questions"} found
            {category !== "All" ? ` in ${category}` : ""}
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="interview-sort"
              className="text-xs text-slate-500"
            >
              Sort
            </label>

            <select
              id="interview-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#102A2B] px-3 py-2 text-xs text-slate-300 outline-none focus:border-[#02BFA7]/50"
            >
              <option value="original">Original order</option>
              <option value="alphabetical">A–Z</option>
            </select>

            {(query || category !== "All" || sortOrder !== "original") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#02BFA7] hover:text-[#DAFBF5]"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Interview questions */}
        {filteredQuestions.length > 0 ? (
          <div className="grid items-start gap-3 xl:grid-cols-2">
            {filteredQuestions.map((item, index) => (
              <QuestionCard
                key={item.question}
                item={item}
                index={index}
                expanded={expandedQuestion === item.question}
                onToggle={() =>
                  setExpandedQuestion((current) =>
                    current === item.question ? null : item.question
                  )
                }
                onSearchRelated={selectRelatedConcept}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
            <Search className="mx-auto mb-4 text-slate-500" size={28} />
            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              No matching questions
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try a different keyword or remove the category filter.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#02BFA7] px-4 py-2.5 text-sm font-semibold text-[#071719] transition hover:bg-[#42dfc7]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Learning path */}
      <section className="border-t border-white/[0.07] bg-[#0A2021]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]">
                <BrainCircuit size={22} />
              </div>

              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
                Turn preparation into practice
              </p>

              <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#DAFBF5] sm:text-4xl">
                Knowing the answer is only the beginning.
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                Connect interview concepts to actual algorithms and
                implementation decisions. Explore the model catalogue
                and learn when to apply each approach.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/models"
                className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/70 p-5 transition hover:border-[#02BFA7]/35"
              >
                <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#02BFA7]">
                  01 / Explore
                </p>
                <h3 className="text-lg font-semibold text-[#DAFBF5]">
                  Model catalogue
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Discover algorithms and the problems they solve.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#02BFA7]">
                  Browse models
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/glossary"
                className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/70 p-5 transition hover:border-orange-300/35"
              >
                <p className="mb-4 text-xs font-mono uppercase tracking-wider text-orange-300">
                  02 / Review
                </p>
                <h3 className="text-lg font-semibold text-[#DAFBF5]">
                  ML glossary
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Strengthen your understanding of technical concepts.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-300">
                  Explore concepts
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
