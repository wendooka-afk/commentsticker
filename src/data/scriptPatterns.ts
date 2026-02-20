// Master prompts & viral patterns for script generation

export type ScriptFormat = 'direct' | 'story' | 'tutorial' | 'myth' | 'list' | 'avant-apres' | 'controverse';
export type ScriptTone = 'professional' | 'casual' | 'energetic';
export type ScriptLength = 'short' | 'medium' | 'long';
export type NicheKey = 'business' | 'fitness' | 'finance' | 'devperso' | 'contenu' | 'tech' | 'cuisine' | 'relations' | 'etudes' | 'voyage' | 'general';

export const formatLabels: Record<ScriptFormat, { name: string; desc: string; icon: string }> = {
    direct: { name: 'Direct Response', desc: 'Clear and concise reply', icon: '💬' },
    story: { name: 'Storytelling', desc: 'Tells a personal story', icon: '📖' },
    tutorial: { name: 'Mini-tutorial', desc: 'Explains step by step', icon: '🎓' },
    myth: { name: 'Myth Buster', desc: 'Debunks a myth or misconception', icon: '🧨' },
    list: { name: 'List', desc: '3-5 key points', icon: '📋' },
    'avant-apres': { name: 'Before / After', desc: 'Personal transformation', icon: '🔄' },
    controverse: { name: 'Controversial', desc: 'Strong opinion that divides', icon: '⚡' },
};

export const toneLabels: Record<ScriptTone, string> = {
    professional: 'Professional',
    casual: 'Casual',
    energetic: 'Energetic',
};

export const lengthLabels: Record<ScriptLength, { name: string; duration: string }> = {
    short: { name: 'Short', duration: '30s' },
    medium: { name: 'Medium', duration: '60s' },
    long: { name: 'Long', duration: '90s' },
};

export const nicheLabels: Record<NicheKey, { name: string; icon: string }> = {
    business: { name: 'Business', icon: '💼' },
    fitness: { name: 'Fitness', icon: '💪' },
    finance: { name: 'Finance', icon: '💰' },
    devperso: { name: 'Pers. Dev.', icon: '🧠' },
    contenu: { name: 'Content', icon: '🎬' },
    tech: { name: 'Tech', icon: '💻' },
    cuisine: { name: 'Cooking', icon: '🍳' },
    relations: { name: 'Relationships', icon: '❤️' },
    etudes: { name: 'Studies', icon: '📚' },
    voyage: { name: 'Travel', icon: '✈️' },
    general: { name: 'General', icon: '🌐' },
};

function pick<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

// ─── MASTER HOOKS (niche-aware) ─────────────────────────────
const nicheHooks: Record<NicheKey, string[]> = {
    business: [
        "If you're starting a business in {year}, you MUST know this...",
        "The #1 mistake that kills 90% of entrepreneurs...",
        "What no one tells you about freelancing...",
        "I lost thousands of dollars before understanding this...",
        "The secret of entrepreneurs who succeed in silence...",
    ],
    fitness: [
        "If you make this mistake at the gym, you're wasting your time...",
        "3 months of transformation, here is what changed...",
        "What your coach will never tell you...",
        "I tried it for 90 days, here are the results...",
        "Stop this exercise, it's destroying your joints...",
    ],
    finance: [
        "If you're not investing yet, watch this...",
        "The mistake costing you thousands every year...",
        "How I doubled my savings in 6 months...",
        "What the bank doesn't want you to know...",
        "3 investments I wish I made earlier...",
    ],
    devperso: [
        "The turning point that radically changed my life...",
        "Stop doing this every morning, it's ruining your life...",
        "The routine that made me 10x more productive...",
        "What I wish I could tell myself 5 years ago...",
        "The most common lie in personal development...",
    ],
    contenu: [
        "How I exploded from 0 to 100K followers...",
        "The algorithm favors THIS type of content...",
        "The secret behind videos with 1M+ views...",
        "Stop posting at this time...",
        "What top creators aren't showing you...",
    ],
    tech: [
        "This language will dominate in {year}...",
        "The tool that saved me 10 hours a week...",
        "How to become a dev in 6 months without a degree...",
        "The #1 mistake beginner developers make...",
        "Will AI replace devs? My honest answer...",
    ],
    cuisine: [
        "This recipe changed my dinners forever...",
        "The mistake 90% of people make in the kitchen...",
        "Healthy meals for the whole week in 1 hour...",
        "The secret ingredient no one uses...",
        "How to eat healthy on a budget...",
    ],
    relations: [
        "The #1 sign your relationship is in danger...",
        "What I wish I knew before my relationship...",
        "The sentence that saved our relationship...",
        "Stop doing this, it's killing your relationship...",
        "How to know if they're the right person...",
    ],
    etudes: [
        "The study method that doubled my grades...",
        "What school doesn't teach you...",
        "How to pass your exams without cramming...",
        "The tool that changed how I study...",
        "3 fatal mistakes during exams...",
    ],
    voyage: [
        "How I travel 6 months a year without being rich...",
        "The #1 mistake beginner travelers make...",
        "This country costs $15/day all inclusive...",
        "The secret to traveling first class on a budget...",
        "How to work and travel at the same time...",
    ],
    general: [
        "No one will tell you this but...",
        "I wish I knew this earlier...",
        "What 99% of people don't understand...",
        "The secret no one wants to tell you...",
        "3 things I wish I knew before...",
    ],
};

