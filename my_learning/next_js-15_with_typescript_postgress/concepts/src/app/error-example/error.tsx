'use client';

import { useEffect } from 'react';

export default function ErrorExampleFallbackUI({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // sending a report to a login service
  }, [error]);

  return (
    <div>
      <p className="text-red-500">{error?.message || 'An error occurred'}</p>
    </div>
  );
}
