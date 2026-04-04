// ── Repo Search Page ────────────────────────────
export default function RepoSearchPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Analyze a Repository</h1>
      <form className="max-w-xl">
        <input type="url" placeholder="https://github.com/owner/repo" className="w-full p-3 border rounded-lg mb-4" />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Analyze
        </button>
      </form>
    </div>
  );
}
