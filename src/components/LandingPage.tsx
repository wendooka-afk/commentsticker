import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Sparkles,
  Zap,
  ChevronRight,
  CheckCircle2,
  Star,
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
  Menu,
  X,
} from 'lucide-react';
import { AdSense } from './AdSense';
import { PlatformIcon } from './PlatformIcons';

interface LandingPageProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

export function LandingPage({ darkMode, onNavigate }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY > 20) setIsMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      q: "Is this fake comment maker completely free?",
      a: "Yes, all our core comment generator features are 100% free to help you boost your initial content engagement."
    },
    {
      q: "Which platforms are supported?",
      a: "We support TikTok, Instagram, YouTube, Twitter (X), Facebook, Threads, Snapchat, Discord, and LinkedIn. Each comment sticker is designed natively to be pixel-perfect."
    },
    {
      q: "Can I use these comment stickers in CapCut?",
      a: "Absolutely. You can download the generated sticker as a transparent PNG and drop it directly into CapCut, Premiere Pro, or any video editor."
    },
    {
      q: "How to make a comment transparent?",
      a: "Our free generator automatically removes the background. Just input your text and hit download to get your transparent PNG overlay instantly."
    }
  ];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a TikTok comment sticker?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A TikTok comment sticker is a visual overlay used in videos to showcase a specific comment from a viewer. It helps increase engagement, build social proof, and drive the narrative of UGC or TikTok Ads."
        }
      },
      {
        "@type": "Question",
        "name": "How to add a comment sticker on a TikTok video?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can add a comment sticker natively in the TikTok app by tapping a comment and selecting 'Reply with video'. Alternatively, for custom or fake TikTok comments, use a free TikTok comment generator like CommentSticker to create a transparent PNG, and overlay it using video editors like CapCut or Premiere Pro."
        }
      },
      {
        "@type": "Question",
        "name": "Are fake TikTok comments useful for UGC and Ads?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, custom or fake TikTok comments are widely used in UGC (User Generated Content) and TikTok Ads to highlight common pain points, FAQs, or positive reviews, making the ad feel more organic and native to the platform."
        }
      }
    ]
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-pink-500/30 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      {/* --- NAVBAR --- */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl border transition-all duration-300 ${isScrolled
          ? (darkMode ? 'bg-neutral-900/90 border-neutral-800' : 'bg-white/90 border-white/50 shadow-lg shadow-black/5') + ' backdrop-blur-xl'
          : 'bg-transparent border-transparent'
          }`}>
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
              CommentSticker
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => onNavigate('free-tools')} className="text-sm font-bold hover:text-pink-500 transition-colors">Free Tools</button>
            <button onClick={() => onNavigate('blog')} className="text-sm font-bold text-pink-500 hover:text-pink-400 transition-colors">Blog & Guides</button>
            <a href="#faq" className="text-sm font-medium hover:text-pink-500 transition-colors">FAQ</a>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-xl transition-colors ${darkMode ? 'text-neutral-300 hover:bg-neutral-800' : 'text-neutral-700 hover:bg-neutral-100'}`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => onNavigate('generator')}
              className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95 whitespace-nowrap"
            >
              Launch App
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-2 rounded-2xl border overflow-hidden shadow-xl ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
            <div className="flex flex-col p-3 gap-1">
              {[
                { label: '🛠️  Free Tools', action: () => { onNavigate('free-tools'); setIsMobileMenuOpen(false); } },
                { label: '📖  Blog & Guides', action: () => { onNavigate('blog'); setIsMobileMenuOpen(false); } },
                { label: '❓  FAQ', action: () => { setIsMobileMenuOpen(false); document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }); } },
              ].map(({ label, action }) => (
                <button
                  key={label}
                  onClick={action}
                  className={`text-left w-full px-4 py-3.5 rounded-xl text-sm font-bold transition-colors ${darkMode ? 'hover:bg-neutral-800 text-neutral-200' : 'hover:bg-neutral-50 text-neutral-700'}`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { onNavigate('generator'); setIsMobileMenuOpen(false); }}
                className="mt-1 w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-black"
              >
                Launch App →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-pink-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-wider animate-bounce">
            <Sparkles className="w-3 h-3" />
            New: Transparent PNG Download
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-[0.9] tracking-tighter">
            Free Comment <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500">
              Sticker Generator.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            Boost your video engagement. Generate custom, realistic <span className="font-bold text-neutral-900 dark:text-white">fake comments</span> for TikTok, Instagram Reels, and YouTube Shorts in one click. Download as transparent PNG.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <div className={`flex flex-col sm:flex-row p-2 rounded-[1.25rem] border transition-all ${darkMode ? 'bg-neutral-900 border-neutral-800 focus-within:border-pink-500/50' : 'bg-white border-neutral-200 focus-within:border-pink-500/50 shadow-xl shadow-black/5'
              }`}>
              <input
                type="email"
                placeholder="Your email address..."
                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
              />
              <button
                onClick={() => onNavigate('generator')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              No credit card required • 100% Free
            </p>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Create Native Overlays For</p>
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

      {/* --- HERO IMAGE / MOCKUP --- */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-orange-500 rounded-[2.5rem] opacity-20 blur-2xl group-hover:opacity-30 transition-opacity" />
          <div className={`relative rounded-[2rem] border overflow-hidden aspect-video md:aspect-auto md:h-[600px] flex items-center justify-center ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-white shadow-2xl'
            }`}>
            {/* Abstract Mockup Elements with Images and Float Animations */}
            <div className="relative w-full h-full p-20 flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Fake TikTok UI Card */}
                <div className={`p-6 rounded-2xl border-2 rotate-[-4deg] scale-110 translate-x-12 animate-[bounce_8s_infinite] shadow-[0_20px_50px_rgba(236,72,153,0.3)] ${darkMode ? 'bg-neutral-800/80 border-pink-500/30 backdrop-blur-xl' : 'bg-white/90 border-pink-500/20 shadow-xl backdrop-blur-xl'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop" alt="User Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm bg-neutral-200" />
                    <div className="flex-1 space-y-1">
                      <div className="text-sm font-bold text-neutral-500">@sarah.ugc</div>
                      <div className="text-[15px] font-medium leading-tight text-neutral-900 dark:text-white">Does this actually work for oily skin? I need to know before buying! 😭</div>
                    </div>
                  </div>
                </div>

                {/* Fake Instagram UI Card */}
                <div className={`p-6 rounded-2xl border-2 rotate-[6deg] -translate-x-12 translate-y-12 animate-[bounce_10s_infinite_reverse] shadow-[0_20px_50px_rgba(249,115,22,0.3)] ${darkMode ? 'bg-neutral-800/90 border-orange-500/30 backdrop-blur-xl' : 'bg-white border-orange-500/20 shadow-2xl'}`}>
                  <div className="flex items-start gap-3 mb-2">
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop" alt="User Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm bg-neutral-200" />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-1">
                        <div className="text-sm font-bold text-neutral-900 dark:text-white">alex_reviews</div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <div className="text-[15px] font-normal leading-tight text-neutral-900 dark:text-white">Drop the link immediately. This is exactly what I've been looking for 🔥</div>
                      <div className="text-xs text-neutral-500 font-semibold mt-1">Reply</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16 text-center text-3xl font-black opacity-20 uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">
                Comment Sticker UI Generator
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADSENSE BANNER --- */}
      <div className="max-w-7xl mx-auto px-6">
        <AdSense adSlot="1234567890" />
      </div>

      {/* --- FEATURES GRID (BENTO) --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black">How to Create a Fake Comment Sticker?</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">3 simple steps to generate your transparent PNG overlay.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Main Feature - 4 cols */}
            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-white shadow-xl shadow-black/[0.02]'
              }`}>
              <div className="relative z-10 w-full md:w-1/2 space-y-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                  <Layout className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black">1. Choose your platform</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  Select TikTok, Instagram, YouTube, LinkedIn or any other style. We provide the most accurate, pixel-perfect UI templates for 9 different social networks.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> Pixel Perfect TikTok & Insta Overlays
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> Native design elements (Verified badges, hearts)
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('generator')}
                  className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-pink-500 decoration-2"
                >
                  Try the tool <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center p-12 bg-gradient-to-l from-pink-500/5 to-transparent">
                <div className={`w-full h-2/3 rounded-2xl border-4 border-dashed opacity-20 ${darkMode ? 'border-neutral-700' : 'border-neutral-300'}`} />
                <div className="absolute inset-0 flex items-center justify-center rotate-12 scale-125 translate-x-12 opacity-40">
                  <Share2 className="w-64 h-64 text-pink-500/20" />
                </div>
              </div>
            </div>

            {/* Small card - 2 cols */}
            <div className={`md:col-span-2 rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-green-50/50 border-green-100 hover:border-green-200'
              }`}>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black">2. Customize message</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Add a custom profile picture, username, likes count, and the exact text of the comment you need.
                </p>
              </div>
              <button onClick={() => onNavigate('finder')} className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-green-500 decoration-2 w-fit">
                Customize <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Another Small card - 2 cols */}
            <div className={`md:col-span-2 rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-orange-50/50 border-orange-100 hover:border-orange-200'
              }`}>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black">3. Download your PNG</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Get your transparent comment overlay instantly, ready to be dropped into your video editor (CapCut, Premiere Pro).
                </p>
              </div>
              <button onClick={() => onNavigate('scripts')} className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-orange-500 decoration-2 w-fit">
                Download <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Medium Feature - 4 cols */}
            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 flex items-center justify-between group transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-neutral-900 border-neutral-900 text-white'
              }`}>
              <div className="relative z-10 w-full md:w-3/4 space-y-4">
                <div className="text-xs font-black uppercase tracking-widest text-pink-500">Why Advertisers Use It</div>
                <h3 className="text-3xl font-black leading-[1.1]">Perfect for UGC Ads <br /> <span className="opacity-50">& Video Editors.</span></h3>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-400'}`}>
                  Increase video retention. Showcasing a customer comment ("Where did you buy this?") at the start of an ad creates immediate curiosity. 100% transparent overlays make it easy to embed on any content.
                </p>
                <button onClick={() => onNavigate('templates')} className="px-6 py-3 bg-white text-black rounded-xl text-sm font-black hover:scale-105 active:scale-95 transition-all w-fit">
                  Explore Comment Ideas
                </button>
              </div>

              <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:flex items-center justify-center">
                <Sparkles className="w-32 h-32 text-pink-500 opacity-20 rotate-[-12deg]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- NUMBERS / STATS --- */}
      <section className="py-20 px-6 border-y border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black text-pink-500">100%</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Free Forever</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">13</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Free Tools</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">9</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Native UI Platforms</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">10K+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Stickers Generated</div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <h2 className="text-3xl md:text-5xl font-black">Trusted by top UGC Creators.</h2>
          </div>

          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              { text: "The most essential free tool for my TikTok ad hooks. The render is literally pixel perfect.", author: "Thomas L.", role: "350k followers" },
              { text: "Having transparent PNGs ready to drop into CapCut saves my editing team hours every week.", author: "Marie K.", role: "UGC Agency Owner" },
              { text: "The quality of these comment bubbles is incredible. You can't tell the difference from a real screenshot.", author: "Leo D.", role: "Social Media Manager" },
              { text: "I use this generator for my Instagram Reels. The 'Story' template is extremely powerful.", author: "Sarah M.", role: "Influencer Lifestyle" },
              { text: "No more manually cutting out backgrounds in Photoshop. 2 clicks and my sticker is ready.", author: "Julien R.", role: "Video Editor" },
              { text: "Used to recommend Canva, but now I swear by CommentSticker for all my custom overlays.", author: "Emma S.", role: "TikTok Strategist" },
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'
                }`}>
                <p className="text-lg font-medium leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${i % 3 === 0 ? 'from-pink-500 to-rose-500' : i % 3 === 1 ? 'from-purple-500 to-indigo-500' : 'from-orange-500 to-red-500'} flex items-center justify-center font-bold text-sm text-white shadow-lg`}>
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="font-black text-sm">{t.author}</div>
                    <div className="text-xs text-neutral-400 font-bold">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section id="faq" className="py-24 px-6 bg-neutral-500/[0.03]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <h2 className="text-3xl md:text-4xl font-black">Frequently Asked Questions (FAQ)</h2>
            <p className="text-neutral-500 font-medium">Everything you need to know about CommentSticker</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div key={i} className={`rounded-2xl border transition-all ${activeFaq === i
                ? (darkMode ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-white shadow-xl')
                : (darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 hover:border-neutral-200 shadow-sm')
                }`}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-bold">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
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
              Every tool you need to grow
            </h2>
            <p className={`text-base max-w-2xl mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
              Hook generator, video ideas, comment replies, bio builder, CTA generator, hashtags, captions, giveaway picker — all free, all in one place.
            </p>
          </div>

          {/* New tools spotlight */}
          <div className={`mb-6 rounded-2xl border p-5 ${darkMode ? 'bg-neutral-900/60 border-neutral-800' : 'bg-gradient-to-r from-violet-50 to-pink-50 border-violet-100'}`}>
            <div className={`text-[10px] font-black uppercase tracking-widest mb-4 ${darkMode ? 'text-violet-400' : 'text-violet-500'}`}>✨ New Content Tools</div>
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
                  onClick={() => onNavigate(tool.page)}
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

          {/* Classic tools grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { page: 'hashtag-generator', emoji: '#️⃣', label: 'Hashtag Generator', desc: '12 niches · 3 platforms' },
              { page: 'font-generator', emoji: '✍️', label: 'Font Generator', desc: '13 Unicode styles' },
              { page: 'caption-generator', emoji: '✏️', label: 'Caption Generator', desc: '4 platforms · 5 vibes' },
              { page: 'engagement-calculator', emoji: '📊', label: 'Engagement Rate', desc: '6 platforms + benchmarks' },
              { page: 'guide-tiktok-comment-picker', emoji: '🎯', label: 'Comment Picker', desc: 'Random winner tool' },
              { page: 'guide-tiktok-giveaway-picker', emoji: '🎁', label: 'Giveaway Picker', desc: 'Up to 5 winners' },
              { page: 'generator', emoji: '💬', label: 'Sticker Generator', desc: '9 platforms · PNG export' },
              { page: 'batch', emoji: '⚡', label: 'Batch Generator', desc: '10 stickers at once' },
            ].map(tool => (
              <button
                key={tool.page}
                onClick={() => onNavigate(tool.page)}
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
              Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">dominate</span> your niche?
            </h3>
            <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium">Join thousands of creators who already use CommentSticker to multiply their engagement and save time editing.</p>

            <div className="max-w-md mx-auto">
              <div className={`flex flex-col sm:flex-row p-2 rounded-[1.25rem] border transition-all ${darkMode ? 'bg-neutral-950 border-neutral-800 focus-within:border-pink-500/50' : 'bg-neutral-50 border-neutral-200 focus-within:border-pink-500/50 shadow-inner'
                }`}>
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="flex-1 bg-transparent px-4 py-4 text-sm focus:outline-none placeholder:font-medium"
                />
                <button
                  onClick={() => onNavigate('generator')}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                >
                  Start for Free
                </button>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                🚀 No hidden fees • Instant Access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ADSENSE BANNER --- */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <AdSense adSlot="0987654321" />
      </div>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg">CommentSticker</span>
            </div>
            <p className="text-sm font-medium text-neutral-400">Boost your digital presence with our free creative tools.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Tools</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('free-tools')} className="text-sm font-black hover:text-pink-500 w-fit text-pink-500">All Free Tools →</button>
              <button onClick={() => onNavigate('generator')} className="text-sm font-medium hover:text-pink-500 w-fit">Sticker Generator</button>
              <button onClick={() => onNavigate('batch')} className="text-sm font-medium hover:text-pink-500 w-fit">Batch Generator</button>
              <button onClick={() => onNavigate('finder')} className="text-sm font-medium hover:text-pink-500 w-fit">Question Finder</button>
              <button onClick={() => onNavigate('scripts')} className="text-sm font-medium hover:text-pink-500 w-fit">Script Generator</button>
              <button onClick={() => onNavigate('templates')} className="text-sm font-medium hover:text-pink-500 w-fit">Templates</button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Resources</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:text-pink-500 w-fit">About</button>
              <button onClick={() => onNavigate('blog')} className="text-sm font-medium hover:text-pink-500 w-fit">Blog & Guides</button>
              <button onClick={() => onNavigate('contact')} className="text-sm font-medium hover:text-pink-500 w-fit">Contact</button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Legal</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('privacy')} className="text-sm font-medium hover:text-pink-500 w-fit">Privacy Policy</button>
              <button onClick={() => onNavigate('terms')} className="text-sm font-medium hover:text-pink-500 w-fit">Terms of Service</button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-12 border-t border-neutral-100 dark:border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
            © {new Date().getFullYear()} CommentSticker. Made for Creators.
          </div>

          <div className="flex items-center gap-6 text-neutral-400">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I use CommentSticker for my videos! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}`, '_blank')}
              className="hover:text-[#1DA1F2] transition-colors"
            >
              <Twitter className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}`, '_blank')}
              className="hover:text-[#0A66C2] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </button>
            <button
              onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent("https://commentsticker.com")}&text=${encodeURIComponent("The essential tool for creators.")}`, '_blank')}
              className="hover:text-[#229ED9] transition-colors"
            >
              <ShareIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </footer>

      {/* --- FLOATING SHARE BAR (Desktop) --- */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-4 hidden lg:flex z-50">
        {[
          { name: 'Share on Twitter', icon: <Twitter className="w-5 h-5" />, color: 'bg-[#1DA1F2]', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("I use CommentSticker for my videos! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}` },
          { name: 'Share on LinkedIn', icon: <Linkedin className="w-5 h-5" />, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}` },
          { name: 'Share on Facebook', icon: <Facebook className="w-5 h-5" />, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://commentsticker.com")}` },
          { name: 'Follow us on Instagram', icon: <Instagram className="w-5 h-5" />, color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: '#' }
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => s.url !== '#' && window.open(s.url, '_blank')}
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
