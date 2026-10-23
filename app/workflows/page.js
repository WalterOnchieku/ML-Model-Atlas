"use client";

// app/workflows/page.js
// Interactive guide to common machine-learning workflows.

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Boxes,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  ClipboardCheck,
  Code2,
  Database,
  Eye,
  GitBranch,
  GitCompareArrows,
  Layers3,
  Lightbulb,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

const C = {
  bg: "#071719",
  panel: "#102A2B",
  panelAlt: "#0B2021",
  mint: "#02BFA7",
  pale: "#DAFBF5",
  coral: "#FF4D2E",
  muted: "#8AA8A5",
  border: "rgba(218,251,245,0.10)",
};

const pipeline = [
  {
    number: "01",
    title: "Define the problem",
    icon: Target,
    tag: "START HERE",
    description:
      "Translate a real-world question into a machine-learning task with a measurable objective.",
    actions: [
      "Identify the user and the decision the model will support.",
      "Choose the task: classification, regression, clustering, or another approach.",
      "Define a baseline and a success metric.",
    ],
    output: "Problem statement + success criteria",
    warning:
      "Don't begin by choosing an algorithm. Begin by understanding the problem.",
  },
  {
    number: "02",
    title: "Collect and understand data",
    icon: Database,
    tag: "DATA",
    description:
      "Gather relevant, representative data and establish what it can reliably tell you.",
    actions: [
      "Identify trustworthy data sources and check permissions.",
      "Inspect row counts, columns, labels, missing values, and duplicates.",
      "Look for class imbalance, outliers, and possible data leakage.",
    ],
    output: "Data inventory + quality report",
    warning:
      "More data is not automatically better if the data is biased, irrelevant, or incorrectly labelled.",
  },
  {
    number: "03",
    title: "Prepare the dataset",
    icon: Layers3,
    tag: "PREPROCESS",
    description:
      "Convert raw data into a clean representation suitable for training and evaluation.",
    actions: [
      "Handle missing values, duplicates, and invalid records.",
      "Encode categories, scale features, or transform text and images as needed.",
      "Split data into training, validation, and test sets.",
    ],
    output: "Reproducible preprocessing pipeline",
    warning:
      "Fit preprocessing transformations on training data only. Applying information from the test set can cause leakage.",
  },
  {
    number: "04",
    title: "Build a baseline",
    icon: GitBranch,
    tag: "EXPERIMENT",
    description:
      "Establish a simple reference result before investing in a more complex model.",
    actions: [
      "Choose a simple model appropriate to the task.",
      "Train with a reproducible configuration and random seed where applicable.",
      "Record the dataset version, parameters, and baseline metrics.",
    ],
    output: "Baseline model + experiment record",
    warning:
      "A sophisticated model is not useful if it cannot beat a simple baseline on the right metric.",
  },
  {
    number: "05",
    title: "Train and tune",
    icon: BrainCircuit,
    tag: "LEARN",
    description:
      "Train candidate models and improve them using validation results.",
    actions: [
      "Compare suitable algorithms and feature representations.",
      "Tune hyperparameters using validation data or cross-validation.",
      "Check underfitting, overfitting, and resource consumption.",
    ],
    output: "Selected candidate + training configuration",
    warning:
      "Repeatedly tuning against the test set makes the final evaluation less trustworthy.",
  },
  {
    number: "06",
    title: "Evaluate and interpret",
    icon: BarChart3,
    tag: "VERIFY",
    description:
      "Determine whether the model is useful, reliable, and appropriate for its intended setting.",
    actions: [
      "Evaluate on held-out test data using task-appropriate metrics.",
      "Inspect errors, important subgroups, and relevant failure cases.",
      "Compare results against the baseline and original success criteria.",
    ],
    output: "Evaluation report + error analysis",
    warning:
      "Accuracy alone can be misleading, especially with imbalanced classes or unequal error costs.",
  },
  {
    number: "07",
    title: "Deploy the model",
    icon: Rocket,
    tag: "SHIP",
    description:
      "Package the selected model so an application or service can use it reliably.",
    actions: [
      "Save the model and its preprocessing components together.",
      "Expose predictions through a batch job, API, or application.",
      "Add input validation, logging, sensible timeouts, and tests.",
    ],
    output: "Versioned model + usable prediction interface",
    warning:
      "A model that works in a notebook may fail in production because of different inputs, dependencies, or resource limits.",
  },
  {
    number: "08",
    title: "Monitor and improve",
    icon: ShieldCheck,
    tag: "ITERATE",
    description:
      "Track real-world performance and decide when the system needs investigation or retraining.",
    actions: [
      "Monitor latency, failures, input changes, and prediction distributions.",
      "Measure quality when trustworthy outcome labels become available.",
      "Version new datasets and models; validate changes before release.",
    ],
    output: "Monitoring plan + improvement cycle",
    warning:
      "Deployment is not the end. Real-world data and user needs can change.",
  },
];

