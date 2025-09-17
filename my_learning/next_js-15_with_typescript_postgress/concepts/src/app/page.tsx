import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-[calc(100vh-200px)] p-8 gap-16 sm:p-20">
      {/* Main Content */}
      <div className="text-center">
        <h1 className="text-transparent text-4xl font-bold bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4">
          Learning NEXT Js
        </h1>
        <p className="text-gray-600 text-lg mb-8">Click Here 👇🏻</p>

        <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl">
          {[
            { href: "/profile", text: "Profile", color: "from-blue-400 to-cyan-400" },
            { href: "/products", text: "Products", color: "from-green-400 to-emerald-400" },
            { href: "/catch-all-routes", text: "Catch-all-routes", color: "from-orange-400 to-red-400" },
            { href: "/optional-catch-all-route", text: "Optional Catch-all-route", color: "from-purple-400 to-pink-400" },
            { href: "/loading-example", text: "Loading Example", color: "from-yellow-400 to-amber-400" },
            { href: "/error-example", text: "Error Example", color: "from-red-400 to-rose-400" },
            { href: "/about", text: "Routes Group using group()", color: "from-indigo-400 to-blue-400" },
            { href: "/metadata-example", text: "Meta Data", color: "from-teal-400 to-green-400" },
            { href: "/data-fetching/server-fetch", text: "Data Fetching Server Components", color: "from-cyan-400 to-blue-400" },
            { href: "/data-fetching/use-hook", text: "Data Fetching use hook", color: "from-fuchsia-400 to-purple-400" },
          ].map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className={`text-transparent text-lg font-semibold bg-clip-text bg-gradient-to-r ${link.color} hover:scale-105 transition-all duration-300 px-4 py-2`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}