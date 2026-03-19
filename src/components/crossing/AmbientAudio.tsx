"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  const fadeIn = useCallback(
    (audio: HTMLAudioElement, target: number, duration: number) => {
      audio.volume = 0;
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
    },
    []
  );

  const fadeOut = useCallback((audio: HTMLAudioElement, duration: number) => {
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
  }, []);

  // Auto-play on mount — this works because the user clicked "Begin" first
  useEffect(() => {
    const audio = new Audio("/audio/crossing-ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => {
      setReady(true);
    });

    // Attempt autoplay
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          fadeIn(audio, 0.25, 3000);
          setPlaying(true);
        })
        .catch(() => {
          // Autoplay blocked — user will need to click the button
          setReady(true);
        });
    }

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, [fadeIn]);

  function handleToggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      fadeOut(audio, 1500);
      setPlaying(false);
    } else {
      audio.play().then(() => {
        fadeIn(audio, 0.25, 3000);
        setPlaying(true);
      });
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
