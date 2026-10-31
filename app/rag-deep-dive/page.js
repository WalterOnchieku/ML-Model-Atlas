
"use client";

// app/rag-deep-dive/page.js
// A practical technical guide to Retrieval-Augmented Generation (RAG).
// Includes an interactive architecture explorer, technical concepts,
// implementation examples, evaluation metrics and a production checklist.

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Database,
  FileText,
  Gauge,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const PIPELINE = [
  {
    id: "ingestion",
    number: "01",
    title: "Document ingestion",
    subtitle: "Prepare your knowledge",
    icon: FileText,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    description:
      "Collect documents from different sources, extract their contents, clean the text and prepare it for indexing.",
    steps: [
      "Load documents from PDFs, websites, databases or APIs.",
      "Extract text and preserve useful metadata.",
      "Clean formatting issues, duplicated content and irrelevant material.",
      "Pass the prepared documents to the chunking stage.",
    ],
    considerations: [
      "Support multiple document formats.",
      "Preserve document titles, URLs and source identifiers.",
      "Handle updates and deleted documents.",
      "Validate extracted text before indexing.",
    ],
    example: `document = {
    "text": "RAG combines retrieval with generation...",
    "metadata": {
        "source": "rag-guide.pdf",
        "page": 4,
        "department": "engineering"
    }
}`,
  },
  {
    id: "chunking",
    number: "02",
    title: "Chunking",
    subtitle: "Break content into useful pieces",
    icon: Layers3,
    color: "text-amber-300",
    bg: "bg-amber-400/10",
    border: "border-amber-400/20",
    description:
      "Split documents into smaller pieces so relevant sections can be retrieved without passing entire documents to the language model.",
    steps: [
      "Choose a chunking strategy.",
      "Define chunk size and overlap.",
      "Preserve relationships between chunks and their source documents.",
      "Attach metadata to every chunk.",
    ],
    considerations: [
      "Very small chunks can lose context.",
      "Very large chunks can introduce irrelevant information.",
      "Overlap can preserve context across boundaries.",
      "Document structure should influence chunk boundaries.",
    ],
    example: `from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_text(document_text)`,
  },
  {
    id: "embedding",
    number: "03",
    title: "Embedding generation",
    subtitle: "Convert text into vectors",
    icon: BrainCircuit,
    color: "text-violet-300",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20",
    description:
      "An embedding model converts each text chunk into a numerical vector that captures aspects of its semantic meaning.",
    steps: [
      "Select an embedding model.",
      "Send each chunk to the model.",
      "Receive a numerical vector.",
      "Store the vector alongside its text and metadata.",
    ],
    considerations: [
      "Choose a model suited to your language and domain.",
      "Understand the model's vector dimensions.",
      "Use compatible query and document embedding models.",
      "Consider embedding cost and inference latency.",
    ],
    example: `from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)

vectors = model.encode(chunks)

print(vectors.shape)`,
  },
  {
    id: "indexing",
    number: "04",
    title: "Vector indexing",
    subtitle: "Store and organize knowledge",
    icon: Database,
    color: "text-cyan-300",
    bg: "bg-cyan-400/10",
    border: "border-cyan-400/20",
    description:
      "Store embeddings, text chunks and metadata in a searchable index, typically a vector database or a database with vector support.",
    steps: [
      "Create a collection or database table.",
      "Store each chunk's embedding.",
      "Store the original text and metadata.",
      "Build an index to make similarity searches efficient.",
    ],
    considerations: [
      "Choose an appropriate distance metric.",
      "Plan for metadata filtering.",
      "Consider index size and update frequency.",
      "Protect sensitive documents with access controls.",
    ],
    example: `import chromadb

client = chromadb.Client()

collection = client.create_collection(
    name="knowledge_base"
)

collection.add(
    ids=["chunk-001"],
    documents=["RAG combines retrieval and generation."],
    embeddings=[embedding],
    metadatas=[{"source": "guide.pdf"}]
)`,
  },
  {
    id: "retrieval",
    number: "05",
    title: "Retrieval",
    subtitle: "Find relevant information",
    icon: Search,
    color: "text-[#02BFA7]",
    bg: "bg-[#02BFA7]/10",
    border: "border-[#02BFA7]/20",
    description:
      "Convert the user's question into a query vector and search the knowledge base for the most relevant chunks.",
    steps: [
      "Receive the user's question.",
      "Generate a query embedding.",
      "Search for similar vectors.",
      "Apply metadata filters where appropriate.",
      "Return the top matching chunks.",
    ],
    considerations: [
      "Tune the number of retrieved results (top-k).",
      "Use metadata filters to narrow the search.",
      "Consider hybrid search for exact keyword matching.",
      "Measure retrieval quality rather than assuming similarity equals relevance.",
    ],
    example: `results = collection.query(
    query_embeddings=[query_embedding],
    n_results=5,
    where={"department": "engineering"}
)`,
  },
  {
    id: "reranking",
    number: "06",
    title: "Reranking",
    subtitle: "Improve relevance",
    icon: Gauge,
    color: "text-pink-300",
    bg: "bg-pink-400/10",
    border: "border-pink-400/20",
    description:
      "A reranker evaluates the retrieved candidates against the original query and reorders them based on relevance.",
    steps: [
      "Receive candidate chunks from retrieval.",
      "Score each query-document pair.",
      "Sort candidates by relevance.",
      "Keep the strongest results for context assembly.",
    ],
    considerations: [
      "Reranking adds computational cost and latency.",
      "It can improve the quality of the final context.",
      "It cannot recover relevant documents that retrieval missed.",
      "Use it when the quality improvement justifies the cost.",
    ],
    example: `from sentence_transformers import CrossEncoder

reranker = CrossEncoder(
    "cross-encoder/ms-marco-MiniLM-L-6-v2"
)

pairs = [(question, chunk) for chunk in candidates]
scores = reranker.predict(pairs)

ranked = sorted(
    zip(candidates, scores),
    key=lambda item: item[1],
    reverse=True
)`,
  },
  {
    id: "generation",
    number: "07",
    title: "Answer generation",
    subtitle: "Generate grounded responses",
    icon: Sparkles,
    color: "text-orange-300",
    bg: "bg-orange-400/10",
    border: "border-orange-400/20",
    description:
      "Combine the user's question with the retrieved context and send it to a language model to generate a relevant answer.",
    steps: [
      "Assemble the selected chunks into context.",
      "Construct a prompt with clear instructions.",
      "Send the prompt and question to the LLM.",
      "Return the answer with source references where possible.",
    ],
    considerations: [
      "Set boundaries against unsupported answers.",
      "Treat retrieved documents as untrusted input.",
      "Control context length and token usage.",
      "Make citations traceable to source documents.",
    ],
    example: `prompt = f"""
Answer the question using only the context below.

If the context does not contain the answer,
say that you do not have enough information.

Context:
{retrieved_context}

Question:
{question}
"""`,
  },
];