// ─── TRANSITIONS ─────────────────────────────
const transitions: Record<ScriptTone, string[]> = {
    professional: [
        "And here is what you need to remember.",
        "Allow me to explain.",
        "Here is the answer I wish I received.",
        "The data speaks for itself.",
        "And the answer might surprise you.",
    ],
    casual: [
        "Let me explain.",
        "And honestly, it's simpler than you think.",
        "OK, here's the thing.",
        "And this is where it gets interesting.",
        "Listen closely, this is important.",
    ],
    energetic: [
        "And I'm going to give you THE answer!",
        "WARNING, this is going to change your perspective!",
        "And trust me, you won't believe it!",
        "Hold on tight, this is HUGE!",
        "And here, GAME CHANGER!",
    ],
};

// ─── CTAs ─────────────────────────────
const ctas: Record<ScriptTone, string[]> = {
    professional: [
        "Share your experience in the comments.",
        "If you found this content useful, save it.",
        "Which point stood out to you the most?",
        "Leave your questions in the comments.",
    ],
    casual: [
        "Tell me your question in the comments!",
        "Like if you learned something.",
        "Save this video for later.",
        "Tag someone who needs to see this.",
        "Which one is your favorite? Tell me in the comments.",
    ],
    energetic: [
        "LIKE if this helped you and SHARE!",
        "Comment '🔥' if you want part 2!",
        "SAVE this RIGHT NOW!",
        "You want me to elaborate? TELL ME!",
        "Share with someone who NEEDS to see this!",
    ],
};

// ─── NICHE VOCABULARY ─────────────────────────────
const nicheVocab: Record<NicheKey, { metrics: string[]; actions: string[]; results: string[] }> = {
    business: { metrics: ["revenue", "clients", "income", "margin"], actions: ["close", "prospect", "scale", "automate"], results: ["10K/month", "financial freedom", "independence", "growth"] },
    fitness: { metrics: ["reps", "sets", "macros", "body weight"], actions: ["train", "track", "recover", "progress"], results: ["physical transformation", "fat loss", "muscle gain", "self-confidence"] },
    finance: { metrics: ["yield", "portfolio", "dividends", "savings"], actions: ["invest", "diversify", "save", "analyze"], results: ["financial independence", "passive income", "wealth", "freedom"] },
    devperso: { metrics: ["productivity", "habits", "goals", "mindset"], actions: ["meditate", "journal", "visualize", "prioritize"], results: ["mental clarity", "confidence", "serenity", "achievement"] },
    contenu: { metrics: ["views", "followers", "engagement", "watch time"], actions: ["post", "script", "film", "edit"], results: ["virality", "community", "monetization", "impact"] },
    tech: { metrics: ["lines of code", "projects", "contributions", "repos"], actions: ["code", "deploy", "debug", "learn"], results: ["first job", "remote work", "freelance", "profitable side project"] },
    cuisine: { metrics: ["calories", "meal budget", "prep time", "portions"], actions: ["prepare", "cook", "organize", "taste"], results: ["healthy meals", "savings", "pleasure", "time saved"] },
    relations: { metrics: ["communication", "trust", "quality time", "compromise"], actions: ["listen", "communicate", "surprise", "grow together"], results: ["solid relationship", "connection", "fulfillment", "happiness"] },
    etudes: { metrics: ["grades", "hours studied", "flashcards", "exams passed"], actions: ["revise", "organize", "practice", "memorize"], results: ["honors", "degree", "understanding", "confidence"] },
    voyage: { metrics: ["budget/day", "countries visited", "miles traveled", "travel days"], actions: ["book", "explore", "photograph", "adapt"], results: ["freedom", "discovery", "memories", "open-mindedness"] },
    general: { metrics: ["results", "progress", "goals", "milestones"], actions: ["start", "persevere", "adjust", "measure"], results: ["success", "transformation", "growth", "achievement"] },
};

