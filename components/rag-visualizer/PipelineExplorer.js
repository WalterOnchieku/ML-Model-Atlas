
/*
 * RAG Visualizer — Pipeline Explorer
 *
 * Interactive walkthrough of the seven stages of a RAG pipeline.
 * Users can select stages and inspect their purpose, inputs and outputs.
 */

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  Database,
  FileInput,
  Files,
  Layers3,
  Search,
  Sparkles,
  Workflow,
} from "lucide-react";

import { RAG_PIPELINE_STAGES } from "@/data/rag-visualizer";

const STAGE_ICONS = {
  ingestion: FileInput,
  chunking: Files,
  embedding: Layers3,
  indexing: Database,
  retrieval: Search,
  reranking: Workflow,
  generation: Sparkles,
};

const STAGE_DETAILS = {
  ingestion: {
    concept: "Preparing source material",
    explanation:
      "RAG starts with information from external sources. Documents are loaded, their text is extracted, and useful metadata is preserved.",
    example:
      "A collection of healthcare guides is loaded into the application. Each document keeps its title, source and category.",
    technique: "Document loaders and text extraction",
    takeaway:
      "The quality of the knowledge base depends on the quality of the source documents.",
  },
  chunking: {
    concept: "Breaking documents into passages",
    explanation:
      "Long documents are divided into smaller pieces called chunks. This allows the retrieval system to find specific passages instead of returning entire documents.",
    example:
      "A 2,000-word malaria guide could be divided into smaller passages of 300 words, with 50 words of overlap.",
    technique: "Fixed-size, recursive and semantic chunking",
    takeaway:
      "Chunk size and overlap influence how much context is available during retrieval.",
  },
  embedding: {
    concept: "Representing text numerically",
    explanation:
      "An embedding model converts text into a numerical vector. Similar meanings can be represented by vectors that are close together in the embedding space.",
    example:
      "The phrases 'prevent malaria' and 'avoid mosquito bites' may have similar semantic representations.",
    technique: "Neural embedding models",
    takeaway:
      "Embedding models make semantic search possible, even when different words express similar ideas.",
  },
  indexing: {
    concept: "Organising vectors for search",
    explanation:
      "Document vectors and their metadata are stored in an index. A vector database can search this collection efficiently.",
    example:
      "Each vector is stored alongside its original text, document ID, title and category.",
    technique: "Vector databases and approximate nearest-neighbour indexes",
    takeaway:
      "An index makes it practical to search large collections of document vectors.",
  },
  retrieval: {
    concept: "Finding relevant information",
    explanation:
      "A user's question is converted into a searchable representation. The retrieval system compares it with indexed document chunks and returns the most relevant candidates.",
    example:
      "A question about malaria symptoms retrieves passages describing fever, chills and headaches.",
    technique: "Dense search, sparse search and hybrid retrieval",
    takeaway:
      "Retrieval determines which information the language model gets to use.",
  },
  reranking: {
    concept: "Improving search result relevance",
    explanation:
      "The initial retrieval results are examined and reordered. A reranker can consider the relationship between the complete question and each candidate passage.",
    example:
      "A passage directly describing severe malaria symptoms may move above a general passage about malaria.",
    technique: "Cross-encoder reranking",
    takeaway:
      "A better ranking can improve the quality of the context sent to the language model.",
  },
  generation: {
    concept: "Producing a grounded response",
    explanation:
      "The retrieved passages are combined with the original question in a prompt. A language model uses this context to generate an answer.",
    example:
      "The model answers a question about malaria symptoms using the retrieved educational passages.",
    technique: "Prompt construction and language model inference",
    takeaway:
      "The model should distinguish supported information from information missing in the supplied context.",
  },
};

