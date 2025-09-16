import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1> Learning NEXT Js</h1>
      <span>
        {' '}
        click Here 👉🏻
        <Link
          href="/products"
          className="bg-blue-500 text-white p-4 rounded-md"
        >
          Products
        </Link>
      </span>
    </div>
  );
}
