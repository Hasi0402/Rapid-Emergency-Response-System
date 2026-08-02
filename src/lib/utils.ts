import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export const EMERGENCY_LABELS: Record<string, string> = {
  medical: "Medical",
  fire: "Fire",
  accident: "Accident",
  other: "Other",
};
