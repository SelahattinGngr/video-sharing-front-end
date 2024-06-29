import { ReloadIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  // TODO: Add metadata [id]Page
};

export default async function Loading({}: Props) {
  return <ReloadIcon className="animate-spin size-10" />;
}