export default function PipelineExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStage = RAG_PIPELINE_STAGES[activeIndex];
  const ActiveIcon = STAGE_ICONS[activeStage.id];
  const details = STAGE_DETAILS[activeStage.id];

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === RAG_PIPELINE_STAGES.length - 1;

  function goToStage(index) {
    if (index < 0 || index >= RAG_PIPELINE_STAGES.length) return;
    setActiveIndex(index);
  }

  function goToNextStage() {
    goToStage(Math.min(activeIndex + 1, RAG_PIPELINE_STAGES.length - 1));
  }

  function goToPreviousStage() {
    goToStage(Math.max(activeIndex - 1, 0));
  }

  function restartPipeline() {
    setActiveIndex(0);
  }

  return (
    <section className="space-y-6">
      {/* Section heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
            <Workflow size={15} />
            Interactive architecture
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
            Explore the RAG pipeline
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9BB8B5]">
            Select any stage to understand what happens, what goes into it,
            and what comes out.
          </p>
        </div>

        <div className="text-sm text-[#9BB8B5]">
          Stage{" "}
          <span className="font-semibold tabular-nums text-[#DAFBF5]">
            {activeIndex + 1}
          </span>{" "}
          of {RAG_PIPELINE_STAGES.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-[#183536]">
        <motion.div
          className="h-full rounded-full bg-[#02BFA7]"
          initial={false}
          animate={{
            width: `${((activeIndex + 1) / RAG_PIPELINE_STAGES.length) * 100}%`,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>

      {/* Pipeline stages */}
      <div className="rounded-2xl border border-[#244344] bg-[#0B2021] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {RAG_PIPELINE_STAGES.map((stage, index) => {
            const StageIcon = STAGE_ICONS[stage.id];
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;

            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => goToStage(index)}
                aria-current={isActive ? "step" : undefined}
                className={`group flex min-h-20 items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? "border-[#02BFA7]/70 bg-[#123334] shadow-[0_0_0_1px_rgba(2,191,167,0.08)]"
                    : "border-[#244344] bg-[#102A2B] hover:border-[#02BFA7]/40 hover:bg-[#153334]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-[#02BFA7] text-[#071719]"
                      : isCompleted
                        ? "bg-[#02BFA7]/15 text-[#02BFA7]"
                        : "bg-[#183536] text-[#9BB8B5]"
                  }`}
                >
                  {isCompleted ? (
                    <Check size={18} />
                  ) : (
                    <StageIcon size={18} />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#6F9995]">
                    Stage {String(index + 1).padStart(2, "0")}
                  </div>
                  <div
                    className={`mt-1 text-sm font-medium ${
                      isActive ? "text-[#DAFBF5]" : "text-[#B7CECA]"
                    }`}
                  >
                    {stage.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage connector hint */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6F9995]">
          <ArrowDown size={14} />
          Select a stage to inspect its details
        </div>
      </div>

      {/* Active stage details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden rounded-2xl border border-[#244344] bg-[#102A2B]"
        >
          <div className="border-b border-[#244344] p-5 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                <ActiveIcon size={24} />
              </div>

              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#02BFA7]">
                  Stage {String(activeIndex + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-1 text-xl font-semibold text-[#DAFBF5]">
                  {activeStage.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#9BB8B5]">
                  {activeStage.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
            <div className="rounded-xl border border-[#244344] bg-[#0B2021] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8EAAA6]">
                <ArrowRight size={14} />
                Input
              </div>
              <p className="text-sm leading-6 text-[#DAFBF5]">
                {activeStage.input}
              </p>
            </div>

            <div className="rounded-xl border border-[#244344] bg-[#0B2021] p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02BFA7]">
                <Check size={14} />
                Output
              </div>
              <p className="text-sm leading-6 text-[#DAFBF5]">
                {activeStage.output}
              </p>
            </div>
          </div>

          <div className="space-y-4 px-5 pb-5 sm:px-6 sm:pb-6">
            <div>
              <h4 className="text-sm font-semibold text-[#DAFBF5]">
                What happens here?
              </h4>
              <p className="mt-2 text-sm leading-6 text-[#9BB8B5]">
                {details.explanation}
              </p>
            </div>

            <div className="rounded-xl border border-[#244344] bg-[#0B2021] p-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#02BFA7]">
                Practical example
              </div>
              <p className="mt-2 text-sm leading-6 text-[#B7CECA]">
                {details.example}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#6F9995]">
                  Techniques
                </div>
                <p className="mt-2 text-sm leading-6 text-[#B7CECA]">
                  {details.technique}
                </p>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#6F9995]">
                  Key takeaway
                </div>
                <p className="mt-2 text-sm leading-6 text-[#B7CECA]">
                  {details.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#244344] bg-[#0B2021]/60 p-4 sm:px-6">
            <button
              type="button"
              onClick={goToPreviousStage}
              disabled={isFirst}
              className="inline-flex items-center gap-2 rounded-lg border border-[#315051] px-4 py-2.5 text-sm font-medium text-[#B7CECA] transition hover:border-[#02BFA7]/50 hover:text-[#DAFBF5] disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            {isLast ? (
              <button
                type="button"
                onClick={restartPipeline}
                className="inline-flex items-center gap-2 rounded-lg bg-[#02BFA7] px-4 py-2.5 text-sm font-semibold text-[#071719] transition hover:bg-[#42D8C3]"
              >
                <Workflow size={16} />
                Restart pipeline
              </button>
            ) : (
              <button
                type="button"
                onClick={goToNextStage}
                className="inline-flex items-center gap-2 rounded-lg bg-[#02BFA7] px-4 py-2.5 text-sm font-semibold text-[#071719] transition hover:bg-[#42D8C3]"
              >
                Next stage
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
