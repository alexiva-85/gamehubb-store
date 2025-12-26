/**
 * Health check utilities for environment variables.
 * Provides functions to check env var presence without exposing values.
 */

/**
 * Returns a map of environment variable names to their presence status.
 * @param keys Array of environment variable names to check
 * @returns Record mapping each key to { present: boolean }
 */
export function envPresentMap(keys: string[]): Record<string, { present: boolean }> {
  const result: Record<string, { present: boolean }> = {};
  for (const key of keys) {
    result[key] = { present: !!process.env[key] };
  }
  return result;
}

/**
 * Returns an array of environment variable names that are missing (not set).
 * @param keys Array of environment variable names to check
 * @returns Array of missing variable names
 */
export function missing(keys: string[]): string[] {
  return keys.filter((key) => !process.env[key]);
}

