import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-transparent text-4xl font-bold bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        {' '}
        Learning NEXT Js
      </h1>
      <div className="text-center">
        <p className="text-white text-lg mb-6">click Here ▲</p>

        <div className="flex flex-wrap items-center justify-center gap-4 max-w-screen">
          <Link
            href="/profile"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Profile
          </Link>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Products
          </Link>
          <Link
            href="/catch-all-routes"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Catch-all-routes
          </Link>
          <Link
            href="/optional-catch-all-route"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Optional Catch-all-route
          </Link>
          <Link
            href="/loading-example"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Loading Example
          </Link>
          <Link
            href="/error-example"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition-colors shadow-lg"
          >
            Error Example
          </Link>
        </div>
      </div>
    </div>
  );
}
