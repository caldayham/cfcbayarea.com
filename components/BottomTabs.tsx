'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase } from 'lucide-react';

const BottomTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Prefetch both pages on mount for instant switching
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/portfolio');
  }, [router]);

  const tabs = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/'
    },
    {
      name: 'Portfolio',
      href: '/portfolio',
      icon: Briefcase,
      isActive: pathname === '/portfolio'
    }
  ];

  return (
    <nav 
      className="flex border-t"
      style={{ 
        backgroundColor: 'var(--color-background)',
        borderTop: `2px solid var(--color-border)`
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex-1 flex flex-col items-center justify-center py-2 transition-colors duration-200"
            style={{
              backgroundColor: tab.isActive ? 'var(--color-accent-light)' : 'transparent',
              color: tab.isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              borderTop: tab.isActive ? `3px solid var(--color-accent)` : '3px solid transparent'
            }}
          >
            {/* Tab Icon */}
            <Icon 
              className="h-4 w-4 mb-1" 
              strokeWidth={tab.isActive ? 2.5 : 2}
            />
            
            {/* Tab Label */}
            <span 
              className="text-xs font-medium"
              style={{
                fontWeight: tab.isActive ? '600' : '500'
              }}
            >
              {tab.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default BottomTabs;