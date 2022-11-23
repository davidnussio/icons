import { Inter as FontSans } from "@next/font/google";

import "~/styles/globals.css";

import { cn } from "~/lib/utils";
// import { Toaster } from "@/ui/toast";
// import { Help } from "@/components/help";
// import { Analytics } from "@/components/analytics";
// import { TailwindIndicator } from "@/components/tailwind-indicator";

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
      <head />
      <body className="min-h-screen">
        {children}
        {/* <Analytics />
        <Help />
        <Toaster position="bottom-right" />
        <TailwindIndicator /> */}
        <footer className="absolute bottom-1 right-2 text-xs">
          {process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.substring(0, 8) ||
            "local-dev"}
        </footer>
      </body>
    </html>
  );
}
