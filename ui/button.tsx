import { cn } from "~/lib/utils";

type ButtonProps = JSX.IntrinsicElements["button"] & {};

export default function Button({ className, ...props }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        className
      )}
      {...props}
    />
  );
}
