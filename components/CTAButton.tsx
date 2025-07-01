import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
}

export default function CTAButton({ href, children }: CTAButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className="bg-accent hover:bg-accent-dark text-lg text-white font-medium px-8 py-3 rounded shadow-lg"
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
}