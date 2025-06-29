import React from 'react';
import { type LucideIcon, Lock, Info } from 'lucide-react';

interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  isUnlocked?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  activePanel: string;
  onPanelChange: (panel: string) => void;
  nextUnlockHint?: string | null;
}

const Navigation: React.FC<NavigationProps> = ({ items, activePanel, onPanelChange, nextUnlockHint }) => {
  return (
    <nav className="w-64 bg-gradient-to-b from-stone-800 to-stone-900 text-white shadow-xl">
      <div className="p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPanelChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-fantasy-600 text-white shadow-lg transform scale-105'
                      : 'text-stone-300 hover:bg-stone-700 hover:text-white hover:transform hover:scale-102'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-fantasy-100' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Indication du prochain déverrouillage */}
        {nextUnlockHint && (
          <div className="mt-6 bg-stone-700/50 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-medium text-blue-300 mb-1">Prochain objectif:</div>
                <div className="text-xs text-stone-300 leading-relaxed">{nextUnlockHint}</div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-stone-700/50 rounded-lg p-3 text-center">
          <p className="text-stone-400 text-xs">Version 1.0.0</p>
          <p className="text-stone-500 text-xs mt-1">Bêta</p>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;