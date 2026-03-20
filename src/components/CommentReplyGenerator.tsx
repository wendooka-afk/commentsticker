import { useState } from 'react';
import { MessageCircle, Copy, Check, RefreshCw } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

interface Props { darkMode: boolean; onNavigate: (page: any) => void; }

// ── Data ─────────────────────────────────────────────────────────────────────

const COMMENT_TYPES = [
  { id: 'compliment',  label: 'Compliment',       emoji: '🥰', desc: 'Positive praise' },
  { id: 'question',   label: 'Question',          emoji: '❓', desc: 'Viewer asks you something' },
  { id: 'criticism',  label: 'Criticism',         emoji: '😤', desc: 'Negative / disagreement' },
  { id: 'collab',     label: 'Collab Request',    emoji: '🤝', desc: 'Partnership DM' },
  { id: 'duet',       label: 'Duet / Stitch',     emoji: '🎬', desc: 'Content request' },
  { id: 'funny',      label: 'Funny / Banter',    emoji: '😂', desc: 'Humorous comment' },
  { id: 'sales',      label: 'Sales / CTA',       emoji: '💸', desc: 'Price or product question' },
  { id: 'hater',      label: 'Hater',             emoji: '🙄', desc: 'Dismissive / rude' },
] as const;
type CommentTypeId = typeof COMMENT_TYPES[number]['id'];

const TONES = [
  { id: 'warm',         label: 'Warm & Friendly',    emoji: '😊' },
  { id: 'professional', label: 'Professional',        emoji: '💼' },
  { id: 'funny',        label: 'Funny & Playful',     emoji: '😂' },
  { id: 'confident',    label: 'Bold & Confident',    emoji: '💪' },
] as const;
type ToneId = typeof TONES[number]['id'];

