import { useState } from 'react';
import { MousePointerClick, Copy, Check, RefreshCw } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

interface Props { darkMode: boolean; onNavigate: (page: any) => void; }

// ── Data ─────────────────────────────────────────────────────────────────────

const GOALS = [
  { id: 'follow',    label: 'Get Followers',       emoji: '👥', desc: 'Ask viewers to follow' },
  { id: 'comment',  label: 'Drive Comments',       emoji: '💬', desc: 'Boost engagement' },
  { id: 'save',     label: 'Get Saves/Bookmarks',  emoji: '🔖', desc: 'Content to bookmark' },
  { id: 'share',    label: 'Drive Shares',         emoji: '🔄', desc: 'Viral amplification' },
  { id: 'link',     label: 'Link in Bio / CTA',    emoji: '🔗', desc: 'Drive to external action' },
  { id: 'duet',     label: 'Inspire Duets',        emoji: '🎬', desc: 'Content participation' },
  { id: 'collab',   label: 'Brand / Collab DMs',   emoji: '🤝', desc: 'Business inquiries' },
  { id: 'profile',  label: 'Profile Visits',       emoji: '👤', desc: 'Drive to profile/other vids' },
] as const;
type GoalId = typeof GOALS[number]['id'];

const PLATFORMS = [
  { id: 'tiktok',    label: 'TikTok',    emoji: '🎵' },
  { id: 'instagram', label: 'Instagram', emoji: '📸' },
  { id: 'youtube',   label: 'YouTube',   emoji: '▶️' },
  { id: 'linkedin',  label: 'LinkedIn',  emoji: '💼' },
] as const;
type PlatformId = typeof PLATFORMS[number]['id'];

