async function getProduct(): Promise<
  { id: number; name: string; description: string; price: number }[]
> {
  // simulate the dummy error
  const shouldError = Math.random() > 0.5;
  if (shouldError) {
    throw new Error('Failed to fetch product');
  }
  return [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description of Product 1',
      price: 19.99,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description of Product 2',
      price: 29.99,
    },
  ];
}

export default async function ErrorExample() {
  const data = await getProduct();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Error Example</h1>
      <div className="grid gap-4">
        {data.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