const REPLIES: Record<CommentTypeId, Record<ToneId, string[]>> = {
  compliment: {
    warm:         ['Thank you so much, this genuinely made my day 🥹 Comments like yours are the reason I keep creating', 'You just made me smile — thank you for taking the time to write this 💛', 'This comment means more than you know. Seriously, thank you 🙏', 'Aww, I really appreciate you! Keep coming back — I post every week 🫶', 'You\'re too kind! So glad this resonated with you ✨'],
    professional: ['Thank you — I\'m glad this content was valuable to you. Make sure to follow for more.', 'I appreciate the feedback. More content like this coming weekly — don\'t miss it.', 'Thank you for your kind words. This topic is something I cover in depth on this channel.', 'Grateful for the support. I consistently post on [topic] — feel free to explore the other videos.', 'Thank you. Your engagement helps this content reach more people who need it.'],
    funny:        ['You passed the vibe check ✅ officially one of my favorite commenters now 😂', 'Okay you\'re my new favorite person in the comments section 👑', 'I read this and immediately forgot every bad thing that happened today 😭 thank you', 'This made my day AND my week. You get a gold star 🌟 welcome to the fan club', 'I printed this comment and put it on my fridge. Okay not really but I thought about it 😂'],
    confident:    ['Appreciate it — and this is just the beginning. Stay tuned.', 'Thank you. Consistency builds this. Come back in 3 months and watch the growth.', 'Glad you caught this one. It gets better — follow so you don\'t miss what\'s next.', 'Appreciate the support. The work speaks for itself.', 'Thank you — your support fuels the next video 🔥'],
  },
  question: {
    warm:         ['Great question! I\'ll actually cover this in my next video — follow so you don\'t miss it 🙏', 'Love this question. Short answer: [add your answer]. Full breakdown is coming very soon!', 'I\'ve been getting this a lot — so I\'m making a dedicated video about it. Stay tuned! 👀', 'Happy you asked! The key thing is [add your answer]. Let me know if that helps 💛', 'Genuinely such a good question. The answer surprised me too when I learned it — check my next video!'],
    professional: ['Good question. The short answer is [add answer]. I\'ll be covering this in detail in an upcoming video.', 'I get this question often. Here\'s the quick take: [add answer]. Full content coming soon.', 'Great question — this is actually a topic I cover in my [video/guide]. Link in bio.', 'The answer depends on [variable], but in general: [add answer]. Happy to elaborate.', 'This is a great topic. I\'ll address it in the next video. Make sure you\'re following.'],
    funny:        ['Okay so glad you asked because I almost made a video about this 3 times and kept getting distracted 😭 Short answer: [add your answer]!', 'The fact that you asked this at exactly the right time is giving fate 😂 I\'m literally filming this answer this week', 'I\'ve been WAITING for someone to ask this 😤 Okay so here\'s the deal: [add your answer]', 'This comment activated my inner professor 😂 buckle up: [add your answer]', 'THANK YOU for asking this. My brain has had thoughts about this for months. [add your answer] — more coming in the next video!'],
    confident:    ['Great question. Quick answer: [add your answer]. Full breakdown coming — follow so you\'re there when I post it.', 'I hear this a lot. Here\'s what most people miss: [add your answer]. Video on this dropping soon.', 'Good. This is exactly what I want people asking. The answer: [add your answer].', 'Ask and you shall receive — working on a full video about this. [add your answer] in the meantime.', 'This is one of the most important questions in [niche]. The answer: [add your answer]. More coming.'],
  },
  criticism: {
    warm:         ['I hear you — and I genuinely appreciate you sharing that perspective. I might not have explained it as clearly as I could have 🙏', 'That\'s a fair point, and I want to get this right. Can you tell me more about what didn\'t land for you?', 'Thank you for being honest — I actually take feedback seriously and this is useful 💛', 'I see where you\'re coming from. Different approaches work for different people — what has worked for you?', 'You\'re not wrong to push back on that. I\'ll think about how to address it better in future content.'],
    professional: ['I appreciate the feedback. I\'d push back on [specific point] for this reason: [add your reasoning]. Open to the discussion.', 'Fair critique. For context, the approach I mentioned works specifically for [context]. Different situations call for different methods.', 'Thank you for sharing your perspective. The data I referenced supports [your point], but I understand your experience may differ.', 'I respect the disagreement. My position on this is [add position] based on [add reason]. Happy to discuss further.', 'Noted. My intent was [intent], but I take the point that the execution could be clearer.'],
    funny:        ['Bold of you to assume I don\'t already cry about this at 2am 😂 but actually let me address that real quick —', 'Okay I respect the audacity 😭 here\'s the thing though: [add your response]', 'I love when people come to my comments to keep me honest 😂 fair point actually — [add your response]', 'This is the accountability I didn\'t know I needed 😤 okay so here\'s my defense: [add your response]', 'Challenge accepted 😤 here\'s where I respectfully disagree: [add your response]'],
    confident:    ['Respectfully, I\'ll disagree on this. Here\'s why: [add your reasoning].', 'That\'s one way to see it. Here\'s another: [add your point]. I stand by what I said.', 'I hear you. My position stays the same because: [add reason]. But I appreciate you engaging.', 'Fair enough. The nuance here is [add nuance] — which changes the conclusion. But valid pushback.', 'Noted. I\'ll address this more clearly next time, but the core point stands: [add point].'],
  },
  collab: {
    warm:         ['Thank you so much for thinking of me! 🙏 The best way to reach me is through the link in my bio — would love to hear your idea 💛', 'Really appreciate this! DM me through my bio link and let\'s see if there\'s a fit 😊', 'That\'s so kind of you! I\'m always open to the right partnerships — send me details through my contact link 🫶', 'Love the enthusiasm! I review all collaboration requests through my email (link in bio) — looking forward to hearing from you!', 'Thank you! If you reach out through my bio, I\'ll get back to you — let\'s talk!'],
    professional: ['Thank you for reaching out. For collaboration inquiries, please use the contact link in my bio. I review all proposals there.', 'I appreciate the interest. My collaboration process starts with the contact form in my bio — feel free to send details there.', 'Thank you. For brand and creator partnerships, my email is in my bio. Please include details about your project.', 'For any partnership opportunities, the best way to reach me is through the link in my bio. I\'ll review and get back to you.', 'I receive collaboration requests through my contact link (bio). If it\'s a good fit, I\'ll follow up within a few days.'],
    funny:        ['Okay wait I need you to DM me RIGHT NOW 😭 this has potential and I\'m not letting it go', 'The universe sent you to my comments at just the right time 😂 link in bio, let\'s make something happen!', 'WAIT. Tell me more 👀 DM me through my bio before my attention span ends and I forget 😂', 'I\'m going to need you to take this to my DMs immediately 😤 link in bio, go now, don\'t make me regret this', 'Okay this might be the best comment I got today 😂 hit my bio link and let\'s actually talk about this'],
    confident:    ['Appreciate the interest. If it\'s the right fit, let\'s make it happen. Details through my bio link.', 'I\'m selective with collaborations but I\'m open. Send me a proposal through the contact in my bio.', 'Depends on the project. If you think there\'s a real alignment, reach out through my bio — I\'ll review it.', 'I value partnerships that actually serve my audience. If that\'s what you\'re proposing, send details through my bio.', 'I\'m open to the right opportunities. Hit the link in my bio with specifics and I\'ll get back to you.'],
  },
  duet: {
    warm:         ['I love this idea! I\'ll add it to my list 🎬 make sure you\'re following so you don\'t miss it if I do it 💛', 'That\'s a really fun concept — I might just do that! Follow so you\'re notified if I post it 🙏', 'You just gave me an idea and I kind of love it 😄 I\'ll think about this, thank you!', 'Ohh interesting suggestion! I\'ve noted it — if enough people request it I\'ll definitely make it 🫶', 'I appreciate content ideas from my audience! I\'ll see if I can make it work 🙏'],
    professional: ['Interesting suggestion — I\'ll consider it for upcoming content. Make sure you\'re following to see if I pick it up.', 'Thank you for the content suggestion. If this gets enough traction in the comments, I\'ll prioritize it.', 'I take content requests from my audience seriously. I\'ll evaluate this and possibly include it in an upcoming video.', 'Noted — this is a good idea. I\'ll consider it for the content calendar. Stay tuned.', 'Appreciate the suggestion. I\'ll review it alongside my planned content and see where it fits.'],
    funny:        ['I KNEW someone was going to suggest this and I have been WAITING 😂 okay adding to the list', 'You\'ve been sent by the algorithm to give me good ideas and I\'m here for it 😭 noted!', 'Wait this is actually genius and I\'m mildly upset I didn\'t think of it first 😤 putting it on the list', 'Okay your brain is running differently and I respect that 😂 adding this to the queue immediately', 'This is going on the content board RIGHT NOW 😂 follow so you can see the chaos when I actually make it'],
    confident:    ['Good suggestion. If it fits the direction I\'m taking the content, I\'ll do it. Stay tuned.', 'I hear you. I\'ll add it to the list — follow to see if it makes the cut.', 'Noted. Content that serves the audience gets made. This might qualify — follow to find out.', 'That\'s actually a solid idea. Let me think about the angle. Follow so you don\'t miss it.', 'I\'ll consider it. If I do it, it\'ll be better than whatever you\'re imagining 😤 follow to see.'],
  },
  funny: {
    warm:         ['Okay you genuinely made me laugh out loud and that doesn\'t happen easily 😂 you\'re welcome here anytime', 'This comment has been living in my head rent-free since I read it 😭 please never leave', 'I needed this today more than you know 😂 thank you for existing', 'You have absolutely no idea how much I needed this comment today 😭💛', 'The comment section wouldn\'t be the same without people like you 😄 keep coming'],
    professional: ['Ha — genuinely appreciate the humor. Thank you for engaging with the content.', 'Fair. And valid. Comments like this are why I enjoy this community.', 'I appreciate the creative engagement 😄 glad the content is landing well enough to inspire commentary.', 'Noted, and entertaining. Thank you for being part of the community.', 'I\'ll take that as a positive sign that the content is resonating 😄'],
    funny:        ['Okay you\'re officially my favorite person on the internet today and that is a REAL award 😭', 'I don\'t know who you are but you\'re getting a character arc in my next video 😂', 'I\'m putting this in my highlight reel of life moments 😭 thank you for your service', 'The audacity combined with the accuracy 😭💀 I can\'t even be upset', 'Please be aware you just made me snort laugh in a public place 😤 rude'],
    confident:    ['Appreciate it 😄 the comment section delivers sometimes.', 'I\'ll allow it. Carry on.', 'Solid contribution to the comments. Well done.', 'That\'s genuinely funny. Respect.', 'I came here to post content and stayed for the comments. Well done.'],
  },
  sales: {
    warm:         ['Thank you for your interest! 💛 All the details are in the link in my bio — I think you\'ll find exactly what you\'re looking for there', 'So glad you\'re interested! You can find everything (pricing, what\'s included, how it works) in my bio link 🙏', 'I appreciate you asking! Head to the link in my bio for the full info — or DM me and I\'ll answer any specific questions 💛', 'Happy to help! All the details are at the link in my bio. Let me know if you have questions after checking it out 🫶', 'Thank you for your interest! The link in my bio has all the details. Feel free to DM me with any specific questions.'],
    professional: ['All pricing and details are available at the link in my bio. Feel free to DM if you have questions after reviewing.', 'Thank you for your interest. Full details including pricing are in the link in my bio. DMs are open for specific inquiries.', 'The complete information is in my bio link. If you have questions after reviewing it, I\'m happy to help.', 'All product information is available through the bio link. For custom inquiries, please use the contact form there.', 'For pricing and availability, please see the link in my bio. I respond to specific questions via DM.'],
    funny:        ['My bio link just felt your energy and said "welcome" 😂 go check it out, it has all the answers', 'OKAY so funny you ask because the link in my bio is literally waiting for you right now 😭 go go go', 'The universe aligned your comment with my bio link existing 😂 go check — it has everything you need', 'I feel like this was fate 😤 link in bio has all the info, and yes it\'s worth it, and yes you want it', 'This is the sign you were looking for 😂 bio link, go, all details are there, you\'re welcome'],
    confident:    ['All details in the bio. Worth it — check it out.', 'Bio link. Full breakdown there. DM if you have specific questions.', 'Everything\'s in the bio. Let me know if you have questions after reviewing.', 'Link in bio. If it\'s right for you, you\'ll know when you read it.', 'Bio link has everything. If you have to ask if it\'s worth it, go read it first.'],
  },
  hater: {
    warm:         ['I appreciate you taking the time to engage — genuinely 🙏 If you have a specific concern I got wrong, I\'m all ears. If not, I hope your day gets better 💛', 'I hear you. If there\'s something specific I could have done better, let me know — I take feedback seriously. Otherwise, thank you for watching 🙏', 'Not the reaction I was going for, but I appreciate you being here. If you ever want to share what specifically didn\'t work for you, I\'m genuinely open to it 💛', 'I\'m sorry it didn\'t land for you. Everyone\'s in different places and that\'s okay. I hope you find content that serves you better 🙏', 'Noted. I\'d love to understand what specifically you disagree with — it\'s the best way I improve. If not, I respect that too 💛'],
    professional: ['I appreciate the engagement. If there\'s a specific factual error, I\'d genuinely like to know and correct it. Otherwise, I stand by the content.', 'I hear the criticism. If you can be specific, I\'ll take it seriously. Vague negativity doesn\'t help me improve.', 'Thank you for the response. If there\'s a substantive point to address, I\'m open to the conversation.', 'Noted. Specific critiques are always welcome — they make the content better. Generic ones I\'ll let stand on their own.', 'I appreciate you engaging. If you have a specific point to raise, I\'ll address it directly.'],
    funny:        ['I respect the commitment to disliking things on the internet 😂 takes real dedication, appreciate you', 'You watched the whole video AND came to the comments. You\'re my most dedicated fan and I\'m choosing to see it that way 😤', 'The algorithm brought you here, the content kept you long enough to comment, and now we\'re bonding. Full circle. 😂', 'I\'ve decided this is actually a compliment and I\'m moving forward with my day 😌', 'Thank you for the engagement 😄 every comment feeds the algorithm and I\'m choosing to be grateful'],
    confident:    ['Respectfully, I disagree. But the comment is appreciated.', 'I\'ve heard the concern. The content stands as is.', 'Bold take. I\'m comfortable with the disagreement.', 'Noted. I\'ll let the content speak for itself.', 'Thank you for engaging. I\'ll keep doing what I do.'],
  },
};

