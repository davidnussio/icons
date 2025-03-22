import { Inter as FontSans } from "next/font/google";

import "~/styles/globals.css";

import { cn } from "~/lib/utils";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Analytics } from "~/components/analytics";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen p-2">
        {children}
        <Analytics />
        {/* 
        <Help />
        <Toaster position="bottom-right" />
      */}
        <footer className="fixed bottom-1 right-2 text-xs">
          {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 8) ??
            "local-dev"}
        </footer>
        <TailwindIndicator />
      </body>
    </html>
  );
}
