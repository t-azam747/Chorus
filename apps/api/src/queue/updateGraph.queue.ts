// ── Update Graph Queue ──────────────────────────
import type { UpdateGraphJobPayload } from '@chorus/shared-types';
import { createQueue } from './client';
import { QueueName } from '@chorus/shared-types';

export const updateGraphQueue = createQueue<UpdateGraphJobPayload>(QueueName.UPDATE_GRAPH);
