// ============================================================
// CramPilot — (app) Group Loading UI
// Auto-shown by Next.js during route transitions
// Shimmer skeleton matching the dashboard card grid
// ============================================================

export default function AppLoading() {
  return (
    <div className="min-h-screen bg-[#111110] p-6 lg:p-8">
      {/* Top stats bar skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
            <div className="h-full w-full shimmer" />
          </div>
        ))}
      </div>

      {/* Main 3-col grid skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_300px] gap-4">
        {/* Left sidebar skeleton */}
        <div className="hidden lg:flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="h-full w-full shimmer" />
            </div>
          ))}
        </div>

        {/* Center content skeleton */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] overflow-hidden"
              style={{ height: i === 0 ? 180 : i === 1 ? 140 : 120 }}
            >
              <div className="h-full w-full shimmer" />
            </div>
          ))}
        </div>

        {/* Right panel skeleton */}
        <div className="hidden lg:flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)] overflow-hidden">
              <div className="h-full w-full shimmer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
