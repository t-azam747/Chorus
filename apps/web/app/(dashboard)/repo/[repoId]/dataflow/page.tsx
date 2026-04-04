// ── Data Flow Diagram Page ──────────────────────
export default function DataFlowPage({ params }: { params: { repoId: string } }) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Data Flow Diagram</h1>
      {/* <DataFlowGraph repoId={params.repoId} /> */}
    </div>
  );
}
