import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1> Learning NEXT Js</h1>
      <span>
        click Here 👉🏻
        <Link
          href="/profile"
          className="bg-blue-500 text-white mr-2 p-4 rounded-md"
        >
          Profile
        </Link>
        <Link
          href="/products"
          className="bg-blue-500 text-white p-4 rounded-md"
        >
          Products
        </Link>
        <Link
          href="/catch-all-routes"
          className="bg-blue-500 ml-2 text-white p-4 rounded-md"
        >
          Catch-all-routes
        </Link>
        <Link
          href="/optional-catch-all-route"
          className="bg-blue-500 ml-2 text-white p-4 rounded-md"
        >
          Optional Catch-all-route
        </Link>
      </span>
    </div>
  );
}
