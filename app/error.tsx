"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <span className="text-7xl block mb-4">🔧</span>
        <h1 className="text-2xl font-bold mb-2">出了点小问题</h1>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          页面加载时遇到了一个错误。可能是网络问题，也可能是一个bug。
          请稍后再试！
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            🔄 再试一次
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            🏠 返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
