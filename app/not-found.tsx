import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <span className="text-7xl block mb-4">😕</span>
        <h1 className="text-2xl font-bold mb-2">页面不存在</h1>
        <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
          这个页面可能还没有准备好，或者链接有误。
          不过别担心——足球世界上还有很多精彩的内容等着你！
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            🏠 返回首页
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            📚 学习规则
          </Link>
        </div>
      </div>
    </div>
  );
}
