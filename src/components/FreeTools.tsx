import { SEOHeader, SEOFooter } from './SEOLayout';
import { AdSense } from './AdSense';

interface FreeToolsProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

interface ToolCard {
  page: string;
  emoji: string;
  label: string;
  description: string;
  tag: string;
  from: string;
  to: string;
  cta: string;
  isExternal?: boolean;
  href?: string;
}

const TOOLS: ToolCard[] = [
  {
    page: 'hashtag-generator',
    emoji: '#️⃣',
    label: 'Hashtag Generator',
    description: 'Generate the best TikTok, Instagram and YouTube hashtags for your niche. Pick from 12 niches with viral, growth and long-tail tiers. Copy all in one click.',
    tag: 'Hashtags',
    from: 'from-violet-500',
    to: 'to-purple-600',
    cta: 'Generate Hashtags',
  },
  {
    page: 'font-generator',
    emoji: '✍️',
    label: 'TikTok Font Generator',
    description: 'Create stylish Unicode fonts for your TikTok bio, captions, and username. 13 styles — Bold, Italic, Script, Fraktur, Double-Struck and more. Instant copy & paste.',
    tag: 'Fonts',
    from: 'from-indigo-500',
    to: 'to-blue-600',
    cta: 'Generate Fonts',
  },
  {
    page: 'caption-generator',
    emoji: '✏️',
    label: 'Caption Generator',
    description: 'Generate engaging social media captions for TikTok, Instagram, LinkedIn and YouTube. Pick your platform, vibe and topic — get 4 ready-to-post captions instantly.',
    tag: 'Captions',
    from: 'from-pink-500',
    to: 'to-fuchsia-600',
    cta: 'Generate Captions',
  },
  {
    page: 'engagement-calculator',
    emoji: '📊',
    label: 'Engagement Rate Calculator',
    description: 'Calculate your engagement rate for TikTok, Instagram, YouTube, Twitter, LinkedIn and Facebook. Get your rating vs. industry benchmarks and actionable improvement tips.',
    tag: 'Analytics',
    from: 'from-orange-500',
    to: 'to-amber-500',
    cta: 'Calculate Now',
  },
  {
    page: 'guide-tiktok-comment-picker',
    emoji: '🎯',
    label: 'TikTok Comment Picker',
    description: 'Paste your TikTok comments and randomly pick a winner in seconds. Filter by keyword, remove duplicates, and spin the wheel. Free, no login required.',
    tag: 'Giveaway',
    from: 'from-amber-500',
    to: 'to-orange-500',
    cta: 'Pick a Winner',
  },
  {
    page: 'guide-tiktok-giveaway-picker',
    emoji: '🎁',
    label: 'TikTok Giveaway Picker',
    description: 'Run a fair TikTok giveaway and pick up to 5 random winners from your comments. Keyword filter, remove-dupes toggle, animated selection. Free and instant.',
    tag: 'Giveaway',
    from: 'from-emerald-500',
    to: 'to-teal-500',
    cta: 'Run Giveaway',
  },
];

const STICKER_TOOLS: ToolCard[] = [
  {
    page: 'generator',
    emoji: '💬',
    label: 'Comment Sticker Generator',
    description: 'Create pixel-perfect comment stickers for TikTok, Instagram, YouTube, LinkedIn and 5 more platforms. Transparent PNG or JPEG, 3× resolution. No watermark.',
    tag: 'Sticker',
    from: 'from-pink-500',
    to: 'to-rose-600',
    cta: 'Open Generator',
  },
  {
    page: 'batch',
    emoji: '⚡',
    label: 'Batch Sticker Generator',
    description: 'Generate and download up to 10 comment stickers at once. Mix platforms in one export run. Save hours on UGC ad production. Free, no watermark.',
    tag: 'Batch',
    from: 'from-emerald-500',
    to: 'to-green-600',
    cta: 'Open Batch',
  },
];

function ToolCardItem({
  tool,
  darkMode,
  onNavigate,
}: {
  tool: ToolCard;
  darkMode: boolean;
  onNavigate: (page: any) => void;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 flex flex-col gap-4 transition-all hover:scale-[1.01] ${
        darkMode
          ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
          : 'bg-white border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.from} ${tool.to} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}>
          {tool.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h2 className={`text-base font-black ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
              {tool.label}
            </h2>
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r ${tool.from} ${tool.to} text-white`}>
              {tool.tag}
            </span>
          </div>
          <p className={`text-sm leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {tool.description}
          </p>
        </div>
      </div>
      <button
        onClick={() => onNavigate(tool.page)}
        className={`mt-auto w-full py-3 px-5 rounded-xl text-sm font-black transition-all bg-gradient-to-r ${tool.from} ${tool.to} text-white hover:opacity-90 hover:shadow-lg`}
      >
        {tool.cta} →
      </button>
    </div>
  );
}

export function FreeTools({ darkMode, onNavigate }: FreeToolsProps) {
  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      <main className="max-w-5xl mx-auto px-6 py-28">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className={`inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 ${
            darkMode ? 'bg-pink-500/10 text-pink-400 border border-pink-500/20' : 'bg-pink-50 text-pink-600 border border-pink-100'
          }`}>
            100% Free · No Login · No Watermark
          </span>
          <h1 className={`text-4xl md:text-5xl font-black tracking-tight mb-5 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Free Social Media Tools
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            All the tools you need to create better content, run giveaways, and grow your audience — completely free.
          </p>
        </div>

        {/* Comment Sticker Tools */}
        <section className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm">💬</div>
            <h2 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Comment Sticker Generators
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {STICKER_TOOLS.map((tool) => (
              <ToolCardItem key={tool.page} tool={tool} darkMode={darkMode} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        <AdSense slot="7788990011" darkMode={darkMode} />

        {/* Standalone Free Tools */}
        <section className="mt-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm">🛠️</div>
            <h2 className={`text-sm font-black uppercase tracking-widest ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Growth & Creator Tools
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {TOOLS.map((tool) => (
              <ToolCardItem key={tool.page} tool={tool} darkMode={darkMode} onNavigate={onNavigate} />
            ))}
          </div>
        </section>

        {/* CTA banner */}
        <div className={`mt-16 rounded-3xl p-8 text-center border ${
          darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
        }`}>
          <p className={`text-sm font-black uppercase tracking-widest mb-3 ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
            Want guides too?
          </p>
          <h3 className={`text-2xl font-black mb-4 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
            Explore our Blog & Tutorials
          </h3>
          <p className={`text-sm mb-6 ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Step-by-step guides on creating comment stickers, running TikTok giveaways, generating hashtags, and growing your UGC presence.
          </p>
          <button
            onClick={() => onNavigate('blog')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white text-sm font-black rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20"
          >
            Browse the Blog →
          </button>
        </div>
      </main>

      <SEOFooter onNavigate={onNavigate} />
    </div>
  );
}
