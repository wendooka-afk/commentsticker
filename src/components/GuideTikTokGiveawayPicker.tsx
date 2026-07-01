import { useState, useCallback } from 'react';
import { Trophy, Shuffle, Copy, Check, Users, Filter } from 'lucide-react';
import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';

// ── Giveaway Picker Tool ──────────────────────────────────────────────────────

function GiveawayPickerTool({ darkMode }: { darkMode: boolean }) {
    const [entries, setEntries] = useState('');
    const [numWinners, setNumWinners] = useState(1);
    const [filterKeyword, setFilterKeyword] = useState('');
    const [removeDupes, setRemoveDupes] = useState(true);
    const [spinning, setSpinning] = useState(false);
    const [winners, setWinners] = useState<string[]>([]);
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
    const [copiedAll, setCopiedAll] = useState(false);
    const [error, setError] = useState('');

    const pick = useCallback(() => {
        setError('');
        let pool = entries
            .split('\n')
            .map(e => e.trim())
            .filter(e => e.length > 0);

        if (filterKeyword.trim()) {
            const kw = filterKeyword.toLowerCase();
            pool = pool.filter(e => e.toLowerCase().includes(kw));
        }
        if (removeDupes) {
            pool = [...new Set(pool.map(e => e.toLowerCase()))].map(
                lower => pool.find(e => e.toLowerCase() === lower)!
            );
        }
        if (pool.length === 0) { setError('No valid entries found. Check your list and filters.'); return; }
        if (pool.length < numWinners) { setError(`Not enough entries (${pool.length}) for ${numWinners} winner(s).`); return; }

        setSpinning(true);
        setWinners([]);
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        setTimeout(() => {
            const picked: string[] = [];
            const remaining = [...shuffled];
            for (let i = 0; i < numWinners; i++) {
                const idx = Math.floor(Math.random() * remaining.length);
                picked.push(remaining[idx]);
                remaining.splice(idx, 1);
            }
            setWinners(picked);
            setSpinning(false);
        }, 1200);
    }, [entries, numWinners, filterKeyword, removeDupes]);

    const copyWinner = (w: string, idx: number) => {
        navigator.clipboard.writeText(w);
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(winners.join('\n'));
        setCopiedAll(true);
        setTimeout(() => setCopiedAll(false), 2000);
    };

    const entryCount = entries.split('\n').filter(e => e.trim()).length;

    return (
        <div className={`rounded-3xl border p-8 mb-12 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'}`}>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-black">Free TikTok Giveaway Picker</h2>
                    <p className="text-sm text-neutral-500 font-medium">Paste entries → pick random winner(s) instantly</p>
                </div>
            </div>

            {/* Entries Textarea */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500">
                        Entries (one per line)
                    </label>
                    {entryCount > 0 && (
                        <span className="text-xs font-bold text-pink-500">{entryCount} entries</span>
                    )}
                </div>
                <textarea
                    rows={8}
                    placeholder={"@username1\n@username2\n@username3\n...\n\nPaste your TikTok comments or usernames here, one per line."}
                    value={entries}
                    onChange={e => setEntries(e.target.value)}
                    className={`w-full px-4 py-3 rounded-2xl text-sm font-medium border outline-none resize-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                />
            </div>

            {/* Options Row */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {/* Number of winners */}
                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                        <Users className="w-3 h-3" /> Winners
                    </label>
                    <select
                        value={numWinners}
                        onChange={e => setNumWinners(Number(e.target.value))}
                        className={`w-full px-3 py-2.5 rounded-xl text-sm font-bold border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 text-neutral-900'}`}
                    >
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} winner{n > 1 ? 's' : ''}</option>
                        ))}
                    </select>
                </div>

                {/* Keyword filter */}
                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1.5">
                        <Filter className="w-3 h-3" /> Filter keyword
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. following"
                        value={filterKeyword}
                        onChange={e => setFilterKeyword(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border outline-none transition-all focus:border-pink-500 ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-600' : 'bg-white border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`}
                    />
                </div>

                {/* Remove dupes */}
                <div>
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-2 block">
                        Duplicates
                    </label>
                    <button
                        onClick={() => setRemoveDupes(v => !v)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold border transition-all ${removeDupes
                            ? 'bg-pink-500/10 border-pink-500/30 text-pink-500'
                            : darkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-400' : 'bg-neutral-50 border-neutral-200 text-neutral-500'
                            }`}
                    >
                        <span>{removeDupes ? 'Remove dupes ✓' : 'Allow dupes'}</span>
                        <div className={`w-8 h-4.5 rounded-full relative transition-all ${removeDupes ? 'bg-pink-500' : darkMode ? 'bg-neutral-600' : 'bg-neutral-300'}`}>
                            <div className={`absolute top-0.5 w-3.5 h-3.5 bg-white rounded-full shadow transition-all ${removeDupes ? 'right-0.5' : 'left-0.5'}`} />
                        </div>
                    </button>
                </div>
            </div>

            {error && (
                <p className="text-sm font-bold text-red-500 mb-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">{error}</p>
            )}

            {/* Pick Button */}
            <button
                onClick={pick}
                disabled={spinning || !entries.trim()}
                className={`w-full py-4 rounded-2xl font-black text-white text-lg transition-all shadow-lg flex items-center justify-center gap-2 ${spinning || !entries.trim()
                    ? 'bg-neutral-400 cursor-not-allowed opacity-60'
                    : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 active:scale-[0.99] shadow-pink-500/20'
                    }`}
            >
                <Shuffle className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} />
                {spinning ? 'Picking winner…' : winners.length > 0 ? 'Pick Again' : `Pick ${numWinners > 1 ? numWinners + ' Winners' : 'a Winner'}`}
            </button>

            {/* Winners */}
            {winners.length > 0 && !spinning && (
                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="font-black text-base flex items-center gap-2">
                            🏆 {winners.length > 1 ? `${winners.length} Winners` : 'Winner'}
                        </h3>
                        {winners.length > 1 && (
                            <button
                                onClick={copyAll}
                                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${copiedAll ? 'bg-emerald-500 text-white border-emerald-500' : darkMode ? 'border-neutral-700 hover:border-pink-500 text-neutral-400' : 'border-neutral-200 hover:border-pink-400 text-neutral-500'}`}
                            >
                                {copiedAll ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedAll ? 'Copied!' : 'Copy All'}
                            </button>
                        )}
                    </div>
                    {winners.map((w, i) => (
                        <div key={i} className={`flex items-center justify-between gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-pink-50 border-pink-100'}`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white font-black text-sm shrink-0">
                                    {i + 1}
                                </div>
                                <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{w}</span>
                            </div>
                            <button
                                onClick={() => copyWinner(w, i)}
                                className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all shrink-0 ${copiedIdx === i ? 'bg-emerald-500 text-white border-emerald-500' : darkMode ? 'border-neutral-600 hover:border-pink-500 text-neutral-400' : 'border-neutral-200 hover:border-pink-400 text-neutral-500 bg-white'}`}
                            >
                                {copiedIdx === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                {copiedIdx === i ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function GuideTikTokGiveawayPicker({ darkMode, onNavigate }: GuideProps) {
    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        Giveaway Guide
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        TikTok Giveaway Picker: Free Tool to Pick a Random Winner (2026)
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        Running a TikTok giveaway? Use a free <span className="font-bold text-neutral-900 dark:text-white">TikTok giveaway picker</span> to randomly and fairly select a winner from your comments or followers. Here's everything you need to know.
                    </p>
                </div>

                {/* ── Interactive Giveaway Picker Tool ── */}
                <GiveawayPickerTool darkMode={darkMode} />

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    {/* Quick Answer */}
                    <section className={`p-6 rounded-2xl mb-8 font-medium text-lg border-l-4 border-pink-500 ${darkMode ? 'bg-neutral-900/50 text-neutral-200' : 'bg-pink-50 text-neutral-800'}`}>
                        <p className="m-0"><strong>Quick Answer:</strong> A TikTok giveaway picker is a free online tool that randomly selects a winner from a TikTok video's comments or from a list of followers. The most popular free options are Commentpicker.com (for comment-based giveaways) and Picker.tool. These tools pull all comments from a public TikTok video, filter by entry requirements, and randomly pick one winner — all in under 60 seconds.</p>
                    </section>

                    {/* Hero */}
                    <div className="group overflow-hidden rounded-3xl mb-8 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                        <img loading="lazy" decoding="async"
                            src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop"
                            alt="Confetti celebration, representing a TikTok giveaway winner announcement"
                            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Why Run a TikTok Giveaway in 2026?</h2>
                        <p>
                            TikTok giveaways remain one of the highest-ROI organic growth tactics available to creators and brands. Here's why they are so effective:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 my-8">
                            {[
                                {
                                    stat: "3–8x",
                                    label: "Comment Rate Boost",
                                    desc: "Giveaway videos receive 3–8x more comments than standard content, which signals high engagement to TikTok's algorithm and pushes the video to more For You Pages."
                                },
                                {
                                    stat: "+40%",
                                    label: "Profile Visit Rate",
                                    desc: "Giveaway entries that require a profile follow generate 40% more profile visits than comparable non-giveaway CTA posts, rapidly growing your audience."
                                },
                                {
                                    stat: "Free",
                                    label: "Zero Ad Spend",
                                    desc: "Unlike paid TikTok Ads that cost $0.50–$2.00 per result, a comment giveaway costs nothing and can generate thousands of engagements organically."
                                }
                            ].map((s, i) => (
                                <div key={i} className={`p-6 rounded-2xl border text-center ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <div className="text-4xl font-black text-pink-500 mb-1">{s.stat}</div>
                                    <div className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-3">{s.label}</div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Types of TikTok Giveaways</h2>
                        <p>Before picking a tool, it helps to know what type of giveaway you are running:</p>
                        <div className="space-y-4 my-6">
                            {[
                                {
                                    type: "Comment Giveaway",
                                    icon: "💬",
                                    desc: "The most common type. Participants enter by leaving a comment (e.g., 'comment your favourite colour'). You then use a TikTok comment picker to randomly select a winner. Best for: rapid engagement boost and comment count metrics.",
                                    tool: "Use: Commentpicker.com or Picker.tool"
                                },
                                {
                                    type: "Follower Giveaway",
                                    icon: "👥",
                                    desc: "Participants must follow your account to enter. Because TikTok doesn't provide a public follower list to third-party apps, these are run manually (export follower data or use a platform like Gleam.io). Best for: rapid follower growth.",
                                    tool: "Use: Gleam.io or manual spreadsheet + random picker"
                                },
                                {
                                    type: "Tag-a-Friend Giveaway",
                                    icon: "🏷️",
                                    desc: "Participants enter by tagging a friend in the comments. Each tag exposes your content to a new user. Both the commenter and their tagged friend are eligible to win. Best for: exponential reach growth.",
                                    tool: "Use: Commentpicker.com with duplicate filter disabled"
                                },
                                {
                                    type: "UGC Giveaway",
                                    icon: "📹",
                                    desc: "You ask participants to create and post a video using a specific sound, hashtag, or product. Entry is validated by the hashtag, and a random winner is selected from all submissions. Best for: building brand content and social proof.",
                                    tool: "Use: EasyPromos (has a dedicated UGC contest manager)"
                                }
                            ].map((g, i) => (
                                <div key={i} className={`p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{g.icon}</span>
                                        <h3 className="font-black text-lg">{g.type}</h3>
                                    </div>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3 leading-relaxed">{g.desc}</p>
                                    <p className="text-xs font-black uppercase tracking-widest text-pink-500">{g.tool}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* AdSense */}
                    <div className="my-10 w-full bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden">
                        <AdSense adSlot="4455667788" />
                    </div>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">How to Use a Free TikTok Giveaway Picker: Full Walkthrough</h2>
                        <div className="space-y-4 my-8">
                            {[
                                {
                                    step: "1",
                                    title: "Post Your Giveaway TikTok",
                                    desc: "Record and post your giveaway video. In the caption, clearly state: what the prize is, how to enter (e.g., 'Like this video + comment your answer'), and when the winner will be announced. Pin this video if possible."
                                },
                                {
                                    step: "2",
                                    title: "Wait for the Entry Window to Close",
                                    desc: "Let the giveaway run for a defined period (24h, 48h, or 7 days). Avoid picking too early — giving the video time to circulate increases your comment count and the algorithm boost you receive."
                                },
                                {
                                    step: "3",
                                    title: "Copy the Video URL",
                                    desc: "On the TikTok app, tap Share → Copy Link. On desktop, copy the URL from the browser. The URL format is: tiktok.com/@yourusername/video/[videoid]"
                                },
                                {
                                    step: "4",
                                    title: "Open Commentpicker.com (Free TikTok Giveaway Picker)",
                                    desc: "Navigate to commentpicker.com. Select 'TikTok' as the platform. Paste your video URL and click 'Load Comments'. The tool will fetch all comments — this may take 10–30 seconds for videos with large comment counts."
                                },
                                {
                                    step: "5",
                                    title: "Filter Entries if Needed",
                                    desc: "If your giveaway had specific entry requirements (e.g., must contain a hashtag or tag a friend), use the keyword filter. Enable 'Remove duplicate users' to ensure each person can only win once."
                                },
                                {
                                    step: "6",
                                    title: "Pick Your Winner",
                                    desc: "Click 'Pick a Winner'. The tool randomly selects one commenter from the eligible pool. Take a screenshot or record your screen during the draw — this transparency is essential for audience trust and can itself be turned into a follow-up engagement video."
                                },
                                {
                                    step: "7",
                                    title: "Announce the Winner",
                                    desc: "Reply to the winner's comment, post a stitched announcement video, or tag them in your next TikTok. This closing loop encourages other followers to watch your future giveaways actively."
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
                        <h2 className="text-3xl font-bold mt-12 mb-6">TikTok Random Follower Picker: How It Works</h2>
                        <p>
                            A <strong>TikTok random follower picker</strong> is a variation of the giveaway picker that selects a winner from your followers rather than from video comments. This is more complex because TikTok's API doesn't expose a public list of your followers to third-party apps.
                        </p>
                        <p>
                            Here are the most reliable methods for running a <strong>TikTok follower giveaway picker</strong> in 2026:
                        </p>
                        <div className="space-y-4 my-6">
                            {[
                                {
                                    method: "Method A: Comment-Based Follower Verification",
                                    desc: "Ask your followers to comment a specific keyword (e.g., 'I follow!'). Only existing followers will see the video first in their feed. Use a TikTok comment picker on the comments and verify the winner is indeed a follower before announcing. This is the simplest and most reliable method."
                                },
                                {
                                    method: "Method B: Gleam.io Follower Contest",
                                    desc: "Gleam.io allows you to create an official 'Follow on TikTok' contest entry mechanic. Users must authorise the app to verify their follow status. The platform then randomly picks from verified followers. Best for brand-level giveaways that require strict verification."
                                },
                                {
                                    method: "Method C: Export + Random.org",
                                    desc: "Some creators manually build a list of followers (e.g., from a pinned comment thread asking followers to comment their username), export it to a spreadsheet, and then use Random.org's list randomiser to pick a winner. Transparent but time-consuming."
                                }
                            ].map((m, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                    <h4 className="font-black mb-2">{m.method}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{m.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-12 mb-6">Frequently Asked Questions — TikTok Giveaway Picker</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "What is the best free TikTok giveaway picker?",
                                    a: "Commentpicker.com is the most popular free TikTok giveaway picker as of 2026. It requires no sign-up, pulls comments directly from any public TikTok video URL, allows keyword filtering and duplicate removal, and provides a shareable results link you can show your audience for transparency."
                                },
                                {
                                    q: "Can I pick a random TikTok follower for free?",
                                    a: "Not directly through most free tools, because TikTok's API doesn't expose follower lists publicly. The easiest workaround is to require participants to comment to enter — then use a free comment picker on those comments. This is the method used by 90% of TikTok creators running follower giveaways."
                                },
                                {
                                    q: "Is a TikTok giveaway picker fair?",
                                    a: "Yes, when using a legitimate random picker like Commentpicker.com. These tools use a cryptographically random selection algorithm (not pseudo-random), and you can generate a verification certificate (on EasyPromos) to prove the draw was fair. Recording your screen during the draw is the best way to demonstrate transparency to your audience."
                                },
                                {
                                    q: "How long should a TikTok giveaway run?",
                                    a: "The ideal window is 24–72 hours. Shorter than 24 hours doesn't give the algorithm enough time to distribute the video. Longer than 7 days loses momentum. For maximum engagement, post the giveaway video on a Tuesday–Thursday between 6–9 PM in your primary audience's timezone."
                                },
                                {
                                    q: "Do TikTok giveaways violate TikTok's terms of service?",
                                    a: "Not if run correctly. TikTok's Community Guidelines allow giveaways as long as you do not promise financial returns, do not ask users to share to gain 'more luck', and the prize is clearly stated. Avoid any mechanic that could be interpreted as a lottery or game of chance with a paid entry — those require specific legal disclosures depending on your country."
                                }
                            ].map((item, i) => (
                                <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}>
                                    <h4 className="font-black mb-2">{item.q}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA */}
                    <section className={`p-8 rounded-3xl text-center ${darkMode ? 'bg-gradient-to-br from-pink-500/20 to-orange-500/10 border border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100'}`}>
                        <h2 className="text-2xl font-black mb-3">Create a Custom TikTok Comment Sticker for Your Giveaway Announcement</h2>
                        <p className="text-neutral-500 dark:text-neutral-400 mb-6 font-medium">
                            Make your winner announcement video even more engaging. Generate a custom TikTok comment sticker overlay — free, no watermark.
                        </p>
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-4 bg-pink-500 text-white font-black rounded-2xl hover:bg-pink-600 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-pink-500/20"
                        >
                            Open Free Comment Generator →
                        </button>
                    </section>

                    <RelatedArticles
                        ids={['guide-tiktok-comment-picker', 'guide', 'guide-tiktok-comment-generator']}
                        onNavigate={onNavigate}
                        darkMode={darkMode}
                    />
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