// ── UI ────────────────────────────────────────────────────────────────────────

function ReplyCard({ reply, index, darkMode }: { reply: string; index: number; darkMode: boolean }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={`rounded-2xl p-4 border flex items-start gap-3 transition-all hover:scale-[1.01] ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200 shadow-sm'}`}>
      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${darkMode ? 'bg-teal-500/20 text-teal-400' : 'bg-teal-100 text-teal-600'}`}>{index + 1}</span>
      <p className={`flex-1 text-sm leading-relaxed ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>{reply}</p>
      <button
        onClick={() => { navigator.clipboard.writeText(reply); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
        className={`shrink-0 p-1.5 rounded-lg transition-all ${copied ? 'bg-emerald-500 text-white' : darkMode ? 'hover:bg-neutral-700 text-neutral-400 hover:text-neutral-100' : 'hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700'}`}
        title="Copy reply"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function CommentReplyGenerator({ darkMode, onNavigate }: Props) {
  const [commentType, setCommentType] = useState<CommentTypeId>('compliment');
  const [tone, setTone] = useState<ToneId>('warm');
  const [replies, setReplies] = useState<string[]>([]);
  const [generated, setGenerated] = useState(false);

  const generate = () => {
    const pool = REPLIES[commentType][tone];
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setReplies(shuffled.slice(0, 5));
    setGenerated(true);
  };

  const copyAll = () => navigator.clipboard.writeText(replies.map((r, i) => `${i + 1}. ${r}`).join('\n'));

  const isDark = darkMode;
  const bg = isDark ? 'bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900';
  const card = isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';
  const muted = isDark ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className={`min-h-screen ${bg}`}>
      <SEOHeader onNavigate={onNavigate} darkMode={isDark} />

      {/* Hero */}
      <section className="px-4 pt-14 pb-10 text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/10 text-teal-500 border border-teal-500/20 mb-4">
          <MessageCircle className="w-3.5 h-3.5" /> Free Comment Reply Generator
        </div>
        <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight">
          Comment Reply <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">Generator</span>
        </h1>
        <p className={`text-base ${muted} max-w-lg mx-auto`}>
          Generate perfect replies to any TikTok comment — compliments, questions, criticism, or haters. Choose your tone and get 5 ready-to-post responses.
        </p>
      </section>

      <AdSense adSlot="reply-generator-top" />

      {/* Generator */}
      <section className="px-4 pb-10 max-w-2xl mx-auto">
        <div className={`rounded-3xl border p-6 sm:p-8 ${card}`}>

          {/* Comment type */}
          <div className="mb-6">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${muted}`}>1. Type of Comment to Reply To</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COMMENT_TYPES.map(c => (
                <button key={c.id} onClick={() => setCommentType(c.id)}
                  className={`flex flex-col gap-0.5 px-3 py-3 rounded-xl border text-left transition-all ${commentType === c.id ? 'border-teal-500 bg-teal-500/10' : isDark ? 'border-neutral-700 hover:border-neutral-500' : 'border-neutral-200 hover:border-neutral-300'}`}>
                  <span className="text-lg">{c.emoji}</span>
                  <span className={`text-xs font-bold ${commentType === c.id ? 'text-teal-500' : isDark ? 'text-neutral-200' : 'text-neutral-700'}`}>{c.label}</span>
                  <span className={`text-xs ${muted}`}>{c.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="mb-8">
            <label className={`block text-xs font-bold uppercase tracking-widest mb-3 ${muted}`}>2. Your Reply Tone</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map(t => (
                <button key={t.id} onClick={() => setTone(t.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all ${tone === t.id ? 'border-teal-500 bg-teal-500/10 text-teal-500' : isDark ? 'border-neutral-700 hover:border-neutral-500 text-neutral-300' : 'border-neutral-200 hover:border-neutral-300 text-neutral-600'}`}>
                  <span>{t.emoji}</span> {t.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={generate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-black text-lg shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" /> Generate 5 Replies
          </button>
        </div>
      </section>

      {/* Results */}
      {generated && replies.length > 0 && (
        <section className="px-4 pb-14 max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className={`text-lg font-black ${isDark ? 'text-neutral-100' : 'text-neutral-800'}`}>Your Replies 💬</h2>
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
            {replies.map((reply, i) => <ReplyCard key={i} reply={reply} index={i} darkMode={isDark} />)}
          </div>
          <div className={`mt-6 rounded-2xl border p-4 ${isDark ? 'bg-neutral-800/50 border-neutral-700' : 'bg-teal-50 border-teal-200'}`}>
            <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-teal-800'}`}>
              💡 <strong>Tip:</strong> Replying to your comments boosts your video in TikTok's algorithm. Replies that generate additional comments are even more powerful. Pair with a{' '}
              <button onClick={() => onNavigate('generator')} className="text-teal-600 hover:underline font-bold">comment sticker</button>
              {' '}on your next video to keep the engagement loop going.
            </p>
          </div>
        </section>
      )}

      <AdSense adSlot="reply-generator-mid" />

      {/* SEO */}
      <section className={`px-4 py-16 max-w-3xl mx-auto prose ${isDark ? 'prose-invert' : ''} prose-sm max-w-none`}>
        <h2>What is a TikTok Comment Reply Generator?</h2>
        <p>A comment reply generator is a free tool that helps TikTok creators respond to comments on their videos faster and more effectively. Instead of staring at a blank reply box, you select the type of comment you received (compliment, question, criticism, hater, etc.) and your preferred tone — and get 5 ready-to-copy replies instantly. It's especially useful for creators who receive high comment volume and want to maintain consistent engagement without spending hours in their comments section.</p>
        <h2>Why Replying to TikTok Comments Matters for Your Growth</h2>
        <p>Replying to comments does three things for your TikTok account. First, it signals to the algorithm that your content generates meaningful interaction — not just passive views. Comments + replies = conversation, which TikTok values heavily in its distribution model. Second, replies increase the total comment count on your video, which is a ranking signal. Third, thoughtful replies build community loyalty: viewers who feel seen are more likely to become repeat viewers, followers, and eventually customers.</p>
        <h2>How to Reply to Each Type of TikTok Comment</h2>
        <p><strong>Compliments:</strong> Don't just say "thank you." Use compliments as an opportunity to invite the viewer back ("follow for more," "more content like this coming"). <strong>Questions:</strong> Treat every question as a content idea. Either answer briefly in the reply and promise a full video, or invite the commenter to DM you. <strong>Criticism:</strong> Engage constructively — ask for specifics, acknowledge valid points, defend your position calmly. Never delete or ignore criticism. <strong>Haters:</strong> Respond with confidence or humor, never anger. A calm, witty response almost always wins the room. <strong>Sales/CTA questions:</strong> Direct to your bio link immediately and keep the reply short and clear.</p>
        <h2>Choosing the Right Tone for Your Brand</h2>
        <p>Your reply tone is an extension of your personal brand. <strong>Warm & Friendly</strong> builds community and is ideal for lifestyle, beauty, and personal content. <strong>Professional</strong> works well for finance, business, and educational content. <strong>Funny & Playful</strong> is best for comedy and entertainment creators — it also works surprisingly well for criticism. <strong>Bold & Confident</strong> suits fitness, business, and opinion-forward creators who have a strong POV.</p>
        <h2>Frequently Asked Questions</h2>
        <h3>How often should I reply to comments on TikTok?</h3>
        <p>Reply within the first 1–2 hours of posting for maximum algorithmic effect. After that, aim to reply to at least 10–20% of your comments, prioritizing questions and the most-liked comments.</p>
        <h3>Should I reply to haters and negative comments?</h3>
        <p>Yes — but strategically. A well-crafted reply to a negative comment often gets more engagement than the comment itself. Use humor or calm confidence. Never reply with anger or delete legitimate criticism.</p>
        <h3>Does replying to comments help TikTok growth?</h3>
        <p>Yes. TikTok counts creator replies as comments, which boosts the overall comment count of your video. Higher comment counts are a positive signal in TikTok's distribution algorithm.</p>
        <h3>Can I use these replies on Instagram or YouTube?</h3>
        <p>Yes. All replies in this generator are platform-agnostic and work on Instagram Reels, YouTube Shorts, LinkedIn, and any other comment section.</p>
      </section>

      <AdSense adSlot="reply-generator-bottom" />
      <RelatedArticles ids={["guide-tiktok-comment-generator","hashtag-generator","caption-generator"]} darkMode={isDark} onNavigate={onNavigate} />
      <SEOFooter onNavigate={onNavigate} />
    </div>
  );
}
