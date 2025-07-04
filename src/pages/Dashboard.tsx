
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LinkEditor } from "@/components/dashboard/LinkEditor";
import { ProfileEditor } from "@/components/dashboard/ProfileEditor";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { PlanManager } from "@/components/dashboard/PlanManager";
import { Analytics } from "@/components/dashboard/Analytics";
import { PreviewPane } from "@/components/dashboard/PreviewPane";

export type DashboardView = 'links' | 'profile' | 'themes' | 'analytics' | 'plan';

const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('links');
  const [previewData, setPreviewData] = useState({
    profile: {
      name: "Seu Nome",
      bio: "Sua biografia aqui",
      avatar: ""
    },
    links: [],
    theme: "default"
  });

  const renderActiveView = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileEditor onUpdate={(profile) => setPreviewData(prev => ({ ...prev, profile }))} />;
      case 'themes':
        return <ThemeSelector onThemeChange={(theme) => setPreviewData(prev => ({ ...prev, theme }))} />;
      case 'analytics':
        return <Analytics />;
      case 'plan':
        return <PlanManager />;
      default:
        return <LinkEditor onUpdate={(links) => setPreviewData(prev => ({ ...prev, links }))} />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg flex">
      <DashboardSidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {renderActiveView()}
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-80 border-l border-gray-800 bg-dark-surface/30">
          <PreviewPane data={previewData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
