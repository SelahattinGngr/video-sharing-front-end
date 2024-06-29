import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";

type Props = {
  searchParams: {
    search: string;
  };
};

export const metadata: Metadata = {};

const responseSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const responseArraySchema = z.array(responseSchema);

export default async function PostsPage({
  searchParams: { search = "" },
}: Props) {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const responseJson = await response.json();
  const parsedResponse = responseArraySchema.safeParse(responseJson);
  if (!response.ok || !parsedResponse.success) {
    return (
      <>
        <h1>Posts</h1>
        <p>
          Error: {response.statusText} - {response.status}
        </p>
      </>
    );
  }

  const filteredPost = parsedResponse.data.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">Posts</h1>
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredPost.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                <CardDescription>{item.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{item.body}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/posts/${item.id}`} className="link">
                  devamını okumak için tıklayın
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
