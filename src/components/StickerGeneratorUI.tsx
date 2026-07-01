import { useRef, useCallback, useState, useEffect } from 'react';
import { Download, Shuffle, Copy, Check, Search, Bookmark, Upload, Link as LinkIcon, Smile, Clock, Trash2 } from 'lucide-react';
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
// html-to-image is only needed at export time — loaded on demand to keep it
// out of the main bundle.
const loadHtmlToImage = () => import('html-to-image');
import { AdSense } from './AdSense';

interface StickerGeneratorProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
    initialComment?: string;
    onCommentConsumed?: () => void;
    onGoToScript?: (question: string) => void;
}

interface HistoryItem {
    id: string;
    platform: Platform;
    username: string;
    comment: string;
    thumbnail: string;
    createdAt: number;
}

const HISTORY_KEY = 'cs_history';
const MAX_HISTORY = 8;

const EMOJIS = [
    '😀','😂','🥰','😍','😊','🤔','😮','🙏','👍','👎',
    '❤️','🔥','✅','⭐','💯','🎉','💪','🤣','😭','😱',
    '💬','🎯','🚀','💡','🌟','👀','🤩','😅','🥺','🤝',
    '✨','🏆','💥','🎊','🙌','🤦','🤷','👏','🎁','💎',
];

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

function getBgColorForPlatform(p: Platform): string {
    if (p === 'tiktok') return '#161823';
    if (p === 'discord') return '#313338';
    if (p === 'snapchat') return '#FFFC00';
    return '#ffffff';
}

