"use client";
import { ReactNode, useState } from "react";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  name: string;
  description?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type: string;
  value?: string | number;
  Icon?: ReactNode;
  labelClassName?: string;
  onPaste?: (e: React.ClipboardEvent) => void;
  onCopy?: (e: React.ClipboardEvent) => void;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
}

const FormInput = ({
  name,
  description,
  placeholder,
  label,
  className,
  onChange,
  disabled = false,
  required = false,
  type,
  value,
  Icon,
  labelClassName = "",
  onPaste,
  onCopy,
  readOnly = false,
  max,
  min,
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine the actual input type
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <Input
                type={inputType}
                min={
                  type === "date" || type === "datetime-local"
                    ? (min as string)
                    : (min as number)
                }
                max={
                  type === "date" || type === "datetime-local"
                    ? (max as string)
                    : (max as number)
                }
                required={required}
                placeholder={placeholder}
                {...field}
                readOnly={readOnly}
                onChange={(e) => {
                  if (onChange) onChange(e);
                  if (type === "number") {
                    const value =
                      e.target.value === "" ? "" : Number(e.target.value);
                    field.onChange(value);
                  } else {
                    field.onChange(e.target.value);
                  }
                }}
                onPaste={(e) => {
                  if (onPaste) onPaste(e);
                }}
                onCopy={(e) => {
                  if (onCopy) onCopy(e);
                }}
                className={cn(
                  "placeholder:text-[#959595] font-normal placeholder:text-base sm:text-base border border-gray-200 transition-all duration-200 flex items-center disabled:border-gray-300 disabled:bg-gray-100",
                  className
                )}
                style={{
                  width: "339px",
                  height: "56px",
                  top: "151px",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  opacity: 1,
                  gap: "8px",
                  paddingTop: "16px",
                  paddingRight: "24px",
                  paddingBottom: "16px",
                  paddingLeft: "24px",
                }}
                disabled={disabled}
                value={value ?? field.value ?? ""}
              />

              {label && (
                <label
                  htmlFor={name}
                  className={cn(
                    "absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500",
                    labelClassName
                  )}
                >
                  {label}
                  {required && (
                    <span className="text-black text-sm font-medium ml-1">
                      *
                    </span>
                  )}
                </label>
              )}

              {type === "password" ? (
                <div
                  className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer text-base font-normal z-10"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              ) : Icon ? (
                <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  {Icon}
                </div>
              ) : null}
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
