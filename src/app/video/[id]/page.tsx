import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import Comments from "./comments";
import NewComment from "@/components/forms/comment";

type Props = {
  params: {
    id: number;
  };
};

const videoSchema = z.object({
  id: z.number(),
  title: z.string(),
  url: z.string().url(),
  thumbnail: z.string(),
  views: z.number(),
  like_count: z.number(),
  dislike_count: z.number(),
  description: z.string(),
  uploaded_user: z.object({
    uploaded_username: z.string(),
    uploaded_followers_count: z.number(),
  }),
  status: z.boolean(),
});

const responseSchema = z.object({
  video: videoSchema,
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideoPage({ params: { id } }: Props) {
  const response = await fetch(
    `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos/${id}`,
  );
  const responseJson = await response.json();
  const parsedResponse = responseSchema.safeParse(responseJson);

  if (!response.ok || !parsedResponse.success) {
    console.log(parsedResponse.error);
    console.log(responseJson);
    return (
      <>
        <h1>Videos</h1>
        <p>
          Error: {response.statusText} - {response.status}
        </p>
      </>
    );
  }

  const video = parsedResponse.data.video;
  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card key={video.id} className="w-fit">
            <CardHeader>
              <CardTitle> {video.title} </CardTitle>
              <CardDescription>{video.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <iframe
                width="560"
                height="315"
                src={video.url}
                title={video.title}
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </CardContent>
            <CardFooter>
              <CardDescription>{video.description}</CardDescription>
            </CardFooter>
            <Comments id={video.id} size={10} page={1} />
            <NewComment id={video.id} />
          </Card>
        </div>
      </div>
    </main>
  );
}
