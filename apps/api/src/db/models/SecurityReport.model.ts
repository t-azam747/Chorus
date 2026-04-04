// ── SecurityReport Mongoose Model ────────────────
import mongoose, { Schema, type Document } from 'mongoose';

export interface ISecurityReport extends Document {
  repoId: string;
  vulnerabilities: unknown[];
  secretFindings: unknown[];
  licenseInfo: unknown[];
  overallRiskScore: number;
  generatedAt: Date;
}

const SecurityReportSchema = new Schema<ISecurityReport>({
  repoId: { type: String, required: true, index: true },
  vulnerabilities: { type: [Schema.Types.Mixed], default: [] },
  secretFindings: { type: [Schema.Types.Mixed], default: [] },
  licenseInfo: { type: [Schema.Types.Mixed], default: [] },
  overallRiskScore: { type: Number, default: 0 },
  generatedAt: { type: Date, default: Date.now, index: true },
});

SecurityReportSchema.index({ repoId: 1, generatedAt: -1 });

export const SecurityReportModel = mongoose.model<ISecurityReport>('SecurityReport', SecurityReportSchema);
