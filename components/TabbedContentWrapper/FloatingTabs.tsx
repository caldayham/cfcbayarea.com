// components/TabbedContentWrapper/FloatingTabs.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase } from 'lucide-react';

const tabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase },
];

export default function FloatingTabs() {
    const pathname = usePathname();
    const router = useRouter();

    // pre-fetch pages for snappy switching
    useEffect(() => {
        router.prefetch('/');
        router.prefetch('/portfolio');
    }, [router]);

    return (
        <div
            className="pointer-events-auto flex gap-0"
            style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                bottom: '0px',               // adjust manually as desired
                background: 'var(--color-background)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderBottom: 'none',
                borderRadius: 'var(--radius)',
                padding: '0px',
            }}
        >
            {tabs.map(({ name, href, icon: Icon }) => {
                const isActive = pathname === href;

                /* colours & outline */
                const borderTop = isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent';
                const borderSides = isActive ? '2px solid var(--color-text-primary)' : '2px solid transparent';

                return (
                    <Link
                        key={href}
                        href={href}
                        scroll={false}
                        className="flex items-center justify-center gap-2 py-2 text-sm border-2 transition-none"
                        style={{
                            /* individual edges avoid the React warning */
                            borderTop,
                            borderLeft: borderSides,
                            borderRight: borderSides,
                            borderBottom: '2px solid transparent', // open bottom
                            borderRadius: 'var(--radius) var(--radius) 0 0',
                            marginBottom: isActive ? '-2px' : '0', // overlaps outer frame if needed
                            zIndex: isActive ? 1 : 0,
                            fontWeight: isActive ? 600 : 500,
                            color: isActive ? 'black' : 'var(--color-text-secondary)',
                            background: 'var(--color-background)',
                            width: '180px',
                        }}
                    >
                        <Icon className="w-4 h-4" strokeWidth={isActive ? 2.5 : 2} />
                        {name}
                    </Link>
                );
            })}
        </div>
    );
}
