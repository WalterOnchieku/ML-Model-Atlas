
"use client";

// app/animation-lab/page.js
// Animation Lab: reusable SVG illustrations for the ML Model Atlas.

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Activity,
  ArrowRight,
  BrainCircuit,
  CirclePause,
  CirclePlay,
  GitBranch,
  RotateCcw,
  SkipForward,
  Sparkles,
} from "lucide-react";
import { NeuralNetworkIllustration } from "@/components/illustrations/NeuralNetworkIllustration";
import { LogisticRegressionIllustration } from "@/components/illustrations/LogisticRegressionIllustration";
import { DecisionTreeIllustration } from "@/components/illustrations/DecisionTreeIllustration";
const COLORS = {
  bg: "#071719",
  panel: "#102A2B",
  panelDark: "#0B2021",
  mint: "#02BFA7",
  pale: "#DAFBF5",
  coral: "#FF4D2E",
  muted: "#8AA8A5",
  violet: "#B6A2FF",
  border: "rgba(218,251,245,0.12)",
};

// const networkLayers = [
//   [
//     { x: 48, y: 88 },
//     { x: 48, y: 160 },
//     { x: 48, y: 232 },
//   ],
//   [
//     { x: 166, y: 58 },
//     { x: 166, y: 112 },
//     { x: 166, y: 166 },
//     { x: 166, y: 220 },
//     { x: 166, y: 274 },
//   ],
//   [
//     { x: 284, y: 94 },
//     { x: 284, y: 160 },
//     { x: 284, y: 226 },
//   ],
//   [
//     { x: 394, y: 128 },
//     { x: 394, y: 192 },
//   ],
// ];

// const networkConnections = networkLayers.flatMap((layer, layerIndex) => {
//   const nextLayer = networkLayers[layerIndex + 1];

//   if (!nextLayer) return [];

//   return layer.flatMap((node, sourceIndex) =>
//     nextLayer.map((target, targetIndex) => ({
//       id: `${layerIndex}-${sourceIndex}-${targetIndex}`,
//       x1: node.x,
//       y1: node.y,
//       x2: target.x,
//       y2: target.y,
//       index: layerIndex * 7 + sourceIndex * 3 + targetIndex,
//     }))
//   );
// });

const initialPoints = [
  { id: 1, x: 48, y: 54, group: 0 },
  { id: 2, x: 69, y: 70, group: 0 },
  { id: 3, x: 82, y: 44, group: 0 },
  { id: 4, x: 62, y: 95, group: 0 },
  { id: 5, x: 143, y: 48, group: 1 },
  { id: 6, x: 164, y: 69, group: 1 },
  { id: 7, x: 184, y: 45, group: 1 },
  { id: 8, x: 157, y: 99, group: 1 },
  { id: 9, x: 247, y: 62, group: 2 },
  { id: 10, x: 268, y: 43, group: 2 },
  { id: 11, x: 281, y: 75, group: 2 },
  { id: 12, x: 255, y: 101, group: 2 },
];

const centroidPositions = [
  [
    { x: 116, y: 43 },
    { x: 174, y: 100 },
    { x: 235, y: 54 },
  ],
  [
    { x: 65, y: 65 },
    { x: 164, y: 66 },
    { x: 263, y: 66 },
  ],
  [
    { x: 65, y: 65 },
    { x: 161, y: 65 },
    { x: 263, y: 65 },
  ],
];

const clusterColors = [COLORS.mint, COLORS.coral, COLORS.violet];

const kMeansStages = [
  {
    title: "Scatter the data",
    subtitle: "Start with unlabelled observations.",
    explanation:
      "Each dot represents a data point. We have not assigned the points to clusters yet.",
    detail: "Input: feature vectors",
  },
  {
    title: "Initialize centroids",
    subtitle: "Choose starting cluster centres.",
    explanation:
      "Centroids are initial estimates of the centre of each cluster. Their starting positions influence the result.",
    detail: "Action: initialize K centres",
  },
  {
    title: "Assign points",
    subtitle: "Find each point's nearest centroid.",
    explanation:
      "Every point is assigned to the nearest centroid, often using Euclidean distance for numeric features.",
    detail: "Action: assign cluster labels",
  },
  {
    title: "Update the centres",
    subtitle: "Move each centroid to its cluster mean.",
    explanation:
      "Each centroid moves to the mean position of its assigned points. Assignment and updating repeat until the centres stop changing significantly or a stopping limit is reached.",
    detail: "Action: update and repeat",
  },
];

function SectionLabel({ children }) {
  return (
    <p
      className="text-xs font-bold uppercase tracking-[0.2em]"
      style={{ color: COLORS.mint }}
    >
      {children}
    </p>
  );
}



