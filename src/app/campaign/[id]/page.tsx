import Sidebar from "@/components/custom/Sidebar";
import Campaign from "@/components/custom/Campaign";

export default function CampaignPage() {
  return (
    <div className="flex">
      <Sidebar page="campaign">
        <Campaign />
      </Sidebar>
    </div>
  );
}
