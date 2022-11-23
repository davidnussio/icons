import type { NextApiRequest, NextApiResponse } from "next";

export type ListIconItem = { title: string; hex: string; url: string };

type ListSimpleIconResponse = { icons: ListIconItem[] };
type Data = ListIconItem[] | string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(`https://simpleicons.org/simple-icons.json`);

  if (response.status === 404 || response.ok === false) {
    return res.status(404).send("No icons list found");
  }

  const data: ListSimpleIconResponse = await response.json();

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=604800");

  res.send(
    data.icons.map(({ title, ...rest }: ListIconItem) => ({
      title: title.replace(".", "Dot").replaceAll("/", ""),
      ...rest,
    }))
  );
}
