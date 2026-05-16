import { AdSense } from './AdSense';
import { SEOHeader, SEOFooter, RelatedArticles, ArticleByline } from './SEOLayout';

interface GuideProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

const card = (dark: boolean) => dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200';
const muted = (dark: boolean) => dark ? 'text-neutral-400' : 'text-neutral-500';

export function BlogTikTokUsernameIdeas({ darkMode, onNavigate }: GuideProps) {
    const dm = darkMode;

    const NAMES_GIRLS = [
        // Aesthetic
        'softpetal', 'lavendersky', 'moonlitgirl', 'peachyvibes', 'ivoryrose',
        'velvetdawn', 'lilacmood', 'cherryblossomx', 'goldenhazel', 'dewdropgirl',
        // Cute
        'sugarkisses', 'bubbletea.girl', 'cottagecoregirl', 'pastelwitch', 'daydreamingdaisy',
        'honeybeemood', 'cloudninevibes', 'stardust.girl', 'pinklemonade', 'buttercupbabe',
        // Cool / Edgy
        'neonvoidgirl', 'midnightmuse_', 'darlingchaos', 'glitchprincess', 'voidpixie',
        'riotgrrrl', 'witchyvibes', 'luciferspeach', 'darkneon.girl', 'antiheroine',
        // Trendy
        'that.girlera', 'maincharacter.era', 'softlife.girl', 'aestheticgirltok', 'pilatesgirlvibes',
        'cleangirlera', 'it.girlvibes', 'romanticizinglife', 'delululife', 'bimbocore.girl',
    ];

    const NAMES_WITH_NAME = [
        // Patterns with "your name"
        '[name].creates', '[name]tok', 'its[name]', '[name]vibes', 'just[name]',
        '[name]codes', 'official[name]', 'real[name]', 'xo.[name]', '[name].world',
        // With numbers
        '[name]404', '[name]2k', '[name]x7', '[name]00', '[name]999',
        // With aesthetics
        '[name].aesthetic', '[name].diaries', '[name]_creates', 'the[name]edit', 'by[name]',
    ];

    const NAMES_BOYS = [
        'voidwalker', 'neonbyte', 'darkhorse.x', 'midnightracer', 'lostincode',
        'chaostheory_', 'staticbolt', 'urbanphenix', 'grayskullz', 'ironwavex',
        'glitchdrifter', 'nocturnalvibes', 'solarbreach', 'cryptomind', 'blackholestudio',
    ];

    const NAMES_FUNNY = [
        'notafluencer', 'accidentallyviral', 'mymomthinksiamfunny', 'professionallyunhinged',
        'thealmostfamous', 'unintentionallyrelatable', 'cryingincontent', 'forgottopost',
        'cringe.era.loading', 'notalgorithmfriendly', 'latetothetrend', 'goingviralonaccident',
        'delulusiongrandeur', 'procrastinatingcreator', 'onedayimightpostregularly',
    ];

    const NAMES_AESTHETIC = [
        // Dark academia
        'inkandivory', 'dustyarchives', 'libraryghost', 'weatheredbookmark', 'antiquelens',
        // Cottagecore
        'fernandfoliage', 'wildflowerwitch', 'morningmistgirl', 'mushroommoment', 'patchworkdreams',
        // Y2K / Cyber
        'pixelrave', 'cyberbarbie', 'y2kcrash', 'glitterglitch', 'neonnostalgia',
        // Minimalist
        'quietstudy', 'stillmoment', 'muted.life', 'softframe', 'blankpagegirl',
    ];

    const TIP_CARD = ({ emoji, title, body }: { emoji: string; title: string; body: string }) => (
        <div className={`rounded-2xl border p-5 ${card(dm)}`}>
            <div className="text-2xl mb-2">{emoji}</div>
            <h3 className={`font-black mb-1 text-base`}>{title}</h3>
            <p className={`text-sm font-medium leading-relaxed ${muted(dm)}`}>{body}</p>
        </div>
    );

    const NamePill = ({ name }: { name: string }) => (
        <span className={`inline-block px-3 py-1.5 rounded-xl text-sm font-bold border cursor-default select-all transition-colors hover:border-pink-500/50 hover:text-pink-500 ${card(dm)}`}>
            @{name}
        </span>
    );

    return (
        <div className={`min-h-screen font-sans ${dm ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={dm} />

            <main className="max-w-4xl mx-auto px-6 py-32">

                {/* Header */}
                <div className="space-y-5 mb-12">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-xs font-black uppercase tracking-wider">
                            🔥 Trending
                        </span>
                        <span className={`text-xs font-bold ${muted(dm)}`}>Updated April 2026 · 8 min read</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
                        200+ TikTok Username Ideas for 2026 (Name Ideas for Girls, Boys & More)
                    </h1>
                    <p className={`text-xl font-medium ${muted(dm)}`}>
                        Google Trends shows "TikTok name ideas for girls" and "TikTok username ideas with your name" both hit <strong className={dm ? 'text-white' : 'text-neutral-900'}>record highs</strong> in March 2026. We've curated 200+ username ideas — aesthetic, funny, cute, dark academia, Y2K and more — with tips to make yours stick.
                    </p>
                </div>
                <ArticleByline darkMode={dm} role="Content & Editorial Lead · CommentSticker Editorial Team" published="April 4, 2026" reviewed="May 16, 2026" readTime="8 min" />

                {/* Trend callout */}
                <section className={`p-6 rounded-2xl mb-10 border-l-4 border-pink-500 ${dm ? 'bg-neutral-900/60 text-neutral-200' : 'bg-pink-50 text-neutral-800'}`}>
                    <p className="font-bold text-sm mb-1 text-pink-500 uppercase tracking-wider">📈 Why This Is Trending Right Now</p>
                    <p className="font-medium">
                        In March 2026, searches for <strong>"tiktok name ideas for girls"</strong> and <strong>"tiktok username ideas with your name"</strong> both reached <strong>all-time record highs</strong> on Google Trends (US). Meanwhile, "tiktok username ideas" is up +8% month-over-month. Spring 2026 is the biggest account-creation window since TikTok Shop went mainstream — thousands of creators are starting fresh or rebranding.
                    </p>
                </section>

                <AdSense adSlot="1234567890" />

                {/* Hero image */}
                <div className="overflow-hidden rounded-3xl my-10 shadow-2xl border border-neutral-200 dark:border-neutral-800">
                    <img
                        src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop"
                        alt="TikTok app on smartphone"
                        className="w-full h-[360px] object-cover"
                    />
                </div>

                <div className="space-y-16">

                    {/* TOC */}
                    <section className={`rounded-2xl border p-6 ${card(dm)}`}>
                        <h2 className="font-black text-base mb-4">In This Article</h2>
                        <ol className={`space-y-2 text-sm font-medium list-decimal list-inside ${muted(dm)}`}>
                            <li><a href="#why-username-matters" className="hover:text-pink-500 transition-colors">Why Your TikTok Username Matters in 2026</a></li>
                            <li><a href="#girls" className="hover:text-pink-500 transition-colors">TikTok Name Ideas for Girls (Record trend ↑)</a></li>
                            <li><a href="#with-name" className="hover:text-pink-500 transition-colors">TikTok Username Ideas with Your Name (Record trend ↑)</a></li>
                            <li><a href="#aesthetic" className="hover:text-pink-500 transition-colors">Aesthetic TikTok Usernames</a></li>
                            <li><a href="#funny" className="hover:text-pink-500 transition-colors">Funny TikTok Username Ideas</a></li>
                            <li><a href="#boys" className="hover:text-pink-500 transition-colors">TikTok Name Ideas for Boys</a></li>
                            <li><a href="#rules" className="hover:text-pink-500 transition-colors">7 Rules for Picking the Perfect TikTok Name</a></li>
                            <li><a href="#check" className="hover:text-pink-500 transition-colors">How to Check if a Username is Available</a></li>
                        </ol>
                    </section>

                    {/* Section 1 */}
                    <section id="why-username-matters">
                        <h2 className="text-3xl font-black mb-4">Why Your TikTok Username Matters in 2026</h2>
                        <p className={`text-base font-medium leading-relaxed mb-4 ${muted(dm)}`}>
                            Your TikTok handle is more than a tag — it's your brand. With TikTok Shop now driving billions in e-commerce and the "For You" feed surfacing creators to cold audiences every day, your username is often the <strong className={dm ? 'text-white' : 'text-neutral-900'}>first brand impression</strong> a potential follower sees.
                        </p>
                        <p className={`text-base font-medium leading-relaxed mb-6 ${muted(dm)}`}>
                            A forgettable username (@user1847392) costs you followers. A great one (@that.girlera) earns them. Here's what makes the difference:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <TIP_CARD emoji="🔍" title="Searchability" body="People search your name across TikTok AND Google. A keyword-rich username like @fitnessgirlvibes gets organic discovery — a random one doesn't." />
                            <TIP_CARD emoji="🧠" title="Memorability" body="Short, unique names stick. The best creators in 2026 have names under 15 characters that sound good said out loud." />
                            <TIP_CARD emoji="🤝" title="Brand coherence" body="Your username sets the tone of your niche. @cleangirlera tells the algorithm and your audience exactly what to expect." />
                            <TIP_CARD emoji="📦" title="TikTok Shop trust" body="Brands and affiliates judge your handle in 3 seconds. A professional-sounding username gets more collab DMs." />
                        </div>
                    </section>

                    {/* Section 2 — Girls (RECORD) */}
                    <section id="girls">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-3xl font-black">TikTok Name Ideas for Girls</h2>
                            <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-black">🔴 Record high</span>
                        </div>
                        <p className={`text-base font-medium leading-relaxed mb-8 ${muted(dm)}`}>
                            This is the <strong className={dm ? 'text-white' : 'text-neutral-900'}>fastest-growing TikTok username search</strong> in the US right now. Whether you're going for soft aesthetic, dark academia, clean girl, or unhinged funny — here are 40 name ideas organized by vibe.
                        </p>

                        <div className="space-y-8">
                            {[
                                { label: '🌸 Soft & Aesthetic', names: NAMES_GIRLS.slice(0, 10) },
                                { label: '🍬 Cute & Playful', names: NAMES_GIRLS.slice(10, 20) },
                                { label: '🖤 Cool & Edgy', names: NAMES_GIRLS.slice(20, 30) },
                                { label: '✨ Trendy (2026 Vibes)', names: NAMES_GIRLS.slice(30, 40) },
                            ].map(group => (
                                <div key={group.label}>
                                    <p className={`text-xs font-black uppercase tracking-widest mb-3 ${muted(dm)}`}>{group.label}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.names.map(n => <NamePill key={n} name={n} />)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={`mt-8 p-5 rounded-2xl border ${dm ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                            <p className={`text-sm font-medium ${muted(dm)}`}>
                                <strong className={dm ? 'text-white' : 'text-neutral-900'}>Pro tip:</strong> The "clean girl era" aesthetic names are dominating spring 2026 TikTok. If your content is lifestyle, beauty, or wellness — lean into that language. Combine a feeling word with a format word: <em>softlife + diaries = @softlife.diaries</em>.
                            </p>
                        </div>
                    </section>

                    {/* Section 3 — With Your Name (RECORD) */}
                    <section id="with-name">
                        <div className="flex items-center gap-3 mb-4">
                            <h2 className="text-3xl font-black">TikTok Username Ideas with Your Name</h2>
                            <span className="px-2.5 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-black">🔴 Record high</span>
                        </div>
                        <p className={`text-base font-medium leading-relaxed mb-4 ${muted(dm)}`}>
                            Personal-brand creators are winning on TikTok in 2026. Using your real name (or a variation) builds trust and is easier to carry across YouTube, Instagram and LinkedIn. Here are the best <strong className={dm ? 'text-white' : 'text-neutral-900'}>patterns for building a username with your name</strong>.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3 mb-6">
                            {NAMES_WITH_NAME.map(pattern => (
                                <div key={pattern} className={`rounded-xl border px-4 py-3 ${card(dm)}`}>
                                    <code className="text-sm font-black text-pink-500">{pattern}</code>
                                </div>
                            ))}
                        </div>

                        <h3 className="text-xl font-black mb-4 mt-8">Real examples of great personal-brand TikTok names</h3>
                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                            {[
                                { name: 'itsleahrenee', why: 'Natural, easy to say' },
                                { name: 'mayabeauty.tok', why: 'Niche + name combo' },
                                { name: 'bysamanthalee', why: '"by" prefix = creator feel' },
                                { name: 'officialjordanc', why: 'Authority signal' },
                                { name: 'zoeworld_', why: 'Minimal, memorable' },
                                { name: 'alexcreates404', why: 'Number adds uniqueness' },
                            ].map(ex => (
                                <div key={ex.name} className={`rounded-xl border p-4 ${card(dm)}`}>
                                    <p className="font-black text-pink-500 text-sm mb-1">@{ex.name}</p>
                                    <p className={`text-xs font-medium ${muted(dm)}`}>{ex.why}</p>
                                </div>
                            ))}
                        </div>

                        <div className={`p-5 rounded-2xl border-l-4 border-pink-500 ${dm ? 'bg-neutral-900/60' : 'bg-pink-50'}`}>
                            <p className={`text-sm font-medium ${muted(dm)}`}>
                                <strong className={dm ? 'text-white' : 'text-neutral-900'}>Name not available?</strong> Add a period (.), underscore (_), or a niche keyword after your name. Avoid numbers like "123" — they look spammy. Try: <em>@yourname.creates</em>, <em>@yourname.tok</em>, or <em>@itsyourname</em>.
                            </p>
                        </div>
                    </section>

                    <AdSense adSlot="2345678901" />

                    {/* Section 4 — Aesthetic */}
                    <section id="aesthetic">
                        <h2 className="text-3xl font-black mb-4">Aesthetic TikTok Usernames</h2>
                        <p className={`text-base font-medium leading-relaxed mb-8 ${muted(dm)}`}>
                            "Aesthetic" is still TikTok's most enduring content category. These usernames work across dark academia, cottagecore, Y2K/cyber, and minimalist niches.
                        </p>

                        <div className="space-y-6">
                            {[
                                { label: '📚 Dark Academia', names: NAMES_AESTHETIC.slice(0, 5) },
                                { label: '🌿 Cottagecore', names: NAMES_AESTHETIC.slice(5, 10) },
                                { label: '💾 Y2K / Cyber', names: NAMES_AESTHETIC.slice(10, 15) },
                                { label: '🤍 Minimalist', names: NAMES_AESTHETIC.slice(15, 20) },
                            ].map(group => (
                                <div key={group.label}>
                                    <p className={`text-xs font-black uppercase tracking-widest mb-3 ${muted(dm)}`}>{group.label}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {group.names.map(n => <NamePill key={n} name={n} />)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 5 — Funny */}
                    <section id="funny">
                        <h2 className="text-3xl font-black mb-4">Funny TikTok Username Ideas</h2>
                        <p className={`text-base font-medium leading-relaxed mb-6 ${muted(dm)}`}>
                            Ironic, self-deprecating, and "unhinged" content is dominating FYP in 2026. A funny username primes viewers before they even hit play.
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {NAMES_FUNNY.map(n => <NamePill key={n} name={n} />)}
                        </div>
                        <div className={`p-5 rounded-2xl border ${card(dm)}`}>
                            <p className={`text-sm font-medium ${muted(dm)}`}>
                                <strong className={dm ? 'text-white' : 'text-neutral-900'}>The formula:</strong> self-awareness + hyperbole. Think about what your followers would laugh at before your video even starts. <em>"professionallyunhinged"</em> works because it's relatable, ironic, and tells you exactly what to expect.
                            </p>
                        </div>
                    </section>

                    {/* Section 6 — Boys */}
                    <section id="boys">
                        <h2 className="text-3xl font-black mb-4">TikTok Name Ideas for Boys</h2>
                        <p className={`text-base font-medium leading-relaxed mb-6 ${muted(dm)}`}>
                            Cool, minimal, and slightly mysterious wins for male creators. Gaming, tech, fitness, and skate niches dominate. Short names with dark or energetic vibes perform well.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {NAMES_BOYS.map(n => <NamePill key={n} name={n} />)}
                        </div>
                    </section>

                    {/* Section 7 — Rules */}
                    <section id="rules">
                        <h2 className="text-3xl font-black mb-6">7 Rules for Picking the Perfect TikTok Username</h2>
                        <div className="flex flex-col gap-4">
                            {[
                                { n: '01', title: 'Keep it under 20 characters', body: 'Shorter usernames are easier to remember, search, and tag. Aim for under 15 if possible.' },
                                { n: '02', title: 'Make it pronounceable', body: 'If you can\'t say it out loud, followers can\'t recommend you. Read it aloud — if it\'s awkward, change it.' },
                                { n: '03', title: 'Hint at your niche (optional but powerful)', body: '"fitnessgirl", "gamerbro", "beautytok" — adding a niche signal helps the algorithm categorize your account faster.' },
                                { n: '04', title: 'Avoid dates and years', body: '@sarah2019 ages badly. Your content will outlive the year. Skip it.' },
                                { n: '05', title: 'Check cross-platform availability', body: 'Try to get the same handle on Instagram and YouTube. Consistency builds a personal brand. Use Namecheckr or similar tools.' },
                                { n: '06', title: 'Dots over underscores', body: 'Periods (.) look cleaner than underscores (_) in 2026 TikTok aesthetics. @soft.girl > @soft_girl.' },
                                { n: '07', title: 'Test it with a comment sticker', body: 'Before committing, visualize how your @username looks in a real TikTok comment. Use CommentSticker\'s free generator to preview it.' },
                            ].map(rule => (
                                <div key={rule.n} className={`rounded-2xl border p-5 flex gap-4 ${card(dm)}`}>
                                    <span className="text-3xl font-black text-pink-500/40 leading-none flex-shrink-0">{rule.n}</span>
                                    <div>
                                        <h3 className="font-black mb-1">{rule.title}</h3>
                                        <p className={`text-sm font-medium ${muted(dm)}`}>{rule.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 8 — Check availability */}
                    <section id="check">
                        <h2 className="text-3xl font-black mb-4">How to Check if a TikTok Username is Available</h2>
                        <div className="flex flex-col gap-3 mb-6">
                            {[
                                { step: '1', title: 'Search on TikTok', body: 'Open TikTok, tap Discover, and search the exact username. If no account appears, it\'s likely available.' },
                                { step: '2', title: 'Try to register it', body: 'Go to Settings → Account → Username and attempt to change to it. TikTok will instantly tell you if it\'s taken.' },
                                { step: '3', title: 'Check cross-platform', body: 'Visit Namecheckr.com or Instantusername.com to check availability on Instagram, X, YouTube, and more simultaneously.' },
                                { step: '4', title: 'Add a variation if taken', body: 'Try [name].tok, [name].creates, or its[name]. Avoid random numbers — they dilute brand recognition.' },
                            ].map(s => (
                                <div key={s.step} className={`rounded-2xl border p-5 flex gap-4 items-start ${card(dm)}`}>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                        {s.step}
                                    </div>
                                    <div>
                                        <h3 className="font-black mb-1">{s.title}</h3>
                                        <p className={`text-sm font-medium ${muted(dm)}`}>{s.body}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA — CommentSticker tie-in */}
                    <section className={`p-8 rounded-3xl text-center ${dm ? 'bg-gradient-to-br from-pink-500/20 to-orange-500/10 border border-pink-500/20' : 'bg-gradient-to-br from-pink-50 to-orange-50 border border-pink-100'}`}>
                        <p className="text-2xl font-black mb-3">Visualize your new TikTok username</p>
                        <p className={`text-sm font-medium mb-6 max-w-md mx-auto ${muted(dm)}`}>
                            Before you commit to a name, see how it looks in an actual TikTok comment. Use CommentSticker's free generator to preview your username in a pixel-perfect TikTok comment — then download it as transparent PNG.
                        </p>
                        <button
                            onClick={() => onNavigate('generator')}
                            className="px-8 py-3.5 bg-gradient-to-r from-pink-500 to-orange-500 text-white rounded-xl font-black text-sm shadow-lg shadow-pink-500/25 hover:scale-105 active:scale-95 transition-all"
                        >
                            Preview my username free →
                        </button>
                    </section>

                    {/* Quick FAQ */}
                    <section>
                        <h2 className="text-3xl font-black mb-6">FAQs</h2>
                        <div className="flex flex-col gap-4">
                            {[
                                {
                                    q: 'Can I change my TikTok username?',
                                    a: 'Yes. Go to Profile → Edit Profile → Username. TikTok allows one username change every 30 days, so choose carefully.',
                                },
                                {
                                    q: 'How many characters can a TikTok username be?',
                                    a: 'TikTok usernames can be 2–24 characters. They can include letters, numbers, underscores, and periods — but cannot start with a period or number.',
                                },
                                {
                                    q: 'Can TikTok usernames have spaces?',
                                    a: 'No. Spaces are not allowed in TikTok usernames. Use a period (.) or underscore (_) as a separator instead.',
                                },
                                {
                                    q: 'Should my TikTok username match my display name?',
                                    a: 'Not necessarily. Your username (@handle) should be short and searchable. Your display name can be more creative and longer — many creators use their real name as the display name and a shorter handle as the username.',
                                },
                                {
                                    q: 'What are the best TikTok names for 2026?',
                                    a: 'In 2026, the best TikTok names are personal (with your first name), niche-specific, and under 15 characters. The "clean girl era" and aesthetic/Y2K usernames are currently at record-high search interest.',
                                },
                            ].map(faq => (
                                <div key={faq.q} className={`rounded-2xl border p-5 ${card(dm)}`}>
                                    <h3 className="font-black mb-2 text-base">{faq.q}</h3>
                                    <p className={`text-sm font-medium leading-relaxed ${muted(dm)}`}>{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>

                {/* Related articles */}
                <RelatedArticles
                    ids={['guide-tiktok-comment-generator', 'guide-tiktok-comment-picker', 'font-generator', 'hashtag-generator']}
                    onNavigate={onNavigate}
                    darkMode={dm}
                />
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
