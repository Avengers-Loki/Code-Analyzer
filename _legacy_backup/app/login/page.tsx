'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import LoginForm from './login-form';

function LoginWrapper() {
    const searchParams = useSearchParams();
    const registered = searchParams.get('registered');

    return (
        <>
            {registered && (
                <div style={{
                    position: 'fixed',
                    top: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    padding: '12px 24px',
                    background: '#ecfdf5',
                    color: '#047857',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #a7f3d0',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}>
                    <Check size={16} /> Account created! Please log in.
                </div>
            )}
            <LoginForm />
        </>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: '#f8fafc'
            }}>
                <Loader2 className="animate-spin" size={32} color="#7c5dfa" />
            </div>
        }>
            <LoginWrapper />
        </Suspense>
    );
}
