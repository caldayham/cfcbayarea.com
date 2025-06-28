import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - CFC Construction',
  description: 'View our custom construction projects in the Palo Alto Bay Area. Fences, gates, chicken coops, and custom builds.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}