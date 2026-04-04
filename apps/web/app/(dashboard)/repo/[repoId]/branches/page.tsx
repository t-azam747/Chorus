// ── Branch Context Page ─────────────────────────
export default function BranchesPage({ params }: { params: { repoId: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cross-Branch Context</h1>
      {/* <BranchContextPanel repoId={params.repoId} /> */}
      {/* <BranchTimeline repoId={params.repoId} /> */}
    </div>
  );
}
