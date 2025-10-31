import { PostCardProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col bg-card border-border">
      <CardHeader>
        <Link className="hover:underline" href={`/post/${post.slug}`}>
          <CardTitle className="text-2xl text-card-foreground">{post.title}</CardTitle>
        </Link>
        <CardDescription className="text-muted-foreground">
          By {post.author.name} - {formatDate(post.createdAt)}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{post.description}</p>
      </CardContent>
    </Card>
  );
}
export default PostCard;
