export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: "api" | "uptime" | "latency" | "alerts";
}

export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  status: "healthy" | "degraded" | "down";
  latency: number;
  uptime: number;
  lastChecked: string;
}

export interface ChartPoint {
  time: string;
  latency: number;
  requests: number;
}

export const kpiMetrics: KpiMetric[] = [
  {
    id: "total-apis",
    label: "Toplam API",
    value: "24",
    change: "+3 bu ay",
    trend: "up",
    icon: "api",
  },
  {
    id: "uptime",
    label: "Uptime",
    value: "99.97%",
    change: "+0.02%",
    trend: "up",
    icon: "uptime",
  },
  {
    id: "latency",
    label: "Ort. Gecikme",
    value: "142ms",
    change: "-18ms",
    trend: "up",
    icon: "latency",
  },
  {
    id: "alerts",
    label: "Aktif Uyarılar",
    value: "2",
    change: "-5 dünden",
    trend: "up",
    icon: "alerts",
  },
];

export const apiEndpoints: ApiEndpoint[] = [
  {
    id: "1",
    name: "Auth Service",
    url: "api.nexus.io/v1/auth",
    status: "healthy",
    latency: 89,
    uptime: 99.99,
    lastChecked: "2 dk önce",
  },
  {
    id: "2",
    name: "Payment Gateway",
    url: "api.nexus.io/v1/payments",
    status: "healthy",
    latency: 156,
    uptime: 99.95,
    lastChecked: "1 dk önce",
  },
  {
    id: "3",
    name: "User Profiles",
    url: "api.nexus.io/v1/users",
    status: "degraded",
    latency: 412,
    uptime: 98.2,
    lastChecked: "30 sn önce",
  },
  {
    id: "4",
    name: "Analytics Engine",
    url: "api.nexus.io/v1/analytics",
    status: "healthy",
    latency: 203,
    uptime: 99.8,
    lastChecked: "3 dk önce",
  },
  {
    id: "5",
    name: "Notification Hub",
    url: "api.nexus.io/v1/notifications",
    status: "down",
    latency: 0,
    uptime: 94.1,
    lastChecked: "45 sn önce",
  },
  {
    id: "6",
    name: "Search Index",
    url: "api.nexus.io/v1/search",
    status: "healthy",
    latency: 67,
    uptime: 99.99,
    lastChecked: "1 dk önce",
  },
];

export const latencyData: ChartPoint[] = [
  { time: "00:00", latency: 120, requests: 1240 },
  { time: "04:00", latency: 98, requests: 890 },
  { time: "08:00", latency: 145, requests: 2100 },
  { time: "10:00", latency: 178, requests: 2890 },
  { time: "12:00", latency: 210, requests: 3200 },
  { time: "14:00", latency: 165, requests: 2750 },
  { time: "16:00", latency: 142, requests: 2400 },
  { time: "18:00", latency: 130, requests: 1980 },
  { time: "20:00", latency: 115, requests: 1560 },
  { time: "22:00", latency: 105, requests: 1120 },
  { time: "Şimdi", latency: 142, requests: 980 },
];
