"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  Check,
  CheckCircle2,
  CircleHelp,
  ClipboardCheck,
  Database,
  GitCompareArrows,
  Lightbulb,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Target,
    title: "Define the problem",
    description:
      "Start by describing the outcome you want. The type of answer you need determines which families of models make sense.",
    accent: "mint",
    examples: [
      ["Classification", "Will this SMS be spam or legitimate?"],
      ["Regression", "What will the house price be?"],
      ["Clustering", "Which customers have similar behaviour?"],
      ["Anomaly detection", "Does this transaction look unusual?"],
    ],
  },
  {
    number: "02",
    icon: Database,
    title: "Understand your data",
    description:
      "Before choosing an algorithm, understand what your dataset contains, what you want to predict, and how the data was collected.",
    accent: "coral",
    checklist: [
      "Identify the target variable, if one exists.",
      "Check missing values, duplicates, and outliers.",
      "Understand the number of rows and available features.",
      "Check whether classes are imbalanced.",
      "Consider privacy, bias, and data quality.",
    ],
  },
  {
    number: "03",
    icon: BrainCircuit,
    title: "Choose a starting model",
    description:
      "Use your problem type, dataset size, interpretability needs, and available computing power to narrow your options.",
    accent: "mint",
    examples: [
      ["Tabular classification", "Logistic Regression or Random Forest"],
      ["Tabular regression", "Linear Regression or Random Forest Regressor"],
      ["Text classification", "TF-IDF with Logistic Regression"],
      ["Image classification", "A pretrained convolutional neural network"],
      ["Unlabelled groups", "K-Means as an initial clustering baseline"],
    ],
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Train it correctly",
    description:
      "A good model is not just an algorithm. Your data preparation and evaluation process matter just as much.",
    accent: "coral",
    checklist: [
      "Split data into training and testing sets.",
      "Use validation data or cross-validation to tune choices.",
      "Fit preprocessing steps on training data only.",
      "Prevent target leakage and duplicate leakage.",
      "Set random seeds where reproducibility matters.",
    ],
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Evaluate the result",
    description:
      "Choose metrics that reflect the real cost of a wrong prediction. Accuracy alone can hide important failures.",
    accent: "mint",
    examples: [
      ["Imbalanced classification", "Precision, recall, F1-score, PR-AUC"],
      ["Balanced classification", "Accuracy, precision, recall, F1"],
      ["Regression", "MAE, RMSE, and R²"],
      ["Clustering", "Silhouette score plus domain inspection"],
      ["Anomaly detection", "Precision and recall on labelled examples, if available"],
    ],
  },
  {
    number: "06",
    icon: GitCompareArrows,
    title: "Compare and improve",
    description:
      "Establish a baseline, compare reasonable alternatives, investigate errors, and choose the simplest model that meets your requirements.",
    accent: "coral",
    checklist: [
      "Compare models on the same data splits.",
      "Review false positives and false negatives.",
      "Measure training time and inference cost.",
      "Check interpretability and deployment constraints.",
      "Document limitations and monitor performance after deployment.",
    ],
  },
];

const problemTypes = [
  {
    label: "Predict a category",
    type: "Classification",
    description: "Examples: spam detection, disease screening, sentiment analysis.",
    query: "classification",
  },
  {
    label: "Predict a number",
    type: "Regression",
    description: "Examples: house prices, demand forecasts, delivery times.",
    query: "regression",
  },
  {
    label: "Find natural groups",
    type: "Clustering",
    description: "Examples: customer segments, grouping similar documents.",
    query: "clustering",
  },
  {
    label: "Find unusual cases",
    type: "Anomaly detection",
    description: "Examples: suspicious transactions, unusual system activity.",
    query: "anomaly detection",
  },
  {
    label: "Reduce many features",
    type: "Dimensionality reduction",
    description: "Examples: visualising high-dimensional data, simplifying features.",
    query: "dimensionality reduction",
  },
];

const metricGuides = [
  {
    metric: "Precision",
    question: "How many predicted positives were actually positive?",
    use: "Useful when false alarms are expensive.",
  },
  {
    metric: "Recall",
    question: "How many actual positives did the model find?",
    use: "Useful when missing a positive case is costly.",
  },
  {
    metric: "F1-score",
    question: "How well does the model balance precision and recall?",
    use: "Useful when both types of error matter.",
  },
  {
    metric: "MAE",
    question: "How far off are predictions on average, in absolute terms?",
    use: "Useful for an interpretable regression error.",
  },
];

