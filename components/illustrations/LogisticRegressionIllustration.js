
"use client";

// components/illustrations/LogisticRegressionIllustration.js
// Visualizes logistic regression as a probability curve and binary classifier.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const COLORS = {
  bg: "#071719",
  panel: "#102A2B",
  panelDark: "#0B2021",
  mint: "#02BFA7",
  pale: "#DAFBF5",
  coral: "#FF4D2E",
  muted: "#8AA8A5",
  border: "rgba(218,251,245,0.16)",
};

const sigmoid = (x) => 1 / (1 + Math.exp(-x));

export function LogisticRegressionIllustration({
  className = "",
  initialX = 0,
}) {
  const reducedMotion = useReducedMotion();
  const [x, setX] = useState(initialX);

  // Map the selected feature value to a probability.
  const probability = sigmoid(x);
  const prediction = probability >= 0.5 ? 1 : 0;

  // Convert mathematical coordinates into the SVG drawing area.
  const plot = { left: 30, right: 350, top: 22, bottom: 190 };
  const mapX = (value) => plot.left + ((value + 5) / 10) * (plot.right - plot.left);
  const mapY = (value) => plot.bottom - value * (plot.bottom - plot.top);

  // Generate the sigmoid curve from sampled mathematical values.
  const curve = Array.from({ length: 101 }, (_, index) => {
    const value = -5 + index * 0.1;
    return `${index === 0 ? "M" : "L"} ${mapX(value)} ${mapY(sigmoid(value))}`;
  }).join(" ");

  const samplePoints = [
    { x: -4.2, label: 0 },
    { x: -3.4, label: 0 },
    { x: -2.8, label: 0 },
    { x: -2.1, label: 0 },
    { x: -1.4, label: 0 },
    { x: -0.8, label: 0 },
    { x: 0.8, label: 1 },
    { x: 1.4, label: 1 },
    { x: 2.1, label: 1 },
    { x: 2.8, label: 1 },
    { x: 3.5, label: 1 },
    { x: 4.2, label: 1 },
  ];

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
            Binary classification
          </p>
          <h3 className="mt-2 text-lg font-semibold">From features to probability</h3>
        </div>
        <span
          className="rounded-full border px-3 py-1 text-xs"
          style={{ borderColor: COLORS.border, color: COLORS.muted }}
        >
          Sigmoid function
        </span>
      </div>

      <svg
        viewBox="0 0 380 220"
        role="img"
        aria-label="Sigmoid probability curve with a decision threshold at 0.5"
        className="mt-4 h-auto w-full"
      >
        {[0, 0.25, 0.5, 0.75, 1].map((tick) => (
          <g key={tick}>
            <line
              x1={plot.left}
              x2={plot.right}
              y1={mapY(tick)}
              y2={mapY(tick)}
              stroke={COLORS.border}
              strokeDasharray={tick === 0.5 ? "4 4" : "2 5"}
            />
            <text
              x="23"
              y={mapY(tick) + 3}
              fill={COLORS.muted}
              fontSize="9"
              textAnchor="end"
            >
              {tick.toFixed(tick === 0 || tick === 1 ? 0 : 2)}
            </text>
          </g>
        ))}

        <line
          x1={mapX(0)}
          x2={mapX(0)}
          y1={plot.top}
          y2={plot.bottom}
          stroke={COLORS.muted}
          strokeDasharray="3 5"
          opacity="0.6"
        />

        {samplePoints.map((point, index) => (
          <motion.circle
            key={index}
            cx={mapX(point.x)}
            cy={mapY(sigmoid(point.x))}
            r="4"
            fill={point.label === 1 ? COLORS.coral : COLORS.mint}
            initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.9, scale: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.35,
              delay: reducedMotion ? 0 : index * 0.035,
            }}
          />
        ))}

        <motion.path
          d={curve}
          fill="none"
          stroke={COLORS.mint}
          strokeWidth="3"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reducedMotion ? 0 : 1.1 }}
        />

        <text
          x={plot.right}
          y="210"
          textAnchor="end"
          fill={COLORS.muted}
          fontSize="10"
        >
          Feature value →
        </text>

        <text
          x={plot.left + 5}
          y={mapY(0.5) - 7}
          fill={COLORS.coral}
          fontSize="9"
        >
          0.5 threshold
        </text>

        <motion.line
          x1={mapX(x)}
          x2={mapX(x)}
          y1={mapY(probability)}
          y2={plot.bottom}
          stroke={COLORS.coral}
          strokeDasharray="4 4"
          animate={{
            x1: mapX(x),
            x2: mapX(x),
            y1: mapY(probability),
          }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        />

        <motion.circle
          cx={mapX(x)}
          cy={mapY(probability)}
          r="7"
          fill={COLORS.coral}
          stroke={COLORS.pale}
          strokeWidth="2"
          animate={{
            cx: mapX(x),
            cy: mapY(probability),
          }}
          transition={{ duration: reducedMotion ? 0 : 0.2 }}
        />
      </svg>

      <div
        className="mt-2 rounded-xl border p-4"
        style={{ background: COLORS.panel, borderColor: COLORS.border }}
      >
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="logistic-feature" className="text-sm font-medium">
            Adjust the feature value
          </label>
          <span className="text-sm tabular-nums" style={{ color: COLORS.mint }}>
            {x.toFixed(1)}
          </span>
        </div>

        <input
          id="logistic-feature"
          type="range"
          min="-5"
          max="5"
          step="0.1"
          value={x}
          onChange={(event) => setX(Number(event.target.value))}
          className="mt-3 w-full accent-teal-400"
          aria-label="Feature value"
        />

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg p-3" style={{ background: COLORS.panelDark }}>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              Predicted probability
            </p>
            <p className="mt-1 text-2xl font-semibold tabular-nums">
              {(probability * 100).toFixed(1)}%
            </p>
          </div>

          <div className="rounded-lg p-3" style={{ background: COLORS.panelDark }}>
            <p className="text-xs" style={{ color: COLORS.muted }}>
              Predicted class
            </p>
            <p
              className="mt-1 text-2xl font-semibold"
              style={{ color: prediction === 1 ? COLORS.coral : COLORS.mint }}
            >
              Class {prediction}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5" style={{ color: COLORS.muted }}>
        Teaching demo: the slider controls a single input to a sigmoid function.
        Real logistic regression first computes a weighted combination of features
        and then converts it into a probability.
      </p>
    </div>
  );
}

export default LogisticRegressionIllustration;
