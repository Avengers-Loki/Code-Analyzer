
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
        <nav className="border-b border-[var(--border)] bg-[var(--surface)] h-16 flex items-center shrink-0">
            <div className="w-full px-6 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2 text-xl font-bold text-[var(--foreground)] hover:opacity-90 transition-opacity">
                    <Code className="text-[var(--primary)]" />
                    <span>Code<span className="text-[var(--primary)]">Wiki</span></span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-[var(--secondary)] hover:text-[var(--text)] text-sm font-medium transition-colors">
                        Documentation
                    </Link>

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 bg-[var(--surface-hover)] border border-[var(--border)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--surface)] transition-colors"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    ) : (
                        <div className="flex gap-3">
                            <Link href="/login" className="text-[var(--text)] hover:text-[var(--primary)] px-3 py-2 text-sm font-medium transition-colors">
                                Sign In
                            </Link>
                            <Link href="/signup" className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:brightness-110 transition-all shadow-lg shadow-blue-500/20">
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
