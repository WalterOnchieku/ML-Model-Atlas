
"use client";

// components/illustrations/NeuralNetworkIllustration.js
// Reusable animated SVG illustration of a neural network.

import { useId } from "react";
import { motion } from "motion/react";

const COLORS = {
  panel: "#102A2B",
  panelDark: "#0B2021",
  mint: "#02BFA7",
  coral: "#FF4D2E",
  muted: "#8AA8A5",
  border: "rgba(218,251,245,0.12)",
};

const networkLayers = [
  [
    { x: 48, y: 88 },
    { x: 48, y: 160 },
    { x: 48, y: 232 },
  ],
  [
    { x: 166, y: 58 },
    { x: 166, y: 112 },
    { x: 166, y: 166 },
    { x: 166, y: 220 },
    { x: 166, y: 274 },
  ],
  [
    { x: 284, y: 94 },
    { x: 284, y: 160 },
    { x: 284, y: 226 },
  ],
  [
    { x: 394, y: 128 },
    { x: 394, y: 192 },
  ],
];

// Connect every neuron in one layer to every neuron in the next.
const networkConnections = networkLayers.flatMap(
  (layer, layerIndex) => {
    const nextLayer = networkLayers[layerIndex + 1];

    if (!nextLayer) return [];

    return layer.flatMap((node, sourceIndex) =>
      nextLayer.map((target, targetIndex) => ({
        id: `${layerIndex}-${sourceIndex}-${targetIndex}`,
        x1: node.x,
        y1: node.y,
        x2: target.x,
        y2: target.y,
        index: layerIndex * 7 + sourceIndex * 3 + targetIndex,
      }))
    );
  }
);

export function NeuralNetworkIllustration({
  reducedMotion = false,
  showLabels = true,
  className = "",
}) {
  // Unique IDs allow multiple instances on the same page.
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");

  const titleId = `network-title-${safeId}`;
  const descriptionId = `network-description-${safeId}`;
  const glowId = `network-glow-${safeId}`;

  return (
    <div
      className={`overflow-hidden rounded-2xl border p-3 sm:p-5 ${className}`}
      style={{
        background: COLORS.panelDark,
        borderColor: COLORS.border,
      }}
    >
      <svg
        viewBox="0 0 440 320"
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
        className="h-auto w-full"
      >
        <title id={titleId}>Animated neural network</title>

        <desc id={descriptionId}>
          An input layer connects to hidden layers and then to two
          output neurons. Connections illuminate and neurons pulse.
        </desc>

        <defs>
          <radialGradient id={glowId}>
            <stop
              offset="0%"
              stopColor={COLORS.mint}
              stopOpacity="0.22"
            />
            <stop
              offset="100%"
              stopColor={COLORS.mint}
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        <circle
          cx="220"
          cy="160"
          r="142"
          fill={`url(#${glowId})`}
        />

        {/* Connections between adjacent layers */}
        {networkConnections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={connection.x1}
            y1={connection.y1}
            x2={connection.x2}
            y2={connection.y2}
            stroke={
              connection.index % 4 === 0
                ? COLORS.mint
                : COLORS.muted
            }
            strokeWidth={
              connection.index % 4 === 0 ? 1.5 : 0.8
            }
            initial={{
              pathLength: reducedMotion ? 1 : 0,
              opacity: reducedMotion ? 0.35 : 0,
            }}
            animate={{
              pathLength: 1,
              opacity: reducedMotion
                ? 0.35
                : [
                    0.12,
                    connection.index % 3 === 0 ? 0.9 : 0.35,
                    0.12,
                  ],
            }}
            transition={{
              pathLength: {
                duration: reducedMotion ? 0 : 0.9,
                delay: connection.index * 0.012,
              },
              opacity: reducedMotion
                ? { duration: 0 }
                : {
                    duration: 2.4,
                    repeat: Infinity,
                    delay: (connection.index % 12) * 0.14,
                    ease: "easeInOut",
                  },
            }}
          />
        ))}

        {/* Neurons */}
        {networkLayers.map((layer, layerIndex) =>
          layer.map((node, nodeIndex) => {
            const isOutput =
              layerIndex === networkLayers.length - 1;
            const isInput = layerIndex === 0;

            const fill = isOutput
              ? COLORS.coral
              : isInput
                ? COLORS.mint
                : COLORS.panel;

            const animationDelay =
              (layerIndex * 3 + nodeIndex) * 0.17;

            return (
              <g key={`${layerIndex}-${nodeIndex}`}>
                {/* Outer glow */}
                {!reducedMotion && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={isOutput ? 15 : 12}
                    fill={
                      isOutput ? COLORS.coral : COLORS.mint
                    }
                    initial={{
                      opacity: 0.04,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: [0.04, 0.17, 0.04],
                      scale: [0.8, 1.3, 0.8],
                    }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: animationDelay,
                    }}
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                    }}
                  />
                )}

                {/* Neuron body */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isOutput ? 7 : 5.5}
                  fill={fill}
                  stroke={isOutput ? COLORS.coral : COLORS.mint}
                  strokeWidth="1.8"
                  animate={
                    reducedMotion
                      ? { opacity: 1 }
                      : { opacity: [0.75, 1, 0.75] }
                  }
                  transition={{
                    duration: 2,
                    repeat: reducedMotion ? 0 : Infinity,
                    delay: animationDelay,
                  }}
                />
              </g>
            );
          })
        )}

        {/* Layer labels */}
        {showLabels &&
          [
            { x: 48, label: "INPUT", color: COLORS.mint },
            { x: 166, label: "HIDDEN", color: COLORS.muted },
            { x: 284, label: "HIDDEN", color: COLORS.muted },
            { x: 394, label: "OUTPUT", color: COLORS.coral },
          ].map((layer) => (
            <text
              key={`${layer.x}-${layer.label}`}
              x={layer.x}
              y="306"
              fill={layer.color}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              letterSpacing="1.5"
            >
              {layer.label}
            </text>
          ))}
      </svg>

      {showLabels && (
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2 pb-2 text-xs">
          {[
            ["Input signals", COLORS.mint],
            ["Hidden representations", COLORS.muted],
            ["Output signals", COLORS.coral],
          ].map(([label, color]) => (
            <span
              key={label}
              className="inline-flex items-center gap-2"
              style={{ color: COLORS.muted }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
              />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
