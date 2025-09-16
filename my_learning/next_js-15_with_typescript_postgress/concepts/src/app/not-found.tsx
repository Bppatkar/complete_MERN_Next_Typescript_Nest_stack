'use client';

import { useRouter } from 'next/navigation';

function NotFoundPage() {
  const router = useRouter();
  return (
    <div>
      <h1>The page you are looking for is not exists</h1>
      <button
        onClick={() => router.push('/')}
        className="bg-blue-500 p-2 m-2 rounded-md text-white"
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default NotFoundPage;
