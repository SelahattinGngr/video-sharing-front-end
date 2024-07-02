import Like from "@/components/like";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { z } from "zod";

type Props = {
  id: number;
  page: number;
  size: number;
};

const videoCommentSchema = z.object({
  id: z.number(),
  parrentId: z.number().nullable(),
  user: z.string(),
  childComments: z.object({
    parrentId: z.number().optional(),
    id: z.number().optional(),
    user: z.string().optional(),
    content: z.string().optional(),
    likes: z.number().optional(),
  }),
  content: z.string(),
  likes: z.number(),
  date: z.string(),
});

const responseSchema = z.object({
  comments: z.array(videoCommentSchema),
});

export default async function Comments({ id, size = 10, page = 1 }: Props) {
  const response = await fetch(
    `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/${id}?${page}&${size}`,
    {
      headers: {
        Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkBtYWlsLmNvbSIsImV4cCI6MTcyMDM3MDkxM30.enu90Y3mcEaZRhqwupXYgEuD-XNQvg42AwsKCszlVMm_3sRmYo_n8cCgOfd45uyo2LU-AGyEwmUWEpqhQP21EQ"}`, // Replace with your actual access token
      },
    },
  );
  const responseJson = await response.json();
  const parsedResponse = responseSchema.safeParse(responseJson);

  if (!response.ok || !parsedResponse.success) {
    console.log(parsedResponse.error);
    return (
      <>
        <h1>Comments</h1>
        <p>
          Error: {response.statusText} - {response.status}
        </p>
        {!parsedResponse.success ? (
          <div>
            <h2>Errors:</h2>
            <ul>
              {parsedResponse.error.errors.map((error) => (
                <li key={error.path.join(".")}>
                  {error.message} - {error.path.join(".")}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }

  const { comments } = parsedResponse.data;

  return (
    <main>
      <div>
        <div>
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardHeader>
                <h3>{comment.user}</h3>
              </CardHeader>
              <CardContent>
                <CardDescription>{comment.content}</CardDescription>
              </CardContent>
              <CardFooter>
                <p>{comment.likes}</p>
                <Like
                  commentId={comment.id}
                  videoId={id}
                  initialLikes={false}
                />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
