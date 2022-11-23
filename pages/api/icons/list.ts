//simpleicons.org/simple-icons.json

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = null | ReadableStream<Uint8Array> | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`https://simpleicons.org/simple-icons.json`);

  if (response.status === 404 || response.ok === false) {
    return res.status(404).send("No icons list found");
  }

  const data = await response.json();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=604800");

  res.send(data);
}
