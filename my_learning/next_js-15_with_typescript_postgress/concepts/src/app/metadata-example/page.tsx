import { Metadata } from 'next';
import Link from 'next/link';

export const metadata :Metadata = {
  title: 'Learning Metadata',
  description: 'Example of using metadata in Next.js',
}

export default async function MetadataExample() {
  const examples = [
    { id: 1, title: 'One 1' },
    { id: 2, title: 'Two 2' },
    { id: 3, title: 'Three 3' },
  ];

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold">Metadata Example</h1>
      {examples.map((item) => (
        <div key={item.id} className="m-4">
          <Link
            href={`/metadata-example/${item.id}`}
            className="text-blue-500 hover:underline"
          >
            {item.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
