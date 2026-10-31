
/*
 * File: components/rag-visualizer/RetrievalLab.js
 * Purpose: Interactive playground for understanding RAG retrieval.
 *
 * Features:
 * - Selectable demonstration queries.
 * - Custom user questions.
 * - Configurable Top-K retrieval.
 * - TF-IDF cosine similarity ranking.
 * - Expandable retrieved chunks.
 * - Similarity score visualization.
 *
 * Note: This is a lexical retrieval simulation, not neural semantic search.
 */

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  FileText,
  Database,
  RotateCcw,
  Info,
  Sparkles,
  ArrowDownWideNarrow,
} from "lucide-react";

import {
  SAMPLE_DOCUMENTS,
  DEMO_QUERIES,
} from "@/data/rag-visualizer";

import {
  prepareKnowledgeBase,
  retrieveDocuments,
} from "@/lib/rag-engine";

export default function RetrievalLab() {
  const [query, setQuery] = useState(DEMO_QUERIES[4]);
  const [submittedQuery, setSubmittedQuery] = useState(DEMO_QUERIES[4]);
  const [topK, setTopK] = useState(3);
  const [expandedChunks, setExpandedChunks] = useState([]);

  // Prepare the searchable knowledge base once.
  const knowledgeBase = useMemo(() => {
    return prepareKnowledgeBase(SAMPLE_DOCUMENTS);
  }, []);

  // Retrieve and rank chunks for the submitted query.
  const results = useMemo(() => {
    if (!submittedQuery.trim()) return [];

    return retrieveDocuments(
      submittedQuery,
      knowledgeBase,
      topK
    );
  }, [submittedQuery, knowledgeBase, topK]);

  const totalChunks = knowledgeBase.chunks.length;

  const matchingResults = results.filter(
    (result) => result.score > 0
  );

  const averageScore = matchingResults.length
    ? matchingResults.reduce((sum, item) => sum + item.score, 0) /
      matchingResults.length
    : 0;

  // Execute retrieval when the user submits a question.
  function handleSearch(event) {
    event.preventDefault();

    if (!query.trim()) return;

    setSubmittedQuery(query.trim());
    setExpandedChunks([]);
  }

  // Load a demonstration query.
  function handleDemoQuery(demoQuery) {
    setQuery(demoQuery);
    setSubmittedQuery(demoQuery);
    setExpandedChunks([]);
  }

  // Toggle the full text of a retrieved chunk.
  function toggleChunk(chunkId) {
    setExpandedChunks((current) =>
      current.includes(chunkId)
        ? current.filter((id) => id !== chunkId)
        : [...current, chunkId]
    );
  }

  // Restore the initial demonstration state.
  function resetLab() {
    const initialQuery = DEMO_QUERIES[4];

    setQuery(initialQuery);
    setSubmittedQuery(initialQuery);
    setTopK(3);
    setExpandedChunks([]);
  }

  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#02BFA7]">
          <Search size={17} />
          <span className="text-xs font-semibold tracking-[0.2em]">
            LAB 03 · RETRIEVAL
          </span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
              Find the right information.
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#8BAEAA]">
              Ask a question and watch the retrieval engine search
              the knowledge base, calculate relevance scores and
              rank the most relevant text chunks.
            </p>
          </div>

          <button
            type="button"
            onClick={resetLab}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#8BAEAA] transition hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
          >
            <RotateCcw size={14} />
            Reset lab
          </button>
        </div>
      </div>

      {/* Knowledge base statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/[0.07] bg-[#102A2B]/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-[#02BFA7]">
            <Database size={16} />
            <span className="text-xs text-[#8BAEAA]">
              Documents
            </span>
          </div>
          <p className="text-2xl font-semibold text-[#DAFBF5]">
            {SAMPLE_DOCUMENTS.length}
          </p>
        </div>

        <div className="rounded-xl border border-white/[0.07] bg-[#102A2B]/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-[#02BFA7]">
            <FileText size={16} />
            <span className="text-xs text-[#8BAEAA]">
              Indexed chunks
            </span>
          </div>
          <p className="text-2xl font-semibold text-[#DAFBF5]">
            {totalChunks}
          </p>
        </div>

        <div className="col-span-2 rounded-xl border border-white/[0.07] bg-[#102A2B]/60 p-4 sm:col-span-1">
          <div className="mb-3 flex items-center gap-2 text-[#02BFA7]">
            <Sparkles size={16} />
            <span className="text-xs text-[#8BAEAA]">
              Average match score
            </span>
          </div>
          <p className="text-2xl font-semibold text-[#DAFBF5]">
            {(averageScore * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Query input */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Search size={17} className="text-[#02BFA7]" />
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Ask the knowledge base
          </h3>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <textarea
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            rows={3}
            placeholder="Ask a question about the sample documents..."
            className="w-full resize-y rounded-xl border border-white/10 bg-[#091D1F] px-4 py-3 text-sm leading-6 text-[#DAFBF5] outline-none transition placeholder:text-[#668784] focus:border-[#02BFA7]/50"
          />

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-[#668784]">
              Press the button to search the indexed documents.
            </p>

            <button
              type="submit"
              disabled={!query.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#32D7BE] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Search size={16} />
              Run retrieval
            </button>
          </div>
        </form>

        {/* Demonstration questions */}
        <div className="mt-6 border-t border-white/[0.07] pt-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#779996]">
            TRY A DEMO QUESTION
          </p>

          <div className="flex flex-wrap gap-2">
            {DEMO_QUERIES.map((demoQuery) => (
              <button
                key={demoQuery}
                type="button"
                onClick={() => handleDemoQuery(demoQuery)}
                className={`rounded-full border px-3 py-2 text-left text-xs transition ${
                  submittedQuery === demoQuery
                    ? "border-[#02BFA7]/40 bg-[#02BFA7]/10 text-[#DAFBF5]"
                    : "border-white/10 text-[#8BAEAA] hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
                }`}
              >
                {demoQuery}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Retrieval configuration */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/40 p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <SlidersHorizontal size={17} className="text-[#02BFA7]" />
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Retrieval settings
          </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="top-k"
                className="text-sm text-[#8BAEAA]"
              >
                Number of results (Top-K)
              </label>

              <span className="rounded-lg bg-[#02BFA7]/10 px-3 py-1 text-sm font-semibold text-[#02BFA7]">
                {topK}
              </span>
            </div>

            <input
              id="top-k"
              type="range"
              min="1"
              max={Math.min(10, totalChunks)}
              value={topK}
              onChange={(event) =>
                setTopK(Number(event.target.value))
              }
              className="w-full accent-[#02BFA7]"
            />

            <div className="mt-2 flex justify-between text-[11px] text-[#668784]">
              <span>1 result</span>
              <span>{Math.min(10, totalChunks)} results</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#091D1F]/70 p-4">
            <p className="mb-2 text-xs text-[#668784]">
              Similarity algorithm
            </p>

            <p className="text-sm font-semibold text-[#DAFBF5]">
              TF-IDF + Cosine Similarity
            </p>

            <p className="mt-2 text-xs leading-5 text-[#779996]">
              Compares the weighted terms in your question
              against the indexed text chunks.
            </p>
          </div>
        </div>
      </div>

      {/* Retrieved results */}
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <ArrowDownWideNarrow
                size={17}
                className="text-[#02BFA7]"
              />
              <h3 className="text-lg font-semibold text-[#DAFBF5]">
                Retrieved chunks
              </h3>
            </div>

            <p className="text-xs text-[#779996]">
              Results for: "{submittedQuery}"
            </p>
          </div>

          <span className="text-xs text-[#668784]">
            {matchingResults.length} matching chunks
          </span>
        </div>

        {matchingResults.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#102A2B]/30 px-5 py-10 text-center">
            <Search
              size={25}
              className="mx-auto mb-3 text-[#668784]"
            />

            <h4 className="text-sm font-semibold text-[#DAFBF5]">
              No matching terms found
            </h4>

            <p className="mx-auto mt-2 max-w-md text-xs leading-6 text-[#779996]">
              The current lexical retrieval engine could not find
              overlapping terms between your question and the
              indexed chunks. Try using different keywords or
              selecting a demonstration question.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result, index) => {
              if (result.score <= 0) return null;

              const chunkKey = `${result.documentId}-${result.id}`;
              const isExpanded = expandedChunks.includes(chunkKey);
              const percentage = result.score * 100;

              return (
                <motion.article
                  key={chunkKey}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#102A2B]/50"
                >
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="flex min-w-0 gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#02BFA7]/10 text-xs font-bold text-[#02BFA7]">
                          #{index + 1}
                        </span>

                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-[#DAFBF5]">
                            {result.documentTitle}
                          </h4>

                          <p className="mt-1 text-xs text-[#779996]">
                            {result.source} · {result.category}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="text-lg font-semibold tabular-nums text-[#02BFA7]">
                          {percentage.toFixed(1)}%
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-[#668784]">
                          Similarity score
                        </p>
                      </div>
                    </div>

                    {/* Similarity score bar */}
                    <div className="mt-5">
                      <div className="h-2 overflow-hidden rounded-full bg-[#071719]">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.5 }}
                          className="h-full rounded-full bg-[#02BFA7]"
                        />
                      </div>
                    </div>

                    {/* Chunk preview */}
                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#091D1F]/70 p-4">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#668784]">
                        Retrieved text
                      </p>

                      <p className={`text-xs leading-6 text-[#A6C4BF] ${
                        isExpanded ? "" : "line-clamp-3"
                      }`}>
                        {result.text}
                      </p>

                      <button
                        type="button"
                        onClick={() => toggleChunk(chunkKey)}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[#02BFA7] hover:text-[#DAFBF5]"
                      >
                        {isExpanded ? (
                          <>
                            Show less <ChevronUp size={14} />
                          </>
                        ) : (
                          <>
                            Inspect full chunk <ChevronDown size={14} />
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2 text-[10px] text-[#779996]">
                      <span className="rounded-md border border-white/[0.07] px-2 py-1">
                        {result.wordCount} words
                      </span>

                      <span className="rounded-md border border-white/[0.07] px-2 py-1">
                        {result.id}
                      </span>

                      <span className="rounded-md border border-white/[0.07] px-2 py-1">
                        {result.documentId}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>

      {/* Educational explanation */}
      <div className="rounded-2xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.04] p-4 sm:p-5">
        <div className="flex gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-[#02BFA7]" />

          <div>
            <h4 className="text-sm font-semibold text-[#DAFBF5]">
              What is happening behind the scenes?
            </h4>

            <div className="mt-3 space-y-2 text-xs leading-6 text-[#8BAEAA]">
              <p>
                <strong className="text-[#DAFBF5]">1. Query vectorisation:</strong>{" "}
                Your question is converted into a TF-IDF vector
                using the knowledge base vocabulary.
              </p>

              <p>
                <strong className="text-[#DAFBF5]">2. Similarity calculation:</strong>{" "}
                Cosine similarity measures how closely the query
                vector aligns with each chunk vector.
              </p>

              <p>
                <strong className="text-[#DAFBF5]">3. Ranking:</strong>{" "}
                Chunks are sorted by their similarity scores, and
                the highest-ranked Top-K results are returned.
              </p>

              <p>
                <strong className="text-[#DAFBF5]">Important limitation:</strong>{" "}
                This lab demonstrates lexical matching. It does
                not understand synonyms or meaning the way a
                neural embedding model can.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
