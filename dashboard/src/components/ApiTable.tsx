import { ExternalLink, MoreHorizontal } from "lucide-react";
import type { ApiEndpoint } from "../data/mockData";

const statusConfig = {
  healthy: {
    label: "Çalışıyor",
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  degraded: {
    label: "Yavaş",
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  down: {
    label: "Çalışmıyor",
    dot: "bg-red-400",
    badge: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

interface ApiTableProps {
  endpoints: ApiEndpoint[];
}

export function ApiTable({ endpoints }: ApiTableProps) {
  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-surface-raised/60 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-zinc-800/60 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-white">API Endpoints</h2>
          <p className="text-sm text-zinc-500">
            Tüm izlenen endpoint&apos;lerin durumu
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:border-zinc-700 hover:text-zinc-200"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800/60 text-left text-xs font-medium uppercase tracking-wider text-zinc-500">
              <th className="px-6 py-3">API Adı</th>
              <th className="px-6 py-3">URL</th>
              <th className="px-6 py-3">Durum</th>
              <th className="px-6 py-3">Gecikme</th>
              <th className="px-6 py-3">Uptime</th>
              <th className="px-6 py-3">Son Kontrol</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/40">
            {endpoints.map((endpoint) => {
              const status = statusConfig[endpoint.status];
              return (
                <tr
                  key={endpoint.id}
                  className="group transition-colors hover:bg-zinc-800/20"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${status.dot} ${
                          endpoint.status === "healthy"
                            ? "animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                            : ""
                        }`}
                      />
                      <span className="text-sm font-medium text-zinc-200">
                        {endpoint.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-500">
                      <span className="font-mono">{endpoint.url}</span>
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.badge}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {endpoint.status === "down" ? (
                      <span className="text-red-400">—</span>
                    ) : (
                      <span
                        className={
                          endpoint.latency > 300
                            ? "text-amber-400"
                            : "text-zinc-300"
                        }
                      >
                        {endpoint.latency}ms
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-300">
                    {endpoint.uptime}%
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {endpoint.lastChecked}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      type="button"
                      className="rounded-lg p-1.5 text-zinc-600 opacity-0 transition-all hover:bg-zinc-800 hover:text-zinc-300 group-hover:opacity-100"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
