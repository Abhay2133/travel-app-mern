import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = (url: any) => fetch(`${process.env.NEXT_PUBLIC_BASE_URL||""}${url}`).then((res) => res.json());