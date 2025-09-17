'use client';

import useSWR from 'swr';

interface Recipe {
  id: number;
  name: string;
  image: string;
  ingredients: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  rating: number;
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function SWRExample() {
  const { data, error, isLoading } = useSWR<RecipesResponse>(
    'https://dummyjson.com/recipes',
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 5000,
      errorRetryCount: 3,
    }
  );
  // console.log(data);

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
          <p className="text-gray-300 mt-4 text-lg">Loading recipes...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">Failed to load recipes</p>
          <p className="text-gray-400 text-sm mt-2">Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            SWR Data Fetching
          </h1>
          <p className="text-lg text-gray-300">
            Recipes fetched using SWR hook
          </p>
          <div className="mt-4 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-lg inline-block backdrop-blur-sm">
            <h3 className="text-xl font-semibold">
              {data?.recipes?.length || 0} recipes found
            </h3>
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.recipes?.slice(0, 9).map((recipe) => (
            <div
              key={recipe.id}
              className="bg-gray-800 rounded-xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-700/50"
            >
              {/* Recipe Image */}
              <div className="mb-4">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Recipe Info */}
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {recipe.name}
              </h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-green-400">
                    {recipe.servings} servings
                  </p>
                  <p className="text-sm text-gray-400">
                    {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min
                  </p>
                </div>

                <p className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full inline-block">
                  {recipe.cuisine}
                </p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(recipe.rating))}
                    {'☆'.repeat(5 - Math.floor(recipe.rating))}
                  </div>
                  <span className="ml-2 text-sm text-gray-400">
                    ({recipe.rating})
                  </span>
                </div>

                <div
                  className={`text-sm px-3 py-1 rounded-full inline-block ${
                    recipe.difficulty === 'Easy'
                      ? 'bg-green-900/30 text-green-300'
                      : recipe.difficulty === 'Medium'
                      ? 'bg-yellow-900/30 text-yellow-300'
                      : 'bg-red-900/30 text-red-300'
                  }`}
                >
                  {recipe.difficulty}
                </div>

                <p className="text-sm text-gray-400">
                  {recipe.ingredients.length} ingredients
                </p>
              </div>

              {/* View Button */}
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                View Recipe
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-10">
          <p className="text-gray-500 text-sm">
            Showing {Math.min(data?.recipes?.length || 0, 9)} of{' '}
            {data?.recipes?.length || 0} recipes
          </p>
        </div>

        {/* Empty State */}
        {(!data?.recipes || data.recipes.length === 0) && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">No recipes found</p>
            <p className="text-gray-500 text-sm mt-2">
              The recipes API might be temporarily unavailable
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SWRExample;
