import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "About us",
  description: "Signed By Selahattin Güngör",
};

export default async function AboutPage({}: Props) {
  return <>About Page</>;
}
