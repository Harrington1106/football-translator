export interface Lesson {
  id: string;
  title: string;
  titleEn: string;
  emoji: string;
  shortDescription: string;
  fullExplanation: string;
  keyPoints: string[];
  analogy: string;
}

export const lessons: Lesson[] = [
  {
    id: "offside",
    title: "什么是越位？",
    titleEn: "Offside",
    emoji: "🏳️",
    shortDescription: "足球中最难理解但最重要的规则之一",
    fullExplanation:
      "越位规则是为了防止进攻球员一直站在对方球门前等球。当队友传球给你的一瞬间，你不能比对方倒数第二个防守球员更靠近对方球门。简单说就是：你不能'偷跑'到对方防线后面等球。",
    keyPoints: [
      "判断越位的时机是队友传球的一瞬间，不是你接球的时候",
      "越位只在对方半场有效",
      "如果你没有参与进攻，处于越位位置也没关系",
      "越位会被判给对方一个任意球",
    ],
    analogy: "想象你在排队买奶茶，你不能插队到最前面。越位规则就是防止球员'插队'到对方球门前。",
  },
  {
    id: "penalty",
    title: "什么是点球？",
    titleEn: "Penalty Kick",
    emoji: "⚽",
    shortDescription: "距离球门12码的直接射门机会，进球率约75%",
    fullExplanation:
      "当防守方在自己的禁区内犯规（比如手球、推人、铲人），裁判会判给进攻方一个点球。点球是从距离球门11米的地方直接射门，只有门将可以防守。这是一次非常好的得分机会。",
    keyPoints: [
      "点球是对禁区内犯规的惩罚",
      "只有门将可以防守点球",
      "门将必须站在球门线上，不能提前移动",
      "点球的进球率大约75%，是非常好的得分机会",
    ],
    analogy: "就像考试时老师给你一道送分题——虽然不是100%能答对，但成功率很高。",
  },
  {
    id: "yellowCard",
    title: "什么是黄牌？",
    titleEn: "Yellow Card",
    emoji: "🟨",
    shortDescription: "裁判对犯规球员的正式警告",
    fullExplanation:
      "当球员犯规（比如恶意铲球、拖延时间、不服裁判判罚），裁判会出示黄牌警告。一场比赛中如果同一名球员收到两张黄牌，就会变成红牌被罚下场。",
    keyPoints: [
      "黄牌是裁判的正式警告",
      "同一场比赛两张黄牌 = 红牌罚下",
      "严重的犯规可能直接出示红牌",
      "被罚下的球队只能少一人比赛",
    ],
    analogy: "就像在学校被老师警告一次——如果再犯就会被罚站（罚下场）。",
  },
  {
    id: "redCard",
    title: "什么是红牌？",
    titleEn: "Red Card",
    emoji: "🟥",
    shortDescription: "最严厉的处罚——直接罚下场，球队少一人",
    fullExplanation:
      "红牌是最严厉的处罚。球员被出示红牌后必须立即离开球场，而且球队不能换人替补，只能少一人继续比赛。严重犯规、暴力行为、故意手球阻止进球等都可能导致红牌。",
    keyPoints: [
      "红牌 = 直接罚下场",
      "球队只能少一人比赛，不能换人替补",
      "严重犯规可能导致追加停赛",
      "被罚下三人以上，比赛直接判负",
    ],
    analogy: "就像在学校打架被直接开除——不仅自己受罚，还连累整个班级（球队）少一个人。",
  },
  {
    id: "stoppageTime",
    title: "为什么有补时？",
    titleEn: "Stoppage Time",
    emoji: "⏰",
    shortDescription: "弥补比赛中因各种原因浪费的时间",
    fullExplanation:
      "足球比赛每个半场45分钟，但比赛中会有球员受伤、换人、VAR回放等情况导致比赛中断。裁判会在45分钟结束后额外增加几分钟，这就是'补时'。补时阶段进球是最激动人心的时刻！",
    keyPoints: [
      "补时是为了弥补比赛中浪费的时间",
      "补时时间由裁判根据中断情况决定",
      "通常每个半场有1-5分钟补时",
      "补时进球是足球最激动人心的时刻之一",
    ],
    analogy: "就像上课时老师说'再讲两分钟'——把之前被打断的时间补回来。",
  },
  {
    id: "extraTime",
    title: "什么是加时赛？",
    titleEn: "Extra Time",
    emoji: "⏱️",
    shortDescription: "淘汰赛打平后的额外30分钟决战",
    fullExplanation:
      "在淘汰赛中，如果90分钟（含补时）结束后比分仍然打平，比赛会进入加时赛。加时赛分上下半场各15分钟，共30分钟。如果加时赛后仍然打平，就进入点球大战。",
    keyPoints: [
      "只有淘汰赛才有加时赛（小组赛没有）",
      "加时赛共30分钟，上下半场各15分钟",
      "加时赛后仍然打平 → 点球大战",
      "加时赛中球员体力消耗极大",
    ],
    analogy: "就像考试时间到了但你还没写完，老师给你额外30分钟。但这是最后一次机会了。",
  },
  {
    id: "penaltyShootout",
    title: "什么是点球大战？",
    titleEn: "Penalty Shootout",
    emoji: "🎯",
    shortDescription: "最刺激的决胜方式——轮流踢点球",
    fullExplanation:
      "当淘汰赛在加时赛后仍然打平，就进入点球大战。两队各派5名球员轮流踢点球，进球多的一方获胜。如果5轮后仍然打平，就进入'突然死亡'——每轮各踢一个，先进球的一方获胜。",
    keyPoints: [
      "点球大战是淘汰赛最后的决胜方式",
      "每队先踢5个点球",
      "5轮后打平 → 突然死亡（一球定胜负）",
      "极度考验球员的心理素质",
    ],
    analogy: "就像两个人轮流投篮，投进多的人赢。但全世界的目光都在你身上——压力巨大。",
  },
  {
    id: "corner",
    title: "什么是角球？",
    titleEn: "Corner Kick",
    emoji: "🚩",
    shortDescription: "在球场角落发球——一次危险的进攻机会",
    fullExplanation:
      "当防守球员最后碰到球，导致球出了底线（球门两侧的线），进攻方就会获得一个角球。角球是从球场角落的弧线内发出来的，因为距离球门很近，是一次很好的进球机会。",
    keyPoints: [
      "防守球员碰出底线 = 进攻方角球",
      "角球从球场角落发出",
      "角球是很好的进攻机会",
      "很多精彩进球来自角球配合",
    ],
    analogy: "就像篮球里的前场发球——在对方篮筐附近发球，是一次很好的得分机会。",
  },
];

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function getAllLessons(): Lesson[] {
  return lessons;
}