function KMeansIllustration({ reducedMotion }) {
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || reducedMotion) return;

    const timer = setInterval(() => {
      setStage((current) => {
        if (current >= kMeansStages.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 2200);

    return () => clearInterval(timer);
  }, [playing, reducedMotion]);

  const currentStage = kMeansStages[stage];
  const showCentroids = stage >= 1;
  const showAssignments = stage >= 2;
  const currentCentroids = centroidPositions[Math.min(stage - 1, 2)];

  function nextStage() {
    setPlaying(false);
    setStage((current) => Math.min(current + 1, kMeansStages.length - 1));
  }

  function reset() {
    setPlaying(false);
    setStage(0);
  }

  function togglePlay() {
    if (stage === kMeansStages.length - 1) {
      setStage(0);
    }
    setPlaying((current) => !current);
  }

  return (
    <div
      className="rounded-2xl border p-3 sm:p-5"
      style={{
        background: COLORS.panelDark,
        borderColor: COLORS.border,
      }}
    >
      <svg
        viewBox="0 0 320 155"
        role="img"
        aria-labelledby="kmeans-title kmeans-description"
        className="h-auto w-full"
      >
        <title id="kmeans-title">Interactive K-means clustering</title>
        <desc id="kmeans-description">
          A scatter plot with twelve points. Progress through the steps to see
          initial centroids, cluster assignments, and updated cluster centres.
        </desc>

        {[25, 65, 105].map((y) => (
          <line
            key={`h-${y}`}
            x1="15"
            y1={y}
            x2="305"
            y2={y}
            stroke={COLORS.border}
            strokeDasharray="3 5"
          />
        ))}
        {[60, 120, 180, 240, 300].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1="12"
            x2={x}
            y2="130"
            stroke={COLORS.border}
            strokeDasharray="3 5"
          />
        ))}

        {initialPoints.map((point) => {
          const pointColor = showAssignments
            ? clusterColors[point.group]
            : COLORS.muted;

          return (
            <motion.circle
              key={point.id}
              r="4.5"
              animate={{
                cx: point.x,
                cy: point.y,
                fill: pointColor,
                opacity: showAssignments ? 1 : 0.7,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.65,
                ease: "easeInOut",
              }}
            />
          );
        })}

        {showCentroids &&
          currentCentroids.map((centroid, index) => (
            <g key={`centroid-${index}`}>
              <motion.circle
                r="13"
                fill={clusterColors[index]}
                fillOpacity="0.12"
                stroke={clusterColors[index]}
                strokeOpacity="0.35"
                animate={{
                  cx: centroid.x,
                  cy: centroid.y,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.65,
                  ease: "easeInOut",
                }}
              />
              <motion.path
                d="M -5 0 L 5 0 M 0 -5 L 0 5"
                stroke={clusterColors[index]}
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{
                  x: centroid.x,
                  y: centroid.y,
                }}
                transition={{
                  duration: reducedMotion ? 0 : 0.65,
                  ease: "easeInOut",
                }}
              />
            </g>
          ))}

        <text
          x="16"
          y="148"
          fill={COLORS.muted}
          fontSize="8"
          letterSpacing="1"
        >
          FEATURE SPACE
        </text>
      </svg>

      <div
        className="mt-2 rounded-xl border p-4"
        style={{
          borderColor: COLORS.border,
          background: COLORS.panel,
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: COLORS.mint }}
          >
            STEP {stage + 1} / {kMeansStages.length}
          </span>
          <span className="text-xs" style={{ color: COLORS.muted }}>
            K = 3
          </span>
        </div>

        <h3 className="mt-3 text-lg font-semibold">{currentStage.title}</h3>
        <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
          {currentStage.subtitle}
        </p>
        <p className="mt-3 text-sm leading-6">{currentStage.explanation}</p>

        <p className="mt-3 text-xs" style={{ color: COLORS.mint }}>
          {currentStage.detail}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={togglePlay}
          disabled={reducedMotion}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold disabled:opacity-40"
          style={{ background: COLORS.mint, color: COLORS.bg }}
        >
          {playing ? <CirclePause size={16} /> : <CirclePlay size={16} />}
          {playing ? "Pause" : "Play"}
        </button>

        <button
          type="button"
          onClick={nextStage}
          disabled={stage === kMeansStages.length - 1}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm disabled:opacity-40"
          style={{ borderColor: COLORS.border, color: COLORS.pale }}
        >
          Next step <SkipForward size={15} />
        </button>

        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm"
          style={{ borderColor: COLORS.border, color: COLORS.muted }}
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      {reducedMotion && (
        <p className="mt-3 text-xs leading-5" style={{ color: COLORS.muted }}>
          Reduced-motion preference detected. You can still step through the
          explanation manually.
        </p>
      )}
    </div>
  );
}

