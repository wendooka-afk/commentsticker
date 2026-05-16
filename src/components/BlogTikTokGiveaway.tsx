import { CheckCircle2 } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles, ArticleByline } from './SEOLayout';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function BlogTikTokGiveaway({ darkMode, onNavigate }: GuideProps) {
    const dm = darkMode;
    const card = dm ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm';
    const muted = dm ? 'text-neutral-400' : 'text-neutral-500';

    return (
        <div className={`min-h-screen font-sans ${dm ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={dm} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider">
                        Giveaway Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        How to Run a TikTok Giveaway in 2026: Complete Step-by-Step Guide
                    </h1>
                    <p className={`text-xl font-medium ${muted}`}>
                        Everything you need to know to run a successful <strong className="text-neutral-900 dark:text-white">TikTok giveaway</strong> — from setting the rules and promoting your contest to picking a fair random winner and growing your audience.
                    </p>
                </div>
                <ArticleByline darkMode={dm} role="Content & Editorial Lead · CommentSticker Editorial Team" published="April 14, 2026" reviewed="May 16, 2026" readTime="10 min" />

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

                    {/* Quick Answer */}
                    <section className={`p-6 rounded-2xl mb-8 font-medium text-lg border-l-4 border-emerald-500 ${dm ? 'bg-neutral-900/50 text-neutral-200' : 'bg-emerald-50 text-neutral-800'}`}>
                        <p className="m-0"><strong>Quick Answer:</strong> To run a TikTok giveaway, post a video explaining the prize and entry rules (follow, like, comment), set a clear deadline, then use a free <button onClick={() => onNavigate('guide-tiktok-giveaway-picker')} className="text-emerald-600 dark:text-emerald-400 font-bold underline">TikTok giveaway picker</button> to randomly select a winner from eligible comments. Announce the winner publicly in a follow-up video for maximum transparency and trust.</p>
                    </section>

                    <div className="group overflow-hidden rounded-3xl mb-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                        <img
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1200&auto=format&fit=crop"
                            alt="Gift box representing a social media giveaway prize"
                            className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Why TikTok Giveaways Are So Powerful for Growth</h2>
                        <p>
                            TikTok giveaways are one of the fastest ways to accelerate follower growth, boost engagement, and increase brand awareness — all at the same time. When you run a well-structured giveaway, you essentially transform your existing audience into a recruitment machine: every person who comments and tags a friend acts as a free advertisement reaching their entire network.
                        </p>
                        <p>
                            The TikTok algorithm responds extremely well to sudden spikes in engagement. A giveaway post that generates hundreds of comments in the first few hours will get pushed to the For You Page (FYP) for a much wider audience, creating a compounding snowball effect. Brands and creators who run giveaways consistently report 2x to 10x their usual engagement on giveaway posts.
                        </p>
                        <p>
                            Beyond vanity metrics, giveaways serve a deeper strategic purpose: they force new users to interact with your profile (follow, like, comment), which trains the TikTok algorithm to show your future content to those users. Acquiring a follower through a giveaway entry is often more valuable than an organic follow because the engagement-to-follow action creates a stronger algorithmic signal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Types of TikTok Giveaways</h2>
                        <div className="grid md:grid-cols-2 gap-6 my-6">
                            {[
                                { icon: "💬", title: "Comment-to-Win", desc: "The most common format. Ask followers to comment a specific word, tag a friend, or answer a question. High engagement, easy to manage." },
                                { icon: "👥", title: "Follow + Like", desc: "Require users to follow your account and like the giveaway post. Great for growing your follower count quickly." },
                                { icon: "📲", title: "Duet or Stitch", desc: "Ask users to create a Duet or Stitch with your video. Generates massive reach as each entry creates new content pointing back to you." },
                                { icon: "🏷️", title: "Tag-a-Friend", desc: "Require users to tag 1–3 friends in the comments. Each tag notifies a potential new follower, expanding your reach exponentially." },
                                { icon: "📝", title: "Caption Contest", desc: "Ask followers to come up with the best caption for an image or video. High creativity and strong community engagement." },
                                { icon: "🔁", title: "Share to Story", desc: "Require users to share your post to their story. Increases visibility beyond TikTok's algorithm to the user's existing followers." },
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${card}`}>
                                    <div className="text-2xl mb-2">{item.icon}</div>
                                    <h3 className="font-black text-lg mb-2">{item.title}</h3>
                                    <p className={`text-sm font-medium leading-relaxed ${muted}`}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <AdSense adSlot="7788990011" />

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Step-by-Step: How to Run a TikTok Giveaway</h2>
                        <div className="space-y-5">
                            {[
                                {
                                    step: "1",
                                    title: "Define Your Prize and Budget",
                                    desc: "Choose a prize that is genuinely relevant to your target audience. A $50 gift card or a branded product works better than a generic cash prize because it attracts followers who are actually interested in your niche. The prize value should be proportional to the effort required to enter — high-value prizes justify more complex entry requirements."
                                },
                                {
                                    step: "2",
                                    title: "Set Clear Entry Rules",
                                    desc: "Specify exactly what users must do to enter: follow your account, like the video, comment a specific word or phrase, tag friends. Keep the rules as simple as possible — each additional step reduces participation rates. Display the rules clearly on-screen during the first 5 seconds of your giveaway video."
                                },
                                {
                                    step: "3",
                                    title: "Create an Engaging Giveaway Video",
                                    desc: "Film a high-energy video that clearly shows the prize, explains the rules, and includes a strong call-to-action at the end. Use TikTok trends, trending sounds, and text overlays to maximize reach. Pin the giveaway video to the top of your profile. Add a clear end date in the caption."
                                },
                                {
                                    step: "4",
                                    title: "Promote Across Platforms",
                                    desc: "Share your giveaway video on Instagram Stories, YouTube Community posts, and Twitter/X. If you have an email list or Discord, notify them as well. Cross-platform promotion drives initial engagement spikes that push the TikTok algorithm to distribute your video more widely."
                                },
                                {
                                    step: "5",
                                    title: "Engage With Entries During the Giveaway",
                                    desc: "Reply to comments, heart entries, and create a follow-up video mid-giveaway to maintain momentum. TikTok's algorithm measures ongoing engagement — a post that stays active for 3–5 days will reach far more people than one with a single spike."
                                },
                                {
                                    step: "6",
                                    title: "Pick a Random Winner Fairly",
                                    desc: "Use a free TikTok giveaway picker tool to select the winner randomly. Copy all eligible comments (one per line), paste them into the picker, apply any filters (e.g., must contain required keyword), and pick. Record your screen during the draw for maximum transparency."
                                },
                                {
                                    step: "7",
                                    title: "Announce the Winner Publicly",
                                    desc: "Film a winner announcement video — this is often one of your highest-performing videos because curious followers come back to see if they won. Tag the winner in the video and comments. DM them directly to arrange prize delivery. Always verify the winner meets all entry criteria before sending the prize."
                                },
                            ].map((s) => (
                                <div key={s.step} className={`flex gap-5 p-5 rounded-2xl border ${card}`}>
                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-black text-sm shrink-0 text-white">{s.step}</div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                                        <p className={`text-sm leading-relaxed ${muted}`}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">TikTok Giveaway Rules: What You Must Know</h2>
                        <p>
                            TikTok's Community Guidelines and Terms of Service include specific provisions about promotions and contests. While TikTok is generally permissive about giveaways, there are important rules to follow:
                        </p>
                        <div className={`p-6 rounded-2xl border mt-4 space-y-4 ${card}`}>
                            {[
                                { ok: true, text: "Clearly state that the promotion is not sponsored by, endorsed by, or associated with TikTok." },
                                { ok: true, text: "Include a clear start and end date for the giveaway." },
                                { ok: true, text: "Specify eligibility requirements (age, country, etc.)." },
                                { ok: true, text: "Use a random selection method for winner selection — manual picks are perceived as unfair." },
                                { ok: false, text: "Do not ask users to share content that violates TikTok's Community Guidelines." },
                                { ok: false, text: "Do not require users to purchase something to enter — this turns it into an illegal lottery in many jurisdictions." },
                                { ok: false, text: "Do not make false claims about the prize value or delivery timeline." },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${item.ok ? 'text-green-500' : 'text-red-500'}`} />
                                    <p className={`text-sm font-medium ${item.ok ? '' : 'line-through opacity-60'}`}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="mt-4">
                            For giveaways involving significant prize values (typically over $600 in the US), consult a legal professional as additional tax and reporting obligations may apply depending on your jurisdiction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">How to Pick a Fair Random Winner</h2>
                        <p>
                            Manual winner selection — scrolling through comments and pointing to one — is perceived as dishonest by your audience, even if you genuinely intended to be random. The only way to maintain complete trust and transparency is to use a dedicated random selection tool.
                        </p>
                        <p>
                            Our free <button onClick={() => onNavigate('guide-tiktok-giveaway-picker')} className="text-pink-500 font-bold hover:underline">TikTok Giveaway Picker</button> lets you:
                        </p>
                        <ul className="list-disc pl-6 mt-3 space-y-2">
                            <li>Paste all comments (one per line) directly into the tool</li>
                            <li>Filter by keyword to ensure only valid entries are included (e.g., entries must contain "🎁")</li>
                            <li>Remove duplicate entries so the same user can't win twice</li>
                            <li>Pick 1 to 5 winners simultaneously</li>
                            <li>Display a live animated draw you can record for your announcement video</li>
                        </ul>
                        <div className="mt-6">
                            <button
                                onClick={() => onNavigate('guide-tiktok-giveaway-picker')}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
                            >
                                Try the Free Giveaway Picker →
                            </button>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Common TikTok Giveaway Mistakes to Avoid</h2>
                        <div className="space-y-4">
                            {[
                                { mistake: "Setting too many entry requirements", fix: "More than 3 entry steps drastically reduces participation. Keep it to: follow + like + comment." },
                                { mistake: "No end date or vague deadline", fix: "Always state a specific date and time (with timezone). Urgency drives action." },
                                { mistake: "Prize not relevant to your niche", fix: "A fitness creator giving away a generic Amazon gift card will attract followers with no interest in fitness content." },
                                { mistake: "No winner announcement video", fix: "This is free content. Your followers will return to see if they won — a winner reveal is consistently one of the most-watched videos after a giveaway." },
                                { mistake: "Ignoring comments during the giveaway", fix: "Replying to entries with a simple ❤️ or reply keeps the comment section active and signals to the algorithm that the post is valuable." },
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${card}`}>
                                    <p className="font-black text-red-500 mb-1">✗ {item.mistake}</p>
                                    <p className={`text-sm font-medium ${muted}`}>✓ {item.fix}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                { q: "How many followers do I need to run a TikTok giveaway?", a: "None. There is no minimum follower count required to run a giveaway on TikTok. In fact, giveaways are one of the most effective strategies for accounts with under 1,000 followers to accelerate growth." },
                                { q: "Are TikTok giveaways legal?", a: "Yes, in most countries, giveaways where entry is free (no purchase necessary) are legal. However, specific rules vary by jurisdiction. Always include official terms, eligibility requirements, and a disclaimer that the promotion is not affiliated with TikTok." },
                                { q: "How long should a TikTok giveaway last?", a: "5 to 7 days is the sweet spot for most creators. Too short (under 48 hours) and you miss the algorithm's distribution window. Too long (over 2 weeks) and momentum dies." },
                                { q: "Can I ask people to follow me as a giveaway requirement?", a: "Yes. 'Follow to enter' is a standard and accepted practice on TikTok. However, TikTok's algorithm is smart enough to detect if a large number of your followers never engage — so quality entries (genuinely interested followers) always outperform quantity." },
                                { q: "How do I prove the winner was picked randomly?", a: "Record your screen while using a random picker tool and include that footage in your winner announcement video. This is the gold standard for transparent giveaway draws." },
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${dm ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}>
                                    <h4 className="font-black mb-2">{item.q}</h4>
                                    <p className={`text-sm font-medium leading-relaxed ${muted}`}>{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <RelatedArticles
                        ids={['guide-tiktok-giveaway-picker', 'guide-tiktok-comment-picker', 'blog-tiktok-username-ideas']}
                        onNavigate={onNavigate}
                        darkMode={dm}
                    />
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