const CTAS: Record<GoalId, Record<PlatformId, string[]>> = {
  follow: {
    tiktok:    ['Follow so you don\'t miss tomorrow\'s video — it\'s the one people keep asking for 👀', 'Follow for Part 2 — I drop it this week 🔥', 'If this helped you, follow. I post this kind of content every day.', 'I share this kind of thing daily — follow and I\'ll see you tomorrow 👋', 'New here? Follow — this is the content every week 🎯', 'Hit follow if you want this type of content without the algorithm lottery 🙏', 'This was 1 of 5 tips in this series — follow for the other 4 coming this week', 'Follow → new video tomorrow → you\'re already here → the math is simple 😄'],
    instagram: ['Follow for daily content like this — I post every day 🔥', 'Follow to see Part 2 coming this week 👀', 'If this resonated, follow — this is what I share every day', 'I post this type of content consistently — follow so you don\'t miss it', 'New here? Follow. This is the content you\'ll find here every week.', 'Follow for more 👆 — I drop content that actually matters, daily'],
    youtube:   ['Subscribe so YouTube tells you when I post — algorithms are unpredictable, don\'t rely on them 🔔', 'Subscribe + hit the bell — I post every [day/week] and the notification ensures you don\'t miss it', 'This is a series — subscribe if you want Part 2, 3, and beyond 🎯', 'If this video helped you, subscribe — every video is built to help you go further', 'Subscribe for the full library — this is 1 of [number] videos on this topic', 'Subscribe. I post consistently. The library only grows from here. ✅'],
    linkedin:  ['Follow for content like this — I post insights on [topic] every week 📊', 'Follow → you\'ll get this type of content directly in your feed without searching', 'I share frameworks and insights on [topic] weekly — follow so you don\'t miss them', 'If you find this valuable, follow — this is the content I publish every week', 'Follow for more — my feed is entirely [topic] insights and case studies', 'Follow. I post one high-value insight every week. That\'s the deal.'],
  },
  comment: {
    tiktok:    ['Comment below: what\'s your biggest challenge with [topic]? I read every single one 👇', 'Drop your answer in the comments — I genuinely want to know 👇', 'Comment the number that resonates most — 1, 2, or 3?', 'If this happened to you, comment "same" 👇 — I want to see how many of us 😂', 'What would you add to this list? Drop it below 👇', 'Comment "SEND IT" if you want me to DM you the full guide 🔥', 'Tell me where you\'re at: comment A (just starting) or B (been doing this a while) 👇', 'One question — drop your answer below and I\'ll reply to every one: [ask a simple question] 👇'],
    instagram: ['Drop a 🙋 in the comments if this resonated 👇', 'Comment your answer below — I read and reply to every comment 🙏', 'Which one are you? A or B — comment below 👇', 'What would you add? Drop it in the comments 💬', 'Comment "yes" if you want more content like this 👇', 'Tell me in the comments: is this something you struggle with too? 👇', 'What\'s your version of this? Comment below — genuinely curious 💬', 'Drop a ❤️ in the comments if you\'ve been in this situation too'],
    youtube:   ['Leave a comment below — what\'s your biggest takeaway from this video? I\'ll reply 💬', 'I have a question for you at the end of this video — leave your answer in the comments', 'Comment below: which of these [tips/mistakes/strategies] surprised you most?', 'Drop your thoughts in the comments — I read every single one and reply to as many as I can', 'Disagree with something I said? Tell me in the comments — I want the debate 💬', 'What would you add to this list? Comment below and the best answers get featured 🎯'],
    linkedin:  ['What\'s your take? I\'d love to hear it in the comments 💬', 'Disagree? Challenge me in the comments — serious discussion is welcome', 'What\'s missing from this framework? Comment below — the best additions get credit', 'What\'s your experience with this? Share in the comments 👇', 'I\'m curious: which of these have you tried? Comment with your results.', 'Repost this if you think someone in your network needs to see it. Comment if you agree. 💬'],
  },
  save: {
    tiktok:    ['Save this for later — you\'ll want to come back to it 🔖', 'Save this before it gets buried in your For You Page 📌', 'Bookmark this — trust me you\'ll use this 🔖', 'This is the kind of thing you\'ll want to reference again. Save it now. 📌', 'Save and come back to this when you need it — it\'s more useful then than now 🔖', 'Hit the bookmark — this one took me [time] to learn. Save it in 3 seconds. 📌', 'Save this so you actually do it. Watching without saving means you\'ll forget it tomorrow. 🔖', 'One save, one problem permanently solved 📌 — I\'ll let the math speak'],
    instagram: ['Save this post — it\'s the kind of thing you\'ll want to find again 🔖', 'Save for later — you\'ll thank yourself when you need this 📌', 'Bookmark this. Seriously. 🔖 — you\'ll want this when you\'re actually doing [task]', 'Hit save before you scroll — this took me a year to figure out and you\'ll have it in 30 seconds 📌', 'Save this to your [collection name] collection — it belongs there 🔖', 'Save → come back when you need it → use it → win 📌'],
    youtube:   ['Save this video to your [playlist name] playlist — I made it to be rewatched 📌', 'Add this to your saved videos — the second watch reveals things the first one doesn\'t', 'Save this one. I made it specifically to be a reference you come back to. 🔖', 'If you\'re serious about [topic], save this video. You\'ll need it again.', 'Save and share — every person who needs this deserves to have access to it 📌'],
    linkedin:  ['Save this post — I\'ll be referencing this framework in future content 🔖', 'Save for your next [meeting/project/presentation] — it\'ll be relevant 📌', 'Bookmark this. The insight is more valuable when you actually need it.', 'Save this and come back to it in 3 months — it will mean something different 🔖'],
  },
  share: {
    tiktok:    ['Share this with whoever needs to hear it today 🔄', 'Send this to one person who needs this right now 👇', 'If you know someone who\'s struggling with [topic], this is for them. Share it 🔄', 'Share this with your most ambitious friend — this is for them 🔥', 'Send this to someone who told you [common misconception] was the answer 😂', 'If this video helped you, pay it forward — share it with someone it might help too 🙏', 'Share this on your story if this is exactly what you needed today ✨', 'Tag someone who needs to watch this start to finish 👇'],
    instagram: ['Share this on your story if it resonated 🔄', 'Tag someone below who needs to see this 👇', 'Send this to a friend who\'s going through something similar 💛', 'Share to your story — let\'s make sure more people see this 🔄', 'Repost if this hit different ✨', 'Tag your person below — you know who needs this 💕'],
    youtube:   ['Share this video with someone who\'s trying to do [thing] — it will save them months 🔄', 'If this was valuable, share it. That\'s the best way to support the channel and help others 🙏', 'Share this with your team, your partner, or anyone on a similar journey 🔄', 'Pass this along to whoever it\'s for — you know who it is 😊'],
    linkedin:  ['Repost this if you found it valuable — someone in your network needs to see it 🔄', 'Share with your team if this is relevant to how you\'re working in 2026', 'Tag a colleague who would find this useful 👇', 'Repost to give your network access to this framework 🔄'],
  },
  link: {
    tiktok:    ['Full guide in the link in my bio — it\'s free 🔗', 'I put the complete version (with examples + templates) in the link in bio 👆', 'Bio link has the tool that does this automatically — check it out 🔗', 'The resource I mentioned is at the link in my bio — takes 2 minutes to set up 🔗', 'Link in bio for the free [guide/template/tool] that goes with this video 👆', 'I compiled everything into one place — bio link 🔗', 'Free [resource] in the link in my bio — I made it so you don\'t have to build this from scratch', 'Bio 👆 → free [template/guide/tool] → set it up tonight'],
    instagram: ['Link in bio for the full thing 🔗', 'Bio link → free [resource] that goes with this post 👆', 'I made a free [template/guide] for this — it\'s in my bio link 🔗', 'Full breakdown + template at the link in bio 👆', 'Free resource in the bio if you want to actually implement this 🔗', 'Link in bio → free [thing] → take 2 minutes and do it now 👆'],
    youtube:   ['Link in the description for the [tool/template/guide] I mentioned 🔗', 'Description has everything — all the links, resources, and the free [X] 👇', 'Free [template/guide] linked in the description — took me months to build, yours in 30 seconds 🔗', 'All resources mentioned are in the description, including the free [X] 👇', 'Link in description → download the free [thing] → implement today 🔗'],
    linkedin:  ['Full framework in the comments (pinned) or at the link in my bio 🔗', 'I wrote a detailed breakdown of this — link in the first comment 👇', 'Free resource for this at the link in my bio — takes 5 minutes to implement 🔗', 'I put together a complete guide on this — link in bio or first comment 👇'],
  },
  duet: {
    tiktok:    ['Duet this with your take — I want to see what you\'d add 🎬', 'Duet this and show me your version! 🎬', 'Stitch this with your reaction — do you agree or disagree? 🎬', 'Duet me — I\'m curious what happens when you try this 🎬', 'Stitch this if you\'ve experienced the opposite 🎬 — let\'s start the conversation', 'Show me your version in a Duet — the best ones get reshared 🎬', 'Duet this and tell me what you\'d do differently 🎬', 'I want to see your Duet reaction to this — especially if you disagree 🎬'],
    instagram: ['Remix this and show me your version! 🎬', 'Stitch this Reel and add your take 🎬', 'Remix with your reaction — I\'m especially curious if you disagree 🎬', 'Make a Remix and show me what this looks like from your perspective 🎬'],
    youtube:   ['Make a response video and tag me — I feature the best ones 🎬', 'Film your reaction and leave the link in the comments 🎬', 'Create your version and share it — I\'d love to see the different approaches 🎬'],
    linkedin:  ['Share your version of this in your own post and tag me — I repost the best takes 🎬', 'What does this look like from your industry\'s perspective? Make a post and tag me.', 'Write your response as a post — I\'ll comment and share the best ones 🎬'],
  },
  collab: {
    tiktok:    ['Brands & creators: collab inquiries in my bio link 🤝', 'If you think there\'s a fit, hit the link in my bio — I review all submissions 🤝', 'Partnership requests → bio link → I respond to every relevant one', 'I\'m selectively open to partnerships — if it makes sense for my audience, bio link 🤝', 'Brand deals & creator collabs: link in bio, I\'ll review and get back to you', 'If you want to work together, here\'s the deal: bio link → send the proposal → I\'ll respond 🤝'],
    instagram: ['Brand partnerships and collaborations: link in bio 🤝', 'For collabs and partnerships that actually make sense for my audience: bio link 🤝', 'Partnership inquiries welcome — link in bio, I review everything 🤝', 'If you\'re a brand or creator with a real alignment, hit the bio link 🤝'],
    youtube:   ['Brand partnerships, sponsorships, and speaking requests: link in bio or description 🤝', 'Business inquiries: the link in the description has my contact form — I respond to every relevant one', 'If you\'re interested in sponsoring a video, the details and rates are at the link in description 🤝'],
    linkedin:  ['For consulting, speaking, or collaboration inquiries: message me directly or see the bio link 🤝', 'If you think there\'s a strategic fit, let\'s talk — message me here or see the contact in my bio', 'Open to collaborations, partnerships, and advisory roles — message me if there\'s genuine alignment 🤝'],
  },
  profile: {
    tiktok:    ['More like this on my profile 👀 — every video builds on the last', 'Profile has the full series — start from the beginning 👤', 'Check my profile for the other videos in this series 👆', 'If you liked this, go to my profile — there are [number] more videos just like it', 'Profile → full library of [topic] content → start scrolling 👤', 'The next video is already up — go to my profile and find it 🔥', 'Head to my profile for the context that makes this hit different 👤'],
    instagram: ['Check my profile for more content like this 👤', 'Visit my profile — the full series is there 👆', 'Profile → more of this → save the ones you need 👤', 'If this resonated, there\'s a whole feed of this waiting for you 👤 → profile'],
    youtube:   ['Check my channel for the other videos in this series — they build on each other 👤', 'Go to my channel page and sort by oldest — this is a series and order matters', 'My channel has [number] videos on this topic — go explore 👤', 'Channel page → playlists → [playlist name] → full series is there 🎯'],
    linkedin:  ['Follow my profile for the full series — this is 1 of [number] posts this week 👤', 'Visit my profile to see the other pieces of this framework 👆', 'My content section has the full playbook — visit my profile 👤', 'Go to my profile → click "Posts & Activity" → the full series is there 🎯'],
  },
};

