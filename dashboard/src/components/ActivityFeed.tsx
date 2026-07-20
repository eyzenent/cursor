import { AlertTriangle, CheckCircle2, Clock, RefreshCw } from "lucide-react";

interface ActivityItem {
  id: string;
  type: "success" | "warning" | "error" | "info";
  message: string;
  time: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "error",
    message: "Notification Hub yanıt vermiyor",
    time: "45 sn önce",
  },
  {
    id: "2",
    type: "warning",
    message: "User Profiles gecikmesi 400ms üzerinde",
    time: "2 dk önce",
  },
  {
    id: "3",
    type: "success",
    message: "Auth Service health check başarılı",
    time: "5 dk önce",
  },
  {
    id: "4",
    type: "info",
    message: "Yeni endpoint eklendi: Search Index",
    time: "1 saat önce",
  },
  {
    id: "5",
    type: "success",
    message: "Payment Gateway uptime %99.95",
    time: "2 saat önce",
  },
];

const typeConfig = {
  success: { icon: CheckCircle2, color: "text-emerald-400 bg-emerald-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-400 bg-amber-500/10" },
  error: { icon: AlertTriangle, color: "text-red-400 bg-red-500/10" },
  info: { icon: RefreshCw, color: "text-blue-400 bg-blue-500/10" },
};

export function ActivityFeed() {
  return (
    <div className="rounded-2xl border border-zinc-800/60 bg-surface-raised/60 p-6 backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Son Aktiviteler</h2>
          <p className="text-sm text-zinc-500">Gerçek zamanlı olaylar</p>
        </div>
        <Clock className="h-5 w-5 text-zinc-600" />
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const config = typeConfig[activity.type];
          const Icon = config.icon;

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.color}`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-zinc-300">{activity.message}</p>
                <p className="mt-0.5 text-xs text-zinc-600">{activity.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
