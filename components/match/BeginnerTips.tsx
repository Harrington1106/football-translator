"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";

interface BeginnerTipsProps {
  tips: string[];
}

export function BeginnerTips({ tips }: BeginnerTipsProps) {
  if (!tips.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5"
    >
      <h2 className="text-sm font-bold text-muted-foreground mb-3 flex items-center gap-2">
        <Eye size={16} className="text-primary" />
        新手观赛指南
      </h2>
      <div className="space-y-2">
        {tips.map((tip, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-medium mt-0.5">
              {i + 1}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
