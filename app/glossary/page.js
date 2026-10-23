"use client";

// app/glossary/page.js
// Searchable machine learning glossary with topic filters,
// beginner-friendly definitions, practical examples, and related model links.

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const TERMS = [
  {
    term: "Accuracy",
    category: "Evaluation",
    definition:
      "The proportion of all predictions a model gets correct.",
    example:
      "If a classifier correctly predicts 90 out of 100 messages, its accuracy is 90%.",
    whyItMatters:
      "Accuracy is easy to understand, but can be misleading when one class is much more common than another.",
    related: ["Precision", "Recall", "F1 Score", "Confusion Matrix"],
  },
  {
    term: "Activation Function",
    category: "Neural Networks",
    definition:
      "A function applied to a neuron's output that helps a neural network learn non-linear patterns.",
    example:
      "ReLU returns zero for negative inputs and leaves positive inputs unchanged.",
    whyItMatters:
      "Without suitable activation functions, many neural network layers would behave like a single linear transformation.",
    related: ["ReLU", "Neural Network", "Backpropagation"],
  },
  {
    term: " overfitting".trim(),
    category: "Model Training",
    definition:
      "When a model learns the training data too closely, including noise, and performs poorly on unseen data.",
    example:
      "A decision tree that memorizes individual training examples but misclassifies new examples is overfitting.",
    whyItMatters:
      "A model must generalize beyond the examples used to train it.",
    related: ["Underfitting", "Regularization", "Cross-Validation"],
  },
  {
    term: "Backpropagation",
    category: "Neural Networks",
    definition:
      "An algorithmic process that calculates how each neural network parameter contributed to the prediction error.",
    example:
      "A network uses backpropagation to calculate gradients before its weights are updated.",
    whyItMatters:
      "It enables neural networks to learn by providing gradients to an optimizer.",
    related: ["Gradient Descent", "Loss Function", "Neural Network"],
  },
  {
    term: "Baseline Model",
    category: "Model Training",
    definition:
      "A simple reference model used to establish a performance benchmark for more sophisticated approaches.",
    example:
      "You might compare a logistic regression classifier against a majority-class predictor before trying a neural network.",
    whyItMatters:
      "A complex model is only worthwhile if it improves on a sensible baseline.",
    related: ["Logistic Regression", "Accuracy", "Evaluation"],
  },
  {
    term: "Batch Size",
    category: "Model Training",
    definition:
      "The number of training examples processed together before a training update.",
    example:
      "With a batch size of 32, the model processes up to 32 examples per batch.",
    whyItMatters:
      "Batch size affects memory use, training speed, and the behavior of optimization.",
    related: ["Gradient Descent", "Epoch", "Neural Network"],
  },
  {
    term: "Bias",
    category: "Model Training",
    definition:
      "In the bias-variance trade-off, bias describes error associated with overly restrictive assumptions. In a model, it can also mean a learnable intercept.",
    example:
      "A straight-line model may have high bias when the true relationship is strongly curved.",
    whyItMatters:
      "Understanding bias helps explain why a model can be too simple to capture the underlying pattern.",
    related: ["Variance", "Underfitting", "Regularization"],
  },
  {
    term: "Classification",
    category: "Learning Tasks",
    definition:
      "A supervised learning task in which a model predicts a category or class.",
    example:
      "Classifying an SMS as spam or legitimate is a binary classification problem.",
    whyItMatters:
      "The task determines which models, output formats, and evaluation metrics are appropriate.",
    related: ["Logistic Regression", "Decision Tree", "Precision", "Recall"],
  },
  {
    term: "Clustering",
    category: "Learning Tasks",
    definition:
      "An unsupervised learning task that groups examples based on similarities in their features.",
    example:
      "A business might cluster customers according to purchasing behavior without predefined customer labels.",
    whyItMatters:
      "Clustering can help discover structure in data when target labels are unavailable.",
    related: ["K-Means", "DBSCAN", "Unsupervised Learning"],
  },
  {
    term: "Confusion Matrix",
    category: "Evaluation",
    definition:
      "A table that compares predicted classes with actual classes, showing correct and incorrect classifications.",
    example:
      "For a spam detector, it reveals how many spam messages were caught and how many legitimate messages were incorrectly flagged.",
    whyItMatters:
      "It helps identify the kinds of errors a classifier makes instead of reducing performance to one score.",
    related: ["Precision", "Recall", "F1 Score", "Classification"],
  },
  {
    term: "Cross-Validation",
    category: "Evaluation",
    definition:
      "A method for estimating model performance by training and evaluating across multiple data splits.",
    example:
      "In five-fold cross-validation, the data is divided into five parts and each part serves as the validation fold once.",
    whyItMatters:
      "It provides a more robust performance estimate than relying on one validation split alone.",
    related: ["Overfitting", "Hyperparameter", "Train-Test Split"],
  },
  {
    term: "Decision Boundary",
    category: "Model Training",
    definition:
      "The boundary in feature space where a classifier changes its predicted class.",
    example:
      "A logistic regression model creates a linear decision boundary when using its standard linear feature representation.",
    whyItMatters:
      "Visualizing decision boundaries can help explain how a classifier separates different classes.",
    related: ["Classification", "Logistic Regression", "SVM"],
  },
  {
    term: "Dimensionality Reduction",
    category: "Data Preparation",
    definition:
      "Reducing the number of input features while trying to preserve useful information.",
    example:
      "PCA can transform hundreds of correlated features into a smaller set of principal components.",
    whyItMatters:
      "It can simplify data, support visualization, reduce computation, and sometimes improve generalization.",
    related: ["PCA", "Feature Engineering", "Feature Selection"],
  },
  {
    term: "Epoch",
    category: "Model Training",
    definition:
      "One complete pass through the training dataset during model training.",
    example:
      "Training for 10 epochs means the model has gone through the training data ten times, subject to the training pipeline.",
    whyItMatters:
      "Too few epochs may leave a model undertrained, while too many can contribute to overfitting.",
    related: ["Batch Size", "Gradient Descent", "Overfitting"],
  },
  {
    term: "F1 Score",
    category: "Evaluation",
    definition:
      "The harmonic mean of precision and recall, combining both into one score.",
    example:
      "A spam classifier may use F1 when both catching spam and avoiding false alarms matter.",
    whyItMatters:
      "It is useful when accuracy alone hides poor performance on an important class.",
    related: ["Precision", "Recall", "Confusion Matrix"],
  },
  {
    term: "Feature",
    category: "Data Preparation",
    definition:
      "An input variable used by a machine learning model to make predictions.",
    example:
      "For a house-price model, floor area, number of bedrooms, and location can be features.",
    whyItMatters:
      "Feature quality and representation can strongly influence model performance.",
    related: ["Feature Engineering", "Feature Selection", "Training Data"],
  },
  {
    term: "Feature Engineering",
    category: "Data Preparation",
    definition:
      "Creating, transforming, or combining input variables to make useful patterns easier for a model to learn.",
    example:
      "Turning a transaction timestamp into hour-of-day and day-of-week features may help detect unusual activity.",
    whyItMatters:
      "Useful features can improve simpler models without necessarily requiring a more complex algorithm.",
    related: ["Feature", "Feature Selection", "Data Preprocessing"],
  },
  {
    term: "Feature Selection",
    category: "Data Preparation",
    definition:
      "Choosing a subset of the available input features for a model.",
    example:
      "Removing irrelevant or redundant columns can simplify a model and reduce noise.",
    whyItMatters:
      "It can reduce computational cost and make a model easier to interpret.",
    related: ["Feature Engineering", "Dimensionality Reduction", "Regularization"],
  },
  {
    term: "Gradient Descent",
    category: "Model Training",
    definition:
      "An optimization method that updates model parameters in the direction that reduces the loss.",
    example:
      "A model calculates gradients of its loss and adjusts its weights using a learning rate.",
    whyItMatters:
      "Many machine learning algorithms, especially neural networks, rely on gradient-based optimization.",
    related: ["Learning Rate", "Backpropagation", "Loss Function"],
  },
  {
    term: "Hyperparameter",
    category: "Model Training",
    definition:
      "A configuration value set before or around training rather than directly learned as an ordinary model parameter.",
    example:
      "Tree depth, regularization strength, and learning rate are common hyperparameters.",
    whyItMatters:
      "Choosing suitable hyperparameters can substantially affect performance and training cost.",
    related: ["Cross-Validation", "Learning Rate", "Regularization"],
  },
  {
    term: "Imbalanced Dataset",
    category: "Data Preparation",
    definition:
      "A dataset in which some classes have many more examples than others.",
    example:
      "A fraud dataset might contain thousands of legitimate transactions but very few fraudulent ones.",
    whyItMatters:
      "A model can achieve high accuracy while failing to identify the rare class.",
    related: ["Precision", "Recall", "Class Weight", "Confusion Matrix"],
  },
  {
    term: "Learning Rate",
    category: "Model Training",
    definition:
      "A parameter that controls the size of updates made by an optimizer during training.",
    example:
      "An excessively large learning rate may cause training to overshoot useful parameter values.",
    whyItMatters:
      "It influences how quickly and reliably a model learns.",
    related: ["Gradient Descent", "Epoch", "Hyperparameter"],
  },
  {
    term: "Loss Function",
    category: "Model Training",
    definition:
      "A mathematical function that measures how poorly a model's predictions match the training targets.",
    example:
      "Cross-entropy loss is commonly used to train classification models.",
    whyItMatters:
      "Training typically aims to minimize an appropriate loss function, which is not always the same as maximizing the final evaluation metric.",
    related: ["Gradient Descent", "Backpropagation", "Evaluation Metric"],
  },
  {
    term: "Overfitting",
    category: "Model Training",
    definition:
      "When a model learns the training data too closely, including noise, and performs poorly on unseen data.",
    example:
      "A decision tree that memorizes individual training examples but misclassifies new examples is overfitting.",
    whyItMatters:
      "A model must generalize beyond the examples used to train it.",
    related: ["Underfitting", "Regularization", "Cross-Validation"],
  },
  {
    term: "Precision",
    category: "Evaluation",
    definition:
      "The proportion of predicted positive cases that are actually positive.",
    example:
      "If 100 messages are flagged as spam and 90 really are spam, precision is 90%.",
    whyItMatters:
      "Precision matters when false positives are costly, such as incorrectly flagging legitimate messages.",
    related: ["Recall", "F1 Score", "Confusion Matrix"],
  },
  {
    term: "Principal Component Analysis (PCA)",
    category: "Algorithms",
    definition:
      "A dimensionality-reduction technique that transforms data into components capturing as much variance as possible in sequence.",
    example:
      "PCA can reduce a large set of numeric measurements to two components for exploratory visualization.",
    whyItMatters:
      "It can simplify high-dimensional data, although components may be less directly interpretable than the original features.",
    related: ["Dimensionality Reduction", "Feature", "Unsupervised Learning"],
  },
  {
    term: "Recall",
    category: "Evaluation",
    definition:
      "The proportion of actual positive cases that a model successfully identifies.",
    example:
      "If there are 100 spam messages and the detector catches 85, its recall is 85%.",
    whyItMatters:
      "Recall matters when missing a positive case is costly, such as failing to flag a dangerous message.",
    related: ["Precision", "F1 Score", "Confusion Matrix"],
  },
  {
    term: "Regularization",
    category: "Model Training",
    definition:
      "Techniques that discourage a model from becoming unnecessarily complex, helping reduce overfitting.",
    example:
      "L1 or L2 penalties can discourage excessively large coefficients in a regression model.",
    whyItMatters:
      "Regularization can improve generalization, though too much may cause underfitting.",
    related: ["Overfitting", "Underfitting", "Logistic Regression"],
  },
  {
    term: "Supervised Learning",
    category: "Learning Tasks",
    definition:
      "Learning from examples that contain input features and known target labels or values.",
    example:
      "Training a model on messages labeled as spam or legitimate is supervised learning.",
    whyItMatters:
      "It covers tasks such as classification and regression, where training examples provide target answers.",
    related: ["Classification", "Regression", "Training Data"],
  },
  {
    term: "Train-Test Split",
    category: "Evaluation",
    definition:
      "Separating data into a training portion used to fit a model and a test portion reserved for final evaluation.",
    example:
      "An 80/20 split uses 80% of the examples for training and 20% for testing.",
    whyItMatters:
      "Keeping test data separate helps estimate performance on examples the model did not train on.",
    related: ["Cross-Validation", "Overfitting", "Data Leakage"],
  },
  {
    term: "Underfitting",
    category: "Model Training",
    definition:
      "When a model is too simple or insufficiently trained to capture the patterns in the data.",
    example:
      "A straight-line model may underfit data with a strongly nonlinear relationship.",
    whyItMatters:
      "A model that cannot learn the training patterns is unlikely to perform well on new examples.",
    related: ["Overfitting", "Bias", "Regularization"],
  },
  {
    term: "Unsupervised Learning",
    category: "Learning Tasks",
    definition:
      "Learning patterns or structure from data without supplied target labels.",
    example:
      "K-Means can group customers based on their features without being told the correct group for each person.",
    whyItMatters:
      "It is useful for exploration and discovering structure when labeled examples are unavailable.",
    related: ["Clustering", "K-Means", "PCA"],
  },
  {
    term: "Variance",
    category: "Model Training",
    definition:
      "In the bias-variance trade-off, variance describes how much a model's learned behavior changes across different training datasets.",
    example:
      "A very deep decision tree may produce substantially different predictions when trained on slightly different data.",
    whyItMatters:
      "High variance is associated with sensitivity to the training sample and can contribute to overfitting.",
    related: ["Bias", "Overfitting", "Cross-Validation"],
  },
  {
    term: "Data Leakage",
    category: "Data Preparation",
    definition:
      "When information that would not legitimately be available at prediction time influences training or evaluation.",
    example:
      "Scaling all data before splitting it can leak information from the test set into the training process.",
    whyItMatters:
      "Leakage can make evaluation results look much better than real-world performance.",
    related: ["Train-Test Split", "Cross-Validation", "Data Preprocessing"],
  },
  {
    term: "Regression",
    category: "Learning Tasks",
    definition:
      "A supervised learning task that predicts a numeric value rather than a category.",
    example:
      "Predicting the selling price of a house is a regression problem.",
    whyItMatters:
      "Regression uses different output formats and evaluation metrics from classification.",
    related: ["Linear Regression", "Random Forest", "Mean Absolute Error"],
  },
];

