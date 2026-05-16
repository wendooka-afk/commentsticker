import { useState } from 'react';
import {
  Sparkles,
  Zap,
  ChevronRight,
  CheckCircle2,
  Search,
  ChevronDown,
  ArrowRight,
  Share2,
  Twitter,
  Linkedin,
  Send as ShareIcon,
  Layout,
  Instagram,
  Facebook,
  ShieldCheck,
  AlertTriangle,
  BookOpen,
} from 'lucide-react';
import { AdSense } from './AdSense';
import { PlatformIcon } from './PlatformIcons';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LandingPageProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

export function LandingPage({ darkMode, onNavigate }: LandingPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqItems = [
    {
      q: "Is the CommentSticker mockup generator free?",
      a: "Yes. The core comment mockup generator, batch generator, hashtag generator, font generator, caption generator, engagement calculator and all 13 free tools are available without payment, signup or watermark. We may add paid features later, but core mockup creation remains free."
    },
    {
      q: "Which social media platforms are supported?",
      a: "Nine platforms with native pixel-perfect UI templates: TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord and LinkedIn. Each template is hand-coded to match the latest official app design, including verified badges, like counters, timestamps and platform-specific typography."
    },
    {
      q: "What are these comment overlays meant to be used for?",
      a: "Comment mockup overlays are a standard creative asset in UGC (User Generated Content) advertising, content tutorials, demo videos, presentation slides, blog illustrations and creator portfolios. They let advertisers and content creators illustrate a customer question, surface a product talking point, or demonstrate a UI concept without screen-recording a real comment. They are not intended to be presented as real third-party statements — see our Acceptable Use policy below."
    },
    {
      q: "Can these overlays be used in CapCut, Premiere Pro, DaVinci or Final Cut?",
      a: "Yes. The generator exports a transparent PNG at 3x pixel ratio, which works as a standard overlay layer in CapCut, Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, iMovie and any non-linear editor. Drop the PNG onto a video track on top of your footage."
    },
    {
      q: "How are these comment mockups different from a screenshot of a real comment?",
      a: "A real comment screenshot contains a specific user's name, photo and statement — and using one in advertising typically requires their permission and the platform's terms-of-service authorization. A comment mockup is a clearly-fictional creative asset built from scratch, with text you author yourself, used as illustration. Mockups are common in marketing concept boards, ad storyboards and creator examples; real screenshots without consent are not."
    },
    {
      q: "Will my exports have a watermark?",
      a: "No watermark, ever. PNG export is fully transparent. JPEG export uses a solid background color matching the platform's native theme."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a TikTok comment mockup overlay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A TikTok comment mockup overlay is a transparent PNG image that visually replicates the design of a TikTok comment. UGC advertisers, content creators and editors use it as a creative illustration inside short-form video ads, tutorials, demo videos and storyboards — for example to highlight a customer question the ad will answer."
        }
      },
      {
        "@type": "Question",
        "name": "How do I add a comment overlay to a TikTok video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Two methods. (1) Native: TikTok lets you screenshot a real comment using the in-app 'Reply with video' feature — this only works with comments people actually left on your video. (2) Mockup: for advertising creatives or demos, generate a comment mockup overlay (transparent PNG) using a tool like CommentSticker, then import it into CapCut, Premiere Pro or any video editor as an overlay layer."
        }
      },
      {
        "@type": "Question",
        "name": "Are comment mockup overlays used in UGC advertising?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Comment-style overlays are a documented creative pattern in TikTok Ads, Meta Reels Ads and YouTube Shorts Ads. Advertisers use them to highlight a buyer's typical objection, a frequently-asked question, or a product talking point at the start of a video — a hook technique sometimes called the 'comment-bait hook'. The overlay is a creative illustration, not a screenshot of an actual third-party comment."
        }
      }
    ]
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-pink-500/30 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-pink-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            Built for UGC Creators & Performance Marketers
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter">
            Free Comment <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500">
              Mockup Generator.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            Build pixel-perfect comment mockup overlays for TikTok, Instagram Reels and YouTube Shorts UGC ad creatives. Author the text yourself, pick the platform, download a transparent PNG ready for your video editor.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => onNavigate('generator')}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Open the Generator
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className={`px-8 py-4 rounded-2xl font-bold text-sm border transition-all hover:scale-105 ${darkMode ? 'border-neutral-700 hover:bg-neutral-900' : 'border-neutral-200 bg-white hover:bg-neutral-50'}`}
            >
              Read the UGC Guides
            </button>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-3 h-3 text-green-500" />
            No signup • No credit card • No watermark
          </p>

          {/* Platform Bar */}
          <div className="pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Native Overlay Templates For</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="tiktok" size={28} /> TikTok</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="instagram" size={28} /> Instagram</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="youtube" size={32} /> YouTube</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="twitter" size={28} /> Twitter</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="facebook" size={28} /> Facebook</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="threads" size={28} /> Threads</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="snapchat" size={28} /> Snapchat</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="discord" size={28} /> Discord</span>
              <span className="flex items-center gap-2 font-black text-2xl tracking-tighter"><PlatformIcon platform="linkedin" size={28} /> LinkedIn</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- INTRO / WHAT IS A COMMENT MOCKUP --- */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3 h-3" />
            What is a Comment Mockup?
          </div>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">A creative asset used across the UGC advertising industry.</h2>
          <div className={`space-y-5 text-base md:text-lg font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <p>
              A <strong>comment mockup overlay</strong> is a transparent PNG image that visually replicates the design of a social media comment — the rounded avatar, the username, the reply text, the like counter, the timestamp. It is a creative illustration, not a screenshot of a real comment from a real person.
            </p>
            <p>
              Marketers and UGC creators use comment mockups as a hook device in short-form video ads. A common pattern: a TikTok or Reels ad opens on a comment overlay reading <em>"Where did you get this?"</em> or <em>"Does this actually work?"</em> — a copywritten objection or question the ad then answers. This pattern, sometimes called the <strong>comment-bait hook</strong>, is widely documented in performance marketing playbooks because it leverages the viewer's familiarity with the comment-section UI to stop the scroll.
            </p>
            <p>
              The same mockup format is also used in <strong>content tutorials</strong> (illustrating how a comment will appear), <strong>creator portfolios</strong> (showcasing past UGC work), <strong>blog illustrations</strong> (this very page uses mockup-style cards), <strong>course materials</strong> and <strong>investor decks</strong>. CommentSticker exists so creators can build these assets in seconds instead of fighting with Photoshop layer masks.
            </p>
          </div>
        </div>
      </section>

      {/* --- ETHICAL USE / DISCLOSURE --- */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className={`rounded-3xl border p-8 ${darkMode ? 'bg-amber-500/5 border-amber-500/30' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-start gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                <ShieldCheck className="w-6 h-6 text-amber-600" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-black">Acceptable Use of Comment Mockups</h3>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  CommentSticker is intended for <strong>creative and illustrative purposes</strong> — UGC ad creatives, content tutorials, demo videos, slide presentations, blog illustrations, creator portfolios and storyboards.
                </p>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <strong>Do not use the tool to:</strong> impersonate a specific real person, fabricate evidence in a dispute, post mockup overlays as if they were real third-party comments, mislead consumers about a product, violate any platform's terms of service, or generate content that defames, harasses or deceives. Where you advertise using a mockup hook, follow your local consumer-protection rules (FTC Endorsement Guides in the US, ASA CAP Code in the UK, equivalent national rules elsewhere) and your platform's branded-content disclosure rules.
                </p>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  See the full policy on our <button onClick={() => onNavigate('terms')} className="underline font-bold text-amber-600">Terms of Service</button> page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HERO IMAGE / MOCKUP --- */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
          <div className={`relative rounded-[2rem] border overflow-hidden aspect-video md:aspect-auto md:h-[600px] flex items-center justify-center ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-2xl'
            }`}>
            <div className="relative w-full h-full p-20 flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                <div className={`p-6 rounded-2xl border-2 rotate-[-4deg] scale-110 translate-x-12 animate-[bounce_8s_infinite] shadow-[0_20px_50px_rgba(236,72,153,0.3)] ${darkMode ? 'bg-neutral-800/80 border-pink-500/30 backdrop-blur-xl' : 'bg-white/90 border-pink-500/20 shadow-xl backdrop-blur-xl'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 shadow-sm shrink-0 flex items-center justify-center text-white font-black text-sm">S</div>
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-bold text-neutral-500">@example_user</div>
                      <div className="text-[15px] font-medium leading-tight text-neutral-900 dark:text-white">Does this actually work for oily skin? Need to know before buying 😭</div>
                      <div className="text-[10px] uppercase tracking-widest text-pink-500 font-black mt-2">Illustrative Mockup</div>
                    </div>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl border-2 rotate-[6deg] -translate-x-12 translate-y-12 animate-[bounce_10s_infinite_reverse] shadow-[0_20px_50px_rgba(249,115,22,0.3)] ${darkMode ? 'bg-neutral-800/90 border-orange-500/30 backdrop-blur-xl' : 'bg-white border-orange-500/20 shadow-2xl'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 shadow-sm shrink-0 flex items-center justify-center text-white font-black text-sm">A</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm font-bold text-neutral-900 dark:text-white">example_creator</div>
                      </div>
                      <div className="text-[15px] font-normal leading-tight text-neutral-900 dark:text-white">Drop the link! This is exactly what I've been looking for 🔥</div>
                      <div className="text-[10px] uppercase tracking-widest text-orange-500 font-black mt-2">Illustrative Mockup</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center text-3xl font-black opacity-20 uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
                Comment Mockup UI Generator
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <AdSense adSlot="1234567890" />
      </div>

      {/* --- HOW IT WORKS --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black">How to Build a Comment Mockup Overlay</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">Three steps from blank canvas to transparent PNG ready for your video editor.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-white shadow-xl shadow-black/[0.02]'
              }`}>
              <div className="relative z-10 w-full md:w-1/2 space-y-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                  <Layout className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black">1. Pick the platform</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  Choose from nine pixel-perfect native UI templates: TikTok, Instagram, YouTube, Twitter/X, Facebook, Threads, Snapchat, Discord, or LinkedIn. Each template tracks the most recent published design of the platform's comment UI, including verified badges, like counters and platform-specific typography.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> 9 platform UI templates
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> Native fonts, badges, hearts and counters
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('generator')}
                  className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-pink-500 decoration-2"
                >
                  Try the tool <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center p-12 bg-gradient-to-l from-pink-500/5 to-transparent">
                <div className={`w-full h-2/3 rounded-2xl border-4 border-dashed opacity-20 ${darkMode ? 'border-neutral-700' : 'border-neutral-300'}`} />
                <div className="absolute inset-0 flex items-center justify-center rotate-12 scale-125 translate-x-12 opacity-40">
                  <Share2 className="w-64 h-64 text-pink-500/20" />
                </div>
              </div>
            </div>

            <div className={`md:col-span-2 rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-green-50/50 border-green-100 hover:border-green-200'
              }`}>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black">2. Author the copy</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Write your own username, avatar initial, comment text and like count. Use the UGC Question Finder for proven copywriting hooks if you need ideas.
                </p>
              </div>
              <button onClick={() => onNavigate('finder')} className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-green-500 decoration-2 w-fit">
                Customize <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`md:col-span-2 rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-orange-50/50 border-orange-100 hover:border-orange-200'
              }`}>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black">3. Export the PNG</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Download a transparent PNG at 3x pixel ratio, ready to drop on a video track in CapCut, Adobe Premiere Pro, DaVinci Resolve or Final Cut Pro.
                </p>
              </div>
              <button onClick={() => onNavigate('scripts')} className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-orange-500 decoration-2 w-fit">
                Download <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 flex items-center justify-between group transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-neutral-900 border-neutral-900 text-white'
              }`}>
              <div className="relative z-10 w-full md:w-3/4 space-y-4">
                <div className="text-xs font-black uppercase tracking-widest text-pink-500">Why Advertisers Use Comment Hooks</div>
                <h3 className="text-3xl font-black leading-[1.1]">A documented short-form ad pattern. <br /> <span className="opacity-50">Built into seconds.</span></h3>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-400'}`}>
                  Opening a TikTok or Reels ad with a comment-style overlay that surfaces a buyer objection ("Where did you buy this?") is a documented retention pattern in performance-marketing literature. The overlay creates immediate curiosity, and the comment UI feels native to the feed. Browse our template library for copy patterns and example hooks.
                </p>
                <button onClick={() => onNavigate('templates')} className="px-6 py-3 bg-white text-black rounded-xl text-sm font-black hover:scale-105 active:scale-95 transition-all w-fit">
                  Explore Hook Templates
                </button>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-pink-500 opacity-20 rotate-[-12deg]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- USE CASES (real, no fabricated stats) --- */}
      <section className="py-20 px-6 border-y border-neutral-100 dark:border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-3xl md:text-4xl font-black">Who builds comment mockups, and why</h2>
            <p className="text-neutral-500 font-medium max-w-2xl mx-auto">Four common use cases observed across the UGC advertising and creator-economy industries.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "UGC freelancers building ad creatives", desc: "Comment overlay hooks at second 0 are a documented retention pattern in TikTok Shop and Meta Reels ad campaigns. Mockup overlays let UGC freelancers prototype hook variants without screen-recording or modifying real comments." },
              { title: "Performance marketing teams A/B testing hooks", desc: "Hook tests are a primary creative lever in paid-social account management. A mockup library lets a media-buying team iterate the comment-overlay variant across multiple ad sets in an afternoon." },
              { title: "Creators producing tutorials and case studies", desc: "Educators teaching UGC strategy use comment mockups to illustrate hook construction in walkthroughs, course materials and YouTube tutorials — the same way a UX designer uses a Figma frame." },
              { title: "Editors and motion designers prototyping overlays", desc: "Video editors save the time of manually composing a UI replica in After Effects or Photoshop. A transparent PNG drops directly onto a video track." },
            ].map((uc, i) => (
              <div key={i} className={`p-6 rounded-3xl border space-y-3 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <h3 className="text-lg font-black">{uc.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- INDUSTRY CONTEXT / EDITORIAL DEPTH --- */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3 h-3" />
              Industry Background
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Why the comment-hook pattern works in short-form video advertising</h2>
          </div>
          <div className={`space-y-5 text-base md:text-lg font-medium leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            <p>
              Short-form vertical video — TikTok, Reels, Shorts — has fundamentally changed the unit economics of paid social. Where Facebook's traditional feed gave an advertiser two or three seconds of attention before a user scrolled, TikTok's full-screen single-video architecture reduced that window to roughly the first second. The TikTok algorithm weights early scroll-away as the strongest negative signal in its For You Page ranking, which means hook design now drives more of the variance in ad performance than any other creative dimension.
            </p>
            <p>
              Performance marketers respond by building <strong>hook test matrices</strong> — five to twenty variations of the first one to three seconds of an ad, each testing a different opening technique. Pattern interrupts (jump cuts, color flashes), spoken-word hooks ("Stop scrolling if…"), and on-screen text overlays are all common variants. The <strong>comment-style overlay hook</strong> is a fourth variant: the first second of the ad shows a comment-UI replica with a buyer question or objection, and the rest of the ad answers it.
            </p>
            <p>
              The pattern works for two compounding reasons. First, the comment UI is one of the most-familiar visual primitives on the platform — users skim hundreds of comments per session, so the brain registers it instantly. Second, a question or objection rendered as a comment surfaces the answer the viewer is implicitly searching for, raising completion-rate. Tools like CommentSticker exist because the pattern has graduated from an experimental tactic to a standard component of UGC advertising production workflows.
            </p>
            <p>
              For deeper background on the underlying TikTok algorithm and hook construction, see our <button onClick={() => onNavigate('blog-tiktok-algorithm')} className="underline text-pink-500 font-bold">TikTok algorithm guide</button> and the <button onClick={() => onNavigate('blog-tiktok-views')} className="underline text-pink-500 font-bold">15 strategies to get more views</button> deep dive.
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 bg-neutral-500/[0.03]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-black">Frequently Asked Questions</h2>
            <p className="text-neutral-500 font-medium">Common questions about comment mockup overlays.</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className={`rounded-2xl border transition-all ${activeFaq === i
                ? (darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-white shadow-xl')
                : (darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 hover:border-neutral-200 shadow-sm')
                }`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                >
                  <span className="font-bold">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-[500px] pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm font-medium text-neutral-500 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FREE TOOLS SECTION --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className={`inline-block text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 ${
              darkMode ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20' : 'bg-violet-50 text-violet-600 border border-violet-100'
            }`}>
              13 Free Tools · No Login · No Watermark
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Every tool a UGC creator needs
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Hook generator, video ideas, comment replies, bio builder, CTA generator, hashtags, captions, giveaway picker — all free, all in one place.
            </p>
          </div>

          <div className={`mb-6 rounded-2xl border p-5 ${darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-gradient-to-r from-violet-50 to-pink-50 border-violet-100'}`}>
            <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${darkMode ? 'text-violet-400' : 'text-violet-500'}`}>New Content Tools</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { page: 'video-ideas-generator', emoji: '💡', label: 'Video Ideas', desc: '500+ ideas · 12 niches', from: 'from-amber-400', to: 'to-orange-500' },
                { page: 'hook-generator', emoji: '⚡', label: 'Hook Generator', desc: '8 types · scroll-stopping', from: 'from-yellow-400', to: 'to-orange-500' },
                { page: 'comment-reply-generator', emoji: '💬', label: 'Reply Generator', desc: '8 types · 4 tones', from: 'from-teal-400', to: 'to-cyan-500' },
                { page: 'bio-generator', emoji: '👤', label: 'Bio Generator', desc: '12 niches · 6 vibes', from: 'from-violet-400', to: 'to-purple-600' },
                { page: 'cta-generator', emoji: '🎯', label: 'CTA Generator', desc: '4 platforms · 8 goals', from: 'from-rose-400', to: 'to-pink-500' },
              ].map(tool => (
                <button
                  key={tool.page}
                  onClick={() => onNavigate(tool.page as any)}
                  className={`flex flex-col items-start gap-2 p-3.5 rounded-xl border text-left transition-all hover:scale-[1.03] group ${
                    darkMode ? 'bg-neutral-800 border-neutral-700 hover:border-violet-500/40' : 'bg-white border-violet-100 hover:border-violet-300 shadow-sm'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${tool.from} ${tool.to} flex items-center justify-center text-lg shadow-md`}>
                    {tool.emoji}
                  </div>
                  <div>
                    <div className={`text-xs font-black ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{tool.label}</div>
                    <div className={`text-[10px] mt-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>{tool.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { page: 'hashtag-generator', emoji: '#️⃣', label: 'Hashtag Generator', desc: '12 niches · 3 platforms' },
              { page: 'font-generator', emoji: '✍️', label: 'Font Generator', desc: '13 Unicode styles' },
              { page: 'caption-generator', emoji: '✏️', label: 'Caption Generator', desc: '4 platforms · 5 vibes' },
              { page: 'engagement-calculator', emoji: '📊', label: 'Engagement Rate', desc: '6 platforms + benchmarks' },
              { page: 'guide-tiktok-comment-picker', emoji: '🎯', label: 'Comment Picker', desc: 'Random winner tool' },
              { page: 'guide-tiktok-giveaway-picker', emoji: '🎁', label: 'Giveaway Picker', desc: 'Up to 5 winners' },
              { page: 'generator', emoji: '💬', label: 'Mockup Generator', desc: '9 platforms · PNG export' },
              { page: 'batch', emoji: '⚡', label: 'Batch Generator', desc: '10 mockups at once' },
            ].map(tool => (
              <button
                key={tool.page}
                onClick={() => onNavigate(tool.page as any)}
                className={`flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all hover:scale-[1.02] hover:border-pink-500/30 ${
                  darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'
                }`}
              >
                <span className="text-2xl">{tool.emoji}</span>
                <div>
                  <div className={`text-sm font-black ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{tool.label}</div>
                  <div className={`text-xs mt-0.5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>{tool.desc}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onNavigate('free-tools')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-black rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-violet-500/20"
            >
              Explore All 13 Free Tools →
            </button>
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950 -z-20" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-500/10 blur-[150px] rotate-45 -z-10" />

        <div className="max-w-5xl mx-auto text-center relative">
          <div className={`p-12 md:p-20 rounded-[3.5rem] border text-center relative overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-2xl'
            }`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 blur-[100px] -z-10" />

            <h3 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
              Build your first <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">comment mockup</span>.
            </h3>
            <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium">Open the generator, pick a platform, and export a transparent PNG in under a minute. No signup, no watermark, no credit card.</p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => onNavigate('generator')}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-2xl font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                Open the Generator
              </button>
              <button
                onClick={() => onNavigate('blog')}
                className="px-8 py-4 rounded-2xl font-bold text-sm border border-neutral-700 text-white hover:bg-neutral-800 transition-all"
              >
                Read the Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AdSense adSlot="0987654321" />
      </div>

      <SEOFooter onNavigate={onNavigate} />

      {/* --- FLOATING SHARE BAR (Desktop) --- */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 hidden lg:flex z-50">
        {[
          { name: 'Share on Twitter', icon: <Twitter className="w-5 h-5" />, color: 'bg-[#1DA1F2]', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("Free comment mockup generator for UGC ads")}&url=${encodeURIComponent("https://commentsticker.com")}` },
          { name: 'Share on LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}` },
          { name: 'Share on Facebook', icon: <Facebook className="w-5 h-5" />, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://commentsticker.com")}` },
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => window.open(s.url, '_blank')}
            title={s.name}
            aria-label={s.name}
            className={`w-12 h-12 ${s.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative`}
          >
            {s.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
