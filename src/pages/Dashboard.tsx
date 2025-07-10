
import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { LinkEditor } from "@/components/dashboard/LinkEditor";
import { ProfileEditor } from "@/components/dashboard/ProfileEditor";
import { ThemeSelector } from "@/components/dashboard/ThemeSelector";
import { PlanManager } from "@/components/dashboard/PlanManager";
import { Analytics } from "@/components/dashboard/Analytics";
import { PreviewPane } from "@/components/dashboard/PreviewPane";
import { Tutorial } from "@/components/tutorial/Tutorial";
import { useProfile } from "@/hooks/useProfile";
import { useLinks } from "@/hooks/useLinks";

export type DashboardView = 'links' | 'profile' | 'themes' | 'analytics' | 'plan' | 'tutorial';

const Dashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>('links');
  const [showTutorial, setShowTutorial] = useState(false);
  const { profile, checkFirstLogin, markTutorialSeen } = useProfile();
  const { links } = useLinks();
  
  const [previewData, setPreviewData] = useState({
    profile: {
      name: "Seu Nome",
      bio: "Sua biografia aqui",
      avatar: ""
    },
    links: [],
    theme: "default"
  });

  // Check if user is seeing the dashboard for the first time
  useEffect(() => {
    if (profile && checkFirstLogin()) {
      setShowTutorial(true);
    }
  }, [profile, checkFirstLogin]);

  // Update preview data when profile loads
  useEffect(() => {
    if (profile) {
      setPreviewData(prev => ({
        ...prev,
        profile: {
          name: profile.name || "Seu Nome",
          bio: profile.bio || "Sua biografia aqui",
          avatar: profile.avatar_url || ""
        },
        theme: profile.theme || "default"
      }));
    }
  }, [profile]);

  // Update preview data when links load
  useEffect(() => {
    if (links) {
      setPreviewData(prev => ({
        ...prev,
        links: links.map(link => ({
          id: parseInt(link.id),
          title: link.title,
          url: link.url,
          active: link.active
        }))
      }));
    }
  }, [links]);

  const handleTutorialClose = () => {
    setShowTutorial(false);
    markTutorialSeen();
  };

  const handleTutorialOpen = () => {
    setShowTutorial(true);
  };

  const handleThemeChange = (theme: string) => {
    setPreviewData(prev => ({ ...prev, theme }));
    // Save theme to profile
    if (profile) {
      // TODO: Update profile theme in database
      console.log('Saving theme:', theme);
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'profile':
        return <ProfileEditor onUpdate={(profile) => setPreviewData(prev => ({ ...prev, profile }))} />;
      case 'themes':
        return <ThemeSelector onThemeChange={handleThemeChange} />;
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
      <DashboardSidebar 
        activeView={activeView} 
        onViewChange={setActiveView}
        onTutorialOpen={handleTutorialOpen}
        profile={profile}
      />
      
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

      {/* Tutorial Modal */}
      <Tutorial open={showTutorial} onClose={handleTutorialClose} />
    </div>
  );
};

export default Dashboard;
