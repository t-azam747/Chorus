// ── Repo Mongoose Model ─────────────────────────
import mongoose, { Schema, type Document } from 'mongoose';

export interface IRepo extends Document {
  repoUrl: string;
  owner: string;
  name: string;
  defaultBranch: string;
  description?: string;
  language?: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastAnalyzedAt?: Date;
}

const RepoSchema = new Schema<IRepo>(
  {
    repoUrl: { type: String, required: true, unique: true, index: true },
    owner: { type: String, required: true },
    name: { type: String, required: true },
    defaultBranch: { type: String, default: 'main' },
    description: String,
    language: String,
    stars: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    openIssues: { type: Number, default: 0 },
    lastAnalyzedAt: Date,
  },
  { timestamps: true },
);

export const RepoModel = mongoose.model<IRepo>('Repo', RepoSchema);
