'use client';

import { useEffect } from 'react';
import { initMouseEffect } from '@/lib/mouseEffect';

export default function RootLayoutClient({
  children,
  interVariable,
  poppinsVariable,
}: {
  children: React.ReactNode;
  interVariable: string;
  poppinsVariable: string;
}) {
  useEffect(() => {
    const cleanup = initMouseEffect();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <html lang="en" className={`${interVariable} ${poppinsVariable} antialiased`}>
      <body className="font-sans">
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}