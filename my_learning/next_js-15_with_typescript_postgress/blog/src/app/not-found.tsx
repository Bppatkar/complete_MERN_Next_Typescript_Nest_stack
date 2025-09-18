import { Button } from '@/components/ui/button';
import Link from 'next/link';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 py-12 relative overflow-hidden">
      {/* Animated 404 number */}
      <div className="relative mb-8 animate-bounce">
        <h1 className="text-9xl font-black bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
          404
        </h1>
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-pink-600/20 blur-2xl -z-10 rounded-full" />
      </div>

      {/* Main content */}
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-foreground animate-pulse">Oops! Page Not Found</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          The page you're looking for doesn't exist or might have been moved.
        </p>
        
        {/* Button with hover animation */}
        <Button asChild size="lg" className="rounded-full px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-1/4 w-24 h-24 bg-purple-300/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute right-10 bottom-1/4 w-32 h-32 bg-pink-300/30 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute left-20 bottom-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
    </div>
  );
}

export default NotFound;