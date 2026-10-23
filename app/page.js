
/*
 * File: app/page.js
 * Purpose: Homepage for ML Model Atlas.
 *
 * Sections:
 * 1. Hero and model-selection visual
 * 2. Model-family explorer
 * 3. ML problem-type explorer
 * 4. Featured models
 * 5. Practical project examples
 * 6. Getting-started workflow
 * 7. Final call to action
 *
 * Note:
 * This page uses static data for now. The model library will be
 * centralized in data/models.js in the next step.
 */

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Binary,
  BookOpen,
  BrainCircuit,
  Camera,
  ChartNoAxesCombined,
  Check,
  ChevronRight,
  CircleDot,
  Clock3,
  Code2,
  GitCompareArrows,
  Layers3,
  Network,
  ScanSearch,
  Search,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

// The four major areas users can explore.
const modelFamilies = [
  {
    number: "01",
    title: "Traditional ML",
    subtitle: "Structured data and classical algorithms",
    description:
      "Start with proven algorithms for classification, regression, clustering, and anomaly detection.",
    examples: ["Logistic Regression", "Random Forest", "K-Means"],
    href: "/models?family=traditional-ml",
    icon: Network,
    accent: "mint",
  },
  {
    number: "02",
    title: "Deep Learning",
    subtitle: "Neural networks and representation learning",
    description:
      "Explore multilayer neural networks, CNNs, sequence models, and modern architectures.",
    examples: ["MLP", "CNN", "Transformer"],
    href: "/models?family=deep-learning",
    icon: BrainCircuit,
    accent: "orange",
  },
  {
    number: "03",
    title: "Computer Vision",
    subtitle: "Teach machines to interpret images",
    description:
      "Learn approaches for image classification, object detection, segmentation, and visual recognition.",
    examples: ["ResNet", "EfficientNet", "YOLO"],
    href: "/models?category=computer-vision",
    icon: Camera,
    accent: "mint",
  },
  {
    number: "04",
    title: "NLP & Generative AI",
    subtitle: "Text, language, and generated content",
    description:
      "Discover text classification, embeddings, language models, semantic search, and RAG.",
    examples: ["TF-IDF", "BERT", "LLMs"],
    href: "/models?category=nlp",
    icon: Sparkles,
    accent: "orange",
  },
];

// Problem-first discovery remains available alongside model families.
const problemTypes = [
  {
    number: "01",
    title: "Classification",
    description:
      "Predict a category or class, such as spam versus legitimate messages.",
    examples: "Spam detection · Image labels",
    href: "/models?type=classification",
    icon: ScanSearch,
    color: "mint",
  },
  {
    number: "02",
    title: "Regression",
    description:
      "Predict a numerical value, such as price, cost, or demand.",
    examples: "Price prediction · Risk estimation",
    href: "/models?type=regression",
    icon: ChartNoAxesCombined,
    color: "orange",
  },
  {
    number: "03",
    title: "Clustering",
    description:
      "Discover natural groups in data without predefined labels.",
    examples: "Customer groups · Document grouping",
    href: "/models?type=clustering",
    icon: CircleDot,
    color: "mint",
  },
  {
    number: "04",
    title: "Forecasting",
    description:
      "Use historical observations to estimate what may happen next.",
    examples: "Sales · Traffic · Energy demand",
    href: "/models?type=forecasting",
    icon: Clock3,
    color: "orange",
  },
  {
    number: "05",
    title: "Anomaly detection",
    description:
      "Find unusual observations that differ from expected behaviour.",
    examples: "Fraud signals · System monitoring",
    href: "/models?type=anomaly-detection",
    icon: Target,
    color: "mint",
  },
  {
    number: "06",
    title: "Dimensionality reduction",
    description:
      "Represent complex datasets with fewer informative dimensions.",
    examples: "Feature compression · Visualisation",
    href: "/models?type=dimensionality-reduction",
    icon: Layers3,
    color: "orange",
  },
];

