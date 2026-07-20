import { Activity, AlertTriangle, Clock, Server, TrendingDown, TrendingUp } from "lucide-react";
import type { KpiMetric } from "../data/mockData";

const iconMap = {
  api: Server,
  uptime: Activity,
  latency: Clock,
  alerts: AlertTriangle,
};

interface KpiCardsProps {
  metrics: KpiMetric[];
}

export function KpiCards({ metrics }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = iconMap[metric.icon];
        const isPositive =
          (metric.trend === "up" && metric.icon !== "alerts") ||
          (metric.trend === "up" && metric.icon === "alerts");

        return (
          <div
            key={metric.id}
            className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-surface-raised/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700/60 hover:bg-surface-overlay/60"
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-emerald-500/5 transition-transform duration-300 group-hover:scale-150" />

            <div className="relative flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/80 text-emerald-400">
                <Icon className="h-5 w-5" />
              </div>
              <div
                className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                  isPositive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change}
              </div>
            </div>

            <div className="relative mt-4">
              <p className="text-sm text-zinc-500">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                {metric.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
