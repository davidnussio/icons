import { cn } from "~/lib/utils";

type ButtonProps = JSX.IntrinsicElements["button"] & {};

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-full shadow-xs text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}
