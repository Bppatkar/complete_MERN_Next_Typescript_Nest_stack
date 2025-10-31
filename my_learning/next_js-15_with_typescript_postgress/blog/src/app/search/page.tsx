import { getAllPosts } from '@/lib/db/queries';
import PostList from '@/components/post/post-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const allPosts = await getAllPosts();

  // Filter posts based on search query
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.description.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase()) ||
      post.author.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="py-10">
      <div className="max-w-7xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">
              {query ? `Search Results for "${query}"` : 'Search Posts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!query ? (
              <p className="text-muted-foreground">
                Enter a search term to find posts
              </p>
            ) : filteredPosts.length === 0 ? (
              <p className="text-muted-foreground">
                No posts found matching &ldquo;{query}&rdquo;
              </p>
            ) : (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Found {filteredPosts.length} post
                  {filteredPosts.length !== 1 ? 's' : ''}
                </p>
                <PostList posts={filteredPosts} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
