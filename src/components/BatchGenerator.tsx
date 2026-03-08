import { useRef, useState } from 'react';
import { Download, Plus, Trash2, Shuffle, Layers } from 'lucide-react';
import { toPng, toJpeg } from 'html-to-image';
import { AdSense } from './AdSense';
import { platforms, defaultAvatars, sampleUsernames, type Platform } from '../data/platforms';
import { PlatformIcon } from './PlatformIcons';
import { TikTokComment } from './TikTokComment';
import { InstagramComment } from './InstagramComment';
import { YouTubeComment } from './YouTubeComment';
import { TwitterComment } from './TwitterComment';
import { FacebookComment } from './FacebookComment';
import { ThreadsComment } from './ThreadsComment';
import { SnapchatComment } from './SnapchatComment';
import { DiscordComment } from './DiscordComment';
import { LinkedInComment } from './LinkedInComment';

interface BatchGeneratorProps {
    darkMode: boolean;
}

const MAX_COMMENTS = 10;

const sampleComments = [
    "How did you start?",
    "What's your secret?",
    "This is exactly what I needed!",
    "Can you make a full tutorial?",
    "I've been waiting for this 🔥",
    "This changed my life seriously",
    "How long did it take you?",
    "Do you have a course on this?",
    "Genuinely impressive results!",
    "I tried this and it worked 😭",
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getBgColor(p: Platform): string {
    if (p === 'tiktok') return '#161823';
    if (p === 'discord') return '#313338';
    if (p === 'snapchat') return '#FFFC00';
    return '#ffffff';
}

function renderComment(
    platform: Platform,
    commentText: string,
    username: string,
    displayName: string,
    avatarUrl: string,
    likes: string,
    time: string,
) {
    const common = { username, displayName, comment: commentText, likes, time, avatarUrl, verified: false, liked: false };
    switch (platform) {
        case 'tiktok': return <TikTokComment {...common} />;
        case 'instagram': return <InstagramComment {...common} />;
        case 'youtube': return <YouTubeComment {...common} />;
        case 'twitter': return <TwitterComment {...common} retweets="0" replies="0" />;
        case 'facebook': return <FacebookComment {...common} />;
        case 'threads': return <ThreadsComment {...common} replies="0" />;
        case 'snapchat': return <SnapchatComment username={username} comment={commentText} time={time} avatarUrl={avatarUrl} verified={false} />;
        case 'discord': return <DiscordComment username={username} comment={commentText} time={time} avatarUrl={avatarUrl} verified={false} />;
        case 'linkedin': return <LinkedInComment {...common} />;
    }
}

export function BatchGenerator({ darkMode }: BatchGeneratorProps) {
    const [platform, setPlatform] = useState<Platform>('tiktok');
    const [username, setUsername] = useState('curious_user_2024');
    const [displayName, setDisplayName] = useState('Curious User');
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatars[0]);
    const [likes, setLikes] = useState('1.2K');
    const [time, setTime] = useState('2h');
    const [comments, setComments] = useState<string[]>(['How did you start?', 'This is exactly what I needed!']);
    const [isDownloading, setIsDownloading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [exportFormat, setExportFormat] = useState<'png' | 'jpeg'>('png');

    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const addComment = () => {
        if (comments.length >= MAX_COMMENTS) return;
        setComments(prev => [...prev, '']);
    };

    const removeComment = (index: number) => {
        setComments(prev => prev.filter((_, i) => i !== index));
        itemRefs.current.splice(index, 1);
    };

    const updateComment = (index: number, value: string) => {
        setComments(prev => prev.map((c, i) => i === index ? value : c));
    };

    const randomizeProfile = () => {
        setUsername(randomFrom(sampleUsernames));
        setAvatarUrl(randomFrom(defaultAvatars));
        setLikes(String(Math.floor(Math.random() * 9000) + 100));
        const times = ['1m', '5m', '12m', '1h', '2h', '4h', '1d', '2d'];
        setTime(randomFrom(times));
    };

    const fillSampleComments = () => {
        const samples = [...sampleComments].sort(() => Math.random() - 0.5).slice(0, 5);
        setComments(samples);
    };

    const downloadSingle = async (index: number) => {
        const el = itemRefs.current[index];
        if (!el || !comments[index].trim()) return;
        const opts = { pixelRatio: 3, backgroundColor: getBgColor(platform) };
        const dataUrl = exportFormat === 'jpeg'
            ? await toJpeg(el, { ...opts, quality: 0.95 })
            : await toPng(el, opts);
        const link = document.createElement('a');
        link.download = `comment-${platform}-${index + 1}.${exportFormat}`;
        link.href = dataUrl;
        link.click();
    };

    const downloadAll = async () => {
        const validIndices = comments.map((c, i) => ({ c, i })).filter(({ c }) => c.trim()).map(({ i }) => i);
        if (validIndices.length === 0) return;
        setIsDownloading(true);
        setProgress(0);
        for (let n = 0; n < validIndices.length; n++) {
            setProgress(n + 1);
            await downloadSingle(validIndices[n]);
            if (n < validIndices.length - 1) {
                await new Promise(r => setTimeout(r, 600));
            }
        }
        setIsDownloading(false);
        setProgress(0);
    };

    const validCount = comments.filter(c => c.trim()).length;

    const card = (dark: boolean) =>
        `rounded-3xl p-6 border transition-all ${dark ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`;

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Layers className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className={`text-2xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                            Batch Generator
                        </h1>
                        <p className={`text-sm font-medium ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            Generate &amp; download up to {MAX_COMMENTS} comment stickers at once
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Settings */}
                <div className="space-y-6">
                    {/* Platform */}
                    <div className={card(darkMode)}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Platform
                            </h2>
                            <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">9 networks</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                            {platforms.map(p => (
                                <button
                                    key={p.id}
                                    onClick={() => setPlatform(p.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all group ${platform === p.id
                                        ? (darkMode ? 'bg-white text-black shadow-xl' : 'bg-neutral-900 text-white shadow-xl')
                                        : (darkMode ? 'bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500')
                                        }`}
                                >
                                    <div className={`${platform === p.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                        <PlatformIcon platform={p.id} size={18} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">{p.name.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Profile */}
                    <div className={card(darkMode)}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Profile Settings
                            </h2>
                            <button
                                onClick={randomizeProfile}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'}`}
                            >
                                <Shuffle className="w-3 h-3" />
                                Random
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Username</label>
                                <input
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-emerald-500'}`}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Display Name</label>
                                <input
                                    value={displayName}
                                    onChange={e => setDisplayName(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-emerald-500'}`}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Likes</label>
                                <input
                                    value={likes}
                                    onChange={e => setLikes(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-emerald-500'}`}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Time</label>
                                <input
                                    value={time}
                                    onChange={e => setTime(e.target.value)}
                                    className={`w-full px-3 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white focus:border-emerald-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 focus:border-emerald-500'}`}
                                />
                            </div>
                        </div>
                        {/* Avatar row */}
                        <div className="mt-4">
                            <label className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Avatar</label>
                            <div className="flex gap-2 mt-2 flex-wrap">
                                {defaultAvatars.map(url => (
                                    <button
                                        key={url}
                                        onClick={() => setAvatarUrl(url)}
                                        className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-all ${avatarUrl === url ? 'border-emerald-500 scale-110' : 'border-transparent hover:border-neutral-400'}`}
                                    >
                                        <img src={url} alt="avatar" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Comments list */}
                    <div className={card(darkMode)}>
                        <div className="flex items-center justify-between mb-5">
                            <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Comments <span className="ml-1 text-emerald-500">{comments.length}/{MAX_COMMENTS}</span>
                            </h2>
                            <button
                                onClick={fillSampleComments}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${darkMode ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-300' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'}`}
                            >
                                <Shuffle className="w-3 h-3" />
                                Fill samples
                            </button>
                        </div>
                        <div className="space-y-2.5">
                            {comments.map((c, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                    <span className={`mt-3 text-[10px] font-black w-5 shrink-0 text-center ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                        {i + 1}
                                    </span>
                                    <textarea
                                        value={c}
                                        onChange={e => updateComment(i, e.target.value)}
                                        rows={2}
                                        placeholder={`Comment ${i + 1}…`}
                                        className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium border transition-all outline-none resize-none ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-600 focus:border-emerald-500' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400 focus:border-emerald-500'}`}
                                    />
                                    <button
                                        onClick={() => removeComment(i)}
                                        className={`mt-2 p-2 rounded-xl transition-all ${darkMode ? 'hover:bg-red-500/10 text-neutral-600 hover:text-red-400' : 'hover:bg-red-50 text-neutral-400 hover:text-red-500'}`}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {comments.length < MAX_COMMENTS && (
                            <button
                                onClick={addComment}
                                className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed text-sm font-bold transition-all ${darkMode ? 'border-neutral-700 text-neutral-500 hover:border-emerald-500 hover:text-emerald-500' : 'border-neutral-200 text-neutral-400 hover:border-emerald-500 hover:text-emerald-500'}`}
                            >
                                <Plus className="w-4 h-4" />
                                Add comment
                            </button>
                        )}
                    </div>

                    {/* Format toggle */}
                    <div className={`flex items-center gap-2 p-1.5 rounded-2xl ${darkMode ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                        {(['png', 'jpeg'] as const).map(fmt => (
                            <button
                                key={fmt}
                                onClick={() => setExportFormat(fmt)}
                                className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${exportFormat === fmt
                                    ? (darkMode ? 'bg-white text-black shadow' : 'bg-neutral-900 text-white shadow')
                                    : (darkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600')
                                    }`}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>

                    {/* Download All */}
                    <button
                        onClick={downloadAll}
                        disabled={isDownloading || validCount === 0}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                        {isDownloading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Downloading {progress}/{validCount}…
                            </>
                        ) : (
                            <>
                                <Download className="w-5 h-5" />
                                Download All ({validCount} {exportFormat.toUpperCase()}{validCount !== 1 ? 's' : ''})
                            </>
                        )}
                    </button>
                </div>

                {/* Right: Live Preview Grid */}
                <div>
                    <h2 className={`text-xs font-black uppercase tracking-[0.2em] mb-5 ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        Live Preview
                    </h2>
                    <div className="space-y-4">
                        {comments.map((c, i) => (
                            <div key={i} className={`rounded-3xl border overflow-hidden transition-all ${darkMode ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white'}`}>
                                {/* Preview label */}
                                <div className={`flex items-center justify-between px-4 py-2.5 border-b ${darkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                                        #{i + 1}
                                    </span>
                                    <button
                                        onClick={() => downloadSingle(i)}
                                        disabled={!c.trim()}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${c.trim()
                                            ? 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'
                                            : 'opacity-30 cursor-not-allowed text-neutral-500'
                                            }`}
                                    >
                                        <Download className="w-3 h-3" />
                                        {exportFormat.toUpperCase()}
                                    </button>
                                </div>
                                {/* Capture target */}
                                <div
                                    className="p-4 flex justify-center"
                                    style={{ background: getBgColor(platform) }}
                                >
                                    <div ref={(el) => { itemRefs.current[i] = el; }}>
                                        {renderComment(platform, c || `Comment ${i + 1}`, username, displayName, avatarUrl, likes, time)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {comments.length === 0 && (
                            <div className={`rounded-3xl border-2 border-dashed flex flex-col items-center justify-center h-40 ${darkMode ? 'border-neutral-800 text-neutral-600' : 'border-neutral-200 text-neutral-400'}`}>
                                <Layers className="w-8 h-8 mb-2 opacity-50" />
                                <p className="text-sm font-bold">Add comments to preview</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AdSense */}
            <div className="py-6 border-t border-neutral-100 dark:border-neutral-900">
                <p className={`text-[10px] font-black uppercase tracking-widest mb-4 text-center ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                    Sponsored
                </p>
                <AdSense adSlot="9988776655" />
            </div>
        </div>
    );
}
