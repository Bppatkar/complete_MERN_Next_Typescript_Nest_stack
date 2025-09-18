'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useSession } from '@/lib/auth-client';
// import UserMenu from '../auth/user-menu';
// import ThemeToggle from '../theme/theme-toggle';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

function Header() {
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
            {/* Keep an placeholder for search */}
          </div>
          {/* placeholder for theme toggle */}
          {/* <ThemeToggle /> */}
          {/* <div className="flex items-center gap-2">
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
          </div> */}
          <div className="flex items-center gap-2">
            <Button
              className="cursor-pointer"
              onClick={() => router.push('/auth')}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
