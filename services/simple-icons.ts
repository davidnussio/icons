export type ListIconItem = { title: string; hex: string; url: string };

export type ListSimpleIconResponse = ListIconItem[];

export async function fetchIconList(): Promise<ListIconItem[]> {
  const response = await fetch(process.env.SIMPLE_ICONS_API_URL!);

  if (response.status === 404 || response.ok === false) {
    throw new Error("No icons list found");
  }

  const data: ListSimpleIconResponse = await response.json();

  return data.map(({ title, ...rest }: ListIconItem) => ({
    title: title.replace(".", "Dot").replaceAll("/", ""),
    ...rest,
  }));
}
