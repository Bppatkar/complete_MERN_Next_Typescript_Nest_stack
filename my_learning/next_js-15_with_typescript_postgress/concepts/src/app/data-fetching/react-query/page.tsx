'use client';

import { useQuery } from '@tanstack/react-query';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface MoviesResponse {
  results: Movie[];
  total_results: number;
}

const fetchMovies = async (): Promise<MoviesResponse> => {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1'
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

function ReactQueryExample() {
  const { data, error, isLoading, isError } = useQuery<MoviesResponse, Error>({
    queryKey: ['movies'],
    queryFn: fetchMovies,
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent"></div>
          <p className="text-gray-300 mt-2">Loading movies...</p>
        </div>
      </div>
    );
  
  if (isError)
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400">Failed to load movies</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 bg-blue-600 text-white py-1 px-3 rounded text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            Popular Movies
          </h1>
          <p className="text-gray-400 text-sm">
            {data?.results?.length || 0} movies found
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.results?.slice(0, 12).map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors"
            >
              {/* Movie Poster */}
              <div className="mb-3">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450/333/fff?text=No+Image'
                  }
                  alt={movie.title}
                  className="w-full h-40 object-cover rounded"
                />
              </div>

              {/* Movie Info */}
              <h2 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                {movie.title}
              </h2>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-xs">
                  {new Date(movie.release_date).getFullYear() || 'N/A'}
                </span>
                <span className="text-yellow-400 text-xs">
                  ★ {movie.vote_average.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            Showing {Math.min(data?.results?.length || 0, 12)} movies
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReactQueryExample;