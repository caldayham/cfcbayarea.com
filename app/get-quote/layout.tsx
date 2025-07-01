import HoveringProgressBar from '@/components/HoveringProgressBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a quote!',
  description: 'Contact us to schedule a free design consultation today!',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HoveringProgressBar />
      {children}
    </>
  );
}