// ── Index Repo Queue ────────────────────────────
import type { IndexRepoJobPayload } from '@chorus/shared-types';
import { createQueue } from './client';
import { QueueName } from '@chorus/shared-types';

export const indexRepoQueue = createQueue<IndexRepoJobPayload>(QueueName.INDEX_REPO);
