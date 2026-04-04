// ── Architecture Diagram Page ───────────────────
export default function DiagramPage({ params }: { params: { repoId: string } }) {
  return (
    <div className="h-[calc(100vh-4rem)]">
      <h1 className="text-2xl font-bold mb-4">Architecture Diagram</h1>
      {/* <ArchitectureGraph repoId={params.repoId} /> */}
    </div>
  );
}
