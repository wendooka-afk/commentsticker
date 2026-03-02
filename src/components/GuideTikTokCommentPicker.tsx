import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function GuideTikTokCommentPicker({ darkMode, onNavigate }: GuideProps) {
    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        Free Tools
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        TikTok Comment Picker: Pick a Random Comment Winner (Free & Online)
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        Looking for a free <span className="font-bold text-neutral-900 dark:text-white">TikTok comment picker</span>? This complete guide explains how to fairly pick a random winner from your TikTok comments — plus the best free tools available in 2026.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    {/* Quick Answer */}
                    <section className={`p-6 rounded-2xl mb-8 font-medium text-lg border-l-4 border-pink-500 ${darkMode ? 'bg-neutral-900/50 text-neutral-200' : 'bg-pink-50 text-neutral-800'}`}>
                        <p className="m-0"><strong>Quick Answer:</strong> A TikTok comment picker is a free tool that connects to a TikTok video URL, loads all the comments, and randomly selects one (or multiple) winners. Since TikTok's API is restricted, the most reliable method is using a dedicated comment picker app or a manual random selection tool. The most popular free options are <strong>Commentpicker.com</strong>, <strong>EasyPromos</strong>, and browser-based random pickers.</p>
                    </section>

                    {/* Hero */}
                    <div className="group overflow-hidden rounded-3xl mb-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                            alt="Group of people on smartphones participating in a TikTok giveaway"
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">What Is a TikTok Comment Picker?</h2>
                        <p>
                            A <strong>TikTok comment picker</strong> (also called a <strong>random TikTok comment picker</strong> or <strong>TikTok comment picker online</strong>) is a tool designed to automatically pick one or more random comments from a TikTok video. It is primarily used for:
                        </p>
                        <ul className="list-disc list-inside space-y-2 my-4">
                            <li><strong>Running TikTok giveaways and contests</strong> — picking a winner from all participants who commented</li>
                            <li><strong>Audience engagement campaigns</strong> — randomly selecting a commenter to feature or reward</li>
                            <li><strong>Community-building</strong> — adding an element of luck and fairness to creator promotions</li>
                        </ul>
                        <p>
                            Because TikTok does not have a built-in "pick a random comment" feature, creators rely on third-party tools to handle this process fairly and transparently.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">The Best Free TikTok Comment Pickers in 2026</h2>
                        <p>Here is a detailed comparison of the most popular free TikTok comment picker tools available today:</p>

                        <div className="space-y-6 my-8">
                            {[
                                {
                                    rank: "1",
                                    name: "Commentpicker.com",
                                    tag: "Best Overall",
                                    tagColor: "bg-pink-500",
                                    desc: "The most well-known free TikTok comment picker online. It loads comments directly from a public TikTok video URL, lets you filter by keywords or hashtags, exclude duplicate commenters, and pick one or multiple random winners. Results are displayed with a satisfying animation. Works entirely in the browser with no account required.",
                                    pros: ["No login needed", "Filters duplicates", "Multi-winner selection", "Shareable results link"],
                                    cons: ["Requires a public TikTok video", "Limited to ~500 comments on free plan"]
                                },
                                {
                                    rank: "2",
                                    name: "EasyPromos",
                                    tag: "Best for Brands",
                                    tagColor: "bg-blue-500",
                                    desc: "A professional giveaway platform that includes a TikTok random comment picker as part of a broader contest management suite. Generates a certificate of validity — ideal for brands that need to prove fairness to their audience or for legal compliance.",
                                    pros: ["Certificate of validity", "Anti-spam filters", "Multi-platform support", "Legal compliance features"],
                                    cons: ["Paid plans for advanced features", "Overkill for small creators"]
                                },
                                {
                                    rank: "3",
                                    name: "Picker.tool",
                                    tag: "Simplest Option",
                                    tagColor: "bg-green-500",
                                    desc: "A lightweight, no-frills free TikTok comment picker. Paste the video URL, wait for it to load comments, and click 'Pick Winner'. Very fast and works well for videos with fewer than 200 comments.",
                                    pros: ["Extremely fast", "100% free", "No account needed", "Mobile-friendly"],
                                    cons: ["No filtering options", "Limited to smaller comment counts"]
                                }
                            ].map((tool) => (
                                <div key={tool.rank} className={`p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className={`px-2 py-0.5 rounded-full text-xs font-bold text-white ${tool.tagColor}`}>{tool.tag}</span>
                                                <h3 className="text-xl font-black">{tool.name}</h3>
                                            </div>
                                        </div>
                                        <div className="text-3xl font-black text-pink-500/20">#{tool.rank}</div>
                                    </div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">{tool.desc}</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-green-500 mb-2">✓ Pros</p>
                                            <ul className="space-y-1">
                                                {tool.pros.map((p, i) => <li key={i} className="text-sm text-neutral-500 dark:text-neutral-400">{p}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-red-400 mb-2">✗ Cons</p>
                                            <ul className="space-y-1">
                                                {tool.cons.map((c, i) => <li key={i} className="text-sm text-neutral-500 dark:text-neutral-400">{c}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* AdSense */}
                    <div className="my-10 w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden">
                        <AdSense adSlot="3344556677" />
                    </div>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">How to Pick a Random TikTok Comment Winner: Step-by-Step</h2>
                        <p>Here is the full process for running a fair, transparent TikTok comment giveaway using a free comment picker:</p>
                        <div className="space-y-4 my-8">
                            {[
                                {
                                    step: "1",
                                    title: "Make Sure Your TikTok Video is Public",
                                    desc: "Comment pickers require access to your video's public comment section. If the video is private or has comments disabled, the tool won't be able to load the entries."
                                },
                                {
                                    step: "2",
                                    title: "Copy Your TikTok Video URL",
                                    desc: "Go to the video you want to pick a comment from. On the TikTok app, tap 'Share' → 'Copy Link'. On desktop, copy the URL from your browser's address bar."
                                },
                                {
                                    step: "3",
                                    title: "Open Your Preferred Comment Picker Tool",
                                    desc: "Navigate to your chosen tool (e.g., Commentpicker.com). Paste your TikTok video URL into the input field and click 'Load Comments'. The tool fetches all comments from the video."
                                },
                                {
                                    step: "4",
                                    title: "Set Your Filters (Optional)",
                                    desc: "If your giveaway required a specific action (e.g., tagging a friend, using a hashtag), use the filter option to only include comments that contain those keywords. Enable 'Remove duplicates' to prevent the same user from winning if they commented multiple times."
                                },
                                {
                                    step: "5",
                                    title: "Click 'Pick a Winner' and Record It",
                                    desc: "Hit the pick button. A random winner is selected. Screenshot or screen-record the result for proof of fairness. Announce the winner in a TikTok reply or stitched video."
                                }
                            ].map((s) => (
                                <div key={s.step} className={`flex gap-5 p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-black text-sm shrink-0 text-white">{s.step}</div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{s.title}</h3>
                                        <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Tips for a High-Engagement TikTok Comment Giveaway</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {[
                                { icon: "📣", title: "Make the Entry Action Simple", desc: "The best performing giveaways ask for a single, low-friction action: 'Comment your favourite emoji to enter.' More complexity = fewer entries." },
                                { icon: "⏰", title: "Set a Clear Deadline", desc: "Always specify when the giveaway closes and when you'll pick the winner. For TikTok, 24–72 hour windows generate the most urgency-driven comments." },
                                { icon: "📸", title: "Announce the Winner in a New Video", desc: "Record a reaction video of you using the comment picker live on screen and stitching the winner's comment. This builds massive trust and drives participation in future giveaways." },
                                { icon: "🔁", title: "Ask for a Tag + Follow", desc: "Add 'Tag a friend who deserves this' as a bonus entry mechanic. Each tagged person sees the video in notifications, generating an organic amplification loop." }
                            ].map((tip, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <div className="text-2xl mb-2">{tip.icon}</div>
                                    <h4 className="font-black mb-1">{tip.title}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Frequently Asked Questions — TikTok Comment Picker</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Is there a free TikTok comment picker online?",
                                    a: "Yes. Commentpicker.com, Picker.tool, and EasyPromos all offer free TikTok random comment picking. Commentpicker.com is the most feature-rich free option and requires no account creation."
                                },
                                {
                                    q: "Why can't I pick a random comment directly on TikTok?",
                                    a: "TikTok does not have a native built-in 'pick random winner' feature as of 2026. To run a fair, verifiable giveaway, creators rely on third-party TikTok comment picker tools that access the public comment API."
                                },
                                {
                                    q: "Does a TikTok comment picker work on private videos?",
                                    a: "No. Comment pickers require the video to be set to 'Public'. Private, friends-only, or 'only me' videos cannot have their comments scraped by third-party tools."
                                },
                                {
                                    q: "Can I pick multiple winners from TikTok comments?",
                                    a: "Yes, most professional comment pickers (including Commentpicker.com and EasyPromos) allow you to select multiple winners in a single draw. You can specify exactly how many random winners you want to select."
                                },
                                {
                                    q: "What is a 'comment picker TikTok ID'?",
                                    a: "Some comment pickers ask you to enter the TikTok video ID (a long numeric string in the URL) rather than the full URL. You can find the video ID in your browser address bar: it's the number after '/video/' in the URL (e.g., tiktok.com/@user/video/1234567890123)."
                                }
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}>
                                    <h4 className="font-black mb-2">{item.q}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Cross-link CTA */}
                    <section className={`p-8 rounded-3xl text-center ${darkMode ? 'bg-gradient-to-br from-pink-500/20 to-orange-500/10 border border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100'}`}>
                        <h2 className="text-2xl font-black mb-3">Also Looking for a TikTok Comment Sticker Generator?</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
                            Create a pixel-perfect, transparent PNG TikTok comment to overlay on your videos — free, no watermark, instant download.
                        </p>
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-4 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/20"
                        >
                            Try the Free Comment Sticker Generator →
                        </button>
                    </section>
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
