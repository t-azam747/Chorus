// ── Code Q&A Page ───────────────────────────────
export default function AskPage({ params }: { params: { repoId: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ask about this codebase</h1>
      {/* <QueryInput repoId={params.repoId} /> */}
      {/* <AnswerPanel /> */}
    </div>
  );
}