const workflowTypes = [
  {
    id: "tabular",
    label: "Tabular ML",
    subtitle: "Spreadsheets, databases, business records",
    icon: Database,
    accent: C.mint,
    task: "Classification or regression",
    example: "Predict whether a loan applicant will default.",
    steps: [
      "Validate columns, types, and target labels.",
      "Split the dataset before fitting transformations.",
      "Build a preprocessing pipeline for numeric and categorical features.",
      "Train a baseline such as logistic regression or a decision tree.",
      "Compare appropriate metrics and inspect errors.",
    ],
    metrics: "F1, precision, recall, ROC-AUC, MAE, or RMSE",
    models: "Linear models, decision trees, random forests, gradient boosting",
    note: "Watch for target leakage, time-dependent data, and class imbalance.",
  },
  {
    id: "text",
    label: "NLP",
    subtitle: "Messages, documents, reviews",
    icon: BrainCircuit,
    accent: C.coral,
    task: "Text classification or language processing",
    example: "Identify suspicious SMS messages.",
    steps: [
      "Inspect text, labels, duplicates, and language coverage.",
      "Create a leakage-aware train/test split.",
      "Build a text representation such as TF-IDF or embeddings.",
      "Train a baseline classifier or choose an appropriate language model.",
      "Evaluate false positives, false negatives, and difficult examples.",
    ],
    metrics: "Precision, recall, F1, confusion matrix",
    models: "Naive Bayes, logistic regression, transformer models",
    note: "Check for duplicate messages across splits and changes in scam language over time.",
  },
  {
    id: "vision",
    label: "Computer vision",
    subtitle: "Images and video frames",
    icon: Eye,
    accent: "#B6A2FF",
    task: "Classification, detection, or segmentation",
    example: "Classify crop leaves as healthy or diseased.",
    steps: [
      "Audit image labels, dimensions, quality, and class distribution.",
      "Split by the true independent unit, such as a plant or source.",
      "Resize and normalize images; augment training images only.",
      "Train a compact CNN or fine-tune a pretrained model.",
      "Evaluate class-level performance and inspect misclassified images.",
    ],
    metrics: "Per-class precision/recall, F1, accuracy, IoU or mAP",
    models: "CNNs, EfficientNet, ResNet, YOLO, segmentation models",
    note: "Near-duplicate images or images from the same subject across splits can inflate performance.",
  },
  {
    id: "unsupervised",
    label: "Unsupervised ML",
    subtitle: "Data without known target labels",
    icon: Boxes,
    accent: "#F4C46A",
    task: "Clustering or dimensionality reduction",
    example: "Explore customer groups from purchasing patterns.",
    steps: [
      "Define why groups or lower-dimensional representations are useful.",
      "Select features and scale them when appropriate.",
      "Fit a simple clustering or dimensionality-reduction method.",
      "Compare stability and inspect the resulting groups or representation.",
      "Validate whether the result is useful for the intended decision.",
    ],
    metrics: "Silhouette score, Davies–Bouldin index, stability, domain usefulness",
    models: "K-means, DBSCAN, hierarchical clustering, PCA",
    note: "Clusters are not automatically meaningful customer segments or naturally occurring categories.",
  },
];

