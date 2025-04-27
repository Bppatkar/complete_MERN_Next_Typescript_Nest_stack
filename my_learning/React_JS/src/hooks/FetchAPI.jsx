import React, { useEffect, useState } from "react";

const FetchAPI = () => {
  const [product, setProduct] = useState(null);
  const [productId, setProductId] = useState(1); 

  const fetchProduct = async (id) => {
    try {
      const url = `https://fakestoreapi.com/products/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.warn(error.message);
    }
  };

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const handleNextProduct = () => {
    setProductId((prevId) => prevId + 1); // Increment product ID by 1
  };

  return (
    <div className="p-6 bg-gray-50 min-h-[300px]">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Product Viewer
      </h1>
      {product ? (
        <div className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 max-w-md mx-auto">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-4 rounded-lg"
          />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500 mb-2 capitalize">
            Category: {product.category}
          </p>
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {product.description}
          </p>
          <p className="text-xl font-bold text-green-600 mb-2">
            ${product.price}
          </p>
          <div className="flex items-center text-yellow-500 mb-4">
            <span className="text-lg">&#9733;</span>
            <span className="ml-2 text-gray-600 text-sm">
              {product.rating?.rate} ({product.rating?.count} reviews)
            </span>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading product...</p>
      )}
      <div className="text-center mt-6">
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={handleNextProduct}
        >
          Fetch Next Product
        </button>
      </div>
    </div>
  );
};

export default FetchAPI;