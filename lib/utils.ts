import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createRows(list: any[], columns: number) {
    const rows = Math.floor(list.length / columns); // [A]
    let lastRowElements = list.length - rows * columns; // [B]
    while (lastRowElements !== columns) { // [C]
        list.push(0);
        lastRowElements += 1; // [E]
    }
    return list; // [F]
}
