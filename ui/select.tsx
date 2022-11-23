import { cn } from "~/lib/utils";

type SelectProps = JSX.IntrinsicElements["select"] & {
  label?: React.ReactNode;
};
export default function Select({ label, className, ...props }: SelectProps) {
  return (
    <div>
      <label
        htmlFor="location"
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        className={cn(
          "mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
          className
        )}
        {...props}
      />
    </div>
  );
}
