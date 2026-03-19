"use client";

import { useEffect, useRef, useState } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/crossing-ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  function fadeIn(audio: HTMLAudioElement, target: number, duration: number) {
    const steps = 30;
    const stepTime = duration / steps;
    const stepSize = target / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += stepSize;
      if (current >= target) {
        audio.volume = target;
        clearInterval(interval);
      } else {
        audio.volume = current;
      }
    }, stepTime);

    return interval;
  }

  function fadeOut(audio: HTMLAudioElement, duration: number) {
    const steps = 20;
    const stepTime = duration / steps;
    const startVol = audio.volume;
    const stepSize = startVol / steps;
    let current = startVol;

    const interval = setInterval(() => {
      current -= stepSize;
      if (current <= 0) {
        audio.volume = 0;
        audio.pause();
        clearInterval(interval);
      } else {
        audio.volume = current;
      }
    }, stepTime);

    return interval;
  }

  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      fadeOut(audio, 1500);
      setPlaying(false);
    } else {
      audio.play();
      fadeIn(audio, 0.25, 3000);
      setPlaying(true);
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
