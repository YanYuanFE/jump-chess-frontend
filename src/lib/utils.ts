import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address?: string) => {
  if (!address) return null;
  return `${address?.substring(0, 6)}...${address?.substring(address.length - 4, address.length)}`;
};
