import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "h-11 w-full rounded-lg border border-base-600 bg-base-900 px-3.5 text-sm text-base-100 placeholder:text-base-400 outline-none transition-colors focus:border-alert",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