const pitfalls = [
  {
    title: "Choosing by popularity",
    description:
      "A fashionable or complex model is not automatically the best fit for your data or objective.",
  },
  {
    title: "Using accuracy alone",
    description:
      "If 95% of examples belong to one class, a model that always predicts that class can reach 95% accuracy while being useless for finding the minority class.",
  },
  {
    title: "Data leakage",
    description:
      "If information from the test set or future data influences training, evaluation can look better than real-world performance.",
  },
  {
    title: "Ignoring the deployment environment",
    description:
      "A model that performs well but needs unavailable hardware, excessive memory, or unacceptable latency may not be practical.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-7 bg-[#02BFA7]" />
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02BFA7]">
        {children}
      </span>
    </div>
  );
}

function StepCard({ step, index }) {
  const Icon = step.icon;
  const isMint = step.accent === "mint";

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0B2021] p-5 sm:p-7"
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ${
            isMint
              ? "bg-[#02BFA7]/10 text-[#02BFA7]"
              : "bg-[#FF4D2E]/10 text-[#FF755B]"
          }`}
        >
          <Icon size={23} />
        </div>
        <span className="font-mono text-sm text-white/35">{step.number}</span>
      </div>

      <h3 className="mb-3 text-xl font-semibold tracking-tight text-[#DAFBF5]">
        {step.title}
      </h3>
      <p className="mb-6 text-sm leading-7 text-[#A9C5C1]">
        {step.description}
      </p>

      {step.examples && (
        <div className="space-y-3">
          {step.examples.map(([label, example]) => (
            <div
              key={label}
              className="border-l border-white/10 pl-3"
            >
              <p className="text-xs font-semibold text-[#DAFBF5]">{label}</p>
              <p className="mt-1 text-xs leading-5 text-[#A9C5C1]/75">
                {example}
              </p>
            </div>
          ))}
        </div>
      )}

      {step.checklist && (
        <ul className="space-y-3">
          {step.checklist.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[#A9C5C1]">
              <Check size={16} className="mt-1 shrink-0 text-[#02BFA7]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}

export default function HowToUsePage() {
  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#02BFA7]/[0.08] blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#FF4D2E]/[0.06] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <SectionLabel>Field guide / 001</SectionLabel>

            <h1 className="text-4xl font-semibold leading-[1.08] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              From problem
              <br />
              to <span className="text-[#02BFA7]">model choice.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-[#A9C5C1] sm:text-lg">
              A practical workflow for choosing machine-learning models.
              Start with the question, understand your data, establish a
              baseline, and evaluate results before reaching for complexity.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#workflow"
                className="inline-flex items-center gap-2 rounded-full bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#39D9C3]"
              >
                Explore the workflow <ArrowDown size={16} />
              </a>
              <Link
                href="/models"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/60 hover:bg-white/[0.04]"
              >
                Browse models <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                ["01", "Define"],
                ["02", "Choose"],
                ["03", "Evaluate"],
              ].map(([number, label]) => (
                <div key={number}>
                  <p className="font-mono text-xs text-[#02BFA7]">{number}</p>
                  <p className="mt-2 text-sm text-[#A9C5C1]">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel>The workflow</SectionLabel>
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Six steps. One repeatable process.
          </h2>
          <p className="max-w-md text-sm leading-7 text-[#A9C5C1]">
            Machine learning is iterative. You may revisit earlier steps as you
            discover problems with your data or evaluation results.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>
      </section>

      {/* Problem selector */}
      <section className="border-y border-white/[0.08] bg-[#0A1E20]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionLabel>Start with your question</SectionLabel>
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What are you trying to do?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#A9C5C1]">
              Use your objective to identify a starting point. These are
              recommendations for exploration, not guarantees that a particular
              algorithm will work best.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {problemTypes.map((problem, index) => (
              <Link
                key={problem.type}
                href={`/models?search=${encodeURIComponent(problem.query)}`}
                className="group rounded-xl border border-white/[0.09] bg-[#071719] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#02BFA7]/50"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs text-[#02BFA7]">
                    0{index + 1}
                  </span>
                  <ArrowUpRight
                    size={17}
                    className="text-white/35 transition group-hover:text-[#02BFA7]"
                  />
                </div>
                <h3 className="text-lg font-medium text-[#DAFBF5]">
                  {problem.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#A9C5C1]">
                  {problem.description}
                </p>
                <p className="mt-4 text-xs font-semibold text-[#02BFA7]">
                  Explore {problem.type} <ArrowRight className="ml-1 inline" size={13} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Metric guide */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <SectionLabel>Evaluate with intent</SectionLabel>
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Pick metrics that answer the right question.
          </h2>
          <p className="max-w-md text-sm leading-7 text-[#A9C5C1]">
            Metrics are tools, not trophies. Select them based on the errors
            that matter for your use case.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden grid-cols-[0.7fr_1.4fr_1fr] gap-4 bg-white/[0.04] px-5 py-4 text-xs font-semibold uppercase tracking-wider text-white/50 sm:grid">
            <span>Metric</span>
            <span>What it tells you</span>
            <span>When it helps</span>
          </div>
          {metricGuides.map((item, index) => (
            <div
              key={item.metric}
              className={`grid gap-2 px-5 py-5 sm:grid-cols-[0.7fr_1.4fr_1fr] sm:gap-4 ${
                index !== metricGuides.length - 1 ? "border-b border-white/[0.08]" : ""
              }`}
            >
              <p className="font-semibold text-[#02BFA7]">{item.metric}</p>
              <p className="text-sm leading-6 text-[#DAFBF5]">{item.question}</p>
              <p className="text-sm leading-6 text-[#A9C5C1]">{item.use}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-[#A9C5C1]/70">
          This is a quick reference, not a complete metric guide. For example,
          ROC-AUC, PR-AUC, calibration, and business-specific costs can also be
          important depending on the problem.
        </p>
      </section>

      {/* Common mistakes */}
      <section className="border-y border-white/[0.08] bg-[#0A1E20]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
          <SectionLabel>Things to watch for</SectionLabel>
          <div className="mb-9 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Four mistakes worth avoiding.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#A9C5C1]">
              A disciplined workflow often matters more than choosing a
              sophisticated algorithm.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {pitfalls.map((pitfall, index) => (
              <article
                key={pitfall.title}
                className="flex gap-4 rounded-xl border border-white/[0.08] bg-[#071719] p-5 sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF4D2E]/10 font-mono text-sm text-[#FF755B]">
                  0{index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[#DAFBF5]">{pitfall.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#A9C5C1]">
                    {pitfall.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Practical checklist */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <SectionLabel>Before you decide</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your model-selection checklist.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#A9C5C1]">
              Before committing to a model, make sure you can explain why it
              fits the problem and how you will know whether it works.
            </p>
            <div className="mt-7 rounded-xl border border-[#02BFA7]/20 bg-[#02BFA7]/[0.06] p-5">
              <Lightbulb className="mb-3 text-[#02BFA7]" size={22} />
              <p className="text-sm leading-7 text-[#DAFBF5]">
                <strong>Practical rule:</strong> start with a simple baseline.
                Add complexity only when the results or constraints justify it.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              "I can state the problem and the expected output clearly.",
              "I understand what data is available and its limitations.",
              "I have a sensible baseline model to compare against.",
              "My training and test data are properly separated.",
              "My metrics reflect the real cost of model errors.",
              "I have considered latency, memory, and interpretability.",
              "I can explain the model's limitations and intended use.",
            ].map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl border border-white/[0.08] bg-[#0B2021] p-4"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-[#02BFA7]" size={19} />
                <span className="text-sm leading-6 text-[#DAFBF5]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-[#02BFA7]/20 bg-[#0B2021] p-7 sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#02BFA7]/10 blur-[80px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#02BFA7]">
                <Sparkles size={15} /> Keep exploring
              </div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Ready to find your starting model?
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#A9C5C1]">
                Browse the catalogue, compare candidates side by side, or look
                up unfamiliar terminology as you learn.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/models"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#02BFA7] px-5 py-3 text-sm font-semibold text-[#071719] transition hover:bg-[#39D9C3]"
              >
                <Search size={16} /> Explore models
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-[#02BFA7]/50"
              >
                <GitCompareArrows size={16} /> Compare models
              </Link>
              <Link
                href="/glossary"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium transition hover:border-[#02BFA7]/50"
              >
                <BookOpen size={16} /> Open glossary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
