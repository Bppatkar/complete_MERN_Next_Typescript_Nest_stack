'use client';

import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from 'next-themes';
import Header from '../layout/header';
import Footer from '../layout/footer';
import { cn } from '@/lib/utils';

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  containerClassName?: string;
}

export function ThemeProvider({
  children,
  containerClassName,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className={cn('container mx-auto px-4', containerClassName)}>
          {children}
        </main>
        <Footer />
      </div>
    </NextThemesProvider>
  );
}
