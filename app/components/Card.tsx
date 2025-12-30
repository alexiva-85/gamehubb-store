import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-zinc-900/60 border border-white/10 rounded-2xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

