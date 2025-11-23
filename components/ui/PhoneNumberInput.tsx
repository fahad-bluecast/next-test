"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
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

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
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
});
FloatingLabel.displayName = "FloatingLabel";

const countries = [
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "China", code: "+86", flag: "🇨🇳" },
  { name: "Brazil", code: "+55", flag: "🇧🇷" },
];

interface PhoneInputWithCountryProps {
  onCountryChange?: (country: (typeof countries)[0]) => void;
  onPhoneChange?: (phone: string) => void;
  label?: string;
  value?: string;
  onChange?: (fullPhoneNumber: string) => void;
  className?: string;
  error?: string;
}

export const PhoneInputWithCountry = React.forwardRef<
  HTMLInputElement,
  PhoneInputWithCountryProps
>(
  (
    {
      onCountryChange,
      onPhoneChange,
      label = "Phone number",
      value = "",
      onChange,
      className,
      error,
    },
    ref
  ) => {
    const [selectedCountry, setSelectedCountry] = React.useState(countries[0]);
    const [phoneNumber, setPhoneNumber] = React.useState("");

    React.useEffect(() => {
      // Extract phone number without country code from value
      if (value) {
        const matchedCountry = countries.find((c) => value.startsWith(c.code));
        if (matchedCountry) {
          setPhoneNumber(value.slice(matchedCountry.code.length));
          setSelectedCountry(matchedCountry);
        } else {
          setPhoneNumber(value);
        }
      } else {
        setPhoneNumber("");
      }
    }, [value]);

    const handleCountryChange = (code: string) => {
      const country = countries.find((c) => c.code === code && c.name === code);
      const newCountry =
        countries.find((c) => `${c.flag}${c.code}` === code) || countries[0];
      setSelectedCountry(newCountry);
      onCountryChange?.(newCountry);

      // Update full phone number with new country code
      const fullNumber = `${newCountry.code}${phoneNumber}`;
      onChange?.(fullNumber);
    };

    const handlePhoneNumberChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const inputValue = e.target.value;
      // Only allow numbers
      const numbersOnly = inputValue.replace(/\D/g, "");

      setPhoneNumber(numbersOnly);
      onPhoneChange?.(numbersOnly);

      // Update full phone number with country code
      const fullNumber = `${selectedCountry.code}${numbersOnly}`;
      onChange?.(fullNumber);
    };

    return (
      <div className={cn("relative w-[339px]", className)}>
        <div className="relative flex items-center h-14 gap-2">
          <Select
            defaultValue={`${selectedCountry.flag}${selectedCountry.code}`}
            onValueChange={handleCountryChange}
          >
            <SelectTrigger className="absolute left-3 top-1/2 w-[70px] -translate-y-1/2 border-none bg-transparent p-0 shadow-none focus:ring-0 z-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem
                  key={country.code + country.name}
                  value={`${country.flag}${country.code}`}
                >
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FloatingInput
            ref={ref}
            id="phone-number"
            type="tel"
            placeholder=" "
            className={cn(
              "h-14 rounded-lg border opacity-100 pl-[90px] pr-6",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
            style={{
              paddingTop: "16px",
              paddingRight: "24px",
              paddingBottom: "16px",
            }}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            aria-invalid={!!error}
            aria-describedby={error ? "phone-error" : undefined}
          />
        </div>

        <FloatingLabel htmlFor="phone-number">{label}</FloatingLabel>

        {error && (
          <p id="phone-error" className="mt-1.5 text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PhoneInputWithCountry.displayName = "PhoneInputWithCountry";
