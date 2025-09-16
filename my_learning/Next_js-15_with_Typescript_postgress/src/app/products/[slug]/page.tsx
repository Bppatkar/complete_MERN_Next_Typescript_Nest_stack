export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  return (
    <div>
      My Post: {slug}
      <h1>Type: {typeof slug}</h1>
    </div>
  );
}
