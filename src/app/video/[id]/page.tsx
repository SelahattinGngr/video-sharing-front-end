import type { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
  searchParams: {
    query: string;
    // page ve size olarak kullanırsın
  };
};

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function VideoPage({
  params: { id },
  searchParams: { query },
}: Props) {
  const wait = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Bekleme tamamlandı");
    }, 5000);
  });

  const response = await wait;
  return (
    <>
      {response} - {id} - {query} - VideoPage
    </>
  );
}