const CONCEPTS = [
  {
    title: "Fixed-size chunking",
    category: "Chunking",
    description:
      "Splits text into chunks using a fixed character or token limit, optionally with overlap.",
    use: "Simple documents and baseline experiments.",
    tradeoff:
      "Easy to implement, but can split sentences or concepts in awkward places.",
  },
  {
    title: "Recursive chunking",
    category: "Chunking",
    description:
      "Attempts to split text using a hierarchy of separators, such as paragraphs, sentences and words.",
    use: "General-purpose document collections.",
    tradeoff:
      "Preserves structure better than naive fixed-size splitting, but still needs tuning.",
  },
  {
    title: "Semantic chunking",
    category: "Chunking",
    description:
      "Uses semantic similarity between adjacent text sections to identify meaningful boundaries.",
    use: "Content where topic boundaries matter.",
    tradeoff:
      "Can produce more coherent chunks, but requires additional computation.",
  },
  {
    title: "Structure-aware chunking",
    category: "Chunking",
    description:
      "Uses document structure such as headings, sections, tables or code blocks to define chunks.",
    use: "Technical documentation, manuals and structured reports.",
    tradeoff:
      "Preserves context well, but requires document-aware parsing.",
  },
  {
    title: "Dense retrieval",
    category: "Retrieval",
    description:
      "Uses embedding vectors to retrieve content based on semantic similarity.",
    use: "Questions where meaning matters more than exact wording.",
    tradeoff:
      "Can miss exact identifiers, names or uncommon technical terms.",
  },
  {
    title: "Sparse retrieval",
    category: "Retrieval",
    description:
      "Uses lexical matching methods such as BM25 to find documents containing relevant terms.",
    use: "Exact phrases, product codes, names and technical identifiers.",
    tradeoff:
      "May miss relevant content expressed using different vocabulary.",
  },
  {
    title: "Hybrid search",
    category: "Retrieval",
    description:
      "Combines dense vector retrieval and sparse lexical retrieval.",
    use: "Mixed knowledge bases with both semantic and exact-match queries.",
    tradeoff:
      "Requires combining and tuning scores or rankings from multiple retrieval systems.",
  },
  {
    title: "Cross-encoder reranking",
    category: "Reranking",
    description:
      "Scores query-document pairs together to produce a more precise relevance ranking.",
    use: "Improving the relevance of a smaller candidate set.",
    tradeoff:
      "More expensive than vector retrieval when applied to large collections.",
  },
];

