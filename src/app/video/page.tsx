import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";

type Props = {
  searchParams: {
    query: string;
    page: number;
    size: number;
  };
};

// Video objesini tanımlayan Zod şeması
const videoSchema = z.object({
  id: z.number(),
  title: z.string(),
  thumbnail: z.string(),
  views: z.number(),
});

// Yanıt JSON'unu tanımlayan Zod şeması
const responseSchema = z.object({
  videos: z.array(videoSchema),
});

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideoList({
  searchParams: { query = "", page = 1, size = 10 },
}: Props) {
  // API'den videoları almak için fetch isteği
  const response = await fetch(
    `http://localhost:5353/1qz2x3c4v5b6n7m8l9k0j/videos?${page}&${size}`,
  );

  // Yanıtı JSON formatına dönüştürme
  const responseJson = await response.json();

  // JSON yanıtını Zod şemasıyla doğrulama
  const parsedResponse = responseSchema.safeParse(responseJson);

  // Yanıtın başarılı olup olmadığını kontrol etme
  if (!response.ok || !parsedResponse.success) {
    return (
      <>
        <h1>Videos</h1>
        <p>
          Error: {response.statusText} - {response.status}
        </p>
      </>
    );
  }

  // Filtrelenen videoları arama terimine göre filtreleme ve thumbnailsız olanları çıkar
  const filteredVideos = parsedResponse.data.videos.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) &&
      item.thumbnail !== "",
  );

  return (
    <main>
      <div className="flex flex-col items-center gap-4">
        <div className="grid w-full max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredVideos.map((item) => (
            <Card key={item.id} className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="line-clamp-1">
                  <Link href={`/video/${item.id}`} className="link">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={300}
                      height={300}
                    />
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{item.title}</p>
                <p>Views: {item.views}</p>
              </CardContent>
              {/* <Button>Beğen</Button> */}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
