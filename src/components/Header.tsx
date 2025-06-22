import React from 'react';
import { Sword, Coins, Gem } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-fantasy-800 to-fantasy-900 text-white shadow-lg border-b-4 border-fantasy-600">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-fantasy-600 p-2 rounded-lg">
              <Sword className="h-8 w-8 text-fantasy-100" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-fantasy">Compagnie de l'Épée et du Bouclier</h1>
              <p className="text-fantasy-200 text-sm">Maîtres des Donjons et Aventuriers</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 bg-fantasy-700/50 px-3 py-2 rounded-lg">
              <Coins className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">1,250</span>
              <span className="text-fantasy-200 text-sm">Po</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-fantasy-700/50 px-3 py-2 rounded-lg">
              <Gem className="h-5 w-5 text-blue-400" />
              <span className="font-semibold">45</span>
              <span className="text-fantasy-200 text-sm">Gemmes</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;