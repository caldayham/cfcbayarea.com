'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Briefcase } from 'lucide-react';

const tabs = [
  { name: 'About',     href: '/',          icon: Home       },
  { name: 'Portfolio', href: '/portfolio', icon: Briefcase  },
  { name: 'Get Quote', href: '/get-quote', icon: Briefcase  },
];

export default function FloatingTabs() {
  const pathname = usePathname();
  const router   = useRouter();

  /* pre-fetch for snappy tab switching */
  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/portfolio');
  }, [router]);

  return (
    <div
      className="pointer-events-auto flex gap-0 z-20"
      style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: '0px',
        background: 'var(--color-white)',
        borderTopLeftRadius:  'var(--radius)',
        borderTopRightRadius: 'var(--radius)',
        boxShadow: `
          inset 0   1px 0 0 var(--color-gray-200),
          inset 1px  0 0 0 var(--color-gray-200),
          inset -1px 0 0 0 var(--color-gray-200)
        `,
        marginBottom: '10px',
      }}
    >
      {tabs.map(({ name, href, icon: Icon }) => {
        const active = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            scroll={true}
            className="flex items-center justify-center gap-2 py-2 text-sm w-[115px] md:w-[180px] border-2 transition-none"
            style={{
              borderTop:    active ? '2px solid var(--color-gray-900)' : '2px solid transparent',
              borderLeft:   active ? '2px solid var(--color-gray-900)' : '2px solid transparent',
              borderRight:  active ? '2px solid var(--color-gray-900)' : '2px solid transparent',
              borderBottom: '2px solid transparent',     // open bottom
              borderRadius: 'var(--radius) var(--radius) 0 0',
              marginBottom: active ? '-2px' : '0',
              zIndex:       active ? 1 : 0,
              fontWeight:   active ? 600 : 500,
              color:        active ? 'var(--color-gray-900)' : 'var(--color-gray-700)',
              background:   active ? 'var(--color-white)' : 'transparent',
            }}
          >
            <Icon className="w-4 h-4" strokeWidth={active ? 2.5 : 2} />
            {name}
          </Link>
        );
      })}
    </div>
  );
}
