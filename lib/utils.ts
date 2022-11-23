import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

process.env.NEXT_PUBLIC_APP_URL ||
  (console.error("Missing NEXT_PUBLIC_APP_URL"), process.exit(1));

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
