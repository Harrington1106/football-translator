# ⚽ 足球翻译器 (Football Translator)

> 世界上最适合足球新手的世界杯网站。3分钟看懂一场比赛。

## 🎯 项目特色

- **不展示数据，先解释意义** - 帮助用户理解比赛的重要性
- **不使用专业术语** - 自动翻译足球术语
- **每个页面都回答用户真正的问题** - 为什么重要？谁更厉害？

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 🔑 配置真实数据API

项目支持两种数据模式：

### 模式1：本地数据（默认）

无需配置，开箱即用。使用项目内置的模拟数据。

### 模式2：真实API数据

要获取真实的世界杯比赛数据，需要配置免费API：

#### 步骤1：获取API Key

1. 访问 [football-data.org](https://www.football-data.org/client/register)
2. 注册免费账号
3. 获取API Key

#### 步骤2：配置环境变量

在项目根目录创建 `.env.local` 文件：

```env
FOOTBALL_DATA_API_KEY=你的API_KEY
```

#### 步骤3：重启服务器

```bash
npm run dev
```

配置成功后，页面右下角会显示绿色WiFi图标 ✅

## 📱 功能页面

| 页面 | 路径 | 功能 |
|------|------|------|
| 首页 | `/` | 今日比赛、直播、即将开始 |
| 比赛详情 | `/match/[id]` | 为什么重要、实力对比、AI解说 |
| 球队页面 | `/team/[id]` | 排名、风格、明星球员 |
| 球员页面 | `/player/[id]` | 为什么出名、代表时刻 |
| 足球课堂 | `/learn` | 越位、点球、红黄牌等规则 |

## 🎨 设计理念

- **深色模式** + 毛玻璃效果
- **极简设计** - Apple/Linear 风格
- **卡片式布局** - 大量留白
- **移动端优先** - 响应式设计
- **Emoji旗帜** - 无需图片资源

## 🛠️ 技术栈

- Next.js 16 (App Router)
- TypeScript
- TailwindCSS v4
- shadcn/ui
- Framer Motion
- Lucide Icons

## 📊 数据来源

- [football-data.org](https://www.football-data.org/) - 免费足球API
- [TheSportsDB](https://www.thesportsdb.com/) - 备用数据源

## 📁 项目结构

```
fwa/
├── app/                    # 页面路由
│   ├── api/               # API路由
│   ├── match/[id]/        # 比赛详情
│   ├── team/[id]/         # 球队页面
│   ├── player/[id]/       # 球员页面
│   └── learn/             # 足球课堂
├── components/            # 组件
│   ├── home/             # 首页组件
│   ├── match/            # 比赛组件
│   └── ui/               # UI组件
├── lib/                   # 工具库
│   ├── api/              # API集成
│   ├── data/             # 数据定义
│   └── utils.ts          # 工具函数
└── hooks/                # React Hooks
```

## 🌍 支持的球队

- 🇧🇷 巴西
- 🇦🇷 阿根廷
- 🇫🇷 法国
- 🇩🇪 德国
- 🇪🇸 西班牙
- 🏴󠁧󠁢󠁥󠁮󠁧󠁿 英格兰
- 🇯🇵 日本
- 🇰🇷 韩国
- 🇲🇦 摩洛哥
- 🇵🇹 葡萄牙
- 🇺🇸 美国

## 📝 License

MIT