// Initial selection of models spanning different learning approaches.
const featuredModels = [
  {
    name: "Logistic Regression",
    family: "TRADITIONAL ML",
    description:
      "A fast, useful baseline for classification with relatively interpretable predictions.",
    bestFor: "Tabular data and text classification",
    complexity: "Low",
    href: "/models/logistic-regression",
    icon: Binary,
    tags: ["Classification", "Baseline"],
    accent: "mint",
  },
  {
    name: "Random Forest",
    family: "TRADITIONAL ML",
    description:
      "Combines multiple decision trees to learn complex patterns in structured data.",
    bestFor: "Tabular classification and regression",
    complexity: "Medium",
    href: "/models/random-forest",
    icon: Network,
    tags: ["Ensemble", "Versatile"],
    accent: "orange",
  },
  {
    name: "K-Means",
    family: "UNSUPERVISED LEARNING",
    description:
      "Groups observations into a chosen number of clusters using their feature similarity.",
    bestFor: "Exploratory grouping",
    complexity: "Low",
    href: "/models/k-means",
    icon: CircleDot,
    tags: ["Clustering", "Unsupervised"],
    accent: "mint",
  },
  {
    name: "EfficientNet",
    family: "DEEP LEARNING · VISION",
    description:
      "A family of convolutional neural networks designed for efficient image recognition.",
    bestFor: "Image classification",
    complexity: "High",
    href: "/models/efficientnet",
    icon: Camera,
    tags: ["Computer vision", "CNN"],
    accent: "orange",
  },
  {
    name: "Transformer",
    family: "DEEP LEARNING · NLP",
    description:
      "An attention-based architecture used in modern language and many other AI systems.",
    bestFor: "Language understanding and sequence tasks",
    complexity: "High",
    href: "/models/transformer",
    icon: BrainCircuit,
    tags: ["Attention", "Sequence modelling"],
    accent: "mint",
  },
  {
    name: "TF-IDF",
    family: "TEXT REPRESENTATION",
    description:
      "Converts documents into weighted numerical features for traditional machine learning.",
    bestFor: "Text classification and search baselines",
    complexity: "Low",
    href: "/models/tf-idf",
    icon: Code2,
    tags: ["NLP", "Feature extraction"],
    accent: "orange",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Define the problem",
    description:
      "Identify the outcome you need and decide whether the task involves classification, regression, clustering, vision, language, or another approach.",
  },
  {
    number: "02",
    title: "Understand your data",
    description:
      "Inspect examples, features, labels, data quality, dataset size, and possible sources of data leakage.",
  },
  {
    number: "03",
    title: "Choose a baseline",
    description:
      "Start with an appropriate, manageable approach. Add complexity when experiments justify it.",
  },
  {
    number: "04",
    title: "Evaluate and improve",
    description:
      "Use suitable metrics, inspect errors, and validate on data the model has not seen.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.22em] text-[#02BFA7] uppercase">
          {eyebrow}
        </p>

        <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
          {title}
        </h2>

        {description && (
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#8BAEAA] sm:text-base">
            {description}
          </p>
        )}
      </div>

      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[#02BFA7] transition hover:text-[#DAFBF5]"
        >
          {linkLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function FamilyCard({ item }) {
  const Icon = item.icon;
  const isOrange = item.accent === "orange";

  return (
    <Link
      href={item.href}
      className="group relative flex min-h-72 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B2021] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#02BFA7]/35 hover:bg-[#102A2B]/80 sm:p-6"
    >
      <span className="absolute right-5 top-5 font-mono text-xs text-white/20">
        {item.number}
      </span>

      <div
        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl border ${
          isOrange
            ? "border-[#FF4D2E]/20 bg-[#FF4D2E]/10 text-[#FF785F]"
            : "border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]"
        }`}
      >
        <Icon size={22} />
      </div>

      <p className="mb-2 text-[10px] font-semibold tracking-[0.12em] text-[#668784] uppercase">
        {item.subtitle}
      </p>

      <h3 className="text-lg font-semibold tracking-tight text-[#DAFBF5]">
        {item.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-[#8BAEAA]">
        {item.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {item.examples.map((example) => (
          <span
            key={example}
            className="rounded-md border border-white/[0.07] bg-white/[0.03] px-2 py-1 text-[10px] text-[#A3BFBB]"
          >
            {example}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="text-xs font-medium text-[#02BFA7]">
          Explore this area
        </span>
        <ArrowUpRight
          size={17}
          className="text-[#668784] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#02BFA7]"
        />
      </div>
    </Link>
  );
}

function ProblemTypeCard({ item }) {
  const Icon = item.icon;
  const isOrange = item.color === "orange";

  return (
    <Link
      href={item.href}
      className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0B2021] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#02BFA7]/35 hover:bg-[#102A2B]/80 sm:p-6"
    >
      <span className="absolute right-5 top-5 font-mono text-xs text-white/20">
        {item.number}
      </span>

      <div
        className={`mb-7 flex h-11 w-11 items-center justify-center rounded-xl border ${
          isOrange
            ? "border-[#FF4D2E]/20 bg-[#FF4D2E]/10 text-[#FF785F]"
            : "border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]"
        }`}
      >
        <Icon size={21} />
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-[#DAFBF5]">
        {item.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-6 text-[#8BAEAA]">
        {item.description}
      </p>

      <p className="mt-5 border-t border-white/[0.07] pt-4 text-xs leading-5 text-[#668784]">
        {item.examples}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs font-medium text-[#02BFA7]">
          Explore models
        </span>
        <ArrowUpRight
          size={17}
          className="text-[#668784] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#02BFA7]"
        />
      </div>
    </Link>
  );
}

function FeaturedModelCard({ model }) {
  const Icon = model.icon;
  const isOrange = model.accent === "orange";

  return (
    <article className="group flex flex-col rounded-2xl border border-white/[0.08] bg-[#0B2021] p-5 transition duration-300 hover:border-[#02BFA7]/30 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
            isOrange
              ? "border-[#FF4D2E]/20 bg-[#FF4D2E]/10 text-[#FF785F]"
              : "border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]"
          }`}
        >
          <Icon size={21} />
        </div>

        <span className="max-w-[65%] rounded-full border border-white/[0.08] px-2.5 py-1 text-right text-[9px] leading-4 font-semibold tracking-wider text-[#8BAEAA]">
          {model.family}
        </span>
      </div>

      <h3 className="mt-6 text-lg font-semibold text-[#DAFBF5]">
        {model.name}
      </h3>

      <p className="mt-2 min-h-14 text-sm leading-6 text-[#8BAEAA]">
        {model.description}
      </p>

      <div className="mt-5 border-t border-white/[0.07] pt-4">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-[#668784] uppercase">
          A good starting point for
        </p>
        <p className="mt-2 text-sm text-[#DAFBF5]">{model.bestFor}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.04] px-2.5 py-1 text-[10px] text-[#8BAEAA]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-4">
        <span className="text-xs text-[#668784]">
          Complexity:{" "}
          <span className="text-[#A3BFBB]">{model.complexity}</span>
        </span>

        <Link
          href={model.href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#02BFA7] transition hover:text-[#DAFBF5]"
        >
          Learn more
          <ChevronRight size={15} />
        </Link>
      </div>
    </article>
  );
}

function ProjectCard({
  number,
  category,
  title,
  description,
  stack,
  href,
  icon: Icon,
  accent = "mint",
}) {
  const isOrange = accent === "orange";

  return (
    <article className="rounded-2xl border border-white/[0.08] bg-[#0B2021] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            isOrange
              ? "bg-[#FF4D2E]/10 text-[#FF785F]"
              : "bg-[#02BFA7]/10 text-[#02BFA7]"
          }`}
        >
          <Icon size={21} />
        </div>

        <span className="font-mono text-xs text-white/25">{number}</span>
      </div>

      <p className="mt-6 text-[10px] font-semibold tracking-[0.16em] text-[#02BFA7] uppercase">
        {category}
      </p>

      <h3 className="mt-2 text-lg font-semibold text-[#DAFBF5]">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-[#8BAEAA]">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {stack.map((item) => (
          <span
            key={item}
            className="rounded-md border border-white/[0.07] px-2.5 py-1 text-[10px] text-[#A3BFBB]"
          >
            {item}
          </span>
        ))}
      </div>

      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#02BFA7] hover:text-[#DAFBF5]"
      >
        Explore the model
        <ArrowUpRight size={15} />
      </Link>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#071719]">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_70%_0%,rgba(2,191,167,0.10),transparent_55%)]"
      />

      {/* SECTION 1: HERO */}
      <section className="relative">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/20 bg-[#02BFA7]/[0.06] px-3.5 py-2">
              <Sparkles size={14} className="text-[#02BFA7]" />
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#A3BFBB] uppercase sm:text-xs">
                A practical guide to machine learning
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl leading-[1.12] font-semibold tracking-[-0.045em] text-[#DAFBF5] sm:text-5xl lg:text-6xl xl:text-7xl">
              Choose the right model.
              <span className="mt-2 block text-[#02BFA7]">
                Understand why.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#8BAEAA] sm:text-lg">
              From classical machine learning to deep learning, computer
              vision, and generative AI. Understand what models do, when to
              use them, and how to evaluate your choices.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/models"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF4D2E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#FF6348]"
              >
                Explore the models
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/how-to-use"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.02] px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40 hover:bg-[#102A2B]"
              >
                <BookOpen size={17} />
                How to use this guide
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6 text-xs text-[#779996]">
              {[
                "Beginner-friendly explanations",
                "Traditional ML and modern AI",
                "Practical project examples",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <Check size={14} className="text-[#02BFA7]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* CSS-based model-selection visual */}
          <div className="relative mx-auto w-full max-w-xl">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-full bg-[#02BFA7]/[0.04] blur-3xl"
            />

            <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-[#091D1F] shadow-2xl shadow-black/20">
              <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#02BFA7]/10 text-[#02BFA7]">
                    <Workflow size={17} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#DAFBF5]">
                      Model selection map
                    </p>
                    <p className="mt-1 text-[10px] text-[#668784]">
                      Start with the problem
                    </p>
                  </div>
                </div>

                <span className="rounded-md border border-[#02BFA7]/15 px-2 py-1 font-mono text-[9px] text-[#02BFA7]">
                  GUIDE_001
                </span>
              </div>

              <div className="p-5 sm:p-7">
                <div className="mx-auto max-w-xs rounded-xl border border-[#02BFA7]/30 bg-[#102A2B] p-4 text-center">
                  <p className="text-[10px] font-semibold tracking-[0.18em] text-[#02BFA7] uppercase">
                    Start here
                  </p>
                  <p className="mt-2 text-base font-semibold text-[#DAFBF5]">
                    What do you need to do?
                  </p>
                </div>

                <div className="mx-auto h-8 w-px bg-gradient-to-b from-[#02BFA7]/60 to-[#02BFA7]/10" />

                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      title: "Predict a class",
                      category: "Classification",
                      models: ["Logistic Regression", "Random Forest"],
                      icon: ScanSearch,
                      accent: "mint",
                    },
                    {
                      title: "Understand images",
                      category: "Computer vision",
                      models: ["CNN", "EfficientNet"],
                      icon: Camera,
                      accent: "orange",
                    },
                    {
                      title: "Work with language",
                      category: "NLP & generative AI",
                      models: ["TF-IDF", "Transformer"],
                      icon: BrainCircuit,
                      accent: "mint",
                    },
                    {
                      title: "Find hidden groups",
                      category: "Clustering",
                      models: ["K-Means", "DBSCAN"],
                      icon: CircleDot,
                      accent: "orange",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isOrange = item.accent === "orange";

                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-white/[0.08] bg-[#102A2B]/60 p-3.5 sm:p-4"
                      >
                        <div
                          className={`mb-3 flex items-center gap-2 ${
                            isOrange ? "text-[#FF785F]" : "text-[#02BFA7]"
                          }`}
                        >
                          <Icon size={17} />
                          <span className="text-xs font-semibold">
                            {item.title}
                          </span>
                        </div>

                        <p className="text-[11px] leading-5 text-[#8BAEAA]">
                          {item.category}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {item.models.map((model, index) => (
                            <span
                              key={model}
                              className={`rounded px-2 py-1 text-[9px] ${
                                index === 0
                                  ? isOrange
                                    ? "bg-[#FF4D2E]/10 text-[#FF785F]"
                                    : "bg-[#02BFA7]/10 text-[#02BFA7]"
                                  : "bg-white/[0.05] text-[#A3BFBB]"
                              }`}
                            >
                              {model}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/10 p-3.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FF4D2E]/10 text-[#FF785F]">
                    <Target size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-[#DAFBF5]">
                      Still not sure?
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-[#779996]">
                      Compare assumptions, data requirements, and trade-offs.
                    </p>
                  </div>
                  <ArrowDownRight
                    size={17}
                    className="shrink-0 text-[#FF785F]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/[0.08] px-5 py-3">
                <span className="font-mono text-[9px] text-[#668784]">
                  PROBLEM → MODEL → EVALUATION
                </span>
                <span className="flex items-center gap-1.5 text-[9px] text-[#02BFA7]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#02BFA7]" />
                  LEARNING PATH
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MODEL FAMILIES */}
      <section className="border-y border-white/[0.06] bg-[#091D1F]/65">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionHeading
            eyebrow="01 / Explore the landscape"
            title="Four ways into the world of AI."
            description="Browse by the kind of model you want to understand. These areas overlap: for example, computer vision often uses deep learning architectures."
            href="/models"
            linkLabel="Browse the model library"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {modelFamilies.map((item) => (
              <FamilyCard key={item.number} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: PROBLEM-TYPE EXPLORER */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionHeading
            eyebrow="02 / Start with your problem"
            title="What are you trying to solve?"
            description="The best starting point is the task, not the algorithm. Choose a problem type to discover suitable approaches and their trade-offs."
            href="/models"
            linkLabel="Browse all models"
          />

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {problemTypes.map((item) => (
              <ProblemTypeCard key={item.number} item={item} />
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#0B2021] p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#02BFA7]">
                <GitCompareArrows size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#DAFBF5]">
                  Working with text, images, or recommendations?
                </p>
                <p className="mt-1 text-xs leading-5 text-[#8BAEAA]">
                  Explore specialised approaches for NLP, computer vision,
                  generative AI, and recommendation systems.
                </p>
              </div>
            </div>

            <Link
              href="/models"
              className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-[#02BFA7] hover:text-[#DAFBF5]"
            >
              Explore specialised models
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED MODELS */}
      <section className="border-y border-white/[0.06] bg-[#091D1F]/65">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionHeading
            eyebrow="03 / Meet the models"
            title="Build your intuition, one model at a time."
            description="Begin with useful foundations, then branch into neural networks, computer vision, and language models as your needs grow."
            href="/models"
            linkLabel="View model library"
          />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredModels.map((model) => (
              <FeaturedModelCard key={model.name} model={model} />
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-[#02BFA7]/15 bg-gradient-to-r from-[#102A2B] to-[#0B2021] p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                <GitCompareArrows size={21} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#DAFBF5]">
                  Similar problem. Different trade-offs.
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8BAEAA]">
                  Compare models by assumptions, interpretability, training
                  cost, data requirements, and evaluation metrics before
                  deciding which one to try.
                </p>
              </div>
            </div>

            <Link
              href="/compare"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[#02BFA7]/25 px-4 py-3 text-sm font-medium text-[#02BFA7] transition hover:bg-[#02BFA7]/10"
            >
              Compare models
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5: PRACTICAL PROJECTS */}
      <section>
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionHeading
            eyebrow="04 / Theory in practice"
            title="Connect the model to a real project."
            description="See how different approaches fit different kinds of data and problems. These examples will grow into practical, step-by-step model guides."
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <ProjectCard
              number="PROJECT_001"
              category="TEXT CLASSIFICATION"
              title="ScamShield KE"
              description="Explore how TF-IDF and Logistic Regression can classify SMS messages as spam or legitimate. Learn about text preprocessing, probability scores, class imbalance, and evaluation."
              stack={["TF-IDF", "Logistic Regression", "scikit-learn"]}
              href="/models/logistic-regression"
              icon={ScanSearch}
            />

            <ProjectCard
              number="PROJECT_002"
              category="COMPUTER VISION"
              title="Bean leaf classification"
              description="Explore how EfficientNetB0 can classify bean leaf images into angular leaf spot, bean rust, and healthy categories. Learn about transfer learning, image inputs, and classification metrics."
              stack={["EfficientNetB0", "CNN", "TensorFlow"]}
              href="/models/efficientnet"
              icon={Camera}
              accent="orange"
            />
          </div>

          <p className="mt-4 text-xs leading-6 text-[#668784]">
            These project links open the corresponding model guides. The
            detailed guides will be implemented as the model library is built.
          </p>
        </div>
      </section>

      {/* SECTION 6: GETTING STARTED WORKFLOW */}
      <section className="border-y border-white/[0.06] bg-[#091D1F]/65">
        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionHeading
            eyebrow="05 / A repeatable process"
            title="From problem to a useful model."
            description="Model selection is only one part of machine learning. A disciplined workflow helps you avoid misleading results and unnecessary complexity."
            href="/how-to-use"
            linkLabel="Read the full guide"
          />

          <div className="grid gap-0 md:grid-cols-2 xl:grid-cols-4">
            {workflowSteps.map((step, index) => (
              <div
                key={step.number}
                className="relative border-l border-white/[0.1] py-3 pl-6 pr-5 first:border-l-[#02BFA7]/50 md:py-5 xl:min-h-60"
              >
                <span className="font-mono text-xs tracking-wider text-[#02BFA7]">
                  STEP_{step.number}
                </span>

                <h3 className="mt-5 text-lg font-semibold text-[#DAFBF5]">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#8BAEAA]">
                  {step.description}
                </p>

                {index < workflowSteps.length - 1 && (
                  <div className="mt-5 hidden text-[#668784] xl:block">
                    <ArrowRight size={17} />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-[#0B2021] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-[#FF785F]">
                <Code2 size={17} />
                <span className="text-[10px] font-semibold tracking-[0.18em] uppercase">
                  Learn by doing
                </span>
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-[#DAFBF5]">
                Understand why a model works for your data.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#8BAEAA]">
                Follow practical examples, understand the assumptions behind
                each approach, and learn how to judge model performance rather
                than relying on accuracy alone.
              </p>
            </div>

            <Link
              href="/how-to-use"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#35D8C3]"
            >
              Start learning
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(2,191,167,0.09),transparent_65%)]"
        />

        <div className="relative mx-auto max-w-4xl px-5 py-20 text-center sm:px-8 sm:py-24">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]">
            <BrainCircuit size={24} />
          </div>

          <p className="mb-4 text-xs font-semibold tracking-[0.22em] text-[#02BFA7] uppercase">
            Your next experiment starts here
          </p>

          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-[#DAFBF5] sm:text-4xl lg:text-5xl">
            Understand the problem.
            <span className="block text-[#02BFA7]">
              Then choose the model.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#8BAEAA] sm:text-base">
            Build your machine learning intuition one problem, one model,
            and one experiment at a time.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/models"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#FF4D2E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#FF6348]"
            >
              Start exploring
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/glossary"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] px-6 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/40 hover:bg-[#102A2B]"
            >
              <Search size={16} />
              Browse the glossary
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
