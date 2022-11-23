import type { NextApiRequest, NextApiResponse } from "next";
import { fetchIconList, ListIconItem } from "~/services/simple-icons";

type Data = ListIconItem[] | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data: ListIconItem[] = await fetchIconList();
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "public, max-age=604800");
    res.send(data);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown";
    res.status(500).send(errorMessage);
  }
}
