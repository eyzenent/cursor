import type { ReactNode } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  CreditCard,
  LayoutDashboard,
  Settings,
  Users,
  Zap,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: number;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
    active: true,
  },
  {
    id: "analytics",
    label: "Analitik",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    id: "endpoints",
    label: "API Endpoints",
    icon: <Zap className="h-5 w-5" />,
    badge: 24,
  },
  {
    id: "activity",
    label: "Aktivite",
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: "users",
    label: "Kullanıcılar",
    icon: <Users className="h-5 w-5" />,
  },
  {
    id: "billing",
    label: "Faturalama",
    icon: <CreditCard className="h-5 w-5" />,
  },
];

const bottomNavItems: NavItem[] = [
  {
    id: "notifications",
    label: "Bildirimler",
    icon: <Bell className="h-5 w-5" />,
    badge: 2,
  },
  {
    id: "settings",
    label: "Ayarlar",
    icon: <Settings className="h-5 w-5" />,
  },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-zinc-800/60 bg-surface-raised/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 border-b border-zinc-800/60 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20">
          <Zap className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Nexus</p>
          <p className="text-xs text-zinc-500">API Monitor</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-zinc-600">
          Menü
        </p>
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              item.active
                ? "bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/5"
                : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
            }`}
          >
            <span
              className={
                item.active
                  ? "text-emerald-400"
                  : "text-zinc-500 group-hover:text-zinc-300"
              }
            >
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge !== undefined && (
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="space-y-1 border-t border-zinc-800/60 px-3 py-4">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-all duration-200 hover:bg-zinc-800/50 hover:text-zinc-200"
          >
            <span className="text-zinc-500 group-hover:text-zinc-300">
              {item.icon}
            </span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge !== undefined && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-xs font-semibold text-red-400">
                {item.badge}
              </span>
            )}
          </button>
        ))}

        <div className="mt-3 flex items-center gap-3 rounded-xl bg-zinc-800/30 p-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-semibold text-white">
            RR
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-zinc-200">
              Rahim Rahimli
            </p>
            <p className="truncate text-xs text-zinc-500">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
