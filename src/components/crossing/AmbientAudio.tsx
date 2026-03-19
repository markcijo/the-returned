"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Generates subtle ambient texture using Web Audio API.
 * Filtered white noise (like distant wind) + a low sine drone.
 * No external files needed.
 */
export default function AmbientAudio() {
  const ctxRef = useRef<AudioContext | null>(null);
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  function startAudio() {
    if (ctxRef.current) return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain — very quiet
    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    // Fade in over 4 seconds
    master.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 4);

    // Layer 1: Filtered noise (wind texture)
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;

    // Bandpass filter — makes it sound like wind
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = "bandpass";
    windFilter.frequency.value = 300;
    windFilter.Q.value = 0.5;

    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.6;

    noise.connect(windFilter);
    windFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();

    // Layer 2: Very low sine drone (barely audible foundation)
    const drone = ctx.createOscillator();
    drone.type = "sine";
    drone.frequency.value = 60;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.15;

    drone.connect(droneGain);
    droneGain.connect(master);
    drone.start();

    // Layer 3: Occasional high harmonic (like distant water trickle)
    const shimmer = ctx.createOscillator();
    shimmer.type = "sine";
    shimmer.frequency.value = 1200;

    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.02;

    // Slow LFO modulating shimmer volume
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.08; // Very slow
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    lfo.connect(lfoGain);
    lfoGain.connect(shimmerGain.gain);
    lfo.start();

    shimmer.connect(shimmerGain);
    shimmerGain.connect(master);
    shimmer.start();

    setPlaying(true);
  }

  function stopAudio() {
    if (!ctxRef.current) return;
    const ctx = ctxRef.current;

    // Fade out over 2 seconds
    const master = ctx.destination;
    ctx.close();
    ctxRef.current = null;
    setPlaying(false);
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.close();
        ctxRef.current = null;
      }
    };
  }, []);

  function handleToggle() {
    setUserInteracted(true);
    if (playing) {
      stopAudio();
    } else {
      startAudio();
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center border border-fog/30 bg-void/80 backdrop-blur-sm transition-colors hover:border-ember"
      aria-label={playing ? "Mute ambient sound" : "Play ambient sound"}
      title={playing ? "Mute" : "Ambient sound"}
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 5h2.5L8 2v12L4.5 11H2a1 1 0 01-1-1V6a1 1 0 011-1z"
            fill="var(--parchment2)"
          />
          <path
            d="M10.5 4.5a5 5 0 010 7M12.5 2.5a8 8 0 010 11"
            stroke="var(--parchment2)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M2 5h2.5L8 2v12L4.5 11H2a1 1 0 01-1-1V6a1 1 0 011-1z"
            fill="var(--fog)"
          />
          <path
            d="M11 5.5l4 5M15 5.5l-4 5"
            stroke="var(--fog)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
