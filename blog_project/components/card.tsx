import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border rounded-md border-gray-600 p-4 ${className}`}>
      {children}
    </div>
  );
}