export default function AnimationLabPage() {
  const reducedMotion = useReducedMotion();

  return (
    <main
      className="min-h-screen"
      style={{ background: COLORS.bg, color: COLORS.pale }}
    >
      {/* HERO */}
      <section
        className="relative overflow-hidden border-b px-5 py-14 sm:px-8 sm:py-20 lg:px-12"
        style={{ borderColor: COLORS.border }}
      >
        <div
          className="pointer-events-none absolute -right-24 -top-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(2,191,167,0.09)" }}
        />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-7xl"
        >
          <div
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-wider"
            style={{
              borderColor: "rgba(2,191,167,0.28)",
              background: "rgba(2,191,167,0.06)",
              color: COLORS.mint,
            }}
          >
            <Sparkles size={14} />
            Illustration playground
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Machine learning,{" "}
            <span style={{ color: COLORS.mint }}>in motion.</span>
          </h1>

          <p
            className="mt-5 max-w-2xl text-base leading-8 sm:text-lg"
            style={{ color: COLORS.muted }}
          >
            Two experiments in making ML concepts visual: an animated neural
            network and a step-by-step clustering demonstration. Built with
            SVG and Motion for React.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-xs" style={{ color: COLORS.muted }}>
            <span className="inline-flex items-center gap-2">
              <Activity size={15} style={{ color: COLORS.mint }} />
              SVG animations
            </span>
            <span className="inline-flex items-center gap-2">
              <BrainCircuit size={15} style={{ color: COLORS.coral }} />
              Interactive learning
            </span>
            <span className="inline-flex items-center gap-2">
              <GitBranch size={15} style={{ color: COLORS.violet }} />
              No external assets
            </span>
          </div>
        </motion.div>
      </section>

      {/* ILLUSTRATIONS */}
      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <LogisticRegressionIllustration />

        <DecisionTreeIllustration />
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          {/* Illustration 1 */}
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45 }}
            className="min-w-0 rounded-3xl border p-4 sm:p-6"
            style={{
              borderColor: COLORS.border,
              background: "linear-gradient(145deg, #102A2B, #091D1F)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <SectionLabel>ILLUSTRATION 01</SectionLabel>
                <h2 className="mt-3 text-2xl font-semibold">
                  Neural network
                </h2>
                <p
                  className="mt-2 max-w-md text-sm leading-6"
                  style={{ color: COLORS.muted }}
                >
                  Signals travel through connected layers of neurons. Watch
                  connections illuminate and nodes pulse.
                </p>
              </div>
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(2,191,167,0.10)",
                  color: COLORS.mint,
                }}
              >
                <BrainCircuit size={22} />
              </div>
            </div>

            <div className="mt-6">
              <NeuralNetworkIllustration reducedMotion={reducedMotion} />
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                ["INPUT", "Receive data"],
                ["HIDDEN", "Transform signals"],
                ["OUTPUT", "Produce results"],
              ].map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-xl border p-3"
                  style={{
                    borderColor: COLORS.border,
                    background: "rgba(7,23,25,0.45)",
                  }}
                >
                  <p className="text-[10px] font-bold tracking-wider" style={{ color: COLORS.mint }}>
                    {title}
                  </p>
                  <p className="mt-2 text-xs leading-5" style={{ color: COLORS.muted }}>
                    {description}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5" style={{ color: COLORS.muted }}>
              Conceptual illustration. It visualizes network structure, not a
              live training run or actual model weights.
            </p>
          </motion.article>

          {/* Illustration 2 */}
          <motion.article
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="min-w-0 rounded-3xl border p-4 sm:p-6"
            style={{
              borderColor: COLORS.border,
              background: "linear-gradient(145deg, #102A2B, #091D1F)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <SectionLabel>ILLUSTRATION 02</SectionLabel>
                <h2 className="mt-3 text-2xl font-semibold">
                  K-means clustering
                </h2>
                <p
                  className="mt-2 max-w-md text-sm leading-6"
                  style={{ color: COLORS.muted }}
                >
                  Explore how a clustering algorithm initializes centres,
                  assigns points, and updates centroids.
                </p>
              </div>
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(255,77,46,0.10)",
                  color: COLORS.coral,
                }}
              >
                <Activity size={22} />
              </div>
            </div>

            <div className="mt-6">
              <KMeansIllustration reducedMotion={reducedMotion} />
            </div>

            <div
              className="mt-5 flex items-start gap-3 rounded-xl border p-4"
              style={{
                borderColor: "rgba(255,77,46,0.18)",
                background: "rgba(255,77,46,0.045)",
              }}
            >
              <Sparkles
                size={17}
                className="mt-0.5 shrink-0"
                style={{ color: COLORS.coral }}
              />
              <p className="text-xs leading-5" style={{ color: COLORS.muted }}>
                This is a simplified teaching demo with predefined point
                groups and centre positions, not a numerical implementation
                of the K-means algorithm.
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-5 pb-16 sm:px-8 lg:px-12">
        <div
          className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          style={{
            borderColor: COLORS.border,
            background: COLORS.panelDark,
          }}
        >
          <div>
            <p className="font-semibold">The direction we're testing</p>
            <p className="mt-2 text-sm leading-6" style={{ color: COLORS.muted }}>
              Custom diagrams, meaningful motion, and interactive explanations
              that fit the rest of the ML Model Atlas.
            </p>
          </div>
          <span
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium"
            style={{ color: COLORS.mint }}
          >
            Prototype complete <ArrowRight size={16} />
          </span>
        </div>
      </section>
    </main>
  );
}
