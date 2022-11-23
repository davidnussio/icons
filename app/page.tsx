import { IconForms } from "~/components/IconForm";
import { fetchIconList, ListIconItem } from "~/services/simple-icons";
import { H1, H2 } from "~/ui/typography";

async function fetchBrands(): Promise<string[]> {
  const data: ListIconItem[] = await fetchIconList();
  return data.map((icon) => icon.title);
}

export default async function Home() {
  const brands = await fetchBrands();

  return (
    <div className="max-w-xl m-auto pt-12">
      <H1>
        <a href="https://simpleicons.org/">Simple Icons</a> as http api
      </H1>

      <p className="pb-4">
        <code>/api/icons/[icon]?color=[color]</code>
      </p>
      <H2>Examples</H2>
      <ul className="pb-4">
        <li>
          <a href="/api/icons/github.svg">
            <code>/api/icons/github.svg</code>
          </a>
        </li>
        <li>
          <a href="/api/icons/github.svg?color=18aa17">
            <code>/api/icons/github.svg?color=18aa17</code>
          </a>
        </li>
        <li>
          <a href="/api/icons/github.svg?color=rgba(200,57,72,0.3)">
            <code>/api/icons/github.svg?color=rgba(200,57,72,0.3)</code>
          </a>
        </li>
        <li>
          <a href="/api/icons/facebook.svg?color=brand">
            <code>/api/icons/facebook.svg?color=brand</code>
          </a>
        </li>
      </ul>
      <div>
        <H2>
          <IconForms brands={brands} />
        </H2>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
