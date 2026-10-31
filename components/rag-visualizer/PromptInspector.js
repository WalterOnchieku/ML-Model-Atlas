
/*
 * File: components/rag-visualizer/PromptInspector.js
 * Purpose: Demonstrate how retrieved context is assembled into an LLM prompt.
 *
 * Features:
 * - Demo and custom questions.
 * - Configurable Top-K retrieval.
 * - Retrieved context inspection.
 * - Generated prompt preview.
 * - Copy prompt to clipboard.
 *
 * Note: This component constructs prompts locally. It does not call an LLM.
 */

"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clipboard,
  ClipboardCheck,
  FileText,
  MessageSquareText,
  RotateCcw,
  Search,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import {
  SAMPLE_DOCUMENTS,
  DEMO_QUERIES,
} from "@/data/rag-visualizer";

import {
  prepareKnowledgeBase,
  retrieveDocuments,
  buildPrompt,
} from "@/lib/rag-engine";

export default function PromptInspector() {
  const [query, setQuery] = useState(DEMO_QUERIES[4]);
  const [topK, setTopK] = useState(3);
  const [expandedContext, setExpandedContext] = useState([]);
  const [copied, setCopied] = useState(false);

  // Prepare the knowledge base once.
  const knowledgeBase = useMemo(() => {
    return prepareKnowledgeBase(SAMPLE_DOCUMENTS);
  }, []);

  // Retrieve the chunks relevant to the current question.
  const retrievedChunks = useMemo(() => {
    if (!query.trim()) return [];

    return retrieveDocuments(query, knowledgeBase, topK).filter(
      (chunk) => chunk.score > 0
    );
  }, [query, knowledgeBase, topK]);

  // Construct the final prompt from the question and retrieved context.
  const generatedPrompt = useMemo(() => {
    return buildPrompt(query.trim(), retrievedChunks);
  }, [query, retrievedChunks]);

  const promptStats = useMemo(() => {
    const wordCount = generatedPrompt
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const characterCount = generatedPrompt.length;

    return {
      wordCount,
      characterCount,
      contextCount: retrievedChunks.length,
    };
  }, [generatedPrompt, retrievedChunks]);

  // Load a demonstration question.
  function handleDemoQuery(demoQuery) {
    setQuery(demoQuery);
    setExpandedContext([]);
    setCopied(false);
  }

  // Expand or collapse a retrieved context passage.
  function toggleContext(chunkKey) {
    setExpandedContext((current) =>
      current.includes(chunkKey)
        ? current.filter((key) => key !== chunkKey)
        : [...current, chunkKey]
    );
  }

  // Copy the generated prompt.
  async function handleCopyPrompt() {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  // Restore the initial state.
  function resetInspector() {
    setQuery(DEMO_QUERIES[4]);
    setTopK(3);
    setExpandedContext([]);
    setCopied(false);
  }

  return (
    <section className="space-y-8">
      {/* Section heading */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[#02BFA7]">
          <MessageSquareText size={17} />
          <span className="text-xs font-semibold tracking-[0.2em]">
            LAB 04 · PROMPT INSPECTION
          </span>
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
              See how context becomes a prompt.
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#8BAEAA]">
              Inspect how a RAG system combines a user question,
              retrieved knowledge and instructions into a structured
              prompt for a language model.
            </p>
          </div>

          <button
            type="button"
            onClick={resetInspector}
            className="inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-[#8BAEAA] transition hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
          >
            <RotateCcw size={14} />
            Reset inspector
          </button>
        </div>
      </div>

      {/* Question configuration */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/50 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Search size={17} className="text-[#02BFA7]" />
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Configure your question
          </h3>
        </div>

        <textarea
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setCopied(false);
          }}
          rows={3}
          placeholder="Ask a question about the knowledge base..."
          className="w-full resize-y rounded-xl border border-white/10 bg-[#091D1F] px-4 py-3 text-sm leading-6 text-[#DAFBF5] outline-none transition placeholder:text-[#668784] focus:border-[#02BFA7]/50"
        />

        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold tracking-wide text-[#779996]">
            DEMONSTRATION QUESTIONS
          </p>

          <div className="flex flex-wrap gap-2">
            {DEMO_QUERIES.map((demoQuery) => (
              <button
                key={demoQuery}
                type="button"
                onClick={() => handleDemoQuery(demoQuery)}
                className={`rounded-full border px-3 py-2 text-left text-xs transition ${
                  query === demoQuery
                    ? "border-[#02BFA7]/40 bg-[#02BFA7]/10 text-[#DAFBF5]"
                    : "border-white/10 text-[#8BAEAA] hover:border-[#02BFA7]/30 hover:text-[#DAFBF5]"
                }`}
              >
                {demoQuery}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-5 border-t border-white/[0.07] pt-5 sm:grid-cols-2">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <label
                htmlFor="prompt-top-k"
                className="text-sm text-[#8BAEAA]"
              >
                Retrieved chunks (Top-K)
              </label>

              <span className="rounded-lg bg-[#02BFA7]/10 px-3 py-1 text-sm font-semibold text-[#02BFA7]">
                {topK}
              </span>
            </div>

            <input
              id="prompt-top-k"
              type="range"
              min="1"
              max={Math.min(10, knowledgeBase.chunks.length)}
              value={topK}
              onChange={(event) => {
                setTopK(Number(event.target.value));
                setCopied(false);
              }}
              className="w-full accent-[#02BFA7]"
            />

            <div className="mt-2 flex justify-between text-[11px] text-[#668784]">
              <span>1 chunk</span>
              <span>{Math.min(10, knowledgeBase.chunks.length)} chunks</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.07] bg-[#091D1F]/70 p-4">
            <p className="text-xs text-[#668784]">
              Retrieved context
            </p>

            <p className="mt-1 text-xl font-semibold text-[#DAFBF5]">
              {retrievedChunks.length}
            </p>

            <p className="mt-1 text-xs text-[#779996]">
              Relevant chunks included in the prompt.
            </p>
          </div>
        </div>
      </div>

      {/* Retrieved context */}
      <div className="space-y-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <FileText size={17} className="text-[#02BFA7]" />
            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              Retrieved context
            </h3>
          </div>

          <p className="text-xs leading-5 text-[#779996]">
            These are the knowledge-base passages that will be
            inserted into the prompt.
          </p>
        </div>

        {retrievedChunks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center">
            <p className="text-sm font-medium text-[#DAFBF5]">
              No relevant context retrieved.
            </p>
            <p className="mt-2 text-xs text-[#779996]">
              Try a different question or use one of the demonstration queries.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {retrievedChunks.map((chunk, index) => {
              const chunkKey = `${chunk.documentId}-${chunk.id}`;
              const isExpanded = expandedContext.includes(chunkKey);

              return (
                <motion.div
                  key={chunkKey}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-white/[0.08] bg-[#102A2B]/40 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <span className="rounded-md bg-[#02BFA7]/10 px-2 py-1 text-[10px] font-bold text-[#02BFA7]">
                          CONTEXT {index + 1}
                        </span>

                        <span className="text-[10px] text-[#668784]">
                          {(chunk.score * 100).toFixed(1)}% similarity
                        </span>
                      </div>

                      <h4 className="text-sm font-semibold text-[#DAFBF5]">
                        {chunk.documentTitle}
                      </h4>

                      <p className="mt-1 text-xs text-[#779996]">
                        {chunk.source}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleContext(chunkKey)}
                      aria-label={isExpanded ? "Collapse context" : "Expand context"}
                      className="rounded-lg p-2 text-[#8BAEAA] transition hover:bg-white/5 hover:text-[#02BFA7]"
                    >
                      {isExpanded ? (
                        <ChevronUp size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </button>
                  </div>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 border-t border-white/[0.07] pt-4 text-xs leading-6 text-[#A6C4BF]">
                          {chunk.text}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#8BAEAA]">
                      {chunk.text}
                    </p>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Generated prompt */}
      <div className="overflow-hidden rounded-2xl border border-[#02BFA7]/20 bg-[#091D1F]">
        <div className="flex flex-col justify-between gap-3 border-b border-white/[0.08] bg-[#102A2B]/60 p-4 sm:flex-row sm:items-center sm:px-5">
          <div className="flex items-center gap-2">
            <Sparkles size={17} className="text-[#02BFA7]" />
            <div>
              <h3 className="text-sm font-semibold text-[#DAFBF5]">
                Generated prompt
              </h3>
              <p className="mt-0.5 text-[10px] text-[#779996]">
                Constructed using buildPrompt()
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#02BFA7]/10 px-3 py-2 text-xs font-semibold text-[#02BFA7] transition hover:bg-[#02BFA7]/20"
          >
            {copied ? (
              <>
                <ClipboardCheck size={15} />
                Copied
              </>
            ) : (
              <>
                <Clipboard size={15} />
                Copy prompt
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 divide-x divide-white/[0.07] border-b border-white/[0.07]">
          <div className="p-3 text-center">
            <p className="text-lg font-semibold text-[#DAFBF5]">
              {promptStats.wordCount}
            </p>
            <p className="text-[10px] text-[#668784]">Words</p>
          </div>

          <div className="p-3 text-center">
            <p className="text-lg font-semibold text-[#DAFBF5]">
              {promptStats.characterCount}
            </p>
            <p className="text-[10px] text-[#668784]">Characters</p>
          </div>

          <div className="p-3 text-center">
            <p className="text-lg font-semibold text-[#DAFBF5]">
              {promptStats.contextCount}
            </p>
            <p className="text-[10px] text-[#668784]">Sources</p>
          </div>
        </div>

        <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap break-words p-4 text-xs leading-6 text-[#A6C4BF] sm:p-6">
          {generatedPrompt}
        </pre>
      </div>

      {/* Educational note */}
      <div className="rounded-2xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.04] p-4 sm:p-5">
        <div className="flex gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-[#02BFA7]" />

          <div>
            <h4 className="text-sm font-semibold text-[#DAFBF5]">
              Why does prompt construction matter?
            </h4>

            <p className="mt-2 text-xs leading-6 text-[#8BAEAA]">
              A language model does not automatically know which
              documents your application has retrieved. Prompt
              construction supplies that information as context,
              provides instructions for using it and includes the
              user's original question. This helps the application
              guide the model toward context-grounded responses.
            </p>

            <p className="mt-3 text-xs leading-6 text-[#8BAEAA]">
              This demonstration stops at prompt construction.
              No language model is connected, and no answer is
              generated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