const IMPLEMENTATION_STEPS = [
  {
    title: "Define the knowledge problem",
    detail:
      "Identify who will use the system, what questions it should answer and which documents are authoritative.",
  },
  {
    title: "Build document ingestion",
    detail:
      "Load documents, extract text, clean content and preserve source metadata.",
  },
  {
    title: "Experiment with chunking",
    detail:
      "Compare chunk sizes, overlap and splitting strategies using representative questions.",
  },
  {
    title: "Generate embeddings",
    detail:
      "Select an embedding model and generate vectors for the document chunks.",
  },
  {
    title: "Create the vector index",
    detail:
      "Store vectors, text and metadata in a vector database or PostgreSQL with pgvector.",
  },
  {
    title: "Implement retrieval",
    detail:
      "Embed user queries, retrieve candidate chunks and add metadata filtering.",
  },
  {
    title: "Add generation",
    detail:
      "Construct grounded prompts, call an LLM and return answers with source references.",
  },
  {
    title: "Evaluate and improve",
    detail:
      "Test retrieval, answer relevance, faithfulness, latency and cost before deployment.",
  },
];

const METRICS = [
  {
    name: "Precision@k",
    group: "Retrieval",
    description:
      "Measures the proportion of retrieved results in the top k that are relevant.",
    question: "Of the chunks retrieved, how many were relevant?",
  },
  {
    name: "Recall@k",
    group: "Retrieval",
    description:
      "Measures the proportion of all relevant results that appear in the top k retrieved results.",
    question: "Did retrieval find the relevant information?",
  },
  {
    name: "MRR",
    group: "Retrieval",
    description:
      "Mean Reciprocal Rank measures how highly the first relevant result appears.",
    question: "How early does the first useful result appear?",
  },
  {
    name: "Faithfulness",
    group: "Generation",
    description:
      "Measures whether the generated answer is supported by the retrieved context.",
    question: "Is the answer grounded in the supplied evidence?",
  },
  {
    name: "Answer relevance",
    group: "Generation",
    description:
      "Measures whether the generated answer addresses the user's actual question.",
    question: "Does the answer respond to what was asked?",
  },
  {
    name: "Context relevance",
    group: "Generation",
    description:
      "Measures whether the retrieved context is relevant to the question.",
    question: "Did the system provide useful context to the LLM?",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-7 text-slate-400 sm:text-base">
        {description}
      </p>
    </div>
  );
}

