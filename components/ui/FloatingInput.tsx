import * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        placeholder=" "
        className={cn("peer", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
FloatingInput.displayName = "FloatingInput";

interface FloatingLabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const FloatingLabel = React.forwardRef<HTMLLabelElement, FloatingLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <Label
        className={cn(
          "peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FloatingLabel.displayName = "FloatingLabel";

interface FloatingLabelInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(({ id, label, error, className, value = "", onChange, ...props }, ref) => {
  const formatValue = (rawValue: string) => {
    if (rawValue.length > 3) {
      return rawValue.slice(0, 3) + " " + rawValue.slice(3);
    }
    return rawValue;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const limitedValue = rawValue.slice(0, 6);

    if (onChange) {
      onChange(limitedValue);
    }
  };

  return (
    <div className="relative w-full">
      <Input
        ref={ref}
        id={id}
        value={formatValue(value)}
        onChange={handleChange}
        placeholder=" "
        maxLength={7}
        inputMode="numeric"
        type="text"
        className={cn(
          "peer w-full h-14 rounded-lg border pt-4 pr-6 pb-4 pl-3",
          error && "border-red-500 focus-visible:ring-red-500",
          className
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={cn(
          "absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background cursor-text",
          error ? "text-red-500" : "text-gray-500"
        )}
      >
        {label}
      </label>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";

export { FloatingInput, FloatingLabel, FloatingLabelInput };
