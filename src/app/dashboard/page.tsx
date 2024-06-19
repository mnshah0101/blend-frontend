import Sidebar from "@/components/custom/Sidebar";
import DashboardComp from "@/components/custom/Dashboard";
export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar page="dashboard">
        <DashboardComp />
      </Sidebar>
    </div>
  );
}
