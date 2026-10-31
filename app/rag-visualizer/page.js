
/*
 * RAG Visualizer — Main Page
 *
 * Entry point for the interactive RAG learning laboratory.
 * The page will progressively host the chunking, retrieval,
 * prompt inspection and evaluation experiences.
 */

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Database,
  GitBranch,
  Layers3,
  Sparkles,
  Workflow,
} from "lucide-react";

import PipelineExplorer from "@/components/rag-visualizer/PipelineExplorer";
import ChunkingPlayground from "@/components/rag-visualizer/ChunkingPlayground";
import RetrievalLab from "@/components/rag-visualizer/RetrievalLab";
import PromptInspector from "@/components/rag-visualizer/PromptInspector";
import EvaluationLab from "@/components/rag-visualizer/EvaluationLab";

const LEARNING_AREAS = [
  {
    number: "01",
    title: "Pipeline Explorer",
    description: "Understand the complete RAG architecture.",
    icon: Workflow,
    href: "#pipeline",
  },
  {
    number: "02",
    title: "Chunking Playground",
    description: "Experiment with chunk size and overlap.",
    icon: Layers3,
    href: "#chunking",
  },
  {
    number: "03",
    title: "Retrieval Lab",
    description: "Explore search, similarity and Top-K retrieval.",
    icon: Database,
    href: "#retrieval",
  },
  {
    number: "04",
    title: "Prompt Inspector",
    description: "Inspect how retrieved context becomes a prompt.",
    icon: GitBranch,
    href: "#prompt-inspector",
  },
  {
    number: "05",
    title: "Evaluation Lab",
    description: "Understand retrieval quality and RAG evaluation.",
    icon: Sparkles,
    href: "#evaluation",
  },
];

