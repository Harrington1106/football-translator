"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { MatchEvent } from "@/lib/data/matches";

const EVENT_EMOJI: Record<string, string> = {
  goal: "⚽",
  yellowCard: "🟨",
  redCard: "🟥",
  substitution: "🔄",
  var: "📺",
  corner: "🚩",
  penalty: "🎯",
};

interface EventTimelineProps {
  events: MatchEvent[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-1.5">
      {events.map((event, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border border-border/40 hover:border-primary/20 transition-colors"
        >
          <button
            onClick={() => setExpanded(expanded === i ? null : i)}
            className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-secondary/20 transition-colors"
          >
            <span className="text-xl flex-shrink-0">
              {EVENT_EMOJI[event.type] || "📌"}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-primary tabular-nums flex-shrink-0">
                  {event.minute}&apos;
                </span>
                <span className="text-sm font-medium truncate">
                  {event.description}
                </span>
              </div>
            </div>
            {expanded === i ? (
              <ChevronUp size={14} className="text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronDown size={14} className="text-muted-foreground flex-shrink-0" />
            )}
          </button>

          <AnimatePresence>
            {expanded === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  <div className="bg-secondary/40 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      💡 {event.beginnerExplanation}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
