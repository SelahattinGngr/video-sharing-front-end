"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
  videoId: number;
  initialLikes: boolean;
  commentId?: number;
};

export default function Like({ videoId, initialLikes, commentId }: Props) {
  const [liked, setLiked] = useState(initialLikes);
  useEffect(() => {
    setLiked(initialLikes);
  }, [initialLikes]);

  const handleLikeClick = async () => {
    const response = await fetch(
      commentId
        ? `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/like/${commentId}`
        : `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos/like/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMkBtYWlsLmNvbSIsImV4cCI6MTcyMDM3MDkxM30.enu90Y3mcEaZRhqwupXYgEuD-XNQvg42AwsKCszlVMm_3sRmYo_n8cCgOfd45uyo2LU-AGyEwmUWEpqhQP21EQ"}`, // Replace with your actual access token
        },
      },
    );
    if (response.ok) {
      setLiked(!liked);
    } else {
      console.error("Failed to toggle like:", response.statusText);
    }
  };

  return <Button onClick={handleLikeClick}>{liked ? "Unlike" : "Like"}</Button>;
}
