export type ListIconItem = { title: string; hex: string; url: string };

export type ListSimpleIconResponse = { icons: ListIconItem[] };

export async function fetchIconList(): Promise<ListIconItem[]> {
  const response = await fetch(`https://simpleicons.org/simple-icons.json`);

  if (response.status === 404 || response.ok === false) {
    throw new Error("No icons list found");
  }

  const data: ListSimpleIconResponse = await response.json();

  return data.icons.map(({ title, ...rest }: ListIconItem) => ({
    title: title.replace(".", "Dot").replaceAll("/", ""),
    ...rest,
  }));
}
