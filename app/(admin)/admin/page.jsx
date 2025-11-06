import { getDashboardData } from "@/actions/admin";
import { Dashboard } from "./_components/dashboard";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Dashboard | Vehiql Admin",
  description: "Admin dashboard for Vehiql car marketplace",
};

export default async function AdminDashboardPage() {
  // Fetch dashboard data
  const dashboardData = await getDashboardData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car marketplace efficiently</p>
        </div>
        <Dashboard initialData={dashboardData} />
      </div>
    </div>
  );
}