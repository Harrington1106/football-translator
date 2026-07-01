import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <span>⚽</span> 足球新手村
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              为足球新手打造的世界杯观赛助手。
              <br />
              不学术语，不用百度，3分钟看懂一场比赛。
            </p>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">快速导航</h3>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>
                <Link href="/" className="hover:text-foreground transition-colors">
                  首页 · 今日比赛
                </Link>
              </p>
              <p>
                <Link href="/learn" className="hover:text-foreground transition-colors">
                  足球规则速成
                </Link>
              </p>
              <p>
                <Link href="/team/brazil" className="hover:text-foreground transition-colors">
                  浏览球队
                </Link>
              </p>
              <p>
                <Link href="/player/messi" className="hover:text-foreground transition-colors">
                  认识球星
                </Link>
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm mb-3">关于本站</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              这是一个面向完全不懂足球用户的世界杯网站。
              <br />
              我们的目标不是展示数据，而是帮助你理解比赛。
            </p>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground/60 border-t border-border/50 pt-6">
          <p>Football for Everyone — 让每个人都能享受足球的乐趣</p>
        </div>
      </div>
    </footer>
  );
}
