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
  Facebook
} from 'lucide-react';
import { AdSense } from './AdSense';

interface LandingPageProps {
  darkMode: boolean;
  onNavigate: (page: any) => void;
}

export function LandingPage({ darkMode, onNavigate }: LandingPageProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqItems = [
    {
      q: "Est-ce que c'est gratuit ?",
      a: "Toutes les fonctionnalités de base sont gratuites pour vous aider à booster vos premiers contenus."
    },
    {
      q: "Quelles plateformes sont supportées ?",
      a: "Nous supportons TikTok, Instagram, YouTube, Twitter (X), Facebook, Threads, Snapchat et Discord. Chaque sticker est conçu pour être pixel-perfect."
    },
    {
      q: "Puis-je utiliser mes propres photos ?",
      a: "Absolument. Vous pouvez uploader n'importe quelle photo de profil par drag & drop ou via un lien direct pour personnaliser vos stickers."
    },
    {
      q: "Le Script Generator utilise-t-il l'IA ?",
      a: "Notre moteur utilise des algorithmes de patterns viraux basés sur les meilleures pratiques de contenu pour générer des scripts qui captent l'attention dès les premières secondes."
    }
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-pink-500/30 ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-4`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border transition-all duration-300 ${isScrolled
          ? (darkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-white/50 shadow-lg shadow-black/5') + ' backdrop-blur-xl'
          : 'bg-transparent border-transparent'
          }`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-9 h-9 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500">
              CommentSticker
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium hover:text-pink-500 transition-colors">Fonctionnalités</a>
            <a href="#testimonials" className="text-sm font-medium hover:text-pink-500 transition-colors">Témoignages</a>
            <a href="#faq" className="text-sm font-medium hover:text-pink-500 transition-colors">FAQ</a>
          </div>

          <button
            onClick={() => onNavigate('generator')}
            className="px-5 py-2.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-pink-500/25 hover:scale-105 transition-all active:scale-95"
          >
            Lancer l'App
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-pink-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-wider animate-bounce">
            <Sparkles className="w-3 h-3" />
            Nouveau: Upload Photo par Drag & Drop
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[8.5rem] font-black leading-[0.85] tracking-tighter">
            Boostez votre <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-rose-500 to-orange-500">
              reach social.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
            L'outil ultime pour les créateurs. Générez des stickers de commentaires réalistes, des scripts optimisés par des patterns viraux et trouvez les meilleures questions pour votre niche.
          </p>

          <div className="max-w-md mx-auto pt-4">
            <div className={`flex flex-col sm:flex-row p-2 rounded-[1.25rem] border transition-all ${darkMode ? 'bg-neutral-900 border-neutral-800 focus-within:border-pink-500/50' : 'bg-white border-neutral-200 focus-within:border-pink-500/50 shadow-xl shadow-black/5'
              }`}>
              <input
                type="email"
                placeholder="Votre adresse email..."
                className="flex-1 bg-transparent px-4 py-3 text-sm focus:outline-none"
              />
              <button
                onClick={() => onNavigate('generator')}
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                C'est parti
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Pas de carte requise • 100% Gratuit
            </p>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-20">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-8">Propulsez vos contenus sur</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
              <span className="font-black text-2xl tracking-tighter">TikTok</span>
              <span className="font-black text-2xl tracking-tighter">Instagram</span>
              <span className="font-black text-2xl tracking-tighter">YouTube</span>
              <span className="font-black text-2xl tracking-tighter">Twitter</span>
              <span className="font-black text-2xl tracking-tighter">Snapchat</span>
              <span className="font-black text-2xl tracking-tighter">Discord</span>
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
            {/* Abstract Mockup Elements */}
            <div className="relative w-full h-full p-20 flex flex-col items-center justify-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Fake UI Cards */}
                <div className={`p-6 rounded-2xl border-2 rotate-[-4deg] scale-110 translate-x-12 ${darkMode ? 'bg-neutral-800/50 border-neutral-700 backdrop-blur-md' : 'bg-white/70 border-white shadow-xl backdrop-blur-md'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-500/20" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 w-24 bg-neutral-400/20 rounded-full" />
                      <div className="h-1.5 w-16 bg-neutral-400/10 rounded-full" />
                    </div>
                  </div>
                  <div className="h-3 w-full bg-neutral-400/20 rounded-full mb-2" />
                  <div className="h-3 w-2/3 bg-neutral-400/10 rounded-full" />
                </div>

                <div className={`p-6 rounded-2xl border-2 rotate-[6deg] -translate-x-12 translate-y-12 ${darkMode ? 'bg-neutral-800/80 border-neutral-700 backdrop-blur-md' : 'bg-white border-neutral-100 shadow-2xl'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-2 w-20 bg-neutral-400/20 rounded-full" />
                      <div className="h-1.5 w-12 bg-neutral-400/10 rounded-full" />
                    </div>
                  </div>
                  <div className="h-3 w-full bg-neutral-400/20 rounded-full mb-2" />
                  <div className="h-3 w-3/4 bg-neutral-400/10 rounded-full" />
                  <div className="mt-4 flex gap-2">
                    <div className="h-6 w-16 bg-pink-500/10 rounded-full border border-pink-500/10" />
                    <div className="h-6 w-16 bg-orange-500/10 rounded-full border border-orange-500/10" />
                  </div>
                </div>
              </div>

              <div className="mt-12 text-center text-4xl font-black opacity-10 uppercase tracking-widest">
                Générateur de stickers UI
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
            <h2 className="text-3xl md:text-5xl font-black">Tout ce dont vous avez besoin.</h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-medium">4 outils puissants intégrés en une seule plateforme gratuite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {/* Main Feature - 4 cols */}
            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-white shadow-xl shadow-black/[0.02]'
              }`}>
              <div className="relative z-10 w-full md:w-1/2 space-y-6">
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                  <Layout className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-black">Comment Sticker UI</h3>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                  Le générateur le plus précis du marché. Choisissez parmi 8 réseaux sociaux et personnalisez chaque détail : avatar, username, badge certifié, likes et temps.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> Pixel Perfect TikTok & Insta
                  </li>
                  <li className="flex items-center gap-2 text-sm font-bold text-pink-500">
                    <CheckCircle2 className="w-4 h-4" /> Export HD sans perte
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('generator')}
                  className="inline-flex items-center gap-2 text-sm font-black hover:gap-3 transition-all underline underline-offset-4 decoration-pink-500 decoration-2"
                >
                  Essayer l'outil <ChevronRight className="w-4 h-4" />
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
                <h3 className="text-2xl font-black">Question Finder</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Ne soyez plus jamais en panne d'inspiration. Trouvez les sujets brûlants.
                </p>
              </div>
              <button onClick={() => onNavigate('finder')} className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Another Small card - 2 cols */}
            <div className={`md:col-span-2 rounded-[2.5rem] border p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-orange-50/50 border-orange-100 hover:border-orange-200'
              }`}>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
                <Zap className="w-6 h-6" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-black">Patterns Viraux</h3>
                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                  Plus de 100 structures de scripts pour maximiser vos likes et abonnés.
                </p>
              </div>
              <button onClick={() => onNavigate('scripts')} className="w-10 h-10 rounded-full bg-white dark:bg-neutral-800 border flex items-center justify-center hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-neutral-900 transition-all shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Medium Feature - 4 cols */}
            <div className={`md:col-span-4 rounded-[2.5rem] border p-8 flex items-center justify-between group transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-neutral-900 border-neutral-900 text-white'
              }`}>
              <div className="relative z-10 w-full md:w-3/4 space-y-4">
                <div className="text-xs font-black uppercase tracking-widest text-pink-500">Master Prompt</div>
                <h3 className="text-3xl font-black leading-[1.1]">AI-Powered Script Generator <br /> <span className="opacity-50">Basé sur vos propres questions.</span></h3>
                <p className={`text-sm font-medium leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-400'}`}>
                  Collez une question et notre moteur génère un script structuré : Hook, Transition, Valeur, et CTA de clôture.
                </p>
                <button onClick={() => onNavigate('scripts')} className="px-6 py-3 bg-white text-black rounded-xl text-sm font-black hover:scale-105 active:scale-95 transition-all w-fit">
                  Explorer les scripts
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
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Gratuit à vie</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">50+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Hooks Viraux</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">8</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Plateformes UI</div>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl md:text-5xl font-black">10K+</div>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 text-center">Stickers créés</div>
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
            <h2 className="text-3xl md:text-5xl font-black">Approuvé par les créateurs.</h2>
          </div>

          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            {[
              { text: "L'outil gratuit le plus indispensable pour mes hooks TikTok. Le rendu est juste parfait.", author: "Thomas L.", role: "350k abonnés" },
              { text: "Le Question Finder m'a sauvé plus d'une fois. Je n'ai plus jamais de syndrome de la page blanche.", author: "Marie K.", role: "YouTubeuse Education" },
              { text: "Les stickers sont d'une qualité incroyable. On ne voit pas la différence avec un vrai screen.", author: "Léo D.", role: "Social Media Manager" },
              { text: "J'utilise le script generator pour mes Reels. Le format 'Story' est surpuissant.", author: "Sarah M.", role: "Influencer Lifestyle" },
              { text: "Finit le détourage manuel sur Photoshop. En 2 clics mon sticker est prêt.", author: "Julien R.", role: "Graphiste & Créateur" },
              { text: "Je recommandais Canva avant, maintenant je ne jure que par CommentSticker.", author: "Emma S.", role: "TikTok Strategist" },
            ].map((t, i) => (
              <div key={i} className={`break-inside-avoid p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'
                }`}>
                <p className="text-lg font-medium leading-relaxed italic mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-sm">
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
            <h2 className="text-3xl md:text-4xl font-black">Questions Fréquentes</h2>
            <p className="text-neutral-500 font-medium">Tout savoir sur CommentSticker</p>
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
              Prêt à <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">dominer</span> votre niche ?
            </h3>
            <p className="text-lg md:text-xl text-neutral-500 mb-12 max-w-2xl mx-auto font-medium">Rejoignez des milliers de créateurs qui utilisent déjà CommentSticker pour démultiplier leur engagement et gagner du temps.</p>

            <div className="max-w-md mx-auto">
              <div className={`flex flex-col sm:flex-row p-2 rounded-[1.25rem] border transition-all ${darkMode ? 'bg-neutral-950 border-neutral-800 focus-within:border-pink-500/50' : 'bg-neutral-50 border-neutral-200 focus-within:border-pink-500/50 shadow-inner'
                }`}>
                <input
                  type="email"
                  placeholder="Votre adresse email..."
                  className="flex-1 bg-transparent px-4 py-4 text-sm focus:outline-none placeholder:font-medium"
                />
                <button
                  onClick={() => onNavigate('generator')}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                >
                  C'est parti gratuitement
                </button>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                🚀 Aucun frais caché • Accès instantané
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
            <p className="text-sm font-medium text-neutral-400">Boostez votre présence digitale avec nos outils créatifs gratuits.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Outils</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('generator')} className="text-sm font-medium hover:text-pink-500 w-fit">Générateur Sticker</button>
              <button onClick={() => onNavigate('finder')} className="text-sm font-medium hover:text-pink-500 w-fit">Question Finder</button>
              <button onClick={() => onNavigate('scripts')} className="text-sm font-medium hover:text-pink-500 w-fit">Script Generator</button>
              <button onClick={() => onNavigate('templates')} className="text-sm font-medium hover:text-pink-500 w-fit">Templates</button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-black text-sm uppercase tracking-widest text-neutral-400">Ressources</h4>
            <div className="flex flex-col gap-2">
              <button onClick={() => onNavigate('about')} className="text-sm font-medium hover:text-pink-500 w-fit">À Propos</button>
              <button onClick={() => onNavigate('contact')} className="text-sm font-medium hover:text-pink-500 w-fit">Contact</button>
              <span className="text-sm font-medium hover:text-pink-500 cursor-pointer">Guide d'utilisation</span>
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
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("J'utilise CommentSticker pour mes vidéos ! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}`, '_blank')}
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
              onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent("https://commentsticker.com")}&text=${encodeURIComponent("L'outil indispensable pour les créateurs.")}`, '_blank')}
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
          { icon: <Twitter className="w-5 h-5" />, color: 'bg-[#1DA1F2]', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent("J'utilise CommentSticker pour mes vidéos ! 🚀")}&url=${encodeURIComponent("https://commentsticker.com")}` },
          { icon: <Linkedin className="w-5 h-5" />, color: 'bg-[#0A66C2]', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://commentsticker.com")}` },
          { icon: <Facebook className="w-5 h-5" />, color: 'bg-[#1877F2]', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://commentsticker.com")}` },
          { icon: <Instagram className="w-5 h-5" />, color: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]', url: '#' }
        ].map((s, i) => (
          <button
            key={i}
            onClick={() => s.url !== '#' && window.open(s.url, '_blank')}
            className={`w-12 h-12 ${s.color} text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group relative`}
          >
            {s.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
