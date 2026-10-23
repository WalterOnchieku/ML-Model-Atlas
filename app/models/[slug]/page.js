
// app/models/[slug]/page.js
// Dynamic model detail page for ML Model Atlas.
// Loads a model by slug and presents its concepts, use cases,
// limitations, evaluation guidance, historical examples, and related models.

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  Check,
  ChevronRight,
  CircleAlert,
  Clock3,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  FlaskConical,
  GitCompareArrows,
  Layers3,
  Lightbulb,
  Network,
  Scale,
  ShieldAlert,
  Sparkles,
  Target,
  Workflow,
  Zap,
} from "lucide-react";

import models, { getModelBySlug } from "@/data/models";

export const instant = false;

const ACCENTS = [
  {
    bg: "bg-[#DAFBF5]",
    text: "text-[#102A2B]",
    muted: "text-[#315957]",
    border: "border-[#DAFBF5]/70",
    label: "MINT",
  },
  {
    bg: "bg-[#02BFA7]",
    text: "text-[#071719]",
    muted: "text-[#103F3A]",
    border: "border-[#02BFA7]/70",
    label: "TEAL",
  },
  {
    bg: "bg-[#FF4D2E]",
    text: "text-white",
    muted: "text-white/80",
    border: "border-[#FF4D2E]/70",
    label: "CORAL",
  },
];

export function generateStaticParams() {
  return models.map((model) => ({
    slug: model.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const model = getModelBySlug(slug);

  if (!model) {
    return { title: "Model not found | ML Model Atlas" };
  }

  return {
    title: `${model.name} | ML Model Atlas`,
    description:
      model.summary ||
      `Learn how ${model.name} works, when to use it, its strengths, and its limitations.`,
  };
}

function formatLabel(value) {
  return String(value ?? "")
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function asText(value) {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(asText).join(", ");
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, item]) => `${formatLabel(key)}: ${asText(item)}`)
      .join("\n");
  }

  return "";
}


/*
 * components inside app/models/[slug]/page.js
 * Renders strings, arrays, and objects with contrast-aware text colours.
 * Pass dark={true} when the component sits on a dark background.
 */

