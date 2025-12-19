
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Code, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for token on mount
        const token = Cookies.get('token');
        setIsLoggedIn(!!token);
    }, []);

    function handleLogout() {
        Cookies.remove('token');
        setIsLoggedIn(false);
        router.push('/login');
        router.refresh();
    }

    return (
        <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md h-24 flex items-center shrink-0 transition-all">
            <div className="w-full max-w-[1920px] mx-auto px-10 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-[var(--foreground)] hover:opacity-80 transition-opacity">
                    <div className="bg-[var(--primary)]/10 p-2 rounded-lg">
                        <Code className="text-[var(--primary)]" size={32} />
                    </div>
                    <span className="tracking-tight">Code<span className="text-[var(--primary)]">Wiki</span></span>
                </Link>
                <div className="flex items-center gap-10">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] px-6 py-2.5 rounded-full text-base font-medium transition-all hover:shadow-sm active:scale-95"
                        >
                            <LogOut size={18} className="text-[var(--secondary)]" />
                            Sign Out
                        </button>
                    ) : (
                        <div className="flex items-center gap-8">
                            <Link
                                href="/signup"
                                className="relative group flex items-center gap-3 bg-gradient-to-r from-[var(--primary)] to-purple-600 text-white px-9 py-3.5 rounded-full text-lg font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 active:translate-y-0 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                                <User size={20} className="relative z-10" />
                                <span className="relative z-10">Sign Up</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
