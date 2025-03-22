import { cn } from "~/lib/utils";

type InputProps = JSX.IntrinsicElements["input"] & {
  label?: React.ReactNode;
  fullWidth?: boolean;
};

export default function Input({
  fullWidth = false,
  label,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn(fullWidth && "w-full")}>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <input
          className={cn(
            "block w-full rounded-md border-gray-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
}
