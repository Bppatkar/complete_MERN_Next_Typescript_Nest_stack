export default async function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const productId = Number(slug);
  return (
    <div>
      My Post: {productId}
      <h1>Type: {typeof productId}</h1>
    </div>
  );
}
