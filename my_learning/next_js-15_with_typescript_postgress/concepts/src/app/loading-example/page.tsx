async function getData(): Promise<{ stats: { users: number } }> {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          stats: {
            users: 10000,
          },
        }),
      2000
    )
  );
}

export default async function Loading() {
  const data = await getData();
  return (
    <div className="p-4">
      <h1 className="text-2xl ">Loading Example</h1>
      <p className="mt-4 text-sm font-bold">User: {data.stats.users}</p>
    </div>
  );
}
