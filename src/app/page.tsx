import Image from "next/image";
import { headers } from 'next/headers';

const VERCEL_PROTECTION_HEADER = "x-vercel-protection-bypass"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<URLSearchParams>
}) {
  // construct the current server URL
  const headersList = await headers()
  const host = headersList.get('host')
  const proto = headersList.get('x-forwarded-proto')
  const vercelProtection = headersList.get(VERCEL_PROTECTION_HEADER)
  const params = new URLSearchParams(await searchParams)
  const protection = (() => {
    if (vercelProtection) {
      return vercelProtection
    }
    if (params.has(VERCEL_PROTECTION_HEADER)) {
      return params.get(VERCEL_PROTECTION_HEADER)
    }

    return null
  })();
  const apiURL = `${proto}://${host}/api/greetings`

  const response = await fetch(apiURL, {
    ...(protection
      ? { headers: { [VERCEL_PROTECTION_HEADER]: protection } }
      : {}),
  })
  const greetings = await response.json()
  // select random entry in greetings array
  const greeting = greetings[Math.floor(Math.random() * greetings.length)]
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <a href="https://checklyhq.com" target="_blank">
          <Image
            src="https://www.checklyhq.com/images/racoon_logo.svg"
            alt="Checkly logomark"
            width={40}
            height={40}
            className="mb-4"
          />
          </a>
          <div className="text-gray-300 mb-4">
            <span className="capitalize">{greeting.text}</span>, this is the
          </div>
          <h1 className="text-4xl text-left sm:text-5xl font-bold text-white">
            Next.js & Checkly starter template
          </h1>
        </div>
        <p>
          This is a simple Next.js app with a Checkly integration. In a nutshell, it does three things:
        </p>
        <ol className="list-decimal text-left list-inside">
          <li className="mb-2">The app fetches data from the <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">/api/greetings</code> endpoint and displays it on this landing
            page.
          </li>
          <li className="mb-2">Checkly verifies if the page loads — using Playwright — and if the API responds correctly.</li>
          <li>Checkly checks can run after deployment and deployed as monitors using the Checkly CLI.</li>
        </ol>
        <p>To get going, <a className="text-blue-700 underline" href="https://github.com/checkly/nextjs-checkly-starter-template" target="_blank">go to the repo</a> and follow the instructions in the README.md file.</p>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://github.com/checkly/nextjs-checkly-starter-template"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to the GitHub repo
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/checkly/nextjs-checkly-starter-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repo
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://checklyhq.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to checklyhq.com →
        </a>
      </footer>
    </div>
  );
}
