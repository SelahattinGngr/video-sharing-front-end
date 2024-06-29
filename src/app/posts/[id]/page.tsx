import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Link from "next/link";
import { z } from "zod";

type Props = {
  params: {
    id: string;
  };
};

const responseSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const responseUser = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

export const metadata: Metadata = {};

export default async function PostPage({ params: { id } }: Props) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
  );
  const responseJson = await response.json();
  const parsedResponse = responseSchema.safeParse(responseJson);
  const response2 = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  const responseJson2 = await response2.json();
  const parsedResponse2 = responseUser.safeParse(responseJson2);
  if (!response.ok || !parsedResponse.success || !parsedResponse2.success) {
    return (
      <>
        <h1>Post</h1>
        <p>
          Error: {response.statusText} - {response.status}
        </p>
      </>
    );
  }
  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl">Post</h1>
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="line-clamp-1">
                {parsedResponse.data.title}
              </CardTitle>
              <CardDescription>{parsedResponse.data.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{parsedResponse.data.body}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="line-clamp-1">
                {parsedResponse2.data.name}
              </CardTitle>
              <CardDescription>{parsedResponse2.data.id}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{parsedResponse2.data.email}</p>
              <pre>{JSON.stringify(parsedResponse2.data.address, null, 2)}</pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
