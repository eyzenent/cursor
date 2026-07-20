import { ActivityFeed } from "./components/ActivityFeed";
import { ApiTable } from "./components/ApiTable";
import { Header } from "./components/Header";
import { KpiCards } from "./components/KpiCards";
import { LatencyChart } from "./components/LatencyChart";
import { Sidebar } from "./components/Sidebar";
import { apiEndpoints, kpiMetrics, latencyData } from "./data/mockData";

function App() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="space-y-6 p-8">
          <KpiCards metrics={kpiMetrics} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <LatencyChart data={latencyData} />
            </div>
            <ActivityFeed />
          </div>

          <ApiTable endpoints={apiEndpoints} />
        </main>
      </div>
    </div>
  );
}

export default App;
