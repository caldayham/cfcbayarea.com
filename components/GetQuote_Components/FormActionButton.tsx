import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  children: ReactNode;
}

export default function FormActionButton({ children }: CTAButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className="bg-accent hover:bg-accent-dark text-lg text-white font-medium px-8 py-3 rounded shadow-lg"
    >
      {children}
    </Button>
  );
}