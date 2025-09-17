'use client';

import { useRouter } from 'next/navigation';

function NotFoundPage() {
  const router = useRouter();
  
  // Check if current URL contains '/catch-all-routes'
  const isCatchAllRoute = typeof window !== 'undefined' && 
                          window.location.pathname.includes('/catch-all-routes');

  return (
    <div className="bg-black p-6">
      <h1 className="text-white text-xl mb-4">
        The page you are looking for does not exist
      </h1>
      
      {isCatchAllRoute && (
        <p className="text-gray-400 mb-6">
          You're on a catch-all route! Try changing the URL to something like:
          <br />
          <code className="text-blue-400">
            /catch-all-routes/1/2/3/4/5/6
          </code>
          <br />
          or any other path segments you want to add.
        </p>
      )}
      
      <button
        onClick={() => router.push('/')}
        className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-md text-white"
      >
        Go to Homepage
      </button>
    </div>
  );
}

export default NotFoundPage;