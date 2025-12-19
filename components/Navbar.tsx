
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
        <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md h-20 flex items-center shrink-0 transition-all">
            <div className="w-full max-w-[1920px] mx-auto px-6 lg:px-12 flex items-center justify-between">

                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-[var(--foreground)] text-[var(--background)] p-1.5 rounded-sm group-hover:bg-[var(--primary)] transition-colors">
                            <Code size={24} />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-[var(--foreground)]">CodeWiki</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--secondary)]">
                        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Product</Link>
                        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Solutions</Link>
                        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Resources</Link>
                        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Pricing</Link>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-sm font-medium text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--primary)] transition-colors flex items-center gap-1"
                            >
                                <div className="p-1"><User size={16} /></div>
                                Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-[var(--primary)] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:brightness-110 shadow-sm hover:shadow-md transition-all active:scale-95"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
