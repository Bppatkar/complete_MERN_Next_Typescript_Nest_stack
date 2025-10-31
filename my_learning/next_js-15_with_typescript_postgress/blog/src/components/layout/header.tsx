'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import UserMenu from '../auth/user-menu';
import ThemeToggle from '../theme/theme-toggle';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Create', href: '/post/create' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          >
            Next.js 15 Blog
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary relative group'
                )}
              >
                {navItem.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            {/* Placeholder for search */}
            <form role="search" className="flex items-center">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-56 px-3 py-1.5 rounded-md border bg-input text-sm focus:outline-none focus:ring-2 focus:ring-primary pr-16"
                />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-0 px-2">
                  <button
                    type="submit"
                    className="p-1 text-muted-foreground hover:text-primary"
                    aria-label="Submit search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
          {/* placeholder for theme toggle */}
          <ThemeToggle />
          <div className="flex items-center gap-2">
            {isPending ? null : session?.user ? (
              <UserMenu user={session?.user} />
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => router.push('/auth')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
