// ── Temp Directory Cleanup ──────────────────────
import { readdirSync, statSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const MAX_AGE_MS = 60 * 60 * 1000; // 1 hour

export function cleanupStaleDirectories(): number {
  const tmp = tmpdir();
  const now = Date.now();
  let cleaned = 0;

  try {
    const entries = readdirSync(tmp).filter((e) => e.startsWith('chorus-'));
    for (const entry of entries) {
      const fullPath = join(tmp, entry);
      const stat = statSync(fullPath);
      if (now - stat.mtimeMs > MAX_AGE_MS) {
        rmSync(fullPath, { recursive: true, force: true });
        cleaned++;
      }
    }
  } catch {
    // Best effort
  }

  return cleaned;
}
