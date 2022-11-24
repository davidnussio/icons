import { IconForms } from "~/components/icon-form";
import { fetchIconList, ListIconItem } from "~/services/simple-icons";
import Panel from "~/ui/panel";
import { H1, H2 } from "~/ui/typography";
import { urlApiExamples } from "./configs";

async function fetchBrands(): Promise<string[]> {
  const data: ListIconItem[] = await fetchIconList();
  return data.map((icon) => icon.title);
}

export default async function Home() {
  const brands = await fetchBrands();

  return (
    <div className="max-w-xl m-auto pt-8">
      <H1>
        <a href="https://simpleicons.org/">Simple Icons</a> as http api
      </H1>

      <Panel>
        <H2>Playground</H2>
        <IconForms brands={brands} />
      </Panel>

      <Panel>
        <H2>API</H2>
        <p className="pb-4">
          <code>/api/icons/[icon].[fileType]?color=[color]&width=[width]</code>
        </p>
        <div className="grid grid-cols-4">
          <div>icon: </div>
          <div className="col-span-3">
            check the
            <a href="https://simpleicons.org/">Simple Icons&apos;s</a> list
          </div>
          <div>fileType:</div>
          <div className="col-span-3">svg | png</div>
          <div>color:</div>
          <div className="col-span-3">brand | hex | rgb | rgba</div>
          <div>width:</div>
          <div className="col-span-3">
            number (default: 150)
            <br />
            <small>only for png fileType</small>
          </div>
        </div>
      </Panel>

      <Panel>
        <H2>Examples</H2>
        <ul className="pb-4">
          {urlApiExamples.map((exampleUrl) => (
            <li key={exampleUrl}>
              <a href={exampleUrl}>
                <code>{exampleUrl}</code>
              </a>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

export const dynamic = "force-dynamic";
