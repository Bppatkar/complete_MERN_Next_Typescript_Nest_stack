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

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function getProducts(): Promise<ProductResponse> {
  const res = await fetch('https://dummyjson.com/products');
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ServerSideFetchExample() {
  const products = await getProducts();
  
  return (
    <div className=" bg-gradient-to-br from-gray-900 to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Server Side Fetch Example
          </h1>
          <p className="text-lg text-gray-300">
            Products fetched during server-side rendering
          </p>
          <div className="mt-4 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-lg inline-block backdrop-blur-sm">
            <h3 className="text-xl font-semibold">
              {products.total} products found (showing {products.products.length})
            </h3>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.products.map((product) => (
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
                      ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
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

        {/* Stats Footer */}
        <div className="mt-12 text-center">
          <div className="bg-gray-800/50 rounded-xl shadow-md p-6 inline-block backdrop-blur-sm">
            <p className="text-gray-300">
              Data fetched from{' '}
              <span className="font-mono text-blue-400">dummyjson.com</span>
              <br />
              <span className="text-sm text-gray-400">
                Showing {products.skip + 1}-{products.skip + products.products.length} of {products.total}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}





//! 🏢 Server Component Fetching --Vs-- 💻 Client Component Fetching

/* 
//? Visual Identification Tips:
//* Server Component Clues:
async keyword on component function
Direct await before fetch calls
No 'use client' directive
No React hooks used

//* Client Component Clues:
'use client' directive at top
Uses hooks (use, useEffect, useState)
Suspense for loading states
Interactive elements needing JavaScript

//? Real-world Analogy:
Server Component = Restaurant Kitchen 🍳

Food prepared in kitchen (server)
Ready meal served to customer (browser)
Customer gets complete meal immediately

Client Component = Table-side Cooking 🔥

Ingredients brought to table (initial HTML)
Cooking happens at table (client-side fetching)
Customer watches it prepare
*/

//? In interview: "Server components fetch data during server rendering, sending complete HTML to client. Client components fetch after JavaScript loads, making them better for dynamic user-specific data but worse for SEO and initial load performance."