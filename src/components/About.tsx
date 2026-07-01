import { Users, Heart, Target, Zap, CheckCircle2, MessageSquare, TrendingUp, Video, ChevronDown, ShieldCheck, PenSquare, Code2 } from 'lucide-react';
import { useState } from 'react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

export function AboutUs({ darkMode, onNavigate }: LegalPageProps) {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "Is CommentSticker really free?",
            a: "Yes. The core tools — the comment mockup generator, batch generator, hashtag generator, font generator, caption generator, engagement rate calculator, video idea generator, hook generator, comment reply generator, bio generator, CTA generator, comment picker and giveaway picker — are 100% free, no signup required, no watermark."
        },
        {
            q: "Who is CommentSticker built for?",
            a: "Three primary audiences: (1) UGC freelancers and content creators building short-form video ad creatives, (2) performance marketing teams running TikTok, Reels and Shorts campaigns, (3) video editors and motion designers who need a faster workflow than Photoshop or After Effects for comment-UI overlays."
        },
        {
            q: "Is it ethical to use a comment mockup overlay in an advertisement?",
            a: "Comment-style overlays are a documented and widely-used creative pattern in UGC advertising. The overlay is a creative illustration — like a stock photo of a satisfied customer — used to surface a question or objection the ad then answers. Using one is consistent with industry norms when (a) you author the text yourself, (b) you do not impersonate a specific real person, (c) you do not present the mockup as a real third-party endorsement, and (d) you follow your jurisdiction's advertising disclosure rules (such as the FTC Endorsement Guides in the US). See the Acceptable Use section in our Terms of Service for the full policy."
        },
        {
            q: "Which video editors work with the exported PNGs?",
            a: "Any modern non-linear video editor accepts the transparent PNG output: CapCut (mobile and desktop), Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, iMovie, Adobe After Effects, and the in-app editors in TikTok, CapCut Web and InShot. Drop the PNG onto a track above your footage."
        },
        {
            q: "How does CommentSticker differ from other comment-overlay tools?",
            a: "Three differentiators: (1) Nine social platforms supported with pixel-perfect native UI (most older alternatives cover only TikTok and Instagram), (2) higher-fidelity export — transparent PNGs at 3x pixel ratio, no watermark — versus the lower-quality JPG output of older tools, (3) an ecosystem of 13 free creator tools (hashtag generator, hook generator, video ideas, caption generator, engagement calculator and more) bundled in the same site."
        },
        {
            q: "Who builds and maintains the platform?",
            a: "CommentSticker is built and maintained by an independent editorial and engineering team focused on UGC creator tooling. The team is structured into three editorial roles: a content lead (writes the blog guides, FAQ entries and acceptable-use policy), a UGC industry researcher (sources the industry-context sections and tracks platform UI changes), and a technical lead (engineers the platform UI replicas and the export pipeline). The team uses the platform itself in its own UGC and content marketing work."
        },
        {
            q: "Do you collect or sell user data?",
            a: "No. Mockup generation runs entirely in your browser — your comment text, username and avatar never leave your device. We use Google Analytics for aggregate traffic measurement and Google AdSense for advertising; both are configured to respect your cookie consent. The full disclosure is in our Privacy Policy."
        }
    ];

    const useCases = [
        {
            icon: <Video className="w-6 h-6 text-pink-500" />,
            title: "UGC Freelancers & Creators",
            description: "Build comment-overlay hooks for short-form video ad creatives. The mockup overlay lets a UGC freelancer prototype hook variants in seconds — the same way a copywriter drafts headline variants — rather than spending an hour in Photoshop replicating the UI."
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
            title: "Performance Marketing Teams",
            description: "Hook tests are the highest-leverage creative iteration in TikTok and Meta Reels paid social. A library of mockup overlays lets a media-buying team A/B test the comment-overlay variant of an ad across multiple ad sets quickly."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            title: "Content Creators & Educators",
            description: "Creators teaching UGC strategy, hook construction or short-form copywriting use comment mockups to illustrate concepts in their own tutorials, courses and YouTube walkthroughs."
        },
        {
            icon: <Zap className="w-6 h-6 text-purple-500" />,
            title: "Video Editors & Motion Designers",
            description: "A transparent PNG drops directly onto a video track in CapCut, Premiere Pro, DaVinci or After Effects, replacing what would otherwise be a tedious manual UI replica in the timeline."
        }
    ];

    const teamRoles = [
        {
            icon: <PenSquare className="w-6 h-6 text-pink-500" />,
            role: "Content & Editorial Lead",
            scope: "Researches and writes the blog guides, FAQ entries, the Acceptable Use policy and the industry-context sections of each tool page. Maintains the editorial calendar and reviews every published page against the editorial standards.",
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-orange-500" />,
            role: "UGC Industry Researcher",
            scope: "Tracks short-form video advertising trends across TikTok, Reels and Shorts. Sources the industry-context sections, monitors platform UI changes, and keeps the hook templates, video ideas and creator-tooling libraries current.",
        },
        {
            icon: <Code2 className="w-6 h-6 text-blue-500" />,
            role: "Technical Lead",
            scope: "Engineers the platform UI replicas, the transparent PNG export pipeline, the batch generator and the public APIs of the free tools. Reviews each platform UI quarterly against the live app design.",
        }
    ];

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-5xl mx-auto px-6 py-32 space-y-20">

                {/* --- HERO --- */}
                <header className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold uppercase tracking-wider">
                        About CommentSticker
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        A free creative toolkit<br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">for UGC advertising and short-form video.</span>
                    </h1>
                    <p className="text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed max-w-3xl">
                        CommentSticker was built to solve a workflow bottleneck observed across the UGC advertising industry: producing pixel-perfect comment-UI overlays for short-form video ad creatives took hours of manual Photoshop work. We replaced that workflow with a browser-based generator, then bundled twelve other free tools UGC creators use every week.
                    </p>
                </header>

                {/* --- WHY THE TOOL EXISTS --- */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Target className="w-6 h-6 text-pink-500" />
                        <h2 className="text-3xl font-black">Why the tool exists</h2>
                    </div>
                    <div className={`space-y-5 text-base md:text-lg font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                        <p>
                            The comment-overlay hook — opening a short-form video ad with a comment-UI replica that surfaces a buyer question or objection — has become a standard hook pattern in UGC advertising. Performance marketers run hook tests with five to twenty variations of the first one to three seconds of an ad, and the comment-overlay variant is consistently one of the highest-performing options.
                        </p>
                        <p>
                            Producing the overlay used to mean either rebuilding the platform UI from scratch in Photoshop, paying a designer to do it, or using one of a small number of legacy single-platform generators that produced low-resolution watermarked output. CommentSticker exists because we were tired of all three options. The platform delivers nine native UI templates, a 3x pixel-ratio transparent PNG export, and zero watermarks — for free.
                        </p>
                        <p>
                            The companion tools — hook generator, video idea generator, hashtag generator, caption generator, engagement rate calculator and the rest — were added to cover the surrounding workflow a UGC creator runs through every week.
                        </p>
                    </div>
                </section>

                {/* --- VALUES --- */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Heart className="w-6 h-6 text-pink-500" />
                            <h2 className="text-3xl font-black">What we stand for</h2>
                        </div>
                        <p className={`text-base font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            A solo UGC creator should have access to the same creative tooling as a major media-buying firm. That principle drives every product decision — what to make free, what to ship next, and how to handle data.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: <Heart className="w-6 h-6 text-pink-500" />, title: "Free core tools", desc: "The mockup generator and all 12 companion tools stay free, with no signup or watermark." },
                            { icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />, title: "Privacy-first", desc: "Mockup generation runs entirely client-side. Your text and avatar never touch our servers." },
                            { icon: <CheckCircle2 className="w-6 h-6 text-green-500" />, title: "Pixel-fidelity", desc: "Every platform UI replica is hand-coded to match the live app design and reviewed quarterly." },
                            { icon: <Users className="w-6 h-6 text-blue-500" />, title: "Creator-built", desc: "Built by people who use the tool in their own UGC work — the workflow comes from the inside." },
                        ].map((card, i) => (
                            <div key={i} className={`p-6 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                {card.icon}
                                <h3 className="font-black mt-3 mb-1">{card.title}</h3>
                                <p className="text-sm text-neutral-500 font-medium">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- EDITORIAL TEAM (EEAT) --- */}
                <section className="space-y-10">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-bold uppercase tracking-wider">
                            Editorial Team
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black">Who builds and writes for CommentSticker</h2>
                        <p className={`text-base font-medium leading-relaxed max-w-3xl ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                            CommentSticker is built and edited by a small independent team focused on UGC creator tooling. Each published page passes through three editorial functions before it goes live.
                        </p>
                    </div>

                    {/* Founder card — named authorship for E-E-A-T */}
                    <div className={`p-8 rounded-3xl border flex flex-col md:flex-row gap-6 items-start ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-black text-xl shrink-0">OS</div>
                        <div className="space-y-3">
                            <div>
                                <h3 className="text-xl font-black">Oumarou Sanda</h3>
                                <p className="text-sm font-bold text-pink-500">Founder & Editor</p>
                            </div>
                            <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                                Oumarou is a digital entrepreneur and product builder who founded CommentSticker after running short-form video ad campaigns and hitting the same bottleneck every week: rebuilding comment-UI overlays by hand in Photoshop for every hook test. He designed the original TikTok comment template, wrote the platform's editorial guides, and reviews every published page. He also runs a digital agency focused on creator tooling and AI-assisted content workflows for francophone African entrepreneurs.
                            </p>
                            <p className={`text-xs font-medium ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                                Every article on this site carries a byline and a last-reviewed date. Questions or corrections? Use the <button onClick={() => onNavigate('contact')} className="underline hover:text-pink-500 transition-colors font-bold">contact form</button>.
                            </p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {teamRoles.map((role, i) => (
                            <div key={i} className={`p-8 rounded-3xl border space-y-4 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                                    {role.icon}
                                </div>
                                <h3 className="text-lg font-black">{role.role}</h3>
                                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{role.scope}</p>
                            </div>
                        ))}
                    </div>

                    <div className={`p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                        <h3 className="text-xl font-black mb-4">Editorial standards</h3>
                        <ul className={`space-y-3 text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Sourcing.</strong> Industry-context claims are sourced from platform-published documentation (TikTok Creator Portal, Meta Business Help, YouTube Creator Insider) and independent performance-marketing research.</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Review cadence.</strong> Every guide is reviewed quarterly against current platform behavior. Date-stamped at the top of the page.</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>UI fidelity.</strong> Each of the 9 platform UI templates is audited against the live app every quarter. Visual deviations are tracked in our internal changelog.</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Ethical use.</strong> Every tool page links to the Acceptable Use policy. We do not promote the use of mockup overlays for impersonation, deception, or violation of any platform's terms of service.</span></li>
                            <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /><span><strong>Correction policy.</strong> Reader-flagged factual errors are corrected within 7 business days, with the correction noted at the bottom of the affected page.</span></li>
                        </ul>
                    </div>
                </section>

                {/* --- WHO IS IT FOR --- */}
                <section className="space-y-10">
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-black">Who uses CommentSticker</h2>
                        <p className="text-neutral-500 font-medium max-w-2xl">
                            Four common user profiles across the UGC and short-form video industries.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((uc, i) => (
                            <div key={i} className={`p-8 rounded-3xl border space-y-4 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-neutral-800' : 'bg-neutral-50'}`}>
                                    {uc.icon}
                                </div>
                                <h3 className="text-xl font-black">{uc.title}</h3>
                                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{uc.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- HOW IT WORKS --- */}
                <section className="space-y-10">
                    <h2 className="text-3xl md:text-4xl font-black">How the generator works</h2>
                    <div className="space-y-6">
                        {[
                            { step: "01", title: "Pick a platform", desc: "Select from 9 natively-designed templates: TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord, or LinkedIn. Each template is a pixel-accurate reproduction of the platform's comment UI, audited quarterly against the live app." },
                            { step: "02", title: "Author the copy", desc: "Write any username, comment text, like count and timestamp. Upload an avatar or pick one from the defaults. Toggle the verified badge or liked-state. Need copy inspiration? The companion Question Finder, Hook Generator and Comment Reply Generator surface proven copy patterns." },
                            { step: "03", title: "Export a transparent PNG", desc: "Hit Export PNG. The file downloads at 3x pixel ratio with a transparent background (or as a solid-color JPEG if you prefer). Drop it on a track above your footage in CapCut, Premiere Pro, DaVinci Resolve, or any other editor." },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-6">
                                <div className="text-4xl font-black text-pink-500/20 tracking-tighter shrink-0 w-12">{step.step}</div>
                                <div className={`flex-1 p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                                    <h3 className="text-xl font-black mb-2">{step.title}</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- FAQ --- */}
                <section className="space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black">Frequently asked questions</h2>
                        <p className="text-neutral-500 font-medium">Common questions about CommentSticker and comment mockup overlays.</p>
                    </div>
                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`rounded-2xl border transition-all ${activeFaq === i
                                ? (darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-white shadow-xl')
                                : (darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm')
                                }`}>
                                <button
                                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                                >
                                    <span className="font-bold">{faq.q}</span>
                                    <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-pink-500' : 'text-neutral-400'}`} />
                                </button>
                                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <p className="text-sm font-medium text-neutral-500 leading-relaxed">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- CTA --- */}
                <section className={`text-center py-16 px-8 rounded-[2.5rem] border ${darkMode ? 'bg-gradient-to-br from-pink-500/10 to-orange-500/10 border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border-pink-100'}`}>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs mb-4">Ready to build a mockup?</p>
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                        Start generating for free.
                    </h2>
                    <p className="text-neutral-500 font-medium mb-10 max-w-xl mx-auto">
                        No signup, no watermark, no credit card. Open the generator, pick a platform, and export a transparent PNG in under a minute.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
                        >
                            Open the Generator
                        </button>
                        <button
                            onClick={() => onNavigate('blog')}
                            className={`px-8 py-4 rounded-2xl font-black text-lg border transition-all hover:scale-105 ${darkMode ? 'border-neutral-700 text-white hover:bg-neutral-800' : 'border-neutral-200 text-neutral-700 bg-white hover:bg-neutral-50'}`}
                        >
                            Read the guides
                        </button>
                    </div>
                </section>

            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
