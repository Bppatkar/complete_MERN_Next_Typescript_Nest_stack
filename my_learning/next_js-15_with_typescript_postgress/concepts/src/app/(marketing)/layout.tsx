import Link from 'next/link';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <header className="flex justify-between">
        <nav className="flex gap-4">
          <Link href={'/'} className="bg-amber-500 text-sm p-2">
            Home
          </Link>

          <Link href={'/about'} className="bg-amber-500 text-sm p-2">
            About
          </Link>

          <Link href={'/contact'} className="bg-amber-500 text-sm p-2">
            Contact
          </Link>
        </nav>
      </header>
      <main className="mt-12">{children}</main>
    </div>
  );
}
