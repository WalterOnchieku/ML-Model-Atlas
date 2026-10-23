
"use client";

// components/illustrations/DecisionTreeIllustration.js
// Interactive decision-tree illustration with a highlighted prediction path.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { RotateCcw } from "lucide-react";

const COLORS = {
  bg: "#071719",
  panel: "#102A2B",
  panelDark: "#0B2021",
  mint: "#02BFA7",
  pale: "#DAFBF5",
  coral: "#FF4D2E",
  muted: "#8AA8A5",
  violet: "#B6A2FF",
  border: "rgba(218,251,245,0.16)",
};

const scenarios = [
  {
    label: "Short message",
    description: "The message contains a suspicious link.",
    answers: ["Yes", "No"],
    path: [0, 1],
    prediction: "Review message",
    detail: "The link triggers a second decision before the final outcome.",
  },
  {
    label: "Ordinary message",
    description: "The message contains no suspicious link.",
    answers: ["No"],
    path: [0, 2],
    prediction: "Likely legitimate",
    detail: "The example tree sends this path to the legitimate-message leaf.",
  },
];

const nodes = [
  { id: 0, x: 180, y: 30, type: "question", label: "Suspicious link?" },
  { id: 1, x: 92, y: 112, type: "question", label: "Urgent request?" },
  { id: 2, x: 270, y: 112, type: "leaf", label: "Likely legitimate" },
  { id: 3, x: 48, y: 198, type: "leaf", label: "Review message" },
  { id: 4, x: 136, y: 198, type: "leaf", label: "Check context" },
];

const edges = [
  { from: 0, to: 1, label: "Yes" },
  { from: 0, to: 2, label: "No" },
  { from: 1, to: 3, label: "Yes" },
  { from: 1, to: 4, label: "No" },
];

export function DecisionTreeIllustration({ className = "" }) {
  const reducedMotion = useReducedMotion();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0);

  const scenario = scenarios[scenarioIndex];
  const visiblePath = scenarioIndex === 0
    ? (step === 0 ? [0] : step === 1 ? [0, 1] : [0, 1, 3])
    : (step === 0 ? [0] : [0, 2]);

  const activeEdges = scenarioIndex === 0
    ? (step === 0 ? [] : step === 1 ? [0] : [0, 2])
    : (step === 0 ? [] : [1]);

  const finalStep = scenarioIndex === 0 ? 2 : 1;
  const finished = step >= finalStep;
  const prediction = scenarioIndex === 0
    ? (step >= 2 ? "Review message" : "Prediction pending")
    : (step >= 1 ? "Likely legitimate" : "Prediction pending");

  function changeScenario(value) {
    setScenarioIndex(Number(value));
    setStep(0);
  }

  function advance() {
    setStep((current) => Math.min(current + 1, finalStep));
  }

  function reset() {
    setStep(0);
  }

  return (
    <div
      className={`overflow-hidden rounded-2xl border p-4 sm:p-5 ${className}`}
      style={{
        background: COLORS.panelDark,
        borderColor: COLORS.border,
        color: COLORS.pale,
      }}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: COLORS.mint }}
          >
            Rule-based decisions
          </p>
          <h3 className="mt-2 text-lg font-semibold">Follow the decision path</h3>
        </div>
        <span
          className="rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: COLORS.border, color: COLORS.muted }}
        >
          Interactive tree
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {scenarios.map((item, index) => (
          <button
            key={item.label}
            type="button"
            onClick={() => changeScenario(index)}
            aria-pressed={scenarioIndex === index}
            className="rounded-full border px-3 py-2 text-xs font-medium transition-colors"
            style={{
              borderColor: scenarioIndex === index ? COLORS.mint : COLORS.border,
              background: scenarioIndex === index ? "rgba(2,191,167,0.12)" : "transparent",
              color: scenarioIndex === index ? COLORS.mint : COLORS.muted,
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="mt-3 text-sm leading-6" style={{ color: COLORS.muted }}>
        {scenario.description}
      </p>

      <svg
        viewBox="0 0 360 242"
        role="img"
        aria-label="Decision tree with a highlighted prediction path"
        className="mt-4 h-auto w-full"
      >
        {edges.map((edge, index) => {
          const from = nodes[edge.from];
          const to = nodes[edge.to];
          const active = activeEdges.includes(index);

          return (
            <g key={`${edge.from}-${edge.to}`}>
              <motion.line
                x1={from.x}
                y1={from.y + 15}
                x2={to.x}
                y2={to.y - 15}
                stroke={active ? COLORS.mint : COLORS.border}
                strokeWidth={active ? 2.5 : 1.2}
                initial={false}
                animate={{ opacity: active ? 1 : 0.7 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              />
              <text
                x={(from.x + to.x) / 2}
                y={(from.y + to.y) / 2}
                fill={active ? COLORS.mint : COLORS.muted}
                fontSize="9"
                textAnchor="middle"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        {nodes.map((node) => {
          const active = visiblePath.includes(node.id);
          const isLeaf = node.type === "leaf";
          const width = isLeaf ? 82 : 112;
          const height = isLeaf ? 32 : 36;

          return (
            <g key={node.id}>
              <motion.rect
                x={node.x - width / 2}
                y={node.y - height / 2}
                width={width}
                height={height}
                rx="9"
                fill={active ? "rgba(2,191,167,0.15)" : COLORS.panel}
                stroke={active ? COLORS.mint : COLORS.border}
                strokeWidth={active ? 1.8 : 1}
                initial={false}
                animate={{ opacity: active ? 1 : 0.68 }}
                transition={{ duration: reducedMotion ? 0 : 0.25 }}
              />
              <text
                x={node.x}
                y={node.y + (isLeaf ? 3 : 4)}
                textAnchor="middle"
                fill={active ? COLORS.pale : COLORS.muted}
                fontSize={isLeaf ? "8.5" : "10"}
                fontWeight={active ? "600" : "400"}
              >
                {node.label}
              </text>
            </g>
          );
        })}

        <text x="180" y="235" fill={COLORS.muted} fontSize="9" textAnchor="middle">
          ROOT → QUESTIONS → LEAF
        </text>
      </svg>

      <div
        className="mt-3 rounded-xl border p-4"
        style={{ background: COLORS.panel, borderColor: COLORS.border }}
      >
        <p className="text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.mint }}>
          {finished ? "Prediction reached" : `Step ${step + 1}`}
        </p>
        <p className="mt-2 text-lg font-semibold">{prediction}</p>
        <p className="mt-1 text-sm leading-6" style={{ color: COLORS.muted }}>
          {finished
            ? scenario.detail
            : "Advance to follow the next branch and see where this example leads."}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={advance}
          disabled={finished}
          className="rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
          style={{ background: COLORS.mint, color: COLORS.bg }}
        >
          {finished ? "Path complete" : "Next decision"}
        </button>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm"
          style={{ borderColor: COLORS.border, color: COLORS.muted }}
        >
          <RotateCcw size={14} /> Reset path
        </button>
      </div>

      <p className="mt-4 text-xs leading-5" style={{ color: COLORS.muted }}>
        Conceptual teaching tree with predefined branches. Real decision trees learn
        split rules from training data, and their structure depends on the dataset
        and training settings.
      </p>
    </div>
  );
}

export default DecisionTreeIllustration;
