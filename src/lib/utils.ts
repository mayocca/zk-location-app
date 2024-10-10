import type { ClassValue } from "class-variance-authority/types";
import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

/**
 * Converts a Uint8Array to a hexadecimal string.
 * @param uint8Array - The Uint8Array to convert.
 * @returns The hexadecimal string representation of the Uint8Array.
 */
export function uint8ArrayToHex(uint8Array: Uint8Array): string {
  return Array.from(uint8Array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Converts a hexadecimal string to a Uint8Array.
 * @param hexString - The hexadecimal string to convert.
 * @returns The Uint8Array representation of the hexadecimal string.
 * @throws {Error} If the input string is not a valid hexadecimal string.
 */
export function hexToUint8Array(hexString: string): Uint8Array {
  // Remove any non-hexadecimal characters and ensure the string has an even length
  const cleanHexString = hexString.replace(/[^0-9A-Fa-f]/g, "");
  if (cleanHexString.length % 2 !== 0) {
    throw new Error("Invalid hex string: length must be even");
  }

  const bytes = new Uint8Array(cleanHexString.length / 2);

  for (let i = 0; i < cleanHexString.length; i += 2) {
    const byte = parseInt(cleanHexString.substr(i, 2), 16);
    if (isNaN(byte)) {
      throw new Error(`Invalid hex string: contains non-hex characters`);
    }
    bytes[i / 2] = byte;
  }

  return bytes;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
