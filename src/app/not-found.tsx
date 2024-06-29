import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {};

export const metadata: Metadata = {};

export default async function NotFound({}: Props) {
  redirect("/"); // Redirect to home page
  return <>Yanlış geldin knk geri git</>;
}
