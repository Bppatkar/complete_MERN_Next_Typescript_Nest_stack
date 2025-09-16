import Link from 'next/link';

function Products() {
  const products = [
    {
      id: 1,
      name: 'Laptop',
      category: 'Electronics',
      price: 990.95,
      inStock: true,
    },
    {
      id: 2,
      name: 'Coffee',
      category: 'Food',
      price: 50.95,
      inStock: true,
    },
    {
      id: Number(3),
      name: 'Shirt',
      category: 'Clothing',
      price: 99.95,
      inStock: false,
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p className={product.inStock ? 'text-green-500' : 'text-red-500'}>
              In Stock: {product.inStock ? 'Yes' : 'No'}
            </p>
            <Link
              href={`/products/${product.id}`}
              className="bg-blue-500 text-white rounded-md p-2 mt-4 inline-block"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
