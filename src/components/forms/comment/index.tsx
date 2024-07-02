"use client";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentScheme, CommentScheme } from "./scheme";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  id: number;
  parrentId?: number;
};

export default function NewComment({ id, parrentId = 0 }: Props) {
  const { toast } = useToast();
  const form = useForm<CommentScheme>({
    resolver: zodResolver(commentScheme),
    defaultValues: {
      content: "",
      parentId: parrentId,
    },
  });

  const handleLikeClick = async () => {
    const response = await fetch(
      `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/video-comments/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyM0BtYWlsLmNvbSIsImV4cCI6MTcyMDQ1OTg3MX0.IdTghF-lB8FIFpSzoKDXL0WLMmNA_i1D1po8R3VuYLrdUCrtDYVqh0kdAo6CjjX9QXod7IcXKYxeJiU9g3X_0Q"}`, // Replace with your actual access token
        },

        body: JSON.stringify({
          content: form.getValues("content"),
          parentId: parrentId,
        }),
      },
    );
    if (!response.ok) {
      return toast({
        title: "Yorumun Alınamadı",
        variant: "destructive",
        description: (await response.json()).error,
      });
    }
    form.reset();
    toast({
      title: "Yorumun Başarıyla Alındı",
      description: "Moderatör onayından sonra yayınlanacaktır",
    });
  };

  const token = true;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLikeClick)}
        className="w-full space-y-6"
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yorum yap la</FormLabel>
              <FormControl>
                {token ? (
                  <Textarea
                    placeholder="Yorum yaparmısın canim"
                    className="resize-none"
                    {...field}
                  />
                ) : (
                  <Textarea
                    placeholder="Yorum yapmak için lütfen giriş yapın"
                    className="resize-none"
                    disabled
                    {...field}
                  />
                )}
              </FormControl>
              <FormDescription className="text-right">
                {field.value.length} / 160 karakter
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit">Yorum Yap</Button>
        </div>
      </form>
    </Form>
  );
}