export default function RAGVisualizerPage() {
  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/rag-deep-dive"
          className="mb-8 inline-flex items-center gap-2 text-sm text-[#8EAAA6] transition hover:text-[#02BFA7]"
        >
          <ArrowLeft size={16} />
          Back to RAG Deep Dive
        </Link>

        {/* Hero */}
        <section className="relative mb-12 overflow-hidden rounded-3xl border border-[#244344] bg-[#102A2B] p-6 sm:p-9 lg:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#02BFA7]/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-[#02BFA7]/5 blur-3xl" />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/30 bg-[#02BFA7]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#02BFA7]">
              <Sparkles size={14} />
              Interactive learning laboratory
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              See how{" "}
              <span className="text-[#02BFA7]">RAG</span>{" "}
              actually works.
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#A6C0BC] sm:text-base">
              Explore the mechanics behind Retrieval-Augmented Generation.
              Follow information from document ingestion to answer generation,
              then experiment with the techniques that make retrieval systems
              effective.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 rounded-lg bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#42D8C3]"
              >
                Explore the pipeline
                <ArrowRight size={16} />
              </a>

              <Link
                href="/rag-deep-dive"
                className="inline-flex items-center gap-2 rounded-lg border border-[#42605F] px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/60"
              >
                <BookOpen size={16} />
                Read the deep dive
              </Link>
            </div>
          </div>

          <div className="relative z-10 mt-9 grid grid-cols-3 gap-3 border-t border-[#315051] pt-6 sm:max-w-xl sm:gap-6">
            <div>
              <div className="text-2xl font-semibold tabular-nums text-[#02BFA7]">
                07
              </div>
              <div className="mt-1 text-xs text-[#8EAAA6]">
                Pipeline stages
              </div>
            </div>

            <div>
              <div className="text-2xl font-semibold tabular-nums text-[#02BFA7]">
                05
              </div>
              <div className="mt-1 text-xs text-[#8EAAA6]">
                Learning labs
              </div>
            </div>

            <div>
              <div className="text-2xl font-semibold text-[#02BFA7]">
                01
              </div>
              <div className="mt-1 text-xs text-[#8EAAA6]">
                Sample knowledge base
              </div>
            </div>
          </div>
        </section>

        {/* Learning areas */}
        <section className="mb-12">
          <div className="mb-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#02BFA7]">
              Learning environment
            </div>
            <h2 className="mt-2 text-xl font-semibold text-[#DAFBF5]">
              The laboratory
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8EAAA6]">
            Explore five interactive labs covering the core stages of
            Retrieval-Augmented Generation. Move from understanding the
            architecture to experimenting with chunking, retrieval,
            prompt construction and evaluation.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LEARNING_AREAS.map((area) => {
                const AreaIcon = area.icon;

                return (
                    <a
                    key={area.number}
                    href={area.href}
                    className="group rounded-xl border border-[#244344] bg-[#0B2021]/70 p-4 transition duration-200 hover:-translate-y-1 hover:border-[#02BFA7]/50 hover:bg-[#102A2B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#02BFA7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071719]"
                    >
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold tabular-nums text-[#6F9995]">
                        {area.number}
                        </span>

                        <AreaIcon
                        size={18}
                        className="text-[#587876] transition-colors group-hover:text-[#02BFA7]"
                        />
                    </div>

                    <h3 className="mt-4 text-sm font-semibold text-[#DAFBF5]">
                        {area.title}
                    </h3>

                    <p className="mt-2 min-h-12 text-xs leading-5 text-[#8EAAA6]">
                        {area.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#244344] pt-3">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#02BFA7]">
                        Explore lab
                        </span>

                        <ArrowRight
                        size={14}
                        className="text-[#587876] transition-all group-hover:translate-x-1 group-hover:text-[#02BFA7]"
                        />
                    </div>
                    </a>
                );
                })}
          </div>
        </section>

        {/* Pipeline explorer */}
        <section id="pipeline" className="scroll-mt-8">
          <PipelineExplorer />
        </section>
        {/* Chunking playground */}
        <section id="chunking" className="mt-16 scroll-mt-8">
        <ChunkingPlayground />
        </section>
        {/* Retrieval lab */}
        <section id="retrieval" className="mt-16 scroll-mt-8">
        <RetrievalLab />
        </section>
        {/* Prompt inspector */}
        <section id="prompt-inspector" className="mt-16 scroll-mt-8">
        <PromptInspector />
        </section>
        {/* Evaluation lab */}
        <section id="evaluation" className="mt-16 scroll-mt-8">
        <EvaluationLab />
        </section>

        {/* Educational note */}
        <section className="mt-10 rounded-xl border border-[#244344] bg-[#0B2021] p-5">
          <div className="flex items-start gap-3">
            <Database
              size={19}
              className="mt-0.5 shrink-0 text-[#02BFA7]"
            />

            <div>
              <h3 className="text-sm font-semibold text-[#DAFBF5]">
                About this simulation
              </h3>
              <p className="mt-2 text-xs leading-6 text-[#8EAAA6]">
                This is a frontend educational simulation. It uses local TF-IDF
                and cosine similarity calculations to demonstrate document
                retrieval, ranking and prompt construction. It does not connect
                to an external vector database or language model, so answers
                are not generated by an LLM. The experiments use a small sample
                knowledge base for learning purposes.
                </p>
            </div>
          </div>
        </section>

        {/* Footer navigation */}
        <footer className="mt-12 flex flex-col gap-4 border-t border-[#244344] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#6F9995]">
            ML Cheatsheet · RAG Visualizer
          </p>

          <div className="flex flex-wrap gap-5 text-xs">
            <Link
              href="/models"
              className="text-[#8EAAA6] transition hover:text-[#02BFA7]"
            >
              Model Library
            </Link>

            <Link
              href="/glossary"
              className="text-[#8EAAA6] transition hover:text-[#02BFA7]"
            >
              Glossary
            </Link>

            <Link
              href="/interview-qa"
              className="text-[#8EAAA6] transition hover:text-[#02BFA7]"
            >
              Interview Q&A
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
