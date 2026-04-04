// ── Repo Overview Page ──────────────────────────
export default function RepoOverviewPage({ params }: { params: { repoId: string } }) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Repository Overview</h1>
      <p className="text-gray-500 mb-4">Repo ID: {params.repoId}</p>
      <nav className="flex gap-4 mb-8 border-b pb-4">
        <a href={`/repo/${params.repoId}/diagram`} className="text-blue-600 hover:underline">Architecture</a>
        <a href={`/repo/${params.repoId}/dataflow`} className="text-blue-600 hover:underline">Data Flow</a>
        <a href={`/repo/${params.repoId}/ask`} className="text-blue-600 hover:underline">Ask</a>
        <a href={`/repo/${params.repoId}/branches`} className="text-blue-600 hover:underline">Branches</a>
        <a href={`/repo/${params.repoId}/security`} className="text-blue-600 hover:underline">Security</a>
      </nav>
      <div>{/* Analysis data, health signals, issues list */}</div>
    </div>
  );
}