function PipelineStage({ stage, selected, onClick }) {
  const Icon = stage.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
        selected
          ? "border-[#02BFA7]/45 bg-[#02BFA7]/[0.08]"
          : "border-white/[0.07] bg-white/[0.02] hover:border-white/20"
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stage.bg} ${stage.color}`}
      >
        <Icon size={19} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-[#DAFBF5]">
          {stage.number}. {stage.title}
        </p>
        <p className="mt-1 text-xs text-slate-500">{stage.subtitle}</p>
      </div>
      <ArrowRight
        size={15}
        className={selected ? "text-[#02BFA7]" : "text-slate-600"}
      />
    </button>
  );
}

function CodeExample({ code }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#061213] p-4 text-xs leading-6 text-[#DAFBF5]">
      <code>{code}</code>
    </pre>
  );
}

export default function RAGDeepDivePage() {
  const [selectedStage, setSelectedStage] = useState("retrieval");
  const [conceptFilter, setConceptFilter] = useState("All");
  const [expandedConcept, setExpandedConcept] = useState(null);
  const [completedSteps, setCompletedSteps] = useState([]);

  const activeStage =
    PIPELINE.find((stage) => stage.id === selectedStage) ?? PIPELINE[0];

  const conceptCategories = [
    "All",
    "Chunking",
    "Retrieval",
    "Reranking",
  ];

  const filteredConcepts = CONCEPTS.filter(
    (concept) =>
      conceptFilter === "All" || concept.category === conceptFilter
  );

  function toggleCompleted(index) {
    setCompletedSteps((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index]
    );
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#02BFA7]/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-28 h-80 w-80 rounded-full bg-violet-500/[0.05] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/[0.07] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#02BFA7]">
            <Network size={14} />
            AI ENGINEERING / TECHNICAL DEEP DIVE
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Retrieval-Augmented Generation
              </p>

              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#DAFBF5] sm:text-6xl lg:text-7xl">
                Give AI access to
                <span className="block text-[#02BFA7]">
                  the right knowledge.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                Understand how RAG systems ingest documents, retrieve
                relevant information and generate grounded answers.
                Explore the architecture, implementation decisions and
                engineering practices behind reliable RAG applications.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#architecture"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#42dfc7]"
                >
                  Explore architecture
                  <ArrowDown size={16} />
                </a>
                <a
                  href="#implementation"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40"
                >
                  Build a RAG system
                  <Code2 size={16} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:pb-2">
              {[
                ["07", "Pipeline stages"],
                ["08", "Core concepts"],
                ["06", "Evaluation metrics"],
                ["08", "Build milestones"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
                >
                  <p className="font-mono text-3xl font-semibold text-[#02BFA7]">
                    {value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fundamentals */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="01 / Fundamentals"
          title="What is RAG?"
          description="Retrieval-Augmented Generation combines information retrieval with language generation. Instead of relying only on what an LLM learned during training, the application retrieves relevant external information and supplies it as context."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/65 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
              <BrainCircuit size={22} />
            </div>
            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              Without RAG
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              The LLM generates a response primarily from its learned
              parameters and the information in the current prompt. It may
              lack access to private, recent or specialized information.
            </p>
            <div className="mt-5 rounded-xl border border-violet-400/15 bg-violet-400/[0.05] p-4">
              <p className="text-xs font-semibold text-violet-300">
                User question
              </p>
              <p className="mt-2 text-sm text-slate-300">
                What is our company's current leave policy?
              </p>
              <p className="mt-3 text-xs text-slate-500">
                The model may not know the company's internal policy.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#02BFA7]/20 bg-[#102A2B]/65 p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
              <Database size={22} />
            </div>
            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              With RAG
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              The application retrieves relevant information from an
              external knowledge source and includes it in the prompt
              before asking the LLM to generate an answer.
            </p>
            <div className="mt-5 rounded-xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.05] p-4">
              <p className="text-xs font-semibold text-[#02BFA7]">
                Retrieved context
              </p>
              <p className="mt-2 text-sm text-slate-300">
                The employee handbook states that full-time employees
                receive 24 annual leave days.
              </p>
              <p className="mt-3 text-xs text-slate-500">
                The LLM can use this information to formulate its answer.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            Why use RAG?
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Private knowledge", "Use internal documents and business data."],
              ["Updated information", "Retrieve information without retraining the LLM."],
              ["Traceability", "Connect answers to their supporting sources."],
              ["Domain knowledge", "Ground responses in specialized content."],
            ].map(([title, detail]) => (
              <div key={title}>
                <p className="text-sm font-medium text-[#02BFA7]">
                  {title}
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-400">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-400/[0.045] p-4">
          <p className="text-sm font-semibold text-amber-300">
            Important distinction
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            RAG does not automatically eliminate hallucinations. Poor
            retrieval, irrelevant context, ambiguous prompts and model
            limitations can still produce incorrect answers.
          </p>
        </div>
      </section>

      {/* Architecture explorer */}
      <section
        id="architecture"
        className="border-y border-white/[0.07] bg-[#0A2021] scroll-mt-6"
      >
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="02 / System architecture"
            title="Explore the RAG pipeline"
            description="A RAG system has two major workflows: preparing and indexing the knowledge base, then retrieving information and generating answers at query time. Select any stage to understand its role."
          />

          <div className="mb-7 grid gap-3 md:grid-cols-2">
            <div className="rounded-xl border border-orange-400/15 bg-orange-400/[0.04] p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">
                Offline / ingestion pipeline
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span>Documents</span>
                <ArrowRight size={13} />
                <span>Chunking</span>
                <ArrowRight size={13} />
                <span>Embeddings</span>
                <ArrowRight size={13} />
                <span>Vector index</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.04] p-4">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#02BFA7]">
                Online / query pipeline
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
                <span>Question</span>
                <ArrowRight size={13} />
                <span>Retrieval</span>
                <ArrowRight size={13} />
                <span>Reranking</span>
                <ArrowRight size={13} />
                <span>LLM</span>
              </div>
            </div>
          </div>

          <div className="grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="space-y-2">
              {PIPELINE.map((stage) => (
                <PipelineStage
                  key={stage.id}
                  stage={stage}
                  selected={selectedStage === stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                />
              ))}
            </div>

            <div className="rounded-2xl border border-white/[0.09] bg-[#102A2B]/75 p-5 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${activeStage.bg} ${activeStage.color}`}
                >
                  <activeStage.icon size={23} />
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] text-slate-400">
                  STAGE {activeStage.number} / 07
                </span>
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#02BFA7]">
                {activeStage.subtitle}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#DAFBF5]">
                {activeStage.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                {activeStage.description}
              </p>

              <div className="mt-7">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  What happens here?
                </h4>
                <ol className="space-y-3">
                  {activeStage.steps.map((step, index) => (
                    <li key={step} className="flex gap-3 text-sm leading-6 text-slate-300">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] font-mono text-[10px] text-[#02BFA7]">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Engineering considerations
                </h4>
                <ul className="space-y-2">
                  {activeStage.considerations.map((item) => (
                    <li key={item} className="flex gap-2 text-xs leading-6 text-slate-400">
                      <Check size={14} className="mt-1 shrink-0 text-[#02BFA7]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Implementation example
                </h4>
                <CodeExample code={activeStage.example} />
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
                <button
                  type="button"
                  disabled={selectedStage === PIPELINE[0].id}
                  onClick={() => {
                    const index = PIPELINE.findIndex(
                      (item) => item.id === selectedStage
                    );
                    setSelectedStage(PIPELINE[index - 1].id);
                  }}
                  className="text-xs text-slate-400 transition hover:text-[#DAFBF5] disabled:opacity-30"
                >
                  Previous stage
                </button>
                <button
                  type="button"
                  disabled={selectedStage === PIPELINE[PIPELINE.length - 1].id}
                  onClick={() => {
                    const index = PIPELINE.findIndex(
                      (item) => item.id === selectedStage
                    );
                    setSelectedStage(PIPELINE[index + 1].id);
                  }}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#02BFA7] transition hover:text-[#DAFBF5] disabled:opacity-30"
                >
                  Next stage
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core technical concepts */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="03 / Core technical concepts"
          title="The decisions that shape retrieval quality"
          description="RAG performance depends on more than choosing a vector database. Chunking, retrieval strategy and ranking all influence what information reaches the language model."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {conceptCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setConceptFilter(category);
                setExpandedConcept(null);
              }}
              aria-pressed={conceptFilter === category}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
                conceptFilter === category
                  ? "border-[#02BFA7]/45 bg-[#02BFA7]/10 text-[#02BFA7]"
                  : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:text-[#DAFBF5]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-3 md:grid-cols-2">
          {filteredConcepts.map((concept) => {
            const expanded = expandedConcept === concept.title;

            return (
              <article
                key={concept.title}
                className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/60 transition hover:border-[#02BFA7]/25"
              >
                <button
                  type="button"
                  onClick={() =>
                    setExpandedConcept(expanded ? null : concept.title)
                  }
                  aria-expanded={expanded}
                  className="flex w-full items-center gap-3 p-5 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <span className="mb-2 inline-block rounded-full border border-[#02BFA7]/15 bg-[#02BFA7]/[0.06] px-2.5 py-1 text-[10px] font-semibold text-[#02BFA7]">
                      {concept.category}
                    </span>
                    <h3 className="text-sm font-semibold text-[#DAFBF5]">
                      {concept.title}
                    </h3>
                  </div>
                  {expanded ? (
                    <ChevronUp size={17} className="shrink-0 text-[#02BFA7]" />
                  ) : (
                    <ChevronDown size={17} className="shrink-0 text-slate-500" />
                  )}
                </button>

                {expanded && (
                  <div className="border-t border-white/[0.07] px-5 pb-5 pt-4">
                    <p className="text-sm leading-6 text-slate-300">
                      {concept.description}
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#02BFA7]">
                          Best suited for
                        </p>
                        <p className="text-xs leading-6 text-slate-400">
                          {concept.use}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-orange-300">
                          Trade-off
                        </p>
                        <p className="text-xs leading-6 text-slate-400">
                          {concept.tradeoff}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Generation and prompt engineering */}
      <section className="border-y border-white/[0.07] bg-[#0A2021]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="04 / Generation"
            title="How retrieved context becomes an answer"
            description="Retrieval finds information. Generation uses that information to construct a response. The quality of the final answer depends on how well the context and instructions are assembled."
          />

          <div className="grid gap-4 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Context assembly",
                detail:
                  "Combine the retrieved chunks, preserve their source metadata and remove redundant information where appropriate.",
              },
              {
                number: "02",
                title: "Prompt construction",
                detail:
                  "Provide clear instructions, the retrieved context and the original question. Define how the model should handle missing evidence.",
              },
              {
                number: "03",
                title: "Response generation",
                detail:
                  "Send the prompt to the LLM, generate a response and associate claims with their supporting sources.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/60 p-5"
              >
                <p className="font-mono text-sm text-[#02BFA7]">
                  {item.number}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-[#DAFBF5]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[#02BFA7]/20 bg-[#102A2B]/75 p-5 sm:p-7">
            <div className="mb-4 flex items-center gap-2">
              <Code2 size={18} className="text-[#02BFA7]" />
              <h3 className="text-sm font-semibold text-[#DAFBF5]">
                Example: a grounded RAG prompt
              </h3>
            </div>
            <CodeExample
              code={`SYSTEM:
You are an assistant that answers questions using
the supplied reference material.

INSTRUCTIONS:
- Use the context to answer the question.
- Do not invent facts that are not supported.
- If the context is insufficient, say so.
- Distinguish evidence from assumptions.
- Include source references where available.

CONTEXT:
{retrieved_documents}

QUESTION:
{user_question}

ANSWER:`}
            />
            <p className="mt-4 text-xs leading-6 text-slate-500">
              Prompt instructions help guide the model, but they are not
              a security boundary. Retrieved documents should be treated
              as untrusted input, especially when they may contain
              instructions or malicious content.
            </p>
          </div>
        </div>
      </section>

      {/* Evaluation */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="05 / Evaluation"
          title="How do you know your RAG system works?"
          description="A response that sounds convincing is not necessarily correct. Evaluate retrieval and generation separately so you can identify where the system is failing."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METRICS.map((metric) => (
            <div
              key={metric.name}
              className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/60 p-5"
            >
              <span
                className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                  metric.group === "Retrieval"
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "bg-violet-400/10 text-violet-300"
                }`}
              >
                {metric.group}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-[#DAFBF5]">
                {metric.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {metric.description}
              </p>
              <div className="mt-4 border-t border-white/[0.07] pt-3">
                <p className="text-xs leading-6 text-[#02BFA7]">
                  {metric.question}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-[#DAFBF5]">
            A practical evaluation dataset
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Build a test set of representative questions, expected answers
            and relevant source documents. Run the same test set whenever
            you change chunking, embeddings, retrieval parameters, prompts
            or models.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-slate-500">
                  <th className="py-3 pr-4 font-medium">Question</th>
                  <th className="py-3 pr-4 font-medium">Expected source</th>
                  <th className="py-3 font-medium">Expected answer</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 pr-4">What is the leave allowance?</td>
                  <td className="py-3 pr-4">Employee handbook</td>
                  <td className="py-3">24 days</td>
                </tr>
                <tr className="border-b border-white/[0.06]">
                  <td className="py-3 pr-4">How do I reset my password?</td>
                  <td className="py-3 pr-4">IT support guide</td>
                  <td className="py-3">Password reset process</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4">What is our refund policy?</td>
                  <td className="py-3 pr-4">Refund policy</td>
                  <td className="py-3">Policy conditions</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Production engineering */}
      <section className="border-y border-white/[0.07] bg-[#0A2021]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="06 / Production engineering"
            title="From a working prototype to a reliable service"
            description="A production RAG application needs more than a vector database and an LLM. It needs reliable data pipelines, access control, observability and operational safeguards."
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Workflow,
                title: "Background processing",
                detail:
                  "Use queues and workers for document parsing, embedding generation and large indexing jobs.",
              },
              {
                icon: Gauge,
                title: "Caching",
                detail:
                  "Cache repeated queries, embedding results or frequently requested responses where appropriate.",
              },
              {
                icon: ShieldCheck,
                title: "Security",
                detail:
                  "Enforce document-level permissions, validate inputs and defend against prompt injection.",
              },
              {
                icon: Network,
                title: "Scalability",
                detail:
                  "Scale API services, workers and retrieval infrastructure independently as demand grows.",
              },
              {
                icon: Database,
                title: "Data lifecycle",
                detail:
                  "Handle document updates, deletion, re-indexing and embedding model migrations.",
              },
              {
                icon: Gauge,
                title: "Observability",
                detail:
                  "Track retrieval quality, latency, token consumption, failures and cost per request.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.08] bg-[#102A2B]/60 p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                    <Icon size={19} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#DAFBF5]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-amber-400/15 bg-amber-400/[0.045] p-5">
            <h3 className="text-sm font-semibold text-amber-300">
              Security consideration: document-level access
            </h3>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              A user should only retrieve documents they are authorized
              to access. Enforce permissions during retrieval, not merely
              after the LLM has already received the context. Otherwise,
              sensitive information can leak through generated responses.
            </p>
          </div>
        </div>
      </section>

      {/* Implementation roadmap */}
      <section
        id="implementation"
        className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 scroll-mt-6"
      >
        <SectionHeading
          eyebrow="07 / Implementation roadmap"
          title="Build your first RAG application"
          description="Follow these milestones to build a working system. Mark each step as you complete it. Start with a small document collection and improve the retrieval pipeline incrementally."
        />

        <div className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-[#102A2B]/60 p-4">
          <div>
            <p className="text-sm font-semibold text-[#DAFBF5]">
              Your implementation progress
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {completedSteps.length} of {IMPLEMENTATION_STEPS.length} milestones completed
            </p>
          </div>
          <p className="font-mono text-xl font-semibold text-[#02BFA7]">
            {Math.round(
              (completedSteps.length / IMPLEMENTATION_STEPS.length) * 100
            )}%
          </p>
        </div>

        <div className="mb-7 h-2 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#02BFA7] transition-all duration-300"
            style={{
              width: `${(completedSteps.length / IMPLEMENTATION_STEPS.length) * 100}%`,
            }}
          />
        </div>

        <div className="space-y-3">
          {IMPLEMENTATION_STEPS.map((step, index) => {
            const completed = completedSteps.includes(index);

            return (
              <button
                key={step.title}
                type="button"
                onClick={() => toggleCompleted(index)}
                aria-pressed={completed}
                className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition sm:p-5 ${
                  completed
                    ? "border-[#02BFA7]/30 bg-[#02BFA7]/[0.055]"
                    : "border-white/[0.08] bg-[#102A2B]/55 hover:border-white/20"
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border font-mono text-xs ${
                    completed
                      ? "border-[#02BFA7] bg-[#02BFA7] text-[#071719]"
                      : "border-white/10 bg-white/[0.04] text-slate-400"
                  }`}
                >
                  {completed ? <Check size={16} /> : String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block text-sm font-semibold ${
                      completed ? "text-[#02BFA7]" : "text-[#DAFBF5]"
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="mt-1 block text-xs leading-6 text-slate-400">
                    {step.detail}
                  </span>
                </span>
                <span className="pt-1 text-slate-500">
                  {completed ? <Check size={17} className="text-[#02BFA7]" /> : <ArrowRight size={16} />}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setCompletedSteps([])}
          disabled={completedSteps.length === 0}
          className="mt-5 text-xs text-slate-500 transition hover:text-[#02BFA7] disabled:opacity-30"
        >
          Reset progress
        </button>
      </section>

      {/* Recommended stack */}
      <section className="border-t border-white/[0.07] bg-[#0A2021]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="08 / Technology choices"
            title="A practical RAG technology stack"
            description="There is no single correct stack. Choose tools based on your data, deployment environment, scale, budget and engineering requirements."
          />

          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            {[
              ["Backend API", "FastAPI", "API endpoints and orchestration"],
              ["Language", "Python", "Document processing and AI integration"],
              ["Embeddings", "Sentence Transformers", "Local or hosted embedding generation"],
              ["Vector storage", "PostgreSQL + pgvector", "Document metadata and vector similarity search"],
              ["LLM", "Hosted or local model", "Grounded answer generation"],
              ["Background jobs", "Celery / RabbitMQ", "Asynchronous ingestion and indexing"],
              ["Deployment", "Docker", "Reproducible application environments"],
            ].map(([layer, technology, purpose], index) => (
              <div
                key={layer}
                className={`grid gap-2 p-4 sm:grid-cols-[0.8fr_1fr_1.4fr] sm:items-center ${
                  index !== 6 ? "border-b border-white/[0.07]" : ""
                }`}
              >
                <p className="text-xs text-slate-500">{layer}</p>
                <p className="text-sm font-semibold text-[#02BFA7]">
                  {technology}
                </p>
                <p className="text-xs leading-5 text-slate-400">{purpose}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs leading-6 text-slate-500">
            This is an example stack for learning and prototyping, not a
            requirement. You can replace individual components without
            changing the fundamental RAG architecture.
          </p>
        </div>
      </section>

      {/* Closing navigation */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
        <div className="rounded-3xl border border-[#02BFA7]/20 bg-[#102A2B]/65 p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                <BookOpen size={22} />
              </div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
                Continue learning
              </p>
              <h2 className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-[#DAFBF5] sm:text-3xl">
                Connect RAG concepts to the wider AI engineering ecosystem.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                Explore machine learning models, technical terminology
                and interview questions to strengthen your understanding.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/models"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#42dfc7]"
              >
                Model catalogue
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/interview-qa"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40"
              >
                Interview preparation
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40"
              >
                ML glossary
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
