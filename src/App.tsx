import React, { useState } from 'react';
import { Sword, Users, Package, Map, Settings, Crown, Home } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TeamsPanel from './components/TeamsPanel';
import QuestsPanel from './components/QuestsPanel';
import InventoryPanel from './components/InventoryPanel';
import OverviewPanel from './components/OverviewPanel';
import GuildPanel from './components/GuildPanel';

type ActivePanel = 'overview' | 'guild' | 'teams' | 'quests' | 'inventory' | 'settings';

function App() {
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');

  const navigationItems = [
    { id: 'overview' as const, label: 'Vue d\'ensemble', icon: Crown },
    { id: 'guild' as const, label: 'Guilde', icon: Home },
    { id: 'teams' as const, label: 'Équipes', icon: Users },
    { id: 'quests' as const, label: 'Quêtes', icon: Map },
    { id: 'inventory' as const, label: 'Inventaire', icon: Package },
    { id: 'settings' as const, label: 'Paramètres', icon: Settings },
  ];

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'overview':
        return <OverviewPanel />;
      case 'guild':
        return <GuildPanel />;
      case 'teams':
        return <TeamsPanel />;
      case 'quests':
        return <QuestsPanel />;
      case 'inventory':
        return <InventoryPanel />;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold text-stone-800">Paramètres</h2><p className="text-stone-600 mt-2">Fonctionnalité à venir...</p></div>;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fantasy-50 to-fantasy-100 bg-parchment">
      <div className="flex flex-col h-screen">
        <Header />
        
        <div className="flex flex-1 overflow-hidden">
          <Navigation 
            items={navigationItems}
            activePanel={activePanel}
            onPanelChange={setActivePanel}
          />
          
          <main className="flex-1 overflow-y-auto bg-white/80 backdrop-blur-sm border-l border-fantasy-200">
            {renderActivePanel()}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;