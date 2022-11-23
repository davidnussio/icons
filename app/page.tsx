export default function Home() {
  return (
    <div className="max-w-xl m-auto pt-12">
      <h1 className="text-5xl font-semibold pb-16">
        <a href="https://simpleicons.org/">Simple Icons</a> as http api
      </h1>

      <p className="pb-4">
        <code>/api/icons/[icon]?color=[color]</code>
      </p>
      <h2 className="text-3xl font-medium py-4">Examples</h2>
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
    </div>
  );
}
