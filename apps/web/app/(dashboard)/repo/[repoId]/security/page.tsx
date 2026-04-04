// ── Security Report Page ────────────────────────
export default function SecurityPage({ params }: { params: { repoId: string } }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Security Report</h1>
      {/* <VulnerabilityList repoId={params.repoId} /> */}
      {/* <LicenseReport repoId={params.repoId} /> */}
    </div>
  );
}