export function StickerGeneratorUI({ darkMode, onNavigate, initialComment, onCommentConsumed, onGoToScript }: StickerGeneratorProps) {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('tiktok');
    const [username, setUsername] = useState('curious_user_2024');
    const [displayName, setDisplayName] = useState('Curious User');
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
    const [exportFormat, setExportFormat] = useState<'png' | 'jpeg'>('png');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [customUrl, setCustomUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    // localStorage history
    const [history, setHistory] = useState<HistoryItem[]>(() => {
        try {
            const stored = localStorage.getItem(HISTORY_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch { return []; }
    });

    useEffect(() => {
        try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); } catch { /* storage unavailable (private mode) */ }
    }, [history]);

    // Tell the parent (App.tsx) that initialComment has been consumed so it
    // can clear sharedComment — prevents stale comment on re-navigation.
    useEffect(() => {
        if (initialComment) onCommentConsumed?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const commentRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const randomize = useCallback(() => {
        setUsername(randomFrom(sampleUsernames));
        setDisplayName(randomFrom(['Alex P.', 'Sarah M.', 'Mike R.', 'Emily D.', 'Chris B.', 'Jessica L.']));
        setComment(randomFrom(sampleComments));
        setLikes(formatNumber(Math.floor(Math.random() * 50000)));
        setTime(randomFrom(['1m', '5m', '15m', '1h', '2h', '5h', '1d']));
        setAvatarUrl(randomFrom(defaultAvatars));
        setVerified(Math.random() > 0.7);
        setLiked(Math.random() > 0.5);
        setRetweets(formatNumber(Math.floor(Math.random() * 5000)));
        setReplies(formatNumber(Math.floor(Math.random() * 500)));
    }, []);

    const saveToHistory = useCallback(async () => {
        if (!commentRef.current) return;
        try {
            const { toJpeg } = await loadHtmlToImage();
            const thumbnail = await toJpeg(commentRef.current, {
                pixelRatio: 1,
                quality: 0.5,
                backgroundColor: getBgColorForPlatform(selectedPlatform),
            });
            const item: HistoryItem = {
                id: Date.now().toString(),
                platform: selectedPlatform,
                username,
                comment,
                thumbnail,
                createdAt: Date.now(),
            };
            setHistory(prev => [item, ...prev].slice(0, MAX_HISTORY));
        } catch { /* ignore thumbnail errors */ }
    }, [selectedPlatform, username, comment]);

    const downloadImage = useCallback(async () => {
        if (!commentRef.current) return;
        setDownloading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 100));
            const bg = getBgColorForPlatform(selectedPlatform);
            const opts = { cacheBust: true, pixelRatio: 3, backgroundColor: bg };

            const { toPng, toJpeg } = await loadHtmlToImage();
            let dataUrl: string;
            if (exportFormat === 'jpeg') {
                dataUrl = await toJpeg(commentRef.current, { ...opts, quality: 0.95 });
            } else {
                dataUrl = await toPng(commentRef.current, opts);
            }

            const link = document.createElement('a');
            link.download = `commentsticker-${selectedPlatform}-${Date.now()}.${exportFormat}`;
            link.href = dataUrl;
            link.click();
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
            saveToHistory();
        } catch (err) {
            console.error('Error generating image:', err);
        } finally {
            setDownloading(false);
        }
    }, [selectedPlatform, exportFormat, saveToHistory]);

    const copyToClipboard = useCallback(async () => {
        if (!commentRef.current) return;
        try {
            const bg = getBgColorForPlatform(selectedPlatform);
            const { toPng } = await loadHtmlToImage();
            const dataUrl = await toPng(commentRef.current, {
                cacheBust: true, pixelRatio: 3, backgroundColor: bg,
            });
            const response = await fetch(dataUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
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
                canvas.width = 128; canvas.height = 128;
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
        e.preventDefault(); setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processImageFile(file);
    }, [processImageFile]);

    const restoreFromHistory = (item: HistoryItem) => {
        setSelectedPlatform(item.platform);
        setUsername(item.username);
        setComment(item.comment);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    const renderPreview = () => {
        const props = { username, displayName, comment, likes, time, avatarUrl, verified, liked };
        switch (selectedPlatform) {
            case 'tiktok': return <TikTokComment {...props} />;
            case 'instagram': return <InstagramComment {...props} />;
            case 'youtube': return <YouTubeComment {...props} />;
            case 'twitter': return <TwitterComment {...props} retweets={retweets} replies={replies} />;
            case 'facebook': return <FacebookComment {...props} />;
            case 'threads': return <ThreadsComment {...props} replies={replies} />;
            case 'snapchat': return <SnapchatComment username={username} comment={comment} time={time} avatarUrl={avatarUrl} verified={verified} />;
            case 'discord': return <DiscordComment username={username} comment={comment} time={time} avatarUrl={avatarUrl} verified={verified} />;
            case 'linkedin': return <LinkedInComment {...props} />;
        }
    };

    const getPreviewBg = () => {
        switch (selectedPlatform) {
            case 'tiktok': return 'bg-[#161823]';
            case 'discord': return 'bg-[#313338]';
            case 'snapchat': return 'bg-[#FFFC00]';
            case 'linkedin': return 'bg-white';
            default: return darkMode ? 'bg-neutral-800' : 'bg-neutral-100';
        }
    };

    const currentPlatformConfig = platforms.find(p => p.id === selectedPlatform)!;

    return (
        <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Left: Settings */}
                <div className="space-y-6">
                    {/* Platform Selector */}
                    <div className={`rounded-3xl p-6 border transition-all ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Choose Platform
                            </h2>
                            <div className="px-2 py-1 rounded bg-pink-500/10 text-pink-500 text-[10px] font-bold">9 networks</div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                            {platforms.map(platform => (
                                <button
                                    key={platform.id}
                                    onClick={() => setSelectedPlatform(platform.id)}
                                    className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all group ${selectedPlatform === platform.id
                                        ? darkMode ? 'bg-white text-black shadow-xl shadow-white/5' : 'bg-neutral-900 text-white shadow-xl shadow-black/10'
                                        : darkMode ? 'bg-neutral-800/50 hover:bg-neutral-800 text-neutral-400' : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-500'
                                        }`}
                                >
                                    <div className={`${selectedPlatform === platform.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                        <PlatformIcon platform={platform.id} size={18} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest leading-none">{platform.name.split(' ')[0]}</span>
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
                                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${darkMode ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                            >
                                <Shuffle className="w-3.5 h-3.5" /> Random
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div
                                className={`flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed transition-all ${isDragging
                                    ? 'border-pink-500 bg-pink-500/10 scale-[1.02]'
                                    : darkMode ? 'border-neutral-800 bg-neutral-950/50' : 'border-neutral-100 bg-neutral-50/50'}`}
                                onDrop={handleDrop}
                                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                            >
                                <div className={`w-16 h-16 rounded-full overflow-hidden border-2 flex-shrink-0 ${darkMode ? 'border-neutral-700' : 'border-neutral-200 shadow-sm'}`}>
                                    <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold mb-2">Change avatar</p>
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {defaultAvatars.slice(0, 4).map((url, i) => (
                                            <button key={i} onClick={() => setAvatarUrl(url)}
                                                className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${avatarUrl === url ? 'border-pink-500 scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}>
                                                <img src={url} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                        <button onClick={() => fileInputRef.current?.click()}
                                            className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${darkMode ? 'border-neutral-700 hover:border-pink-500 text-neutral-500 hover:text-pink-500' : 'border-neutral-200 hover:border-pink-500 text-neutral-400 hover:text-pink-500'}`}>
                                            <Upload className="w-3 h-3" />
                                        </button>
                                        <button onClick={() => setShowUrlInput(!showUrlInput)}
                                            className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-dashed transition-all ${showUrlInput ? 'border-pink-500 text-pink-500 bg-pink-500/5' : darkMode ? 'border-neutral-700 hover:border-pink-500' : 'border-neutral-200 hover:border-pink-500'}`}>
                                            <LinkIcon className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                onChange={(e) => { const f = e.target.files?.[0]; if (f) processImageFile(f); e.target.value = ''; }} />

                            {showUrlInput && (
                                <div className="flex gap-2 animate-in slide-in-from-top-2">
                                    <input type="url" value={customUrl} onChange={(e) => setCustomUrl(e.target.value)}
                                        placeholder="Image URL..."
                                        className={`flex-1 px-4 py-2 rounded-xl border text-xs transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'}`} />
                                    <button onClick={() => { if (customUrl) { setAvatarUrl(customUrl); setCustomUrl(''); setShowUrlInput(false); } }}
                                        className="px-4 py-2 bg-pink-500 text-white rounded-xl text-xs font-bold hover:bg-pink-600 transition-all">OK</button>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Username</label>
                                    <input type="text" value={username} onChange={e => setUsername(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'}`} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Display Name</label>
                                    <input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold transition-all focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comment Settings */}
                    <div className={`rounded-3xl p-6 border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl shadow-black/[0.02]'}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>Comment</h2>
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
                            {/* Textarea + emoji picker */}
                            <div className="relative">
                                <textarea
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                    rows={3}
                                    placeholder="Write your comment here..."
                                    className={`w-full px-5 py-4 pr-12 rounded-2xl border text-sm font-medium leading-relaxed transition-all resize-none focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700 focus:border-pink-500' : 'bg-neutral-50 border-neutral-100 focus:border-pink-500'}`}
                                />
                                <button
                                    onClick={() => setShowEmojiPicker(prev => !prev)}
                                    className={`absolute bottom-3 right-3 p-1.5 rounded-lg transition-all ${showEmojiPicker ? 'text-pink-500 bg-pink-500/10' : darkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600'}`}
                                >
                                    <Smile className="w-4 h-4" />
                                </button>
                                {showEmojiPicker && (
                                    <div className={`absolute bottom-full right-0 mb-2 p-3 rounded-2xl border shadow-2xl z-50 w-[240px] ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-white border-neutral-200'}`}>
                                        <div className="grid grid-cols-8 gap-1">
                                            {EMOJIS.map((emoji, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setComment(prev => prev + emoji); setShowEmojiPicker(false); }}
                                                    className="text-base hover:scale-125 transition-transform text-center leading-none p-0.5"
                                                >
                                                    {emoji}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Time</label>
                                    <input type="text" value={time} onChange={e => setTime(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-2 px-1">Likes</label>
                                    <input type="text" value={likes} onChange={e => setLikes(e.target.value)}
                                        className={`w-full px-4 py-3 rounded-2xl border text-sm font-bold focus:outline-none ${darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-100'}`} />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setVerified(!verified)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${verified ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-400'}`}>
                                    Verified
                                </button>
                                <button onClick={() => setLiked(!liked)}
                                    className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${liked ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : darkMode ? 'bg-neutral-800 text-neutral-500' : 'bg-neutral-100 text-neutral-400'}`}>
                                    Liked
                                </button>
                                {onGoToScript && (
                                    <button onClick={() => onGoToScript(comment)}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${darkMode ? 'border-neutral-700 text-neutral-400 hover:text-white' : 'border-neutral-200 text-neutral-500 hover:text-neutral-900'}`}>
                                        Generate Script
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Preview & Export */}
                <div className="space-y-8">
                    <div className={`rounded-[2.5rem] p-8 lg:p-12 border sticky top-32 group transition-all duration-700 ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-pink-500/20' : 'bg-white border-white shadow-2xl shadow-black/[0.05]'}`}>
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

                        <div className={`rounded-3xl p-8 min-h-[300px] flex items-center justify-center transition-all duration-700 ${getPreviewBg()} ${darkMode ? 'shadow-inner' : 'shadow-xl shadow-black/5'}`}>
                            <div ref={commentRef} className="w-full flex justify-center drop-shadow-2xl">
                                {renderPreview()}
                            </div>
                        </div>

                        {/* Export format toggle */}
                        <div className={`flex gap-1 mt-8 p-1 rounded-xl border ${darkMode ? 'bg-neutral-800/50 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                            {(['png', 'jpeg'] as const).map(fmt => (
                                <button
                                    key={fmt}
                                    onClick={() => setExportFormat(fmt)}
                                    className={`flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${exportFormat === fmt
                                        ? darkMode ? 'bg-white text-black shadow-md' : 'bg-neutral-900 text-white shadow-md'
                                        : darkMode ? 'text-neutral-500 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-600'}`}
                                >
                                    {fmt}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button
                                onClick={downloadImage}
                                disabled={downloading}
                                className={`flex items-center justify-center gap-2 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${showSuccess
                                    ? 'bg-green-500 text-white'
                                    : darkMode ? 'bg-white text-black hover:bg-neutral-100' : 'bg-neutral-900 text-white hover:scale-105 active:scale-95'}`}
                            >
                                {showSuccess ? <Check className="w-5 h-5" /> : downloading ? <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" /> : <Download className="w-5 h-5" />}
                                {showSuccess ? 'Ready!' : `Export ${exportFormat.toUpperCase()}`}
                            </button>

                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center justify-center gap-2 py-5 rounded-2xl font-black text-sm uppercase tracking-widest border transition-all ${copied
                                    ? 'bg-green-500 text-white border-green-500'
                                    : darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-neutral-200 hover:bg-neutral-50 shadow-sm'}`}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                {copied ? 'Copied' : 'Copy PNG'}
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

            {/* Recent Creations (localStorage history) */}
            {history.length > 0 && (
                <div className={`border-t pt-8 ${darkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-neutral-500" />
                            <h3 className={`text-xs font-black uppercase tracking-widest ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>
                                Recent Creations
                            </h3>
                        </div>
                        <button
                            onClick={clearHistory}
                            className={`flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-red-500 ${darkMode ? 'text-neutral-600' : 'text-neutral-300'}`}
                        >
                            <Trash2 className="w-3 h-3" /> Clear
                        </button>
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {history.map(item => (
                            <button
                                key={item.id}
                                onClick={() => restoreFromHistory(item)}
                                title={`Restore: ${item.comment}`}
                                className={`flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all hover:scale-105 hover:border-pink-500 w-28 text-left ${darkMode ? 'border-neutral-800 bg-neutral-900' : 'border-neutral-200 bg-white shadow-sm'}`}
                            >
                                <img src={item.thumbnail} alt="" className="w-full h-16 object-cover" />
                                <div className="px-2 py-2">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <PlatformIcon platform={item.platform} size={9} />
                                        <span className={`text-[8px] font-black uppercase tracking-wider ${darkMode ? 'text-neutral-500' : 'text-neutral-400'}`}>{item.platform}</span>
                                    </div>
                                    <div className={`text-[9px] truncate ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{item.comment}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* --- EDITORIAL CONTENT SECTION --- */}
            <div className="space-y-12 border-t border-neutral-100 dark:border-neutral-800 pt-12">
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-black">How to Use the Comment Sticker Generator</h2>
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">
                        The CommentSticker generator is the fastest way to create a pixel-perfect, transparent PNG comment overlay for your short-form video content. Whether you're producing UGC ads for TikTok, Instagram Reels, or YouTube Shorts, here is a step-by-step guide.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { step: "1", title: "Select your Platform", desc: "Choose from 9 natively-designed social media templates including TikTok, Instagram, YouTube, LinkedIn and more. Each template exactly matches the real platform's UI." },
                            { step: "2", title: "Customize the Comment", desc: "Enter a username, upload or choose a profile picture, type the comment text, add emojis, set a like count and timestamp. Use the emoji picker for quick access." },
                            { step: "3", title: "Export PNG or JPEG", desc: "Hit 'Export PNG' or 'Export JPEG' to download your sticker at 3× resolution. The transparent background (PNG) lets you overlay it on any video in CapCut or Premiere." },
                        ].map((s) => (
                            <div key={s.step} className={`p-6 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-sm'}`}>
                                <div className="text-4xl font-black text-pink-500/20 mb-3">{s.step}</div>
                                <h3 className="font-black text-lg mb-2">{s.title}</h3>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`p-8 rounded-3xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'}`}>
                    <h2 className="text-2xl font-black mb-6">Pro Tips for High-Converting Comment Stickers</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            { icon: "🎯", title: "Use a Pain Point as the Hook", desc: "The most effective TikTok UGC ads start with a comment that addresses a common customer fear or question (e.g. 'Does this actually work for beginners?'). This stops the scroll instantly." },
                            { icon: "🔢", title: "Set a High Like Count", desc: "A comment with 8.2K likes feels more credible than one with 12. The higher the implied engagement, the more the viewer trusts the question is relevant to many people." },
                            { icon: "✅", title: "Add the Verified Badge Strategically", desc: "Use the verified badge only for profiles that would realistically have one (brands, public figures). For organic-feel UGC, leave it unchecked for a more authentic appearance." },
                            { icon: "📐", title: "Position in the Upper-Middle of Your Screen", desc: "When adding the PNG to your video editor, position it in the top 40% of the frame, avoiding the TikTok / Instagram UI elements (right rail icons and bottom text overlay)." },
                        ].map((tip, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="text-2xl shrink-0">{tip.icon}</div>
                                <div>
                                    <h4 className="font-black mb-1">{tip.title}</h4>
                                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{tip.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div>
                    <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${darkMode ? 'text-neutral-600' : 'text-neutral-400'}`}>Sponsored</p>
                    <AdSense adSlot="1122334455" />
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-black">Frequently Asked Questions</h2>
                    <div className="space-y-3">
                        {[
                            { q: "What is a comment sticker?", a: "A comment sticker is a transparent PNG image that replicates the visual appearance of a social media comment (TikTok, Instagram, YouTube, LinkedIn, etc.), designed to be overlaid on top of video content as a visual hook." },
                            { q: "Is it free to download?", a: "Yes, completely free. No sign-up, no credit card, no watermark. Download as PNG or JPEG." },
                            { q: "How do I use it in CapCut?", a: "After generating and downloading the PNG, open CapCut, add your video, tap 'Overlay', import the PNG. Resize, position it, and add a 'pop-in' sound effect for maximum impact." },
                            { q: "Can I generate multiple stickers at once?", a: "Yes! Use the Batch Generator tool (in the sidebar) to create and download up to 10 comment stickers simultaneously — great for A/B testing different hooks." },
                            { q: "Can I customize the profile picture?", a: "Yes. Choose from default avatars, upload a custom image (drag & drop supported), or paste a direct image URL." },
                        ].map((item, i) => (
                            <div key={i} className={`p-5 rounded-2xl border ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-100 shadow-sm'}`}>
                                <h4 className="font-black mb-2">{item.q}</h4>
                                <p className="text-sm text-neutral-500 dark:text-neutral-400 font-medium leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
