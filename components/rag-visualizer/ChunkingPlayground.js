
/*
 * RAG Visualizer — Chunking Playground
 *
 * Allows users to experiment with document chunking.
 * Uses the shared chunkText utility from the RAG engine.
 */

"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlignLeft,
  ArrowDown,
  Check,
  FileText,
  RotateCcw,
  Scissors,
  Settings2,
  Layers3,
} from "lucide-react";

import { SAMPLE_DOCUMENTS } from "@/data/rag-visualizer";
import { chunkText } from "@/lib/rag-engine";

const PRESETS = [
  {
    id: "small",
    label: "Small",
    size: 50,
    overlap: 10,
    description: "More precise passages",
  },
  {
    id: "balanced",
    label: "Balanced",
    size: 100,
    overlap: 20,
    description: "A practical starting point",
  },
  {
    id: "large",
    label: "Large",
    size: 200,
    overlap: 40,
    description: "More surrounding context",
  },
];

const INITIAL_DOCUMENT = SAMPLE_DOCUMENTS[0].content.trim();

export default function ChunkingPlayground() {
  const [documentText, setDocumentText] = useState(INITIAL_DOCUMENT);
  const [chunkSize, setChunkSize] = useState(100);
  const [overlap, setOverlap] = useState(20);
  const [selectedChunk, setSelectedChunk] = useState(0);

  const words = useMemo(() => {
    return documentText.trim().split(/\s+/).filter(Boolean);
  }, [documentText]);

  const chunks = useMemo(() => {
    if (!words.length) return [];

    try {
      return chunkText(documentText, chunkSize, overlap);
    } catch {
      return [];
    }
  }, [documentText, chunkSize, overlap, words.length]);

  const totalWords = words.length;

  const averageChunkSize = chunks.length
    ? Math.round(
        chunks.reduce((total, chunk) => total + chunk.wordCount, 0) /
          chunks.length
      )
    : 0;

  const selected = chunks[selectedChunk] || null;

  function applyPreset(preset) {
    setChunkSize(preset.size);
    setOverlap(preset.overlap);
    setSelectedChunk(0);
  }

  function resetPlayground() {
    setDocumentText(INITIAL_DOCUMENT);
    setChunkSize(100);
    setOverlap(20);
    setSelectedChunk(0);
  }

  function updateChunkSize(value) {
    const nextSize = Number(value);
    if (!Number.isFinite(nextSize)) return;

    setChunkSize(nextSize);
    setOverlap((current) => Math.min(current, nextSize - 1));
    setSelectedChunk(0);
  }

  function updateOverlap(value) {
    const nextOverlap = Number(value);
    if (!Number.isFinite(nextOverlap)) return;

    setOverlap(Math.min(Math.max(0, nextOverlap), chunkSize - 1));
    setSelectedChunk(0);
  }

  function handleDocumentChange(value) {
    setDocumentText(value);
    setSelectedChunk(0);
  }

  return (
    <section className="space-y-6">
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
            <Scissors size={15} />
            Experiment 01
          </div>

          <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
            Chunking Playground
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#9BB8B5]">
            Change how a document is divided into passages and observe how
            chunk size and overlap affect the result.
          </p>
        </div>

        <button
          type="button"
          onClick={resetPlayground}
          className="inline-flex w-fit items-center gap-2 rounded-lg border border-[#315051] px-3 py-2 text-xs font-medium text-[#B7CECA] transition hover:border-[#02BFA7]/50 hover:text-[#DAFBF5]"
        >
          <RotateCcw size={14} />
          Reset experiment
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total words", value: totalWords, icon: FileText },
          { label: "Total chunks", value: chunks.length, icon: Layers3 },
          { label: "Chunk size", value: chunkSize, icon: Scissors },
          { label: "Average size", value: averageChunkSize, icon: AlignLeft },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#244344] bg-[#102A2B] p-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#8EAAA6]">{stat.label}</span>
                <Icon size={15} className="text-[#02BFA7]" />
              </div>

              <div className="mt-3 text-2xl font-semibold tabular-nums text-[#DAFBF5]">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main playground */}
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Controls */}
        <div className="space-y-5 rounded-2xl border border-[#244344] bg-[#102A2B] p-5">
          <div className="flex items-center gap-2">
            <Settings2 size={17} className="text-[#02BFA7]" />
            <h3 className="text-sm font-semibold text-[#DAFBF5]">
              Chunk configuration
            </h3>
          </div>

          {/* Presets */}
          <div>
            <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[#8EAAA6]">
              Configuration presets
            </label>

            <div className="grid grid-cols-3 gap-2">
              {PRESETS.map((preset) => {
                const active =
                  chunkSize === preset.size && overlap === preset.overlap;

                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    aria-pressed={active}
                    className={`rounded-lg border p-3 text-left transition ${
                      active
                        ? "border-[#02BFA7]/60 bg-[#02BFA7]/10"
                        : "border-[#315051] bg-[#0B2021] hover:border-[#02BFA7]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span
                        className={`text-xs font-semibold ${
                          active ? "text-[#02BFA7]" : "text-[#B7CECA]"
                        }`}
                      >
                        {preset.label}
                      </span>

                      {active && (
                        <Check size={13} className="text-[#02BFA7]" />
                      )}
                    </div>

                    <div className="mt-2 text-[10px] text-[#8EAAA6]">
                      {preset.size} / {preset.overlap}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chunk size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="chunk-size"
                className="text-sm font-medium text-[#DAFBF5]"
              >
                Chunk size
              </label>

              <span className="rounded-md bg-[#0B2021] px-2.5 py-1 text-xs font-semibold tabular-nums text-[#02BFA7]">
                {chunkSize} words
              </span>
            </div>

            <input
              id="chunk-size"
              type="range"
              min="20"
              max="300"
              step="10"
              value={chunkSize}
              onChange={(event) => updateChunkSize(event.target.value)}
              className="w-full cursor-pointer accent-[#02BFA7]"
            />

            <div className="flex justify-between text-[10px] text-[#6F9995]">
              <span>20 words</span>
              <span>300 words</span>
            </div>

            <p className="text-xs leading-5 text-[#8EAAA6]">
              Determines the maximum number of words in each chunk.
            </p>
          </div>

          <div className="h-px bg-[#244344]" />

          {/* Overlap */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor="chunk-overlap"
                className="text-sm font-medium text-[#DAFBF5]"
              >
                Chunk overlap
              </label>

              <span className="rounded-md bg-[#0B2021] px-2.5 py-1 text-xs font-semibold tabular-nums text-[#02BFA7]">
                {overlap} words
              </span>
            </div>

            <input
              id="chunk-overlap"
              type="range"
              min="0"
              max={Math.min(100, chunkSize - 1)}
              step="1"
              value={overlap}
              onChange={(event) => updateOverlap(event.target.value)}
              className="w-full cursor-pointer accent-[#02BFA7]"
            />

            <div className="flex justify-between text-[10px] text-[#6F9995]">
              <span>0 words</span>
              <span>{Math.min(100, chunkSize - 1)} words</span>
            </div>

            <p className="text-xs leading-5 text-[#8EAAA6]">
              Repeats words from the previous chunk to help preserve context
              across boundaries.
            </p>
          </div>

          {/* Formula */}
          <div className="rounded-xl border border-[#244344] bg-[#0B2021] p-4">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#02BFA7]">
              Chunking formula
            </div>

            <div className="mt-2 font-mono text-sm text-[#DAFBF5]">
              Step = Size − Overlap
            </div>

            <div className="mt-2 text-xs text-[#9BB8B5]">
              {chunkSize} − {overlap} ={" "}
              <span className="font-semibold text-[#02BFA7]">
                {chunkSize - overlap} words
              </span>{" "}
              between chunk start positions.
            </div>
          </div>
        </div>

        {/* Document input */}
        <div className="flex flex-col rounded-2xl border border-[#244344] bg-[#102A2B] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText size={17} className="text-[#02BFA7]" />
              <h3 className="text-sm font-semibold text-[#DAFBF5]">
                Source document
              </h3>
            </div>

            <span className="text-xs tabular-nums text-[#6F9995]">
              {totalWords} words
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[#8EAAA6]">
            Edit the document or paste your own text to experiment with
            different chunking configurations.
          </p>

          <textarea
            value={documentText}
            onChange={(event) => handleDocumentChange(event.target.value)}
            placeholder="Paste your document here..."
            spellCheck="false"
            className="mt-4 min-h-[300px] w-full flex-1 resize-y rounded-xl border border-[#315051] bg-[#0B2021] p-4 text-sm leading-7 text-[#C4D9D5] outline-none transition placeholder:text-[#587876] focus:border-[#02BFA7]/60"
          />

          <div className="mt-3 flex items-center justify-between text-[10px] text-[#6F9995]">
            <span>Client-side processing</span>
            <span>Changes update automatically</span>
          </div>
        </div>
      </div>

      {/* Chunk results */}
      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02BFA7]">
              <Layers3 size={14} />
              Output
            </div>

            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              Generated chunks
            </h3>

            <p className="mt-1 text-xs text-[#8EAAA6]">
              Select a chunk to inspect its content and position.
            </p>
          </div>

          <span className="text-xs tabular-nums text-[#8EAAA6]">
            {chunks.length} chunks generated
          </span>
        </div>

        {chunks.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#315051] bg-[#102A2B] p-8 text-center">
            <FileText size={24} className="mx-auto text-[#587876]" />
            <p className="mt-3 text-sm font-medium text-[#DAFBF5]">
              No document content
            </p>
            <p className="mt-1 text-xs text-[#8EAAA6]">
              Enter some text above to generate chunks.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
            {/* Chunk list */}
            <div className="space-y-2">
              {chunks.map((chunk, index) => {
                const active = selectedChunk === index;

                return (
                  <button
                    key={chunk.id}
                    type="button"
                    onClick={() => setSelectedChunk(index)}
                    aria-pressed={active}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-[#02BFA7]/60 bg-[#123334]"
                        : "border-[#244344] bg-[#102A2B] hover:border-[#02BFA7]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-bold ${
                            active
                              ? "bg-[#02BFA7] text-[#071719]"
                              : "bg-[#183536] text-[#8EAAA6]"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm font-semibold text-[#DAFBF5]">
                          Chunk {index + 1}
                        </span>
                      </div>

                      <span className="text-[10px] tabular-nums text-[#8EAAA6]">
                        {chunk.wordCount} words
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-2 text-xs leading-5 text-[#9BB8B5]">
                      {chunk.text}
                    </p>

                    <div className="mt-3 flex items-center justify-between text-[10px] text-[#6F9995]">
                      <span>
                        Words {chunk.startIndex + 1}–{chunk.endIndex}
                      </span>

                      {active && (
                        <span className="font-semibold text-[#02BFA7]">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected chunk inspector */}
            <div className="h-fit rounded-2xl border border-[#244344] bg-[#102A2B] p-5 lg:sticky lg:top-6">
              <AnimatePresence mode="wait">
                {selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.18 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02BFA7]">
                        <FileText size={14} />
                        Chunk inspector
                      </div>

                      <span className="text-xs text-[#8EAAA6]">
                        {selected.id}
                      </span>
                    </div>

                    <h4 className="mt-4 text-lg font-semibold text-[#DAFBF5]">
                      Chunk {selectedChunk + 1}
                    </h4>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="rounded-lg bg-[#0B2021] p-3">
                        <div className="text-[10px] text-[#6F9995]">
                          Start position
                        </div>
                        <div className="mt-1 text-sm font-semibold tabular-nums text-[#DAFBF5]">
                          {selected.startIndex + 1}
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#0B2021] p-3">
                        <div className="text-[10px] text-[#6F9995]">
                          End position
                        </div>
                        <div className="mt-1 text-sm font-semibold tabular-nums text-[#DAFBF5]">
                          {selected.endIndex}
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#0B2021] p-3">
                        <div className="text-[10px] text-[#6F9995]">
                          Word count
                        </div>
                        <div className="mt-1 text-sm font-semibold tabular-nums text-[#DAFBF5]">
                          {selected.wordCount}
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#0B2021] p-3">
                        <div className="text-[10px] text-[#6F9995]">
                          Overlap setting
                        </div>
                        <div className="mt-1 text-sm font-semibold tabular-nums text-[#DAFBF5]">
                          {overlap}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8EAAA6]">
                        Chunk content
                      </div>

                      <div className="max-h-72 overflow-y-auto rounded-xl border border-[#244344] bg-[#0B2021] p-4">
                        <p className="whitespace-pre-wrap text-sm leading-7 text-[#C4D9D5]">
                          {selected.text}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-lg border border-[#02BFA7]/20 bg-[#02BFA7]/5 p-3">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#02BFA7]">
                        <Check size={13} />
                        Chunk generated
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#9BB8B5]">
                        This passage can now be passed to an embedding model
                        and indexed for retrieval.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Educational explanation */}
      <div className="rounded-xl border border-[#244344] bg-[#0B2021] p-5">
        <div className="flex items-start gap-3">
          <Scissors size={19} className="mt-0.5 shrink-0 text-[#02BFA7]" />

          <div>
            <h3 className="text-sm font-semibold text-[#DAFBF5]">
              Why does overlap matter?
            </h3>

            <p className="mt-2 text-xs leading-6 text-[#8EAAA6]">
              Imagine a sentence begins at the end of one chunk and finishes
              in the next. Without overlap, the relationship between the
              two passages may be lost. Overlap repeats some content between
              adjacent chunks, helping preserve continuity. Too much overlap,
              however, creates redundant passages and increases storage and
              processing requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
