// ── User Mongoose Model ─────────────────────────
import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  githubId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  email?: string;
  skillProfile?: {
    userId: string;
    skillVector: { dimensions: Record<string, number>; magnitude: number };
    experienceLevel: string;
    topLanguages: Array<{ language: string; proficiency: number }>;
    topFrameworks: Array<{ framework: string; proficiency: number }>;
    contributionStats: {
      totalCommits: number;
      totalPRs: number;
      totalReviews: number;
      repositories: number;
    };
    generatedAt: Date;
  };
}

const UserSchema = new Schema<IUser>(
  {
    githubId: { type: String, required: true, unique: true, index: true },
    username: { type: String, required: true },
    displayName: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    email: String,
    skillProfile: Schema.Types.Mixed,
  },
  { timestamps: true },
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
