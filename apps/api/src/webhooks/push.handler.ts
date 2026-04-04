// ── Push Event Handler ──────────────────────────
import { updateGraphQueue } from '../queue/updateGraph.queue';
import { logger } from '../observability/logger';

export async function handlePush(payload: Record<string, unknown>): Promise<void> {
  const repoUrl = (payload.repository as Record<string, unknown>)?.html_url as string;
  const commitSha = payload.after as string;
  const previousCommitSha = payload.before as string;

  logger.info({ repoUrl, commitSha }, 'Processing push webhook');

  // Extract changed files from commits
  const commits = (payload.commits as Array<Record<string, unknown>>) ?? [];
  const changedFiles = [...new Set(
    commits.flatMap((c) => [
      ...((c.added as string[]) ?? []),
      ...((c.modified as string[]) ?? []),
    ]),
  )];

  // Enqueue graph update
  await updateGraphQueue.add('update-graph', {
    repoId: repoUrl, // In production: resolve to actual repoId
    commitSha,
    changedFiles,
    previousCommitSha,
  });
}
