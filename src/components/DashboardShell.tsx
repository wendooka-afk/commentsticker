import { ReactNode, useState } from 'react';
import {
    MessageSquare,
    Search,
    Bookmark,
    FileText,
    Sun,
    Moon,
    Menu,
    X,
    Home,
    Bell,
    Layers,
    Wrench,
} from 'lucide-react';

interface NavItem {
    id: string;
    label: string;
    icon: any;
    color: string;
}

interface DashboardShellProps {
    children: ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
    darkMode: boolean;
    setDarkMode: (dark: boolean) => void;
}

export function DashboardShell({ children, currentPage, onNavigate, darkMode, setDarkMode }: DashboardShellProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems: NavItem[] = [
        { id: 'generator', label: 'Sticker Generator', icon: MessageSquare, color: 'text-pink-500' },
        { id: 'batch', label: 'Batch Generator', icon: Layers, color: 'text-emerald-500' },
        { id: 'finder', label: 'Question Finder', icon: Search, color: 'text-blue-500' },
        { id: 'templates', label: 'Templates Library', icon: Bookmark, color: 'text-orange-500' },
        { id: 'scripts', label: 'AI Script Generator', icon: FileText, color: 'text-purple-500' },
    ];

    const secondaryItems = [
        { id: 'free-tools', label: 'Free Tools', icon: Wrench },
        { id: 'home', label: 'Back to Home', icon: Home },
    ];

    return (
        <div className={`flex min-h-screen font-sans ${darkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'}`}>

            {/* --- SIDEBAR (Desktop) --- */}
            <aside className={`hidden lg:flex flex-col w-72 sticky top-0 h-screen border-r transition-colors ${darkMode ? 'bg-neutral-900/50 border-neutral-800' : 'bg-white border-neutral-200'
                }`}>
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => onNavigate('home')}>
                        <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20">
                            <MessageSquare className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-xl tracking-tighter">CommentSticker</span>
                    </div>

                    <nav className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4 px-4">Primary tools</p>
                        {navItems.map((item) => {
                            const isActive = currentPage === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${isActive
                                        ? (darkMode ? 'bg-white text-black shadow-xl shadow-white/5' : 'bg-neutral-900 text-white shadow-xl shadow-black/10')
                                        : (darkMode ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900')
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-inherit' : item.color} group-hover:scale-110 transition-transform`} />
                                    {item.label}
                                    {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="mt-auto p-8 space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4 px-4">Navigation</p>
                    {secondaryItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${darkMode ? 'text-neutral-400 hover:text-white hover:bg-neutral-800' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.label}
                        </button>
                    ))}

                    <div className={`mt-6 p-4 rounded-2xl border ${darkMode ? 'bg-neutral-800/50 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className={`p-2 rounded-xl transition-all ${darkMode ? 'bg-neutral-700 text-yellow-400' : 'bg-white shadow-sm text-neutral-500'}`}
                            >
                                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- MOBILE OVERLAY --- */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* --- MOBILE SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 w-72 z-[110] lg:hidden transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } ${darkMode ? 'bg-neutral-900' : 'bg-white shadow-2xl'}`}>
                <div className="p-8 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold">CommentSticker</span>
                        </div>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => { onNavigate(item.id); setIsMobileMenuOpen(false); }}
                                className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all ${currentPage === item.id
                                    ? (darkMode ? 'bg-white text-black' : 'bg-neutral-900 text-white')
                                    : (darkMode ? 'text-neutral-400 hover:bg-neutral-800' : 'text-neutral-500 hover:bg-neutral-100')
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto space-y-4">
                        <button
                            onClick={() => onNavigate('home')}
                            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold ${darkMode ? 'text-neutral-400 hover:bg-neutral-800' : 'text-neutral-500 hover:bg-neutral-100'
                                }`}
                        >
                            <Home className="w-5 h-5" />
                            Back to Home
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className={`sticky top-0 z-40 h-16 flex items-center px-4 lg:px-8 border-b transition-colors ${darkMode ? 'bg-neutral-950/80 border-neutral-900' : 'bg-white/80 border-neutral-100'
                    } backdrop-blur-xl`}>
                    {/* Mobile: hamburger + logo */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden p-2 -ml-1 mr-2"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <div
                        className="lg:hidden flex items-center gap-2 cursor-pointer mr-4"
                        onClick={() => onNavigate('home')}
                    >
                        <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-black text-sm tracking-tight">CommentSticker</span>
                    </div>

                    <div className="flex-1 hidden lg:block">
                        <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500">
                            {navItems.find(i => i.id === currentPage)?.label || 'Dashboard'}
                        </h2>
                    </div>

                    {/* Desktop: global nav links */}
                    <div className="hidden lg:flex items-center gap-1 mr-4">
                        {[
                            { id: 'free-tools', label: 'Free Tools' },
                            { id: 'blog', label: 'Blog' },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${darkMode ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'}`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-3">
                        <button className={`p-2 rounded-full transition-all ${darkMode ? 'hover:bg-neutral-800 text-neutral-400' : 'hover:bg-neutral-100 text-neutral-500'}`}>
                            <Bell className="w-4 h-4" />
                        </button>
                        <div className={`w-8 h-8 rounded-full border-2 p-0.5 ${darkMode ? 'border-neutral-800' : 'border-neutral-100'}`}>
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-orange-500" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 relative">
                    {/* Subtle background abstract elements */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

                    <div className="max-w-6xl mx-auto w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