// ── UI ────────────────────────────────────────────────────────────────────────

function CTACard({ cta, index, darkMode }: { cta: string; index: number; darkMode: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={`rounded-2xl p-4 border flex items-start gap-3 transition-all hover:scale-[1.01] ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200 shadow-sm'}`}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${darkMode ? 'bg-rose-500/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>{index + 1}</span>
      <p className={`flex-1 text-sm leading-relaxed ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>{cta}</p>
      <button
        onClick={() => { navigator.clipboard.writeText(cta); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className={`shrink-0 p-1.5 rounded-lg transition-all ${copied ? 'bg-emerald-500 text-white' : darkMode ? 'hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100' : 'hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700'}`}
        title="Copy CTA"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function CTAGenerator({ darkMode, onNavigate }: Props) {
  const [goal, setGoal] = useState<GoalId>('follow');
  const [platform, setPlatform] = useState<PlatformId>('tiktok');
  const [ctas, setCTAs] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const pool = CTAS[goal][platform];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setCTAs(shuffled.slice(0, 5));
    setGenerated(true);
  };

  const copyAll = () => navigator.clipboard.writeText(ctas.map((c, i) => `${i + 1}. ${c}`).join('\n'));

  const isDark = darkMode;
  const bg = isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900';
  const card = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`min-h-screen ${bg}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={isDark} />

      {/* Hero */}
      <section className="px-4 pt-14 pb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20 mb-4">
          <MousePointerClick className="w-3.5 h-3.5" /> Free CTA Generator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
          Social Media CTA <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-500">Generator</span>
        </h1>
        <p className={`text-base ${muted} max-w-lg mx-auto`}>
          Generate 5 high-converting calls-to-action for your videos, posts, and captions. Pick your goal and platform — get CTAs that actually drive action.
        </p>
      </section>

      <AdSense slot="cta-generator-top" darkMode={isDark} />

      {/* Generator */}
      <section className="px-4 pb-10 max-w-2xl mx-auto">
        <div className={`rounded-3xl border p-6 sm:p-8 ${card}`}>

          {/* Platform */}
          <div className="mb-6">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${muted}`}>1. Your Platform</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PLATFORMS.map(p => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${platform === p.id ? 'border-rose-500 bg-rose-500/10 text-rose-500' : isDark ? 'border-neutral-700 hover:border-neutral-500 text-neutral-300' : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'}`}>
                  <span>{p.emoji}</span> {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="mb-8">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${muted}`}>2. Your Goal</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {GOALS.map(g => (
                <button key={g.id} onClick={() => setGoal(g.id)}
                  className={`flex flex-col gap-0.5 px-3 py-3 rounded-xl border text-left transition-all ${goal === g.id ? 'border-rose-500 bg-rose-500/10' : isDark ? 'border-neutral-700 hover:border-neutral-500' : 'border-neutral-200 hover:border-neutral-300'}`}>
                  <span className="text-lg">{g.emoji}</span>
                  <span className={`text-xs font-bold ${goal === g.id ? 'text-rose-500' : isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>{g.label}</span>
                  <span className={`text-xs ${muted}`}>{g.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-black text-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <MousePointerClick className="w-5 h-5" /> Generate 5 CTAs
          </button>
        </div>
      </section>

      {/* Results */}
      {generated && ctas.length > 0 && (
        <section className="px-4 pb-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-black ${isDark ? 'text-neutral-100' : 'text-neutral-800'}`}>Your CTAs 🎯</h2>
            <div className="flex gap-2">
              <button onClick={generate} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'}`}>
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
              <button onClick={copyAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 transition-all">
                <Copy className="w-3 h-3" /> Copy All
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {ctas.map((cta, i) => <CTACard key={i} cta={cta} index={i} darkMode={isDark} />)}
          </div>
          <div className={`mt-6 rounded-2xl border p-4 ${isDark ? 'bg-neutral-800/50 border-neutral-700' : 'bg-rose-50 border-rose-200'}`}>
            <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-rose-800'}`}>
              💡 <strong>Pro tip:</strong> One CTA per video. Multiple CTAs split attention and reduce total action. Pair your CTA with a strong{' '}
              <button onClick={() => onNavigate('hook-generator')} className="text-rose-600 hover:underline font-bold">hook</button>
              {' '}at the start and a{' '}
              <button onClick={() => onNavigate('generator')} className="text-rose-600 hover:underline font-bold">comment sticker overlay</button>
              {' '}to maximize conversions.
            </p>
          </div>
        </section>
      )}

      <AdSense slot="cta-generator-mid" darkMode={isDark} />

      {/* SEO */}
      <section className={`px-4 py-16 max-w-3xl mx-auto prose ${isDark ? 'prose-invert' : ''} prose-sm max-w-none`}>
        <h2>What is a Social Media CTA Generator?</h2>
        <p>A CTA (Call-to-Action) generator is a free tool that creates platform-specific action prompts for your TikTok, Instagram, YouTube, or LinkedIn content. You select your goal (get followers, drive comments, direct to bio link, etc.) and your platform — and get 5 ready-to-use CTAs instantly. Each one is written in the language and format that performs best on that specific platform.</p>
        <h2>Why Your CTA Is the Last 10% That Drives 50% of Results</h2>
        <p>A video without a CTA is a missed opportunity. You've already done the hardest work — creating content worth watching. Without a clear CTA, viewers finish the video and immediately scroll to the next thing. A well-placed, specific CTA redirects that attention: it tells the viewer exactly what to do next and why it benefits them. This is the difference between content that entertains and content that grows a business.</p>
        <h2>The 8 Social Media Goals — Which One Should You Use?</h2>
        <p><strong>Get Followers:</strong> Use when your goal is audience building. Best for new accounts and post-viral moments. <strong>Drive Comments:</strong> Use when you want to boost engagement signals. Questions and binary choices (A or B) work best. <strong>Get Saves/Bookmarks:</strong> Use for educational content, lists, and reference material. Saves signal high-value content to the algorithm. <strong>Drive Shares:</strong> Use for content with strong emotional resonance or universal relatability. <strong>Link in Bio/CTA:</strong> Use to convert viewers to leads, email subscribers, or product buyers. <strong>Inspire Duets:</strong> Use for participatory content that benefits from audience response videos. <strong>Brand/Collab DMs:</strong> Use when positioning yourself for brand partnerships and creator collaborations. <strong>Profile Visits:</strong> Use to drive viewers through your full content library — great for series and educational creators.</p>
        <h2>CTA Best Practices for TikTok and Instagram in 2026</h2>
        <p>Use only one CTA per video. Multiple CTAs create decision paralysis and reduce the total action rate. Place your CTA in the last 5–10 seconds of your video, after the core content has been delivered. Make the benefit clear — not just "follow me," but "follow so you don't miss tomorrow's video." On TikTok, CTAs that reference the next piece of content ("Part 2 drops tomorrow") significantly outperform generic follow requests because they give a specific reason to take action.</p>
        <h2>How This CTA Generator Works With Your Full Content Workflow</h2>
        <p>The highest-performing TikTok content follows a three-part structure: a strong hook in the first 3 seconds (use the Hook Generator), valuable core content, and a specific CTA at the end (this tool). For UGC and ad content, adding a comment sticker overlay on top of this structure creates a fourth layer of social proof that dramatically increases click-through rates.</p>
        <h2>Frequently Asked Questions</h2>
        <h3>Where should I place the CTA in my video?</h3>
        <p>At the end, after you've delivered the core value. Placing it too early (before the hook has done its job) creates friction. Some creators place a soft CTA in the middle and a hard CTA at the end — this works well for longer content.</p>
        <h3>Should I say the CTA out loud or just show it as text?</h3>
        <p>Both, when possible. TikTok is watched both with and without sound, so a spoken CTA + on-screen text maximizes coverage. If you can only choose one, choose spoken — it performs better for follow and comment CTAs.</p>
        <h3>Does begging for follows or likes actually work?</h3>
        <p>Generic asks ("like and subscribe!") perform worse than CTAs with specific reasons. "Follow for the recipe in tomorrow's video" outperforms "follow me" because it gives the viewer a concrete reason to act.</p>
        <h3>Can I use multiple CTAs in one video?</h3>
        <p>Technically yes — but it's not recommended. Viewers who receive two or more CTAs are less likely to act on any of them. Choose the single most important action you want your viewer to take, and focus the entire end of the video on that one thing.</p>
      </section>

      <AdSense slot="cta-generator-bottom" darkMode={isDark} />
      <RelatedArticles current="caption-generator" darkMode={isDark} onNavigate={onNavigate} />
      <SEOFooter onNavigate={onNavigate} darkMode={isDark} />
    </div>
  );
}
