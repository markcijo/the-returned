import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "The Returned — A Covenant Community";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0c0b09",
        }}
      >
        {/* The Mark — circle + vertical line */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="60"
            cy="60"
            r="56"
            stroke="#c9b97a"
            strokeWidth="2"
          />
          <line
            x1="60"
            y1="22"
            x2="60"
            y2="98"
            stroke="#c9b97a"
            strokeWidth="2"
          />
        </svg>

        {/* Title */}
        <div
          style={{
            marginTop: 40,
            fontSize: 48,
            fontFamily: "serif",
            fontWeight: 600,
            letterSpacing: "0.2em",
            color: "#e8e3d8",
            textTransform: "uppercase" as const,
          }}
        >
          THE RETURNED
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            fontFamily: "serif",
            fontStyle: "italic",
            fontWeight: 300,
            color: "#c9bfa8",
          }}
        >
          Return to Clarity, Discipline, and Purpose
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
