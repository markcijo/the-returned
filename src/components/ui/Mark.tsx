"use client";

import { motion } from "framer-motion";

interface MarkProps {
  size?: number;
  animated?: boolean;
  strokeColor?: string;
  strokeWidth?: number;
}

export default function Mark({
  size = 80,
  animated = false,
  strokeColor = "var(--light)",
  strokeWidth = 1.5,
}: MarkProps) {
  const center = size / 2;
  const radius = size / 2 - strokeWidth;
  const lineTop = size * 0.18;
  const lineBottom = size * 0.82;

  if (!animated) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
        <line
          x1={center}
          y1={lineTop}
          x2={center}
          y2={lineBottom}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx={center}
        cy={center}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.line
        x1={center}
        y1={lineTop}
        x2={center}
        y2={lineBottom}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        pathLength={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut", delay: 0.8 }}
      />
    </svg>
  );
}
