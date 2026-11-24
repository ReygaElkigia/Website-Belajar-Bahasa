"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";
import { speak } from "@/lib/speech";

interface Props {
  text: string;
  lang: string;
  label?: string;
  size?: "md" | "lg";
  slow?: boolean;
}

export function SpeakButton({ text, lang, label, size = "md", slow }: Props) {
  const [playing, setPlaying] = useState(false);
  return (
    <button
      type="button"
      className={size === "lg" ? "speak speak-lg" : "speak"}
      data-playing={playing}
      aria-label={label ?? `Dengarkan: ${text}`}
      title="Dengarkan"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const ok = speak(text, lang, { slow, onEnd: () => setPlaying(false) });
        if (ok) setPlaying(true);
      }}
    >
      <Volume2 size={size === "lg" ? 24 : 18} strokeWidth={1.75} aria-hidden />
    </button>
  );
}
