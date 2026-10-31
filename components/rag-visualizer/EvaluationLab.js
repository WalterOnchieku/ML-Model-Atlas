
/*
 * File: components/rag-visualizer/EvaluationLab.js
 * Purpose: Evaluate the quality of RAG retrieval using labelled benchmark queries.
 *
 * Features:
 * - Predefined benchmark questions with known relevant documents.
 * - Configurable Top-K retrieval.
 * - Precision@K, Recall@K and F1@K.
 * - Mean Reciprocal Rank at K (MRR@K).
 * - Ranked retrieval results and relevance indicators.
 * - Explanations of evaluation metrics.
 *
 * Note: Relevance labels are manually defined for this educational dataset.
 */

"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  CheckCircle2,
  CircleHelp,
  Database,
  Info,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { SAMPLE_DOCUMENTS } from "@/data/rag-visualizer";

import {
  prepareKnowledgeBase,
  retrieveDocuments,
} from "@/lib/rag-engine";

// Small, manually labelled evaluation dataset.
// Each query identifies the document expected to contain relevant information.
const EVALUATION_BENCHMARKS = [
  {
    id: "symptoms",
    query: "What are the common symptoms of malaria?",
    relevantDocumentIds: ["doc-001"],
    explanation:
      "The Understanding Malaria document describes common symptoms such as fever, chills and headache.",
  },
  {
    id: "severe",
    query: "What are the warning signs of severe malaria?",
    relevantDocumentIds: ["doc-002"],
    explanation:
      "The Severe Malaria document describes warning signs including impaired consciousness, seizures and difficulty breathing.",
  },
  {
    id: "prevention",
    query: "How can people prevent malaria?",
    relevantDocumentIds: ["doc-003"],
    explanation:
      "The Malaria Prevention document covers insecticide-treated nets, repellents and reducing breeding sites.",
  },
  {
    id: "diagnosis",
    query: "How is malaria diagnosed?",
    relevantDocumentIds: ["doc-004"],
    explanation:
      "The Malaria Diagnosis document explains rapid diagnostic tests, microscopy and laboratory confirmation.",
  },
  {
    id: "transmission",
    query: "How does rainfall affect malaria transmission?",
    relevantDocumentIds: ["doc-005"],
    explanation:
      "The Malaria Transmission document describes how rainfall and other environmental conditions influence mosquito breeding and transmission.",
  },
];

function calculateMetrics(results, relevantDocumentIds, topK) {
  const relevantSet = new Set(relevantDocumentIds);

  const relevantRetrieved = results.filter((result) =>
    relevantSet.has(result.documentId)
  );

  const relevantCount = relevantRetrieved.length;

  // Precision@K = relevant retrieved results / K.
  const precision = relevantCount / topK;

  // Recall@K = relevant retrieved results / all known relevant documents.
  const recall = relevantCount / relevantSet.size;

  // F1@K = harmonic mean of precision and recall.
  const f1 =
    precision + recall > 0
      ? (2 * precision * recall) / (precision + recall)
      : 0;

  // MRR@K = reciprocal rank of the first relevant result.
  const firstRelevantIndex = results.findIndex((result) =>
    relevantSet.has(result.documentId)
  );

  const mrr =
    firstRelevantIndex === -1
      ? 0
      : 1 / (firstRelevantIndex + 1);

  return {
    precision,
    recall,
    f1,
    mrr,
    relevantCount,
    totalRelevant: relevantSet.size,
    firstRelevantRank:
      firstRelevantIndex === -1 ? null : firstRelevantIndex + 1,
  };
}

function MetricCard({ label, value, description, icon: Icon }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-[#102A2B]/60 p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs text-[#8BAEAA]">{label}</span>
        <Icon size={16} className="text-[#02BFA7]" />
      </div>

      <p className="text-2xl font-semibold tabular-nums text-[#DAFBF5]">
        {(value * 100).toFixed(1)}%
      </p>

      <p className="mt-2 text-[11px] leading-5 text-[#668784]">
        {description}
      </p>
    </div>
  );
}

