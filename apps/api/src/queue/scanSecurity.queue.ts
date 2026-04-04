// ── Scan Security Queue ─────────────────────────
import type { ScanSecurityJobPayload } from '@chorus/shared-types';
import { createQueue } from './client';
import { QueueName } from '@chorus/shared-types';

export const scanSecurityQueue = createQueue<ScanSecurityJobPayload>(QueueName.SCAN_SECURITY);
