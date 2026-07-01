"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Lesson } from "@/lib/data/lessons";

interface LessonCardProps {
  lesson: Lesson;
  index: number;
}

export function LessonCard({ lesson, index }: LessonCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <div className="glass-card overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-start gap-3 p-5 text-left hover:bg-secondary/20 transition-colors"
        >
          <span className="text-3xl flex-shrink-0 mt-0.5">{lesson.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">{lesson.title}</h3>
              <span className="text-[10px] text-muted-foreground">{lesson.titleEn}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
              {lesson.shortDescription}
            </p>
          </div>
          <span className="flex-shrink-0 mt-1">
            {isOpen ? (
              <ChevronUp size={16} className="text-muted-foreground" />
            ) : (
              <ChevronDown size={16} className="text-muted-foreground" />
            )}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4">
                {/* 解释 */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">简单解释</p>
                  <p className="text-sm leading-relaxed">{lesson.fullExplanation}</p>
                </div>

                {/* 重点 */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1.5">记住这几点</p>
                  <ul className="space-y-1">
                    {lesson.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-medium mt-0.5">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 类比 */}
                <div className="bg-primary/5 rounded-xl p-3">
                  <p className="text-xs font-medium text-primary mb-1">💡 生活类比</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{lesson.analogy}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