const CATEGORIES = [
  "All",
  "Learning Tasks",
  "Algorithms",
  "Data Preparation",
  "Model Training",
  "Evaluation",
  "Neural Networks",
];

const CATEGORY_STYLES = {
  "Learning Tasks": "text-[#02BFA7] bg-[#02BFA7]/10 border-[#02BFA7]/20",
  Algorithms: "text-orange-300 bg-orange-400/10 border-orange-400/20",
  "Data Preparation": "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  "Model Training": "text-violet-300 bg-violet-400/10 border-violet-400/20",
  Evaluation: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  "Neural Networks": "text-pink-300 bg-pink-400/10 border-pink-400/20",
};

function normalize(value) {
  return String(value ?? "").toLowerCase().trim();
}

function TermCard({ item, index, expanded, onToggle, onSearchRelated }) {
  return (
    <article
      className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/65 transition duration-200 hover:border-[#02BFA7]/35 hover:bg-[#102A2B]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
      >
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.035] font-mono text-xs text-[#02BFA7]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className="min-w-0 flex-1">
          <span className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold tracking-tight text-[#DAFBF5] sm:text-lg">
              {item.term}
            </span>
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                CATEGORY_STYLES[item.category] ??
                "border-white/10 bg-white/5 text-white/60"
              }`}
            >
              {item.category}
            </span>
          </span>
          <span className="block text-sm leading-6 text-slate-300">
            {item.definition}
          </span>
        </span>

        <span className="mt-1 shrink-0 text-slate-500 transition group-hover:text-[#02BFA7]">
          {expanded ? (
            <ChevronUp size={19} />
          ) : (
            <ChevronDown size={19} />
          )}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-white/[0.08] px-5 pb-6 pt-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#02BFA7]/15 bg-[#02BFA7]/[0.055] p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#02BFA7]">
                Practical example
              </p>
              <p className="text-sm leading-6 text-slate-200">
                {item.example}
              </p>
            </div>
            <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-300">
                Why it matters
              </p>
              <p className="text-sm leading-6 text-slate-300">
                {item.whyItMatters}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Explore related concepts
            </p>
            <div className="flex flex-wrap gap-2">
              {item.related.map((related) => (
                <button
                  key={related}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    onSearchRelated(related);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300 transition hover:border-[#02BFA7]/40 hover:text-[#02BFA7]"
                >
                  {related}
                  <ArrowRight className="ml-1 inline" size={11} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

export default function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState("Precision");
  const [sortOrder, setSortOrder] = useState("alphabetical");

  const filteredTerms = useMemo(() => {
    const search = normalize(query);

    const result = TERMS.filter((item) => {
      const matchesCategory =
        category === "All" || item.category === category;

      const searchableText = [
        item.term,
        item.category,
        item.definition,
        item.example,
        item.whyItMatters,
        ...item.related,
      ]
        .map(normalize)
        .join(" ");

      return matchesCategory && (!search || searchableText.includes(search));
    });

    if (sortOrder === "alphabetical") {
      result.sort((a, b) => a.term.localeCompare(b.term));
    }

    return result;
  }, [query, category, sortOrder]);

  function selectRelatedTerm(term) {
    setQuery(term);
    setCategory("All");
    setExpandedTerm(term);
  }

  function clearFilters() {
    setQuery("");
    setCategory("All");
    setSortOrder("alphabetical");
  }

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/[0.07]">
        <div className="pointer-events-none absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#02BFA7]/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-orange-500/[0.045] blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#02BFA7]/25 bg-[#02BFA7]/[0.07] px-3 py-1.5 text-xs font-semibold tracking-wide text-[#02BFA7]">
            <BookOpen size={14} />
            YOUR ML FIELD GUIDE
          </div>

          <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr]">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                Understand the language of machine learning
              </p>
              <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-[#DAFBF5] sm:text-6xl lg:text-7xl">
                Every concept,
                <span className="block text-[#02BFA7]">made clearer.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                A practical dictionary of machine learning concepts. Learn
                what each term means, see where it fits, and understand why
                it matters when building real models.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:pb-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="font-mono text-3xl font-semibold text-[#02BFA7]">
                  {TERMS.length}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Concepts explained
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <p className="font-mono text-3xl font-semibold text-orange-300">
                  {CATEGORIES.length - 1}
                </p>
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Learning categories
                </p>
              </div>
              <div className="col-span-2 rounded-2xl border border-white/[0.08] bg-[#102A2B]/65 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02BFA7]/10 text-[#02BFA7]">
                    <Sparkles size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#DAFBF5]">
                      Learn in context
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Definitions, examples, and connected concepts.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and filters */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-12">
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
              The reference desk
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#DAFBF5] sm:text-3xl">
              Find a concept
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Search a term, a definition, or a related topic.
            </p>
          </div>

          <label className="relative block w-full lg:max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try “overfitting” or “false positives”…"
              aria-label="Search glossary terms"
              className="w-full rounded-xl border border-white/[0.12] bg-[#102A2B]/70 py-3.5 pl-11 pr-11 text-sm text-[#DAFBF5] outline-none transition placeholder:text-slate-500 focus:border-[#02BFA7]/60 focus:ring-2 focus:ring-[#02BFA7]/10"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            )}
          </label>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                aria-pressed={active}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition ${
                  active
                    ? "border-[#02BFA7]/50 bg-[#02BFA7]/10 text-[#02BFA7]"
                    : "border-white/[0.09] bg-white/[0.025] text-slate-400 hover:border-white/20 hover:text-[#DAFBF5]"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <p className="text-xs text-slate-400" aria-live="polite">
            <span className="font-semibold text-[#DAFBF5]">
              {filteredTerms.length}
            </span>{" "}
            {filteredTerms.length === 1 ? "concept" : "concepts"} found
            {category !== "All" ? ` in ${category}` : ""}
          </p>

          <div className="flex items-center gap-3">
            <label
              htmlFor="glossary-sort"
              className="text-xs text-slate-500"
            >
              Sort
            </label>
            <select
              id="glossary-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="rounded-lg border border-white/10 bg-[#102A2B] px-3 py-2 text-xs text-slate-300 outline-none focus:border-[#02BFA7]/50"
            >
              <option value="alphabetical">A–Z</option>
              <option value="original">Original order</option>
            </select>

            {(query || category !== "All" || sortOrder !== "alphabetical") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#02BFA7] hover:text-[#DAFBF5]"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Glossary entries */}
        {filteredTerms.length > 0 ? (
          <div className="grid items-start gap-3 xl:grid-cols-2">
            {filteredTerms.map((item, index) => (
              <TermCard
                key={item.term}
                item={item}
                index={index}
                expanded={expandedTerm === item.term}
                onToggle={() =>
                  setExpandedTerm((current) =>
                    current === item.term ? null : item.term
                  )
                }
                onSearchRelated={selectRelatedTerm}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center">
            <Search className="mx-auto mb-4 text-slate-500" size={28} />
            <h3 className="text-lg font-semibold text-[#DAFBF5]">
              No matching concepts
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              Try a different keyword or remove the category filter.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 rounded-xl bg-[#02BFA7] px-4 py-2.5 text-sm font-semibold text-[#071719] transition hover:bg-[#42dfc7]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Learning path */}
      <section className="border-t border-white/[0.07] bg-[#0A2021]">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#02BFA7]/20 bg-[#02BFA7]/10 text-[#02BFA7]">
                <BrainCircuit size={22} />
              </div>
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#02BFA7]">
                Put knowledge into practice
              </p>
              <h2 className="max-w-lg text-3xl font-semibold leading-tight tracking-tight text-[#DAFBF5] sm:text-4xl">
                Understanding a term is the first step.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                The next step is learning when to use a model, what its
                assumptions are, and how to evaluate its results.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/models"
                className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/70 p-5 transition hover:border-[#02BFA7]/35"
              >
                <p className="mb-4 text-xs font-mono uppercase tracking-wider text-[#02BFA7]">
                  01 / Explore
                </p>
                <h3 className="text-lg font-semibold text-[#DAFBF5]">
                  Model catalogue
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Discover algorithms and the problems they solve.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#02BFA7]">
                  Browse models
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>

              <Link
                href="/how-to-use"
                className="group rounded-2xl border border-white/[0.09] bg-[#102A2B]/70 p-5 transition hover:border-orange-300/35"
              >
                <p className="mb-4 text-xs font-mono uppercase tracking-wider text-orange-300">
                  02 / Apply
                </p>
                <h3 className="text-lg font-semibold text-[#DAFBF5]">
                  How to use the atlas
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Learn a practical approach to choosing a model.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange-300">
                  Read the guide
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
