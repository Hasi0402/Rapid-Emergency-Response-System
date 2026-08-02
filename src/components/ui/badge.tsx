import * as React from "react";
import { cn } from "@/lib/utils";

const toneClasses: Record<string, string> = {
  default: "bg-base-800 text-base-200",
  alert: "bg-alert/15 text-alert-light",
  amber: "bg-signal-amber/15 text-signal-amber",
  teal: "bg-signal-teal/15 text-signal-teal",
};

export function Badge({
  className,
  tone = "default",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: keyof typeof toneClasses }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
