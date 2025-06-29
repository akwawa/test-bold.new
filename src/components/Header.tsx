import React from 'react';
import { Sword, Coins, Gem, Sun, Moon, Clock, ArrowRight } from 'lucide-react';
import { GameSave } from '../types';

interface HeaderProps {
  gameData: GameSave;
  onAdvanceCycle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ gameData, onAdvanceCycle }) => {
  const { cycle } = gameData;
  
  const getPeriodIcon = () => {
    return cycle.period === 'day' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-400" />;
  };

  const getPeriodColor = () => {
    return cycle.period === 'day' ? 'from-yellow-500 to-orange-500' : 'from-blue-600 to-purple-600';
  };

  const getNextPeriodLabel = () => {
    if (cycle.period === 'day') {
      return 'Passer à la nuit';
    } else {
      return `Passer au jour ${cycle.day + 1}`;
    }
  };

  return (
    <header className="bg-gradient-to-r from-fantasy-800 to-fantasy-900 text-white shadow-lg border-b-4 border-fantasy-600">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-fantasy-600 p-2 rounded-lg">
              <Sword className="h-8 w-8 text-fantasy-100" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-fantasy">{gameData.guild.name}</h1>
              <p className="text-fantasy-200 text-sm">
                Dirigée par {gameData.playerLeader.name} • {gameData.playerLeader.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Système de cycles */}
            <div className="flex items-center space-x-4">
              <div className={`bg-gradient-to-r ${getPeriodColor()} px-4 py-2 rounded-lg shadow-lg`}>
                <div className="flex items-center space-x-2">
                  {getPeriodIcon()}
                  <div className="text-center">
                    <div className="text-sm font-medium">
                      {cycle.period === 'day' ? 'Jour' : 'Nuit'}
                    </div>
                    <div className="text-xs opacity-90">
                      Jour {cycle.day}
                    </div>
                  </div>
                </div>
              </div>

              {onAdvanceCycle && (
                <button
                  onClick={onAdvanceCycle}
                  className="bg-fantasy-600 hover:bg-fantasy-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-lg"
                >
                  <Clock className="h-4 w-4" />
                  <span className="hidden sm:inline">{getNextPeriodLabel()}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Ressources */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-fantasy-700/50 px-3 py-2 rounded-lg">
                <Coins className="h-5 w-5 text-yellow-400" />
                <span className="font-semibold">{gameData.guild.gold.toLocaleString()}</span>
                <span className="text-fantasy-200 text-sm">Po</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-fantasy-700/50 px-3 py-2 rounded-lg">
                <Gem className="h-5 w-5 text-blue-400" />
                <span className="font-semibold">{gameData.guild.gems}</span>
                <span className="text-fantasy-200 text-sm">Gemmes</span>
              </div>

              <div className="flex items-center space-x-2 bg-fantasy-700/50 px-3 py-2 rounded-lg">
                <div className="text-2xl">{gameData.playerLeader.portrait}</div>
                <div className="text-right">
                  <div className="text-sm font-medium">{gameData.playerLeader.background}</div>
                  <div className="text-xs text-fantasy-200">Niveau {gameData.guild.level}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;