export default function EvaluationLab() {
  const [selectedBenchmarkId, setSelectedBenchmarkId] = useState(
    EVALUATION_BENCHMARKS[0].id
  );

  const [topK, setTopK] = useState(3);

  // Prepare the knowledge base once.
  const knowledgeBase = useMemo(() => {
    return prepareKnowledgeBase(SAMPLE_DOCUMENTS);
  }, []);

  const selectedBenchmark = EVALUATION_BENCHMARKS.find(
    (benchmark) => benchmark.id === selectedBenchmarkId
  );

  // Retrieve the complete ranking so we can evaluate different Top-K values.
  const rankedResults = useMemo(() => {
    return retrieveDocuments(
      selectedBenchmark.query,
      knowledgeBase,
      knowledgeBase.chunks.length
    );
  }, [selectedBenchmark, knowledgeBase]);

  // Only the first K results are evaluated and displayed.
  const results = useMemo(() => {
    return rankedResults.slice(0, topK);
  }, [rankedResults, topK]);

  const metrics = useMemo(() => {
    return calculateMetrics(
      results,
      selectedBenchmark.relevantDocumentIds,
      topK
    );
  }, [results, selectedBenchmark, topK]);

  const metricDefinitions = [
    {
      label: "Precision@K",
      value: metrics.precision,
      description: "Relevant results among the retrieved Top-K chunks.",
      icon: Target,
    },
    {
      label: "Recall@K",
      value: metrics.recall,
      description: "Relevant documents successfully retrieved.",
      icon: Database,
    },
    {
      label: "F1@K",
      value: metrics.f1,
      description: "Balance between precision and recall.",
      icon: Activity,
    },
    {
      label: "MRR@K",
      value: metrics.mrr,
      description: "How highly the first relevant result is ranked.",
      icon: TrendingUp,
    },
  ];

  function resetEvaluation() {
    setSelectedBenchmarkId(EVALUATION_BENCHMARKS[0].id);
    setTopK(3);
  }

  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#02BFA7]">
          <Activity size={17} />
          <span className="text-xs font-semibold tracking-[0.2em]">
            LAB 05 · EVALUATION
          </span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
              Measure retrieval quality.
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#8BAEAA]">
              Evaluate whether your retrieval system finds the
              information it should. Experiment with Top-K and
              observe how retrieval metrics change.
            </p>
          </div>

          <button
            type="button"
            onClick={resetEvaluation}
            className="w-fit rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#8BAEAA] transition hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
          >
            Reset evaluation
          </button>
        </div>
      </div>

      {/* Benchmark selection */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <CircleHelp size={17} className="text-[#02BFA7]" />
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Select an evaluation query
          </h3>
        </div>

        <label
          htmlFor="evaluation-query"
          className="mb-2 block text-xs text-[#779996]"
        >
          Benchmark question
        </label>

        <select
          id="evaluation-query"
          value={selectedBenchmarkId}
          onChange={(event) =>
            setSelectedBenchmarkId(event.target.value)
          }
          className="w-full rounded-xl border border-white/10 bg-[#091D1F] px-4 py-3 text-sm text-[#DAFBF5] outline-none transition focus:border-[#02BFA7]/50"
        >
          {EVALUATION_BENCHMARKS.map((benchmark) => (
            <option key={benchmark.id} value={benchmark.id}>
              {benchmark.query}
            </option>
          ))}
        </select>

        <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#091D1F]/70 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#668784]">
            Expected relevant information
          </p>

          <p className="mt-2 text-xs leading-6 text-[#A6C4BF]">
            {selectedBenchmark.explanation}
          </p>

          <p className="mt-3 text-[11px] text-[#779996]">
            Ground truth: {selectedBenchmark.relevantDocumentIds.length} relevant document(s)
          </p>
        </div>

        {/* Top-K control */}
        <div className="mt-6 border-t border-white/[0.07] pt-5">
          <div className="mb-3 flex items-center justify-between">
            <label
              htmlFor="evaluation-top-k"
              className="text-sm text-[#8BAEAA]"
            >
              Number of retrieved chunks (K)
            </label>

            <span className="rounded-lg bg-[#02BFA7]/10 px-3 py-1 text-sm font-semibold text-[#02BFA7]">
              {topK}
            </span>
          </div>

          <input
            id="evaluation-top-k"
            type="range"
            min="1"
            max={knowledgeBase.chunks.length}
            value={topK}
            onChange={(event) => setTopK(Number(event.target.value))}
            className="w-full accent-[#02BFA7]"
          />

          <div className="mt-2 flex justify-between text-[11px] text-[#668784]">
            <span>K = 1</span>
            <span>K = {knowledgeBase.chunks.length}</span>
          </div>
        </div>
      </div>

      {/* Evaluation metrics */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#DAFBF5]">
            Evaluation metrics
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#779996]">
            Metrics are recalculated whenever you change the
            benchmark question or Top-K value.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {metricDefinitions.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Retrieval results */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#DAFBF5]">
            Ranked retrieval results
          </h3>

          <p className="mt-1 text-xs leading-5 text-[#779996]">
            Each result is compared against the manually labelled
            relevant document.
          </p>
        </div>

        <div className="space-y-3">
          {results.map((result, index) => {
            const isRelevant =
              selectedBenchmark.relevantDocumentIds.includes(
                result.documentId
              );

            return (
              <motion.div
                key={`${result.documentId}-${result.id}`}
                layout
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                className={`rounded-xl border p-4 ${
                  isRelevant
                    ? "border-[#02BFA7]/30 bg-[#02BFA7]/[0.05]"
                    : "border-white/[0.07] bg-[#102A2B]/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-xs font-semibold text-[#A6C4BF]">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-[#DAFBF5]">
                        {result.documentTitle}
                      </h4>

                      <p className="mt-1 text-xs text-[#779996]">
                        {result.source}
                      </p>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    {isRelevant ? (
                      <>
                        <CheckCircle2
                          size={15}
                          className="text-[#02BFA7]"
                        />
                        <span className="text-[10px] font-semibold text-[#02BFA7]">
                          Relevant
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle
                          size={15}
                          className="text-[#779996]"
                        />
                        <span className="text-[10px] text-[#779996]">
                          Not relevant
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#071719]">
                    <div
                      className="h-full rounded-full bg-[#02BFA7]"
                      style={{
                        width: `${result.score * 100}%`,
                      }}
                    />
                  </div>

                  <span className="w-14 text-right text-xs tabular-nums text-[#A6C4BF]">
                    {(result.score * 100).toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Metric interpretation */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/40 p-4 sm:p-6">
        <div className="mb-5 flex items-center gap-2">
          <Info size={17} className="text-[#02BFA7]" />
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Understanding these results
          </h3>
        </div>

        <div className="space-y-4 text-xs leading-6 text-[#8BAEAA]">
          <p>
            <strong className="text-[#DAFBF5]">Precision@K:</strong>{" "}
            Of the {topK} chunks retrieved, {metrics.relevantCount} are
            relevant. Precision decreases when irrelevant chunks
            occupy the available retrieval positions.
          </p>

          <p>
            <strong className="text-[#DAFBF5]">Recall@K:</strong>{" "}
            The system retrieved {metrics.relevantCount} of{" "}
            {metrics.totalRelevant} known relevant documents.
            A low recall means useful information was missed.
          </p>

          <p>
            <strong className="text-[#DAFBF5]">F1@K:</strong>{" "}
            Combines precision and recall into a single score.
            It is useful when both retrieving relevant information
            and avoiding irrelevant results matter.
          </p>

          <p>
            <strong className="text-[#DAFBF5]">MRR@K:</strong>{" "}
            {metrics.firstRelevantRank
              ? `The first relevant result appears at rank ${metrics.firstRelevantRank}.`
              : "No relevant result appears in the selected Top-K results."}
            {" "}Higher reciprocal rank means the first useful result
            appears closer to the top.
          </p>
        </div>
      </div>

      {/* Important limitations */}
      <div className="rounded-2xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.04] p-4 sm:p-5">
        <div className="flex gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-[#02BFA7]" />

          <div>
            <h4 className="text-sm font-semibold text-[#DAFBF5]">
              Evaluation limitations
            </h4>

            <p className="mt-2 text-xs leading-6 text-[#8BAEAA]">
              This is a small educational benchmark with manually
              assigned document-level relevance labels. It evaluates
              retrieval, not the factual accuracy or helpfulness of
              generated answers.
            </p>

            <p className="mt-2 text-xs leading-6 text-[#8BAEAA]">
              Because the current sample documents are short and
              typically produce one chunk each, this benchmark is
              useful for learning metric behaviour but is not a
              reliable measure of production RAG performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
