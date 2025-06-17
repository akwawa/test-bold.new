import React from 'react';
import { Clock, Star, Coins, Zap } from 'lucide-react';
import { Building } from '../types';

interface BuildingCardProps {
  building: Building;
  onUpgrade: (buildingId: number) => void;
}

const BuildingCard: React.FC<BuildingCardProps> = ({ building, onUpgrade }) => {
  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins}min`;
  };

  const getUpgradeProgress = (): number => {
    if (!building.isUpgrading || !building.upgradeStartTime) return 0;
    
    const elapsed = Date.now() - building.upgradeStartTime.getTime();
    const totalTime = building.upgradeTime * 60 * 1000; // Convert to milliseconds
    return Math.min((elapsed / totalTime) * 100, 100);
  };

  const getRemainingUpgradeTime = (): number => {
    if (!building.isUpgrading || !building.upgradeStartTime) return 0;
    
    const elapsed = Date.now() - building.upgradeStartTime.getTime();
    const totalTime = building.upgradeTime * 60 * 1000;
    const remaining = Math.max(totalTime - elapsed, 0);
    return Math.ceil(remaining / (60 * 1000)); // Convert to minutes
  };

  const getBuildingTypeColor = (type: string): string => {
    switch (type) {
      case 'tavern': return 'from-amber-500 to-amber-600';
      case 'quest_board': return 'from-blue-500 to-blue-600';
      case 'armory': return 'from-red-500 to-red-600';
      case 'library': return 'from-purple-500 to-purple-600';
      case 'training_ground': return 'from-green-500 to-green-600';
      case 'infirmary': return 'from-pink-500 to-pink-600';
      default: return 'from-stone-500 to-stone-600';
    }
  };

  const isMaxLevel = building.level >= building.maxLevel;
  const progress = getUpgradeProgress();
  const remainingTime = getRemainingUpgradeTime();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-all">
      <div className={`bg-gradient-to-r ${getBuildingTypeColor(building.type)} p-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{building.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{building.name}</h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: building.maxLevel }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < building.level ? 'text-yellow-300 fill-current' : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm opacity-90">Niveau {building.level}</span>
              </div>
            </div>
          </div>
          {building.isUpgrading && (
            <div className="text-right">
              <div className="text-xs opacity-90">Amélioration</div>
              <div className="font-semibold">{formatTime(remainingTime)}</div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-stone-600 text-sm mb-4 leading-relaxed">{building.description}</p>

        {building.isUpgrading && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
              <span>Progression de l'amélioration</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2">
              <div
                className="bg-fantasy-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mb-4">
          <h4 className="font-semibold text-stone-800 mb-2 text-sm">Avantages actuels:</h4>
          <ul className="space-y-1">
            {building.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center space-x-2 text-xs text-stone-600">
                <Zap className="h-3 w-3 text-fantasy-500 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between">
          {!isMaxLevel ? (
            <div className="flex items-center space-x-2 text-sm text-stone-600">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span>{building.upgradeCost} or</span>
              <Clock className="h-4 w-4 text-stone-500" />
              <span>{formatTime(building.upgradeTime)}</span>
            </div>
          ) : (
            <span className="text-sm font-medium text-green-600">Niveau maximum</span>
          )}
          
          <button
            onClick={() => onUpgrade(building.id)}
            disabled={building.isUpgrading || isMaxLevel}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              building.isUpgrading || isMaxLevel
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
            }`}
          >
            {building.isUpgrading ? 'En cours...' : isMaxLevel ? 'Max' : 'Améliorer'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuildingCard;