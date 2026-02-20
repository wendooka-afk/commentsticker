import { useRef, useCallback, useState } from 'react';
import { Download, Shuffle, Copy, Check, Search, Bookmark, Upload, Link as LinkIcon } from 'lucide-react';
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
import { toPng } from 'html-to-image';

interface StickerGeneratorProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
    initialComment?: string;
    onGoToScript?: (question: string) => void;
}

const sampleComments = [
    "How did you start?",
    "What's your secret?",
    "Can you explain in more detail?",
    "I've had the same question for a long time",
    "How is this possible?",
    "What do you recommend for beginners?",
    "Is it really effective?",
    "How long did it take you?",
];

function randomFrom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

function formatNumber(n: number): string {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
}

export function StickerGeneratorUI({ darkMode, onNavigate, initialComment, onGoToScript }: StickerGeneratorProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
    const [username, setUsername] = useState('user_curieux_2024');
    const [displayName, setDisplayName] = useState('User Curieux');
    const [comment, setComment] = useState(initialComment || "How did you start?");
    const [likes, setLikes] = useState('1.2K');
    const [time, setTime] = useState('2h');
    const [avatarUrl, setAvatarUrl] = useState(defaultAvatars[0]);
    const [verified, setVerified] = useState(false);
    const [liked, setLiked] = useState(false);
    const [retweets, setRetweets] = useState('234');
    const [replies, setReplies] = useState('45');
    const [downloading, setDownloading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [copied, setCopied] = useState(false);

    const [showUrlInput, setShowUrlInput] = useState(false);
    const [customUrl, setCustomUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const commentRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const randomize = useCallback(() => {
        setUsername(randomFrom(sampleUsernames));
        setDisplayName(randomFrom(['Alex P.', 'Marie L.', 'Lucas M.', 'Emma R.', 'Hugo D.', 'Lea B.']));
        setComment(randomFrom(sampleComments));
        setLikes(formatNumber(Math.floor(Math.random() * 50000)));
        setTime(randomFrom(['1m', '5m', '15m', '1h', '2h', '5h', '1j']));
        setAvatarUrl(randomFrom(defaultAvatars));
        setVerified(Math.random() > 0.7);
        setLiked(Math.random() > 0.5);
        setRetweets(formatNumber(Math.floor(Math.random() * 5000)));
        setReplies(formatNumber(Math.floor(Math.random() * 500)));
    }, []);

    const downloadImage = useCallback(async () => {
        if (!commentRef.current) return;
        setDownloading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 100));

            let bgColor = '#ffffff';
            if (selectedPlatform === 'tiktok') bgColor = '#161823';
            if (selectedPlatform === 'discord') bgColor = '#313338';
            if (selectedPlatform === 'snapchat') bgColor = '#FFFC00';

            const dataUrl = await toPng(commentRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                backgroundColor: bgColor,
            });
            const link = document.createElement('a');
            link.download = `commentsticker-${selectedPlatform}-${Date.now()}.png`;
            link.href = dataUrl;
            link.click();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        } catch (err) {
            console.error('Error generating image:', err);
        } finally {
            setDownloading(false);
        }
    }, [selectedPlatform]);

    const copyToClipboard = useCallback(async () => {
        if (!commentRef.current) return;
        try {
            let bgColor = '#ffffff';
            if (selectedPlatform === 'tiktok') bgColor = '#161823';
            if (selectedPlatform === 'discord') bgColor = '#313338';
            if (selectedPlatform === 'snapchat') bgColor = '#FFFC00';

            const dataUrl = await toPng(commentRef.current, {
                cacheBust: true,
                pixelRatio: 3,
                backgroundColor: bgColor,
            });

            const response = await fetch(dataUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error copying image:', err);
        }
    }, [selectedPlatform]);

    const processImageFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = 128;
                canvas.height = 128;
                const ctx = canvas.getContext('2d')!;
                const size = Math.min(img.width, img.height);
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                ctx.drawImage(img, sx, sy, size, size, 0, 0, 128, 128);
                setAvatarUrl(canvas.toDataURL('image/png'));
            };
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processImageFile(file);
    }, [processImageFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const renderPreview = () => {
        const props = { username, comment, likes, time, avatarUrl, verified, liked };
        switch (selectedPlatform) {
            case 'tiktok': return <TikTokComment {...props} />;
            case 'instagram': return <InstagramComment {...props} />;
            case 'youtube': return <YouTubeComment {...props} />;
            case 'twitter': return <TwitterComment {...props} displayName={displayName} retweets={retweets} replies={replies} />;
            case 'facebook': return <FacebookComment {...props} />;
            case 'threads': return <ThreadsComment {...props} replies={replies} />;
            case 'snapchat': return <SnapchatComment username={username} comment={comment} time={time} avatarUrl={avatarUrl} verified={verified} />;
            case 'discord': return <DiscordComment username={username} comment={comment} time={time} avatarUrl={avatarUrl} verified={verified} />;
        }
    };

    const getPreviewBg = () => {
        switch (selectedPlatform) {
            case 'tiktok': return 'bg-[#161823]';
            case 'discord': return 'bg-[#313338]';
            case 'snapchat': return 'bg-[#FFFC00]';
            default: return darkMode ? 'bg-neutral-800' : 'bg-neutral-100';
        }
    };

    const currentPlatformConfig = platforms.find(p => p.id === selectedPlatform)!;

    return (
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left: Settings */}
            <div className="space-y-6">
                {/* Platform Selector */}
                <div className={`rounded-3xl p-6 border transition-all ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            Choose Platform
                        </h2>
                        <div className="px-2 py-1 rounded bg-pink-500/10 text-pink-500 text-[10px] font-bold">8 networks</div>
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                        {platforms.map(platform => (
                            <button
                                key={platform.id}
                                onClick={() => setSelectedPlatform(platform.id)}
                                className={`flex flex-col items-center gap-2 p-3.5 rounded-2xl transition-all group ${selectedPlatform === platform.id
                                    ? darkMode ? 'bg-white text-black shadow-xl shadow-white/5' : 'bg-neutral-900 text-white shadow-xl shadow-black/10'
                                    : darkMode ? 'bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500'
                                    }`}
                            >
                                <div className={`${selectedPlatform === platform.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                    <PlatformIcon platform={platform.id} size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest leading-none">{platform.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Profile Settings */}
                <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            Profile Picture
                        </h2>
                        <button
                            onClick={randomize}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                }`}
                        >
                            <Shuffle className="w-3.5 h-3.5" />
                            Random
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${isDragging
                                ? 'border-pink-500 bg-pink-500/10 scale-[1.02]'
                                : darkMode ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-100 bg-neutral-50/50'
                                }`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                        >
                            <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0 ${darkMode ? 'border-neutral-700' : 'border-neutral-200 shadow-sm'}`}>
                                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold mb-2">Change avatar</p>
                                <div className="flex flex-wrap gap-2 items-center">
                                    {defaultAvatars.slice(0, 4).map((url, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setAvatarUrl(url)}
                                            className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${avatarUrl === url
                                                ? 'border-pink-500 scale-110'
                                                : 'border-transparent opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${darkMode ? 'border-neutral-700 hover:border-pink-500 text-neutral-500 hover:text-pink-500' : 'border-neutral-200 hover:border-pink-500 text-neutral-400 hover:text-pink-500'
                                            }`}
                                    >
                                        <Upload className="w-3 h-3" />
                                    </button>
                                    <button
                                        onClick={() => setShowUrlInput(!showUrlInput)}
                                        className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${showUrlInput ? 'border-pink-500 text-pink-500 bg-pink-500/5' : darkMode ? 'border-neutral-700 hover:border-pink-500' : 'border-neutral-200 hover:border-pink-500'
                                            }`}
                                    >
                                        <LinkIcon className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) processImageFile(f); e.target.value = ''; }} />

                        {showUrlInput && (
                            <div className="flex gap-2 animate-in slide-in-from-top-2">
                                <input
                                    type="url"
                                    value={customUrl}
                                    onChange={(e) => setCustomUrl(e.target.value)}
                                    placeholder="Image URL..."
                                    className={`flex-1 px-4 py-2 rounded-xl border text-xs transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'
                                        }`}
                                />
                                <button
                                    onClick={() => { if (customUrl) { setAvatarUrl(customUrl); setCustomUrl(''); setShowUrlInput(false); } }}
                                    className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all"
                                > OK </button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Username</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'
                                        }`}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Display Name</label>
                                <input
                                    type="text"
                                    value={displayName}
                                    onChange={e => setDisplayName(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'
                                        }`}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comment Settings */}
                <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl shadow-black/[0.02]'}`}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                            Comment
                        </h2>
                        <div className="flex gap-1.5">
                            <button onClick={() => onNavigate('finder')} className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                <Search className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => onNavigate('templates')} className="p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-700 hover:bg-pink-500 hover:text-white transition-all shadow-sm">
                                <Bookmark className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <textarea
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            rows={3}
                            placeholder="Write your comment here..."
                            className={`w-full px-5 py-4 rounded-2xl border text-sm font-medium leading-relaxed transition-all resize-none focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'
                                }`}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Time</label>
                                <input type="text" value={time} onChange={e => setTime(e.target.value)} className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Likes</label>
                                <input type="text" value={likes} onChange={e => setLikes(e.target.value)} className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`} />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setVerified(!verified)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${verified ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-400'
                                    }`}
                            >
                                Verified
                            </button>
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${liked ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-400'
                                    }`}
                            >
                                Liked
                            </button>
                            {onGoToScript && (
                                <button
                                    onClick={() => onGoToScript(comment)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${darkMode ? 'border-neutral-700 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:text-neutral-900'
                                        }`}
                                >
                                    Generate Script
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Preview & Stats */}
            <div className="space-y-8">
                <div className={`rounded-[2.5rem] p-8 lg:p-12 border sticky top-32 group transition-all duration-700 ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-pink-500/20' : 'bg-white border-white shadow-2xl shadow-black/[0.05]'
                    }`}>
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/10 to-orange-500/10 flex items-center justify-center">
                                <PlatformIcon platform={selectedPlatform} size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest">{currentPlatformConfig.name}</h3>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-neutral-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Live Preview
                                </div>
                            </div>
                        </div>

                        <button className="lg:hidden p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">
                            <Shuffle className="w-5 h-5" onClick={randomize} />
                        </button>
                    </div>

                    <div className={`rounded-3xl p-8 min-h-[300px] flex items-center justify-center transition-all duration-700 ${getPreviewBg()} ${darkMode ? 'shadow-inner' : 'shadow-xl shadow-black/5'
                        }`}>
                        <div ref={commentRef} className="w-full flex justify-center drop-shadow-2xl">
                            {renderPreview()}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <button
                            onClick={downloadImage}
                            disabled={downloading}
                            className={`flex items-center justify-center gap-2 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${showSuccess
                                ? 'bg-green-500 text-white'
                                : darkMode ? 'bg-white text-black hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:scale-105 active:scale-95'
                                }`}
                        >
                            {showSuccess ? <Check className="w-5 h-5" /> : downloading ? <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                            {showSuccess ? 'Ready !' : 'Export PNG'}
                        </button>

                        <button
                            onClick={copyToClipboard}
                            className={`flex items-center justify-center gap-2 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all ${copied
                                ? 'bg-green-500 text-white border-green-500'
                                : darkMode ? 'bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-750' : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'
                                }`}
                        >
                            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>

                    <div className="mt-8 pt-8 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-3 gap-4">
                        <div className="text-center">
                            <div className="text-xl font-black">{likes}</div>
                            <div className="text-[9px] font-black uppercase text-neutral-500 tracking-widest">Likes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-black">{replies}</div>
                            <div className="text-[9px] font-black uppercase text-neutral-500 tracking-widest">Replies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl font-black">{retweets}</div>
                            <div className="text-[9px] font-black uppercase text-neutral-500 tracking-widest">Shares</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
