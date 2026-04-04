// ── Chunk Mongoose Model ────────────────────────
import mongoose, { Schema, type Document } from 'mongoose';

export interface IChunk extends Document {
  repoId: string;
  filePath: string;
  startLine: number;
  endLine: number;
  content: string;
  language: string;
  chunkType: string;
  symbolName?: string;
  embedding?: number[];
  metadata: {
    imports: string[];
    exports: string[];
    dependencies: string[];
    complexity: number;
    tokenCount: number;
  };
}

const ChunkSchema = new Schema<IChunk>(
  {
    repoId: { type: String, required: true, index: true },
    filePath: { type: String, required: true, index: true },
    startLine: { type: Number, required: true },
    endLine: { type: Number, required: true },
    content: { type: String, required: true },
    language: { type: String, required: true },
    chunkType: { type: String, required: true },
    symbolName: String,
    embedding: { type: [Number], select: false },
    metadata: {
      imports: [String],
      exports: [String],
      dependencies: [String],
      complexity: Number,
      tokenCount: Number,
    },
  },
  { timestamps: true },
);

ChunkSchema.index({ repoId: 1, filePath: 1 });

export const ChunkModel = mongoose.model<IChunk>('Chunk', ChunkSchema);
