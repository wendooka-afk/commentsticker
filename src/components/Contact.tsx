import { useState } from 'react';
import { Mail, MessageCircle, Send, Check, Clock, MapPin, HelpCircle } from 'lucide-react';
import { SEOHeader, SEOFooter } from './SEOLayout';

interface LegalPageProps {
    darkMode: boolean;
    onNavigate: (page: any) => void;
}

const SUPPORT_EMAIL = 'support@commentsticker.com';

export function Contact({ darkMode, onNavigate }: LegalPageProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('General question');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !message.trim()) return;

        const body = `Hi CommentSticker team,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A—%0D%0AName: ${encodeURIComponent(name || '(not provided)')}%0D%0AFrom: ${encodeURIComponent(email)}`;
        const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`[Contact] ${subject}`)}&body=${body}`;

        window.location.href = mailto;
        setSent(true);
        setTimeout(() => setSent(false), 6000);
    };

    const input = `w-full px-4 py-3 rounded-xl border text-sm outline-none transition focus:border-pink-500 ${darkMode ? 'bg-neutral-950 border-neutral-800 text-white placeholder:text-neutral-600' : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder:text-neutral-400'}`;

    return (
        <div className={`min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>
            <SEOHeader onNavigate={onNavigate} darkMode={darkMode} />

            <main className="max-w-6xl mx-auto px-6 py-32">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-black uppercase tracking-wider">
                        <Mail className="w-3 h-3" /> Contact
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">We'd love to hear from you</h1>
                    <p className={`text-lg font-medium max-w-2xl mx-auto ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        Bug report, feature idea, partnership, press enquiry — our team replies to every message, usually within one business day.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Left column — info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            {[
                                { icon: Mail, label: 'Email', value: SUPPORT_EMAIL, color: 'text-pink-500 bg-pink-500/10', href: `mailto:${SUPPORT_EMAIL}` },
                                { icon: MessageCircle, label: 'Community', value: 'Join creators on Discord', color: 'text-indigo-500 bg-indigo-500/10' },
                                { icon: Clock, label: 'Response time', value: 'Typically under 24h (Mon–Fri)', color: 'text-amber-500 bg-amber-500/10' },
                                { icon: MapPin, label: 'Operating remotely', value: 'Europe — serving creators worldwide', color: 'text-emerald-500 bg-emerald-500/10' },
                            ].map((item, i) => (
                                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${item.color}`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="text-xs font-black uppercase text-neutral-400 tracking-widest">{item.label}</div>
                                        {item.href ? (
                                            <a href={item.href} className="font-bold text-sm truncate block hover:text-pink-500 transition-colors">{item.value}</a>
                                        ) : (
                                            <div className="font-bold text-sm truncate">{item.value}</div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ teaser */}
                        <div className={`rounded-2xl border p-6 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}`}>
                            <div className="flex items-center gap-2 mb-3">
                                <HelpCircle className="w-4 h-4 text-pink-500" />
                                <h3 className="font-black text-sm">Before you write</h3>
                            </div>
                            <ul className={`space-y-2 text-sm font-medium ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                                <li>→ Is your question about how to <button onClick={() => onNavigate('guide')} className="text-pink-500 hover:underline">add a comment sticker</button>?</li>
                                <li>→ Looking for a <button onClick={() => onNavigate('free-tools')} className="text-pink-500 hover:underline">free tool</button>?</li>
                                <li>→ Curious about <button onClick={() => onNavigate('pricing')} className="text-pink-500 hover:underline">Pro plans</button>?</li>
                                <li>→ Want to read our <button onClick={() => onNavigate('privacy')} className="text-pink-500 hover:underline">Privacy Policy</button>?</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right column — form */}
                    <form
                        onSubmit={handleSubmit}
                        className={`p-8 rounded-3xl border space-y-5 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl shadow-black/5'}`}
                    >
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Your name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className={input}
                                placeholder="Alex Martinez"
                                autoComplete="name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Email <span className="text-pink-500">*</span></label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className={input}
                                placeholder="you@email.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Topic</label>
                            <select
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                                className={input}
                            >
                                <option>General question</option>
                                <option>Bug report</option>
                                <option>Feature request</option>
                                <option>Partnership / press</option>
                                <option>Pro subscription & billing</option>
                                <option>Privacy / data request</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-neutral-400">Message <span className="text-pink-500">*</span></label>
                            <textarea
                                rows={5}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className={input}
                                placeholder="Tell us what's on your mind..."
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!email.trim() || !message.trim()}
                            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 ${
                                sent
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:scale-[1.02] shadow-lg shadow-pink-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            }`}
                        >
                            {sent ? (
                                <>
                                    <Check className="w-4 h-4" /> Email client opened — send to deliver
                                </>
                            ) : (
                                <>
                                    Send message
                                    <Send className="w-4 h-4" />
                                </>
                            )}
                        </button>

                        <p className={`text-xs text-center ${darkMode ? 'text-neutral-500' : 'text-neutral-500'}`}>
                            Submitting opens your email client with a pre-filled message. Prefer direct? Email{' '}
                            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-pink-500 hover:underline font-semibold">{SUPPORT_EMAIL}</a>.
                        </p>
                    </form>
                </div>
            </main>

            <SEOFooter onNavigate={onNavigate} />
        </div>
    );
}
