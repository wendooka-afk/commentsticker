import { ArrowRight, Youtube } from 'lucide-react';
import { SEOHeader, SEOFooter, RelatedArticles } from './SEOLayout';
import { AdSense } from './AdSense';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function GuideYoutubeCommentSticker({ darkMode, onNavigate }: GuideProps) {
    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-4xl mx-auto px-6 py-32">
                <div className="space-y-6 mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider">
                        YouTube Shorts Strategy
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        Free YouTube Comment Sticker Generator
                    </h1>
                    <p className="text-xl text-neutral-500 font-medium">
                        Master the algorithm of YouTube Shorts. Learn how to create a <span className="font-bold text-neutral-900 dark:text-white">YouTube comment sticker</span>, download it as a transparent PNG, and boost your retention.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <section className={`p-6 rounded-2xl mb-8 font-medium text-lg border-l-4 border-red-500 ${darkMode ? 'bg-neutral-900/50 text-neutral-200' : 'bg-red-50 text-neutral-800'}`}>
                        <p className="m-0"><strong>Quick Answer:</strong> How to create a YouTube comment overlay? To create a <strong>YouTube comment sticker</strong>, use a specialized generator that mimics the YouTube UI perfectly. Enter your desired username, engaging text, and likes, then download the transparent PNG. Adding this overlay to the first 3 seconds of your YouTube Shorts significantly increases Average View Duration (AVD).</p>
                    </section>

                    <section>
                        <div className="group overflow-hidden rounded-3xl mb-8 shadow-2xl border border-neutral-200 dark:border-neutral-800 bg-red-950">
                            <img
                                src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1200&auto=format&fit=crop"
                                alt="YouTube interface on a red background"
                                className="w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
                            />
                        </div>
                        <p>
                            YouTube Shorts is currently the most aggressive algorithmic platform for organic reach. While TikTok popularized the short-form vertical video, <a href="https://www.youtube.com/creators/shorts/" target="_blank" rel="noopener noreferrer" className="text-red-500 font-bold hover:underline transition-colors">YouTube creators</a> have widely recognized that a strong visual hook is the single most important factor for channel success and monetization.
                        </p>
                        <p>
                            What is the absolute best hook you can use? Replying directly to an audience question mathematically proven to induce curiosity, using a realistic <strong>YouTube comment sticker</strong>.
                        </p>
                        <p>
                            We built the most advanced <strong>youtube comment sticker generator</strong> on the market specifically for this purpose. Unlike other <button onClick={() => onNavigate('guide-comparison')} className="underline hover:text-red-500 font-bold transition-all">generic alternatives</button> that lazily copy TikTok's UI and slap it everywhere, our engine perfectly replicates YouTube's unique typography (Roboto), their distinct avatar spacing, and their native "thumbs up" icons. This ensures your video looks 100% organic and natively recorded on the platform.
                        </p>
                    </section>

                    <div className="my-10 w-full h-[250px] bg-neutral-100 dark:bg-neutral-900 rounded-2xl flex items-center justify-center overflow-hidden">
                        <AdSense adSlot="1234567890" />
                    </div>

                    <section className={`p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'}`}>
                        <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                            <Youtube className="w-8 h-8 text-red-500" />
                            How to Create a YouTube Comment Overlay
                        </h2>
                        <p className="mb-6">For YouTube content strategies (like "Storytime" or "Q&A"), having full control over a <strong>fake youtube comment</strong> is essential. Follow these steps to generate yours.</p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-sm shrink-0 text-white">1</div>
                                <div>
                                    <h3 className="font-bold text-xl">Select the YouTube Template</h3>
                                    <p className="text-neutral-500 mt-2">Open CommentSticker.com. Choose 'YouTube' from the platform menu. You will instantly see the preview update to match the YouTube layout: a smaller, rounded avatar, and a clean sans-serif font layout.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-sm shrink-0 text-white">2</div>
                                <div>
                                    <h3 className="font-bold text-xl">Design your Fake Comment</h3>
                                    <p className="text-neutral-500 mt-2">Pick a real-sounding username. Pro-tip: YouTube comments often use usernames starting with "@". Type out an engaging question: "Can you do a tutorial on exactly how you did this?".</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center font-bold text-sm shrink-0 text-white">3</div>
                                <div>
                                    <h3 className="font-bold text-xl">Get Your Transparent PNG PNG</h3>
                                    <p className="text-neutral-500 mt-2">Hit download. The generator exports a flawless PNG. The background is completely removed. Now, go to CapCut, import the file, and lay it over the first 0 to 3 seconds of your Short.</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold mt-16 mb-6">Why Use a YouTube Comment Overlay Video Strategy?</h2>
                        <p>
                            Why go through the trouble of creating a dedicated overlay file instead of just adding text with CapCut? It all comes down to simple social psychology. When a viewer scrolls into your Short and sees a familiar YouTube comment box appearing instantly on screen, their brain automatically registers it as an "ongoing conversation".
                        </p>
                        <div className={`p-6 rounded-2xl my-6 border-l-4 border-red-500 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-red-50 border-neutral-200'}`}>
                            <h4 className="font-bold mb-2">The AVD (Average View Duration) Trick:</h4>
                            <p className="text-sm m-0">They read the comment, realize that your video is the answer to that specific question, and they stay to watch. This drastically increases your AVD, signalling the YouTube Shorts algorithm to push your video to a broader "seed" audience. Combining this with a high-quality <strong>youtube comment sticker</strong> generator is your unfair advantage.</p>
                        </div>
                    </section>

                    <section className={`p-10 rounded-[2rem] border mt-16 text-center shadow-lg transition-transform hover:-translate-y-1 ${darkMode ? 'bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20' : 'bg-gradient-to-br from-red-50 to-orange-50 border-red-100'}`}>
                        <h2 className="text-3xl font-black mb-4">Launch Your Viral Short</h2>
                        <p className="mb-8 font-medium">Start designing a high-converting comment overlay for YouTube. 100% free and no sign-up required.</p>
                        <button onClick={() => onNavigate('generator')} className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-black shadow-xl shadow-red-500/30 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2">
                            Open Free YouTube UI Generator <ArrowRight className="w-5 h-5" />
                        </button>
                    </section>

                    <RelatedArticles
                        ids={['guide', 'guide-instagram', 'guide-tiktok-comment-generator']}
                        onNavigate={onNavigate}
                        darkMode={darkMode}
                    />
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
