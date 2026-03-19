export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">💎 SkillVault</h1>
          <a
            href="/marketplace"
            className="text-gray-400 hover:text-white text-sm border border-gray-700 px-3 py-1 rounded"
          >
            Browse Templates →
          </a>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-4">
            Premium agent{' '}
            <span className="text-purple-400">templates</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Battle-tested OpenClaw agent personalities, configs, and skill bundles.
            Buy once, deploy instantly.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/marketplace"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-medium transition-colors"
            >
              Browse Marketplace
            </a>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold">Curated</div>
              <div className="text-gray-500 text-sm mt-1">Every template human-tested</div>
            </div>
            <div>
              <div className="text-2xl font-bold">One-click</div>
              <div className="text-gray-500 text-sm mt-1">Download ZIP, drop into OpenClaw</div>
            </div>
            <div>
              <div className="text-2xl font-bold">80/20 Split</div>
              <div className="text-gray-500 text-sm mt-1">Creators keep 80% of revenue</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