const glossary = [
  {
    term: "Feature",
    definition: "An input variable the model uses to make predictions.",
  },
  {
    term: "Target",
    definition: "The outcome a supervised model is trained to predict.",
  },
  {
    term: "Overfitting",
    definition:
      "When a model learns training-specific patterns that fail to generalize.",
  },
  {
    term: "Data leakage",
    definition:
      "When training or model selection uses information that would not legitimately be available at prediction time.",
  },
  {
    term: "Inference",
    definition: "Using a trained model to generate predictions on new inputs.",
  },
  {
    term: "Drift",
    definition:
      "A change in data or relationships over time that may affect model performance.",
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-2xl">
      <p
        className="mb-3 text-xs font-bold uppercase tracking-[0.22em]"
        style={{ color: C.mint }}
      >
        {eyebrow}
      </p>
      <h2
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
        style={{ color: C.pale }}
      >
        {title}
      </h2>
      {description && (
        <p
          className="mt-3 text-sm leading-7 sm:text-base"
          style={{ color: C.muted }}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function WorkflowsPage() {
  const [activeWorkflow, setActiveWorkflow] = useState("tabular");
  const [expandedStage, setExpandedStage] = useState("01");
  const [completed, setCompleted] = useState([]);

  const selectedWorkflow = workflowTypes.find(
    (workflow) => workflow.id === activeWorkflow
  );

  function toggleChecklist(item) {
    setCompleted((current) =>
      current.includes(item)
        ? current.filter((entry) => entry !== item)
        : [...current, item]
    );
  }

  const checklist = [
    "I have defined the problem and success criteria.",
    "I have checked data quality and leakage risks.",
    "I have created a reproducible train/validation/test split.",
    "I have established a baseline.",
    "I have evaluated the model on held-out data.",
    "I have documented limitations and failure cases.",
    "I have planned deployment and monitoring.",
  ];

  return (
    <main
      className="min-h-screen"
      style={{ background: C.bg, color: C.pale }}
    >
      {/* HERO */}
      <section className="relative overflow-hidden border-b px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(2,191,167,0.10)" }}
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/3 h-48 w-48 rounded-full blur-3xl"
          style={{ background: "rgba(255,77,46,0.06)" }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: "rgba(2,191,167,0.3)",
                color: C.mint,
                background: "rgba(2,191,167,0.07)",
              }}
            >
              <Workflow size={14} />
              From data to deployment
            </div>

            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Good models start with{" "}
              <span style={{ color: C.mint }}>good workflows.</span>
            </h1>

            <p
              className="mt-6 max-w-xl text-base leading-8 sm:text-lg"
              style={{ color: C.muted }}
            >
              A practical map of the machine-learning lifecycle. Learn what
              happens at each stage, how workflows differ by task, and what to
              verify before trusting a model.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#lifecycle"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{ background: C.mint, color: C.bg }}
              >
                Explore the lifecycle
                <ArrowDown size={16} />
              </a>
              <Link
                href="/selector"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
                style={{ borderColor: C.border, color: C.pale }}
              >
                Find a suitable model
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs" style={{ color: C.muted }}>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: C.mint }} />
                8 lifecycle stages
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: C.mint }} />
                4 workflow patterns
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={14} style={{ color: C.mint }} />
                Practical checklist
              </span>
            </div>
          </motion.div>

          {/* Decorative workflow map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-3xl border p-5 sm:p-7"
            style={{
              borderColor: C.border,
              background:
                "linear-gradient(145deg, rgba(16,42,43,0.95), rgba(7,23,25,0.95))",
            }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: C.muted }}>
                The big picture
              </span>
              <span className="text-xs" style={{ color: C.mint }}>
                01 — 08
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Lightbulb, label: "Define", detail: "The question" },
                { icon: Database, label: "Prepare", detail: "The data" },
                { icon: BrainCircuit, label: "Train", detail: "The model" },
                { icon: BarChart3, label: "Evaluate", detail: "The evidence" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border p-4 sm:p-5"
                    style={{
                      borderColor: C.border,
                      background: "rgba(218,251,245,0.025)",
                    }}
                  >
                    <div
                      className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        background:
                          index === 3
                            ? "rgba(255,77,46,0.12)"
                            : "rgba(2,191,167,0.12)",
                        color: index === 3 ? C.coral : C.mint,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="mt-1 text-xs" style={{ color: C.muted }}>
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-4 flex items-center justify-between rounded-2xl border px-4 py-4"
              style={{
                borderColor: "rgba(2,191,167,0.24)",
                background: "rgba(2,191,167,0.06)",
              }}
            >
              <div>
                <p className="text-sm font-semibold">Deploy → Monitor → Improve</p>
                <p className="mt-1 text-xs" style={{ color: C.muted }}>
                  A continuous feedback loop
                </p>
              </div>
              <GitBranch size={22} style={{ color: C.mint }} />
            </div>

            <p className="mt-4 text-xs leading-5" style={{ color: C.muted }}>
              A simplified overview. Real projects often revisit earlier stages
              as new evidence emerges.
            </p>
          </motion.div>
        </div>
      </section>

      {/* LIFECYCLE */}
      <section id="lifecycle" className="scroll-mt-8 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="01 / The lifecycle"
            title="Eight stages. One repeatable process."
            description="Select any stage to see the work involved, the expected deliverable, and a common mistake to avoid."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-2">
              {pipeline.map((stage) => {
                const Icon = stage.icon;
                const isActive = expandedStage === stage.number;

                return (
                  <button
                    key={stage.number}
                    type="button"
                    onClick={() => setExpandedStage(stage.number)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition"
                    style={{
                      borderColor: isActive
                        ? "rgba(2,191,167,0.4)"
                        : C.border,
                      background: isActive
                        ? "rgba(2,191,167,0.07)"
                        : "rgba(16,42,43,0.35)",
                    }}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold"
                      style={{
                        background: isActive
                          ? C.mint
                          : "rgba(218,251,245,0.05)",
                        color: isActive ? C.bg : C.muted,
                      }}
                    >
                      {stage.number}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold">{stage.title}</span>
                      <span
                        className="mt-1 block text-xs"
                        style={{ color: C.muted }}
                      >
                        {stage.tag}
                      </span>
                    </span>

                    <ArrowRight
                      size={17}
                      style={{ color: isActive ? C.mint : C.muted }}
                    />
                  </button>
                );
              })}
            </div>

            <div
              className="min-w-0 rounded-3xl border p-5 sm:p-8"
              style={{
                borderColor: C.border,
                background: C.panelAlt,
              }}
            >
              <AnimatePresence mode="wait">
                {pipeline
                  .filter((stage) => stage.number === expandedStage)
                  .map((stage) => {
                    const Icon = stage.icon;

                    return (
                      <motion.div
                        key={stage.number}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div
                            className="flex h-12 w-12 items-center justify-center rounded-2xl"
                            style={{
                              background: "rgba(2,191,167,0.10)",
                              color: C.mint,
                            }}
                          >
                            <Icon size={23} />
                          </div>
                          <span
                            className="rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.18em]"
                            style={{
                              borderColor: C.border,
                              color: C.muted,
                            }}
                          >
                            STAGE {stage.number}
                          </span>
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold">
                          {stage.title}
                        </h3>
                        <p
                          className="mt-3 text-sm leading-7"
                          style={{ color: C.muted }}
                        >
                          {stage.description}
                        </p>

                        <div className="mt-7">
                          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.mint }}>
                            What to do
                          </p>
                          <ul className="space-y-3">
                            {stage.actions.map((action) => (
                              <li
                                key={action}
                                className="flex items-start gap-3 text-sm leading-6"
                              >
                                <CheckCircle2
                                  size={17}
                                  className="mt-1 shrink-0"
                                  style={{ color: C.mint }}
                                />
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div
                          className="mt-7 rounded-2xl border p-4"
                          style={{
                            borderColor: "rgba(2,191,167,0.2)",
                            background: "rgba(2,191,167,0.055)",
                          }}
                        >
                          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.mint }}>
                            Expected output
                          </p>
                          <p className="mt-2 text-sm font-medium">
                            {stage.output}
                          </p>
                        </div>

                        <div
                          className="mt-4 flex items-start gap-3 rounded-2xl border p-4"
                          style={{
                            borderColor: "rgba(255,77,46,0.18)",
                            background: "rgba(255,77,46,0.045)",
                          }}
                        >
                          <CircleAlert
                            size={18}
                            className="mt-0.5 shrink-0"
                            style={{ color: C.coral }}
                          />
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.coral }}>
                              Watch out
                            </p>
                            <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                              {stage.warning}
                            </p>
                          </div>
                        </div>

                        <div className="mt-7 flex flex-wrap gap-2">
                          {stage.number !== "01" && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedStage(
                                  String(Number(stage.number) - 1).padStart(2, "0")
                                )
                              }
                              className="rounded-full border px-4 py-2 text-sm"
                              style={{ borderColor: C.border, color: C.pale }}
                            >
                              Previous stage
                            </button>
                          )}

                          {stage.number !== "08" && (
                            <button
                              type="button"
                              onClick={() =>
                                setExpandedStage(
                                  String(Number(stage.number) + 1).padStart(2, "0")
                                )
                              }
                              className="rounded-full px-4 py-2 text-sm font-semibold"
                              style={{ background: C.mint, color: C.bg }}
                            >
                              Next stage <ArrowRight className="ml-1 inline" size={15} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* TASK-SPECIFIC WORKFLOWS */}
      <section
        className="border-y px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        style={{
          borderColor: C.border,
          background: "rgba(16,42,43,0.22)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="02 / Choose your workflow"
            title="The task changes the process."
            description="The overall lifecycle remains similar, but data preparation, model selection, and evaluation depend on the type of problem."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            {workflowTypes.map((workflow) => {
              const Icon = workflow.icon;
              const active = activeWorkflow === workflow.id;

              return (
                <button
                  key={workflow.id}
                  type="button"
                  onClick={() => setActiveWorkflow(workflow.id)}
                  aria-pressed={active}
                  className="flex items-center gap-2 rounded-full border px-4 py-3 text-sm font-medium transition"
                  style={{
                    borderColor: active ? workflow.accent : C.border,
                    background: active
                      ? "rgba(218,251,245,0.07)"
                      : "transparent",
                    color: active ? C.pale : C.muted,
                  }}
                >
                  <Icon size={16} style={{ color: workflow.accent }} />
                  {workflow.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {selectedWorkflow && (
              <motion.div
                key={selectedWorkflow.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
              >
                <div
                  className="rounded-3xl border p-6 sm:p-8"
                  style={{
                    borderColor: C.border,
                    background: C.bg,
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl"
                    style={{
                      background: `${selectedWorkflow.accent}18`,
                      color: selectedWorkflow.accent,
                    }}
                  >
                    {(() => {
                      const Icon = selectedWorkflow.icon;
                      return <Icon size={24} />;
                    })()}
                  </div>

                  <p
                    className="mt-6 text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: selectedWorkflow.accent }}
                  >
                    {selectedWorkflow.subtitle}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {selectedWorkflow.label}
                  </h3>

                  <p className="mt-4 text-sm leading-7" style={{ color: C.muted }}>
                    {selectedWorkflow.example}
                  </p>

                  <div className="mt-6 border-t pt-5" style={{ borderColor: C.border }}>
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.muted }}>
                      Typical task
                    </p>
                    <p className="mt-2 text-sm font-medium">
                      {selectedWorkflow.task}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.muted }}>
                      Common model choices
                    </p>
                    <p className="mt-2 text-sm leading-6">
                      {selectedWorkflow.models}
                    </p>
                  </div>
                </div>

                <div
                  className="rounded-3xl border p-6 sm:p-8"
                  style={{
                    borderColor: C.border,
                    background: C.panel,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: C.mint }}>
                    Workflow in practice
                  </p>

                  <ol className="mt-6 space-y-5">
                    {selectedWorkflow.steps.map((step, index) => (
                      <li key={step} className="flex items-start gap-4">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                          style={{
                            background: "rgba(2,191,167,0.10)",
                            color: C.mint,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="pt-1 text-sm leading-6">{step}</p>
                      </li>
                    ))}
                  </ol>

                  <div
                    className="mt-7 rounded-2xl border p-4"
                    style={{ borderColor: C.border, background: C.panelAlt }}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider" style={{ color: C.mint }}>
                      Evaluation ideas
                    </p>
                    <p className="mt-2 text-sm leading-6" style={{ color: C.pale }}>
                      {selectedWorkflow.metrics}
                    </p>
                    <p className="mt-3 text-xs leading-5" style={{ color: C.muted }}>
                      {selectedWorkflow.note}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* EXPERIMENT DESIGN */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="03 / Make results trustworthy"
            title="A good workflow protects the evidence."
            description="Your evaluation is only as reliable as the way you prepare the data, choose metrics, and compare experiments."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: "01",
                title: "Split with care",
                icon: GitBranch,
                text: "Use stratified splits when appropriate for classification, chronological splits for forecasting, and group-aware splits when samples share a source.",
              },
              {
                number: "02",
                title: "Match the metric",
                icon: Target,
                text: "Choose metrics based on the actual cost of errors. For imbalanced classification, inspect precision, recall, and the confusion matrix.",
              },
              {
                number: "03",
                title: "Keep a baseline",
                icon: BarChart3,
                text: "Record a simple benchmark before tuning. Compare candidate models against the same defensible evaluation procedure.",
              },
              {
                number: "04",
                title: "Track experiments",
                icon: ClipboardCheck,
                text: "Record data versions, code, parameters, model artifacts, metrics, and random seeds where relevant.",
              },
              {
                number: "05",
                title: "Inspect mistakes",
                icon: Eye,
                text: "Look beyond aggregate scores. Examine misclassified examples, subgroup performance, and edge cases.",
              },
              {
                number: "06",
                title: "Plan for production",
                icon: Rocket,
                text: "Consider inference speed, memory, dependencies, security, monitoring, rollback, and the cost of serving predictions.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.number}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="rounded-2xl border p-5 sm:p-6"
                  style={{
                    borderColor: C.border,
                    background: C.panelAlt,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold" style={{ color: C.muted }}>
                      {item.number}
                    </span>
                    <Icon size={20} style={{ color: C.mint }} />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7" style={{ color: C.muted }}>
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section
        className="border-y px-5 py-16 sm:px-8 lg:px-12 lg:py-24"
        style={{
          borderColor: C.border,
          background: "rgba(16,42,43,0.2)",
        }}
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="04 / Before you ship"
              title="The model-readiness checklist."
              description="Use this as a lightweight final review before treating an experiment as a usable ML solution."
            />

            <div
              className="mt-7 rounded-2xl border p-5"
              style={{
                borderColor: C.border,
                background: C.bg,
              }}
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wider" style={{ color: C.muted }}>
                    Checklist progress
                  </p>
                  <p className="mt-2 text-3xl font-semibold">
                    {completed.length}
                    <span className="text-base" style={{ color: C.muted }}>
                      {" "}/ {checklist.length}
                    </span>
                  </p>
                </div>
                <span className="text-sm font-medium" style={{ color: C.mint }}>
                  {Math.round((completed.length / checklist.length) * 100)}%
                </span>
              </div>

              <div
                className="mt-4 h-2 overflow-hidden rounded-full"
                style={{ background: "rgba(218,251,245,0.08)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  animate={{
                    width: `${(completed.length / checklist.length) * 100}%`,
                  }}
                  transition={{ duration: 0.25 }}
                  style={{ background: C.mint }}
                />
              </div>

              <p className="mt-4 text-xs leading-5" style={{ color: C.muted }}>
                Your selections remain in this page session; this checklist
                does not save progress to an account or database.
              </p>

              <button
                type="button"
                onClick={() => setCompleted([])}
                className="mt-4 text-xs underline underline-offset-4"
                style={{ color: C.muted }}
              >
                Reset checklist
              </button>
            </div>
          </div>

          <div
            className="rounded-3xl border p-5 sm:p-8"
            style={{ borderColor: C.border, background: C.panelAlt }}
          >
            <div className="space-y-3">
              {checklist.map((item) => {
                const checked = completed.includes(item);

                return (
                  <label
                    key={item}
                    className="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                    style={{
                      borderColor: checked
                        ? "rgba(2,191,167,0.25)"
                        : C.border,
                      background: checked
                        ? "rgba(2,191,167,0.055)"
                        : "transparent",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleChecklist(item)}
                      className="mt-1 h-4 w-4 shrink-0 accent-emerald-400"
                    />
                    <span
                      className="text-sm leading-6"
                      style={{
                        color: checked ? C.pale : C.muted,
                        textDecoration: checked ? "line-through" : "none",
                      }}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GLOSSARY */}
      <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="05 / Quick reference"
            title="Terms you'll meet along the way."
            description="A small vocabulary to make ML documentation and experiment reports easier to follow."
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {glossary.map((item) => (
              <article
                key={item.term}
                className="rounded-2xl border p-5"
                style={{
                  borderColor: C.border,
                  background: C.panelAlt,
                }}
              >
                <h3 className="font-semibold" style={{ color: C.mint }}>
                  {item.term}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                  {item.definition}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5">
            <Link
              href="/glossary"
              className="inline-flex items-center gap-2 text-sm font-medium"
              style={{ color: C.mint }}
            >
              Explore the full glossary <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div
          className="mx-auto max-w-7xl overflow-hidden rounded-3xl border p-6 sm:p-10 lg:p-12"
          style={{
            borderColor: "rgba(2,191,167,0.22)",
            background:
              "linear-gradient(125deg, rgba(16,42,43,0.95), rgba(7,23,25,0.95))",
          }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: C.mint }}>
                <Sparkles size={15} />
                Put it into practice
              </div>
              <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
                Ready to choose your next model?
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 sm:text-base" style={{ color: C.muted }}>
                Start with the problem, narrow down suitable algorithms, and
                compare trade-offs before you build.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/selector"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                style={{ background: C.mint, color: C.bg }}
              >
                Open model selector <ArrowRight size={16} />
              </Link>
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold"
                style={{ borderColor: C.border, color: C.pale }}
              >
                Compare models <GitCompareArrows size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}