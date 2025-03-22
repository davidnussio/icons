import { cn } from "~/lib/utils";

export default function Panel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("my-4 py-6 px-4 border shadow-sm rounded-sm shadow-sm", className)}
      {...props}
    />
  );
}
