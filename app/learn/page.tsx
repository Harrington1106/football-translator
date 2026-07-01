import Link from "next/link";
import { getAllLessons } from "@/lib/data/lessons";
import { LessonCard } from "@/components/learn/LessonCard";

export default function LearnPage() {
  const lessons = getAllLessons();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 pt-8 pb-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            ⚽ 足球一分钟课堂
          </h1>
          <p className="text-base text-muted-foreground max-w-lg mx-auto">
            每个知识点，只需要一分钟就能理解。
            <br />
            从此看球不迷茫。
          </p>
        </div>

        {/* Lesson grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson, i) => (
            <LessonCard key={lesson.id} lesson={lesson} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-3">
            学完了？去看看今天的比赛吧！
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            🏠 返回首页看比赛
          </Link>
        </div>
      </div>
    </div>
  );
}