// ─── SCRIPT GENERATION ENGINE ─────────────────────────────
export function generateScript(
    question: string,
    format: ScriptFormat,
    tone: ScriptTone,
    length: ScriptLength,
    niche: NicheKey,
): string {
    const q = question || `How to succeed in ${nicheLabels[niche].name.toLowerCase()}`;
    const year = new Date().getFullYear();
    const hook = pick(nicheHooks[niche]).replace('{year}', String(year));
    const transition = pick(transitions[tone]);
    const cta = pick(ctas[tone]);
    const vocab = nicheVocab[niche];
    const metric = pick(vocab.metrics);
    const action = pick(vocab.actions);
    const result = pick(vocab.results);

    const g = tone === 'energetic' ? 'STOP! ' : tone === 'casual' ? '' : '';
    const cas = tone === 'casual';
    const ene = tone === 'energetic';
    const pro = tone === 'professional';

    const sections: string[] = [];

    // Helper to add a section
    const add = (label: string, dur: string, ...lines: string[]) => {
        sections.push(`[${label} — ${dur}]\\n${lines.filter(Boolean).join('\\n')}`);
    };

    if (format === 'direct') {
        add('HOOK', '3s', `${g}"${q}"`, hook);
        add('TRANSITION', '5s', transition);
        if (length !== 'short') add('CONTEXT', '10s',
            `${cas ? 'Actually, ' : ''}this question comes up all the time.`,
            `${ene ? 'And the answer will SURPRISE you! ' : ''}It's a topic that affects a lot of people.`
        );
        add('ANSWER', length === 'short' ? '20s' : '30s',
            `${cas ? "Here's the thing: " : 'Here is my answer: '}there are ${length === 'long' ? 'four' : 'three'} essential elements.`,
            `\\nFirst, ${ene ? "and it's CRUCIAL: " : ''}${action}. It's the foundation for achieving ${result}.`,
            `\\nSecond, track your ${metric}. ${cas ? 'What gets measured gets improved.' : 'Measurement allows optimization.'}`,
            `\\nThird, be consistent. ${ene ? 'CONSISTENCY beats talent!' : 'Consistency is more important than intensity.'}`
        );
        if (length === 'long') add('DEEP DIVE', '20s',
            `${cas ? 'And the bonus point: ' : 'Fourth element: '}surround yourself with the right people.`,
            `Your environment determines your ${metric}. ${ene ? "It's NON-NEGOTIABLE!" : ''}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'story') {
        add('HOOK', '3s', `${g}"${q}" — This question takes me back to a specific moment.`);
        add('SITUATION', length === 'short' ? '10s' : '15s',
            `${cas ? 'Get this, ' : ''}a few years ago, I was in a tough situation.`,
            `${ene ? 'Like REALLY struggling! ' : ''}I was asking myself exactly this question.`,
            length !== 'short' ? `I had tried everything. ${cas ? 'Nothing worked.' : 'With no meaningful results.'}` : ''
        );
        if (length !== 'short') add('TURNING POINT', '15s',
            `And then one day, someone told me: "${cas ? 'Stop looking for perfection.' : 'Stop waiting for ideal conditions.'}"`,
            `${ene ? 'And then, it CLICKED! ' : ''}I realized I needed to ${action} immediately.`
        );
        add('RESULT', length === 'short' ? '10s' : '15s',
            `${cas ? 'And guess what? ' : ''}The results followed. ${result}.`,
            `${ene ? 'And trust me, it was SO worth it!' : ''}`,
            `What I learned: ${cas ? "take the first step, even if it's imperfect." : 'imperfect action beats perfect inaction.'}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'tutorial') {
        add('HOOK', '3s', `${g}"${q}" — ${cas ? "I'll show you step-by-step." : 'Here is the method.'}`);
        if (length !== 'short') add('INTRO', '8s',
            `${cas ? "It's not complicated, you'll see." : "It's simpler than it seems."}`,
            `${ene ? "Take notes, this is HUGE!" : ''}`
        );
        add('STEP 1', '10s', `First step: ${action}.`, `${cas ? "That's the basics, start there." : 'This is the foundation of the method.'}`);
        add('STEP 2', '10s', `Second step: track your ${metric} regularly.`, `${ene ? 'What gets measured gets IMPROVED!' : ''}`);
        add('STEP 3', '10s', `Third step: adjust based on the results.`, `${cas ? "It's normal if it's not perfect on the first try." : ''}`);
        if (length === 'long') add('STEP 4', '10s', `Fourth step: optimize for ${result}.`, `This is where you go to the next level.`);
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'myth') {
        add('HOOK', '3s', `${g}"${q}" — ${ene ? 'We need to talk about this MYTH!' : "Let's debunk this belief."}`);
        add('THE MYTH', '10s',
            `Many think you need ${pick(['years of experience', 'a big budget', 'connections', 'a degree'])} to succeed.`,
            `${cas ? "It's a belief that holds a lot of people back." : 'This is a limiting belief.'}`
        );
        add('THE TRUTH', length === 'short' ? '15s' : '25s',
            `${ene ? 'The TRUTH: ' : 'In reality, '}it's false.`,
            `What really matters: ${action} and tracking your ${metric}.`,
            `${cas ? "I've seen people achieve " : 'People have achieved '}${result} starting from scratch.`,
            length !== 'short' ? `Perfect conditions don't exist. ${ene ? 'Stop waiting!' : ''}` : ''
        );
        if (length === 'long') add('THE PROOF', '15s',
            `${cas ? 'Look at ' : 'Observe '}the success stories. ${ene ? 'NONE ' : 'None '}started with everything.`,
            `The common denominator: taking action despite doubts.`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'list') {
        const count = length === 'short' ? 3 : length === 'medium' ? 5 : 7;
        add('HOOK', '3s', `${g}${count} truths about "${q}"`);
        const points = [
            `Start where you are. ${ene ? 'Not tomorrow, NOW!' : ''}`,
            `Track your ${metric}. ${cas ? 'What gets measured gets improved.' : ''}`,
            `${pick(['Be consistent.', 'Consistency > intensity.'])} ${ene ? "It's CRUCIAL!" : ''}`,
            `Surround yourself with the right people. ${cas ? 'Your environment defines you.' : ''}`,
            `Learn by doing. ${ene ? 'Action beats theory!' : ''}`,
            `Invest in yourself. ${cas ? 'Your best investment.' : ''}`,
            `Start before you're ready. ${ene ? 'The perfect moment DOES NOT exist!' : ''}`,
        ];
        for (let i = 0; i < count; i++) {
            add(`POINT ${i + 1}`, length === 'short' ? '8s' : '10s', points[i]);
        }
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'avant-apres') {
        add('HOOK', '3s', `${g}"${q}" — My transformation in a few months.`);
        add('BEFORE', length === 'short' ? '12s' : '20s',
            `${cas ? 'Before, ' : 'A few months ago, '}I was stuck. My ${metric} was at rock bottom.`,
            `${ene ? 'Like ZERO results!' : ''}`,
            length !== 'short' ? `I was doing the wrong things. ${cas ? 'I was wasting my time without knowing it.' : ''}` : ''
        );
        add('THE CHANGE', length === 'short' ? '8s' : '15s',
            `I decided to ${action}. To rethink everything.`,
            `${ene ? 'And then, EVERYTHING changed!' : 'The results started to show.'}`
        );
        add('AFTER', length === 'short' ? '10s' : '20s',
            `Today: ${result}.`,
            `My ${metric} has completely changed.`,
            `${cas ? 'And the craziest part?' : ''} It wasn't as complicated as I thought.`
        );
        if (length === 'long') add('LESSON', '10s',
            `The lesson: ${cas ? 'you just have to start.' : 'action is the only path.'}`,
            `${ene ? 'Every day counts!' : ''}`
        );
        add('CALL-TO-ACTION', '5s', cta);
    }

    else if (format === 'controverse') {
        add('HOOK', '3s', `${g}"${q}" — ${ene ? 'Warning, this is going to divide!' : 'My opinion might surprise you.'}`);
        add('OPINION', length === 'short' ? '10s' : '15s',
            `${cas ? 'I think that ' : 'My opinion: '}${pick([
                `the majority is wrong about this.`,
                `we're doing it all backwards.`,
                `the most common advice is wrong.`,
            ])}`,
            `${ene ? "And I'm going to PROVE it to you!" : ''}`
        );
        add('ARGUMENT 1', '12s',
            `First argument: results speak for themselves.`,
            `Those who ${action} achieve ${result}. ${cas ? "It's a fact." : ''}`
        );
        if (length !== 'short') add('ARGUMENT 2', '12s',
            `Second argument: ${metric} doesn't lie.`,
            `${ene ? "The NUMBERS prove I'm right!" : 'The data confirms this approach.'}`
        );
        if (length === 'long') add('NUANCE', '10s',
            `${cas ? "Well, I'll add a nuance though: " : 'However, '}every situation is unique.`,
            `But the principle remains valid in ${pro ? 'the vast majority of cases.' : '90% of cases.'}`
        );
        add('CALL-TO-ACTION', '5s', `${cas ? 'Do you agree? ' : "What's your opinion? "}${cta}`);
    }

    return sections.join('\\n\\n');
}
