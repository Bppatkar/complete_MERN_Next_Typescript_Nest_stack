'use client';

import { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
  description?: string;
  discountPercentage?: number;
  stock?: number;
  images?: string[];
}

function useEffectExample() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Product[]>([]);

  async function fetchListOfProduct() {
    try {
      setLoading(true);
      const res = await fetch('https://dummyjson.com/products');
      const result = await res.json();
      if (result) {
        setLoading(false);
        setData(result?.products);
      }
      console.log('data fetched', result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListOfProduct();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent"></div>
          <p className="text-gray-300 mt-4 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            useEffect Data Fetching
          </h1>
          <p className="text-lg text-gray-300">
            Products fetched using useEffect hook
          </p>
          <div className="mt-4 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-lg inline-block backdrop-blur-sm">
            <h3 className="text-xl font-semibold">
              {data.length} products found
            </h3>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 rounded-xl shadow-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-gray-700/50"
            >
              {/* Product Image */}
              <div className="mb-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {product.title}
              </h2>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-bold text-green-400">
                    ${product.price}
                  </p>
                  {product.discountPercentage && (
                    <p className="text-sm text-red-400 line-through">
                      $
                      {(
                        product.price /
                        (1 - product.discountPercentage / 100)
                      ).toFixed(2)}
                    </p>
                  )}
                </div>

                <p className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1 rounded-full inline-block">
                  {product.category}
                </p>

                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="ml-2 text-sm text-gray-400">
                    ({product.rating})
                  </span>
                </div>

                {product.stock && (
                  <p className="text-sm text-gray-400">
                    In stock: {product.stock}
                  </p>
                )}
              </div>

              {/* View Button */}
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">
                View Product
              </button>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && !loading && (
          <div className="text-center mt-12">
            <p className="text-gray-400 text-lg">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default useEffectExample;
