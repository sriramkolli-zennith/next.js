import { ReactNode } from 'react';

interface H1Props {
  children: ReactNode;
}

export default function H1({ children }: H1Props) {
  return (
    <h1 className="mb-8 text-2xl not-prose">
      {children}
    </h1>
  );
}