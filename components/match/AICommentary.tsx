"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Sparkles, Loader2 } from "lucide-react";
import type { MatchEvent } from "@/lib/data/matches";

interface AICommentaryProps {
  events?: MatchEvent[];
  status: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  // ESPN live data
  espnData?: {
    displayClock?: string;
    venue?: string;
    matchDetails?: Array<{ minute: string; type: string; team: string; player: string }>;
    headline?: string;
  };
}

const QUESTIONS = [
  { id: "what-happened", label: "刚刚发生了什么？" },
  { id: "why-cheer", label: "为什么大家在欢呼？" },
  { id: "who-better", label: "现在谁踢得更好？" },
  { id: "what-next", label: "接下来会发生什么？" },
];

export function AICommentary({
  events,
  status,
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  espnData,
}: AICommentaryProps) {
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, { text: string; source: string }>>({});
  const [loading, setLoading] = useState<string | null>(null);

  const handleQuestion = useCallback(
    async (questionId: string) => {
      // Toggle off if already active
      if (activeQuestion === questionId) {
        setActiveQuestion(null);
        return;
      }

      setActiveQuestion(questionId);

      // Use cached answer if available
      if (answers[questionId]) return;

      setLoading(questionId);

      try {
        const questionLabel = QUESTIONS.find((q) => q.id === questionId)?.label || "";
        const res = await fetch("/api/ai/explain", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: questionLabel,
            espnData: {
              homeTeam,
              awayTeam,
              homeScore,
              awayScore,
              displayClock: espnData?.displayClock,
              venue: espnData?.venue,
              matchDetails: espnData?.matchDetails,
              headline: espnData?.headline,
            },
          }),
        });
        const data = await res.json();
        setAnswers((prev) => ({
          ...prev,
          [questionId]: {
            text: data.answer || "暂时无法获取解说，请稍后再试。",
            source: data.source || "fallback",
          },
        }));
      } catch {
        setAnswers((prev) => ({
          ...prev,
          [questionId]: {
            text: "网络问题，暂时无法获取AI解说。",
            source: "error",
          },
        }));
      } finally {
        setLoading(null);
      }
    },
    [activeQuestion, answers, events, homeTeam, awayTeam, homeScore, awayScore]
  );

  // Only show for live matches
  if (status !== "live") return (
    <div className="glass-card p-5 text-center">
      <p className="text-sm text-muted-foreground">AI 解说仅在比赛直播时可用</p>
    </div>
  );

  return (
    <div className="glass-card p-5">
      <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
        <Sparkles size={16} className="text-primary" />
        AI 实时解说
        <span className="text-[10px] text-muted-foreground/60 ml-auto">点击问题获取解说</span>
      </h2>

      <div className="space-y-1.5">
        {QUESTIONS.map((q) => {
          const isLoading = loading === q.id;
          const answer = answers[q.id];

          return (
            <div key={q.id}>
              <button
                onClick={() => handleQuestion(q.id)}
                className={`w-full flex items-center gap-2 p-3 rounded-xl text-left text-sm transition-all ${
                  activeQuestion === q.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-secondary/40 text-muted-foreground"
                }`}
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <MessageCircle size={14} />
                )}
                {q.label}
              </button>

              <AnimatePresence>
                {activeQuestion === q.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-secondary/30 rounded-xl p-4 mx-1 mt-1">
                      {isLoading ? (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Loader2 size={14} className="animate-spin" />
                          AI 正在解说...
                        </div>
                      ) : answer ? (
                        <div>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {answer.text}
                          </p>
                          {answer.source === "ai" && (
                            <p className="text-[10px] text-primary/60 mt-2 flex items-center gap-1">
                              <Sparkles size={10} />
                              AI 生成
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">点击上方按钮获取AI解说</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