function ContentValue({ value, dark = false }) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const bodyText = dark ? "text-[#D4E7E3]" : "text-[#244744]";
  const labelText = dark ? "text-[#02BFA7]" : "text-[#244744]";
  const checkText = dark ? "text-[#02BFA7]" : "text-[#087F72]";

  if (Array.isArray(value)) {
    return (
      <ul className="space-y-3">
        {value.map((item, index) => (
          <li
            key={`${asText(item)}-${index}`}
            className="flex items-start gap-3"
          >
            <Check
              size={16}
              className={`mt-1 shrink-0 ${checkText}`}
            />
            <span className={`text-sm leading-6 ${bodyText}`}>
              {asText(item)}
            </span>
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    return (
      <dl className="space-y-4">
        {Object.entries(value).map(([key, item]) => (
          <div
            key={key}
            className="border-b border-current/10 pb-3 last:border-0 last:pb-0"
          >
            <dt
              className={`text-xs font-bold uppercase tracking-wider ${labelText}`}
            >
              {formatLabel(key)}
            </dt>
            <dd
              className={`mt-1 whitespace-pre-line text-sm leading-6 ${bodyText}`}
            >
              {asText(item)}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <p className={`whitespace-pre-line text-sm leading-7 ${bodyText}`}>
      {String(value)}
    </p>
  );
}


function SectionHeading({ eyebrow, title, description, number }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      {number && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#DAFBF5] text-sm font-bold text-[#102A2B]">
          {number}
        </div>
      )}

      <div>
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#02BFA7]">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#DAFBF5] sm:text-2xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A8C4C0]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function LightPanel({
  title,
  icon: Icon,
  children,
  accent = "mint",
}) {
  const styles = {
    mint: "bg-[#DAFBF5] text-[#102A2B]",
    teal: "bg-[#02BFA7] text-[#071719]",
    coral: "bg-[#FF4D2E] text-white",
  };

  return (
    <section className={`rounded-2xl p-5 sm:p-6 ${styles[accent]}`}>
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon size={19} />}
        <h3 className="font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function DarkPanel({ title, icon: Icon, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/65 p-5 sm:p-6 ${className}`}
    >
      <div className="mb-4 flex items-center gap-3">
        {Icon && <Icon size={18} className="text-[#02BFA7]" />}
        <h3 className="font-semibold text-[#DAFBF5]">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function DataList({ items, positive = true }) {
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <p className="text-sm leading-6 text-[#A8C4C0]">
        No specific items documented yet.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={`${asText(item)}-${index}`} className="flex gap-3">
          {positive ? (
            <Check
              size={16}
              className="mt-1 shrink-0 text-[#02BFA7]"
            />
          ) : (
            <CircleAlert
              size={16}
              className="mt-1 shrink-0 text-[#FF4D2E]"
            />
          )}
          <span className="text-sm leading-6 text-[#B8D2CE]">
            {asText(item)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function QuickFact({ icon: Icon, label, value }) {
  if (!value) return null;

  return (
    <div className="flex gap-3 border-b border-[#102A2B]/10 py-3 last:border-0">
      <Icon size={16} className="mt-0.5 shrink-0 text-[#087F72]" />
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#315957]">
          {label}
        </p>
        <div className="mt-1 text-sm leading-6 text-[#102A2B]">
          <ContentValue value={value} />
        </div>
      </div>
    </div>
  );
}

function HistoricalExample({ example }) {
  if (!example) return null;

  const title =
    typeof example === "object"
      ? example.title || example.name || "Historical example"
      : "Historical example";

  return (
    <section className="overflow-hidden rounded-2xl border border-[#02BFA7]/25 bg-[#102A2B]/70">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DAFBF5]/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-[#02BFA7]/12 text-[#02BFA7]">
            <Clock3 size={18} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-[#02BFA7]">
              From the real world
            </p>
            <h3 className="mt-1 font-semibold text-[#DAFBF5]">
              {title}
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-[#DAFBF5]/15 px-3 py-1 text-[10px] text-[#A8C4C0]">
          Historical context
        </span>
      </div>

      <div className="p-5 sm:p-6">
        <ContentValue value={example} dark />
      </div>
    </section>
  );
}

function ModelIllustration({ model }) {
  const name = model.illustration || model.shortName || model.name;
  const points = [
    { x: 32, y: 90 },
    { x: 70, y: 52 },
    { x: 110, y: 76 },
    { x: 150, y: 35 },
    { x: 190, y: 59 },
    { x: 230, y: 25 },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#DAFBF5]/15 bg-[#0B2021] p-5 sm:p-6">
      <div className="absolute -right-10 -top-10 size-40 rounded-full border border-[#02BFA7]/15" />
      <div className="absolute -right-2 -top-2 size-24 rounded-full border border-[#02BFA7]/15" />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#02BFA7]">
            Concept sketch
          </p>
          <p className="mt-1 text-sm font-medium text-[#DAFBF5]">
            {name}
          </p>
        </div>
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#DAFBF5] text-[#102A2B]">
          <Network size={19} />
        </div>
      </div>

      <svg
        viewBox="0 0 260 125"
        role="img"
        aria-label={`Abstract illustration for ${model.name}`}
        className="relative mt-5 w-full"
      >
        <defs>
          <linearGradient id="atlas-line" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#DAFBF5" />
            <stop offset="100%" stopColor="#02BFA7" />
          </linearGradient>
        </defs>

        {points.slice(0, -1).map((point, index) => (
          <line
            key={`line-${index}`}
            x1={point.x}
            y1={point.y}
            x2={points[index + 1].x}
            y2={points[index + 1].y}
            stroke="url(#atlas-line)"
            strokeWidth="1.5"
            strokeDasharray={index % 2 === 0 ? "0" : "4 4"}
            opacity="0.75"
          />
        ))}

        {points.map((point, index) => (
          <g key={`point-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r={index === 3 ? 14 : 10}
              fill={index === 3 ? "#DAFBF5" : "#102A2B"}
              stroke={index === 3 ? "#DAFBF5" : "#02BFA7"}
              strokeWidth="2"
            />
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              fill={index === 3 ? "#02BFA7" : "#DAFBF5"}
            />
          </g>
        ))}

        <path
          d="M 25 112 L 235 112"
          stroke="#DAFBF5"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      </svg>

      <p className="relative mt-2 text-xs leading-5 text-[#A8C4C0]">
        A visual cue for exploring the model. The diagram is illustrative,
        not a representation of the model's exact internal architecture.
      </p>
    </div>
  );
}

function RelatedModels({ model }) {
  const related = (model.relatedModels || [])
    .map((item) => {
      if (typeof item === "string") {
        return (
          models.find(
            (candidate) =>
              candidate.slug === item || candidate.id === item
          ) || null
        );
      }

      if (item && typeof item === "object") {
        return (
          models.find(
            (candidate) =>
              candidate.slug === item.slug ||
              candidate.id === item.id
          ) || item
        );
      }

      return null;
    })
    .filter(Boolean)
    .filter((item) => item.slug !== model.slug)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-14">
      <SectionHeading
        eyebrow="Continue exploring"
        title="Related models"
        description="Compare neighbouring approaches to understand which one fits your problem."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {related.map((item) => (
          <Link
            key={item.slug || item.id || item.name}
            href={`/models/${item.slug}`}
            className="group rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/60 p-5 transition hover:border-[#02BFA7]/40 hover:bg-[#102A2B]"
          >
            <div className="flex items-center justify-between gap-3">
              <BrainCircuit size={19} className="text-[#02BFA7]" />
              <ArrowRight
                size={15}
                className="text-[#72918D] transition group-hover:translate-x-1 group-hover:text-[#DAFBF5]"
              />
            </div>
            <h3 className="mt-4 font-semibold text-[#DAFBF5]">
              {item.name || formatLabel(item.slug)}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#A8C4C0]">
              {item.summary || item.description || "Explore this related approach."}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function ModelDetailPage({ params }) {
  const { slug } = await params;
  const model = getModelBySlug(slug);

  if (!model) {
    notFound();
  }

  const categories = model.categories || [];
  const problemTypes = model.problemTypes || [];

  const evaluation = model.evaluation;
  const dataRequirements = model.dataRequirements;
  const compute = model.compute;
  const interpretability = model.interpretability;

  const example = model.historicalExample;
  const projectExample = model.projectExample;
  const resources = Array.isArray(model.resources) ? model.resources : [];

  const codeExample = model.codeExample;
  const code =
    typeof codeExample === "string"
      ? codeExample
      : codeExample?.code || codeExample?.example || "";

  const codeLanguage =
    typeof codeExample === "object" && codeExample?.language
      ? codeExample.language
      : "python";

  return (
    <main className="min-h-screen bg-[#071719] text-[#DAFBF5]">
      <div className="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-10 lg:py-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex flex-wrap items-center gap-2 text-xs text-[#A8C4C0]"
        >
          <Link href="/" className="transition hover:text-[#02BFA7]">
            Home
          </Link>
          <ChevronRight size={13} />
          <Link
            href="/models"
            className="transition hover:text-[#02BFA7]"
          >
            Model library
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#DAFBF5]">{model.name}</span>
        </nav>

        {/* Editorial hero */}
        <section className="relative overflow-hidden rounded-3xl border border-[#DAFBF5]/15 bg-[#102A2B]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#DAFBF5]/[0.08] via-transparent to-[#02BFA7]/[0.10]" />
          <div className="absolute -right-16 -top-20 size-72 rounded-full border border-[#DAFBF5]/10 sm:size-96" />
          <div className="absolute -right-4 -top-8 size-48 rounded-full border border-[#02BFA7]/20 sm:size-64" />

          <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12 lg:p-12">
            <div>
              <Link
                href="/models"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#DAFBF5]/80 transition hover:text-[#02BFA7]"
              >
                <ArrowLeft size={14} />
                Back to model library
              </Link>

              <div className="mt-7 flex flex-wrap gap-2">
                {categories.slice(0, 4).map((category, index) => (
                  <span
                    key={category}
                    className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      index === 0
                        ? "bg-[#DAFBF5] text-[#102A2B]"
                        : index === 1
                          ? "bg-[#02BFA7] text-[#071719]"
                          : "border border-[#DAFBF5]/20 text-[#DAFBF5]"
                    }`}
                  >
                    {formatLabel(category)}
                  </span>
                ))}
              </div>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#02BFA7]">
                The model field guide
              </p>

              <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-[#DAFBF5] sm:text-4xl lg:text-5xl">
                {model.name}
              </h1>

              {model.shortName && model.shortName !== model.name && (
                <p className="mt-3 text-lg font-medium text-[#02BFA7]">
                  Also known as {model.shortName}
                </p>
              )}

              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#C0DCD7] sm:text-base">
                {model.summary || model.description}
              </p>

              {model.description &&
                model.summary &&
                model.description !== model.summary && (
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A8C4C0]">
                    {model.description}
                  </p>
                )}

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#DAFBF5] px-5 py-3 text-sm font-semibold text-[#102A2B] transition hover:bg-white"
                >
                  <GitCompareArrows size={16} />
                  Compare models
                </Link>

                <Link
                  href="/how-to-use"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#DAFBF5]/25 px-5 py-3 text-sm font-medium text-[#DAFBF5] transition hover:border-[#02BFA7]/60"
                >
                  <BookOpen size={16} />
                  Learning guide
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4">
              <ModelIllustration model={model} />

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#DAFBF5]/10 bg-[#071719]/45 p-4">
                  <BrainCircuit size={18} className="text-[#02BFA7]" />
                  <p className="mt-3 text-[10px] uppercase tracking-wider text-[#A8C4C0]">
                    Model family
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#DAFBF5]">
                    {model.family || "Not specified"}
                  </p>
                </div>

                <div className="rounded-xl border border-[#DAFBF5]/10 bg-[#071719]/45 p-4">
                  <Target size={18} className="text-[#FF8068]" />
                  <p className="mt-3 text-[10px] uppercase tracking-wider text-[#A8C4C0]">
                    Problem types
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#DAFBF5]">
                    {problemTypes.length || "—"} covered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main content and quick-reference sidebar */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:gap-10">
          <div className="min-w-0 space-y-12">
            {/* How it works */}
            <section>
              <SectionHeading
                number="01"
                eyebrow="The intuition"
                title="How it works"
                description="Start with the underlying idea before worrying about implementation details."
              />

              <div className="rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/65 p-6 sm:p-8">
                <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-[#DAFBF5] text-[#102A2B]">
                  <Lightbulb size={23} />
                </div>

                <div className="text-sm leading-7 text-[#C0DCD7]">
                  <ContentValue value={model.howItWorks} dark />
                </div>
              </div>
            </section>

            {/* When to use it */}
            <section>
              <SectionHeading
                number="02"
                eyebrow="Decision guide"
                title="Is this the right model?"
                description="A good model choice depends on the task, available data, constraints, and the cost of being wrong."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <LightPanel
                  title="Reach for this model when…"
                  icon={Check}
                  accent="mint"
                >
                  <ContentValue value={model.whenToUse} />
                </LightPanel>

                <LightPanel
                  title="Consider another approach when…"
                  icon={ShieldAlert}
                  accent="coral"
                >
                  <ContentValue value={model.whenToAvoid} />
                </LightPanel>
              </div>
            </section>

            {/* Strengths and limitations */}
            <section>
              <SectionHeading
                number="03"
                eyebrow="Trade-offs"
                title="Strengths versus limitations"
                description="No model is best at everything. Understand the trade-offs before committing to a solution."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <DarkPanel title="What it does well" icon={Zap}>
                  <DataList items={model.strengths} />
                </DarkPanel>

                <DarkPanel
                  title="Where it can struggle"
                  icon={CircleAlert}
                >
                  <DataList
                    items={model.limitations}
                    positive={false}
                  />
                </DarkPanel>
              </div>
            </section>

            {/* Assumptions */}
            <section>
              <SectionHeading
                number="04"
                eyebrow="Before training"
                title="Assumptions and data requirements"
                description="Check whether the data and problem fit the method. A sophisticated algorithm cannot rescue a poorly framed task."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <LightPanel
                  title="Model assumptions"
                  icon={FlaskConical}
                  accent="teal"
                >
                  <ContentValue value={model.assumptions} />
                </LightPanel>

                <LightPanel
                  title="Data requirements"
                  icon={Database}
                  accent="mint"
                >
                  <ContentValue value={dataRequirements} />
                </LightPanel>
              </div>
            </section>

            {/* Evaluation */}
            <section>
              <SectionHeading
                number="05"
                eyebrow="Measure what matters"
                title="Evaluation and validation"
                description="Choose metrics that reflect the real cost of mistakes, not just the numbers that look impressive."
              />

              <div className="rounded-2xl border border-[#DAFBF5]/10 bg-[#102A2B]/65 p-6 sm:p-8">
                <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#FF4D2E]/12 text-[#FF8068]">
                  <Scale size={21} />
                </div>
                <div className="text-[#D4E7E3]">
                <ContentValue value={evaluation} dark />
                </div>
              </div>
            </section>

            {/* Interpretability and compute */}
            <section>
              <SectionHeading
                number="06"
                eyebrow="Practical considerations"
                title="Interpretability and compute"
                description="Consider whether you need to explain predictions, how quickly results must arrive, and what hardware is available."
              />

              <div className="grid gap-4 md:grid-cols-2">
                <DarkPanel title="Interpretability" icon={Lightbulb}>
                  <ContentValue value={interpretability} dark />
                </DarkPanel>

                <DarkPanel title="Computational cost" icon={Cpu}>
                  <ContentValue value={compute}dark />
                </DarkPanel>
              </div>
            </section>

            {/* Historical example */}
            {example && (
              <section>
                <SectionHeading
                  number="07"
                  eyebrow="In context"
                  title="A real-world historical example"
                  description="Connect the method to its use or development in the real world."
                />
                <HistoricalExample example={example} />
              </section>
            )}

            {/* Project example */}
            {projectExample && (
              <section>
                <SectionHeading
                  number={example ? "08" : "07"}
                  eyebrow="From theory to practice"
                  title="Applied project example"
                  description="See how the model can fit into an actual engineering or machine learning workflow."
                />

                <div className="overflow-hidden rounded-2xl border border-[#DAFBF5]/15">
                  <div className="bg-[#DAFBF5] p-5 text-[#102A2B] sm:p-7">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-xl bg-[#102A2B] text-[#DAFBF5]">
                        <Code2 size={19} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#315957]">
                          Project spotlight
                        </p>
                        <h3 className="mt-1 text-lg font-semibold">
                          {projectExample.title || "Example implementation"}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#102A2B]/75 p-5 sm:p-7">
                    <ContentValue value={projectExample} />
                  </div>
                </div>
              </section>
            )}

            {/* Code example */}
            {code && (
              <section>
                <SectionHeading
                  eyebrow="Implementation"
                  title="Code example"
                  description="Use this as a starting point. Adapt preprocessing, validation, and metrics to your dataset and task."
                />

                <div className="overflow-hidden rounded-2xl border border-[#DAFBF5]/15 bg-[#061112]">
                  <div className="flex items-center justify-between border-b border-[#DAFBF5]/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Code2 size={16} className="text-[#02BFA7]" />
                      <span className="text-xs font-medium text-[#DAFBF5]">
                        Example implementation
                      </span>
                    </div>
                    <span className="rounded-md bg-[#DAFBF5]/8 px-2 py-1 text-[10px] uppercase tracking-wider text-[#A8C4C0]">
                      {codeLanguage}
                    </span>
                  </div>

                  <pre className="overflow-x-auto p-5 text-xs leading-6 text-[#DAFBF5] sm:p-6 sm:text-sm">
                    <code>{code}</code>
                  </pre>
                </div>
              </section>
            )}

            {/* Resources */}
            {resources.length > 0 && (
              <section>
                <SectionHeading
                  eyebrow="Go deeper"
                  title="Further reading"
                  description="Continue with documentation, research papers, and implementation guides."
                />

                <div className="space-y-3">
                  {resources.map((resource, index) => {
                    const url =
                      typeof resource === "string"
                        ? resource
                        : resource.url || resource.href;

                    const title =
                      typeof resource === "string"
                        ? resource
                        : resource.title || resource.name || url;

                    return (
                      <div
                        key={`${url || title}-${index}`}
                        className="flex items-center justify-between gap-4 rounded-xl border border-[#DAFBF5]/10 bg-[#102A2B]/60 p-4"
                      >
                        <div className="flex min-w-0 items-start gap-3">
                          <BookOpen
                            size={17}
                            className="mt-0.5 shrink-0 text-[#02BFA7]"
                          />
                          <div className="min-w-0">
                            {url ? (
                              <a
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm font-medium text-[#DAFBF5] hover:text-[#02BFA7]"
                              >
                                {title}
                              </a>
                            ) : (
                              <p className="text-sm font-medium text-[#DAFBF5]">
                                {title}
                              </p>
                            )}

                            {resource.description && (
                              <p className="mt-1 text-xs leading-5 text-[#A8C4C0]">
                                {resource.description}
                              </p>
                            )}
                          </div>
                        </div>
                        {url && (
                          <ExternalLink
                            size={15}
                            className="shrink-0 text-[#02BFA7]"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Quick reference sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-[#DAFBF5]/20 bg-[#DAFBF5] text-[#102A2B]">
              <div className="bg-[#02BFA7] p-5 text-[#071719]">
                <div className="flex items-center gap-2">
                  <Sparkles size={17} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
                    Quick reference
                  </p>
                </div>
                <h2 className="mt-3 text-xl font-semibold">
                  At a glance
                </h2>
                <p className="mt-2 text-sm leading-6 text-[#103F3A]">
                  Keep these details in mind when deciding whether to try this model.
                </p>
              </div>

              <div className="p-5">
                <QuickFact
                  icon={Layers3}
                  label="Family"
                  value={model.family}
                />
                <QuickFact
                  icon={Target}
                  label="Problem types"
                  value={problemTypes.map(formatLabel).join(", ")}
                />
                <QuickFact
                  icon={Database}
                  label="Data needs"
                  value={dataRequirements}
                />
                <QuickFact
                  icon={Cpu}
                  label="Compute"
                  value={compute}
                />
                <QuickFact
                  icon={Lightbulb}
                  label="Interpretability"
                  value={interpretability}
                />
              </div>
            </div>

            <DarkPanel title="Explore the workflow" icon={Workflow}>
              <p className="text-sm leading-6 text-[#A8C4C0]">
                Define the task, establish a baseline, validate your results,
                and compare alternatives before deployment.
              </p>

              <Link
                href="/how-to-use"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#02BFA7] hover:text-[#DAFBF5]"
              >
                Read the guide
                <ArrowRight size={15} />
              </Link>
            </DarkPanel>

            <DarkPanel title="Compare approaches" icon={GitCompareArrows}>
              <p className="text-sm leading-6 text-[#A8C4C0]">
                A model should be judged against credible alternatives on the
                same validation strategy.
              </p>

              <Link
                href="/compare"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#02BFA7] hover:text-[#DAFBF5]"
              >
                Open comparison lab
                <ArrowRight size={15} />
              </Link>
            </DarkPanel>
          </aside>
        </div>

        <RelatedModels model={model} />

        {/* Closing navigation */}
        <section className="mt-14 overflow-hidden rounded-3xl bg-[#FF4D2E] p-6 text-white sm:p-9">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/75">
                Keep experimenting
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Understanding comes from comparison.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/85">
                Test your assumptions, compare alternative approaches, and
                evaluate models on data that reflects the problem you need
                to solve.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/compare"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#102A2B] transition hover:bg-[#DAFBF5]"
              >
                Compare models
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/models"
                className="inline-flex items-center gap-2 rounded-xl border border-white/35 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                All models
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
