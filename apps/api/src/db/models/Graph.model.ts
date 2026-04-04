// ── Graph Mongoose Model ────────────────────────
import mongoose, { Schema, type Document } from 'mongoose';

export interface IGraph extends Document {
  repoId: string;
  level: string;
  commitSha: string;
  nodes: unknown[];
  edges: unknown[];
  generatedAt: Date;
}

const GraphSchema = new Schema<IGraph>({
  repoId: { type: String, required: true, index: true },
  level: { type: String, required: true, enum: ['file', 'module', 'service'] },
  commitSha: { type: String, required: true },
  nodes: { type: [Schema.Types.Mixed], default: [] },
  edges: { type: [Schema.Types.Mixed], default: [] },
  generatedAt: { type: Date, default: Date.now },
});

GraphSchema.index({ repoId: 1, level: 1, commitSha: 1 });

export const GraphModel = mongoose.model<IGraph>('Graph', GraphSchema);
