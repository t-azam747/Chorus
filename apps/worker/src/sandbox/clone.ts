// ── Repo Clone Sandbox ──────────────────────────
import { execSync } from 'child_process';
import { mkdtempSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const MAX_CLONE_SIZE_MB = 500;
const CLONE_TIMEOUT_MS = 120_000; // 2 minutes

export async function shallowClone(repoUrl: string, branch = 'main'): Promise<string> {
  const tempDir = mkdtempSync(join(tmpdir(), 'chorus-'));

  execSync(
    `git clone --depth 1 --branch ${branch} ${repoUrl} ${tempDir}`,
    { timeout: CLONE_TIMEOUT_MS, stdio: 'pipe' },
  );

  return tempDir;
}

export async function cleanupRepo(repoPath: string): Promise<void> {
  try {
    execSync(`rm -rf ${repoPath}`, { stdio: 'pipe' });
  } catch {
    // Best effort cleanup
  }
}
