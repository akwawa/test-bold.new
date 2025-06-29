import React from 'react';
import { Users, Coins, Star, Sword, Brain, Activity, Heart, RefreshCw, UserPlus } from 'lucide-react';
import { GameSave, RecruitableCharacter } from '../types';
import { generateRecruitPool } from '../data/recruitableCharacters';

interface RecruitmentPanelProps {
  gameData: GameSave;
  onRecruit: (character: RecruitableCharacter) => void;
  onRefreshRecruits: () => void;
}

const RecruitmentPanel: React.FC<RecruitmentPanelProps> = ({ gameData, onRecruit, onRefreshRecruits }) => {
  const getClassColor = (characterClass: string): string => {
    switch (characterClass) {
      case 'Guerrière':
      case 'Guerrier':
        return 'text-red-600 bg-red-100';
      case 'Mage':
      case 'Magicienne':
        return 'text-blue-600 bg-blue-100';
      case 'Rôdeur':
      case 'Rôdeuse':
        return 'text-green-600 bg-green-100';
      case 'Paladin':
      case 'Paladine':
        return 'text-yellow-600 bg-yellow-100';
      case 'Druide':
      case 'Druidesse':
        return 'text-emerald-600 bg-emerald-100';
      case 'Roublard':
      case 'Roublarde':
        return 'text-purple-600 bg-purple-100';
      case 'Clerc':
        return 'text-pink-600 bg-pink-100';
      case 'Barbare':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-stone-600 bg-stone-100';
    }
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'text-stone-600 bg-stone-100 border-stone-300';
      case 'rare': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'epic': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const getRarityLabel = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'Commun';
      case 'rare': return 'Rare';
      case 'epic': return 'Épique';
      case 'legendary': return 'Légendaire';
      default: return 'Commun';
    }
  };

  const getAdjustedCost = (baseCost: number): number => {
    let multiplier = 1;
    
    gameData.playerLeader.bonuses.forEach(bonus => {
      if (bonus.type === 'recruitment') {
        multiplier -= bonus.value / 100;
      }
    });

    gameData.playerLeader.maluses.forEach(malus => {
      if (malus.type === 'recruitment') {
        multiplier += Math.abs(malus.value) / 100;
      }
    });

    return Math.round(baseCost * multiplier);
  };

  const canAfford = (cost: number): boolean => {
    return gameData.guild.gold >= cost;
  };

  const canRecruit = (): boolean => {
    return gameData.guild.currentMembers < gameData.guild.maxMembers;
  };

  const timeSinceLastRefresh = gameData.lastRecruitRefresh 
    ? Math.floor((Date.now() - gameData.lastRecruitRefresh.getTime()) / (1000 * 60 * 60))
    : 24;

  const canRefresh = timeSinceLastRefresh >= 24;
  const refreshCost = 50;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Taverne - Recrutement</h2>
          <p className="text-stone-600 mt-2">Recrutez de nouveaux aventuriers pour votre compagnie</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm text-stone-500">Membres actuels</div>
            <div className="text-xl font-bold text-stone-800">
              {gameData.guild.currentMembers}/{gameData.guild.maxMembers}
            </div>
          </div>
          
          <button
            onClick={onRefreshRecruits}
            disabled={!canRefresh && gameData.guild.gold < refreshCost}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              canRefresh
                ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
                : gameData.guild.gold >= refreshCost
                ? 'bg-yellow-600 hover:bg-yellow-700 text-white'
                : 'bg-stone-300 text-stone-500 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="h-4 w-4" />
            <span>
              {canRefresh ? 'Actualiser (Gratuit)' : `Actualiser (${refreshCost} po)`}
            </span>
          </button>
        </div>
      </div>

      {!canRefresh && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="text-blue-600">ℹ️</div>
            <div>
              <div className="font-medium text-blue-800">Actualisation automatique</div>
              <div className="text-blue-700 text-sm">
                Nouveaux aventuriers disponibles dans {24 - timeSinceLastRefresh} heures, 
                ou payez {refreshCost} po pour actualiser maintenant.
              </div>
            </div>
          </div>
        </div>
      )}

      {!canRecruit() && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">Capacité maximale atteinte</div>
              <div className="text-orange-700 text-sm">
                Améliorez votre taverne pour recruter plus d'aventuriers.
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameData.availableRecruits.map((recruit, index) => {
          const adjustedCost = getAdjustedCost(recruit.recruitmentCost);
          const affordable = canAfford(adjustedCost);
          const recruitmentPossible = canRecruit() && affordable;

          return (
            <div key={index} className={`bg-white rounded-xl shadow-lg border-2 ${getRarityColor(recruit.rarity)} overflow-hidden hover:shadow-xl transition-all`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{recruit.avatar}</div>
                    <div>
                      <h3 className="font-bold text-stone-800">{recruit.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassColor(recruit.class)}`}>
                          {recruit.class}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs font-medium text-stone-600">Niv. {recruit.level}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRarityColor(recruit.rarity)}`}>
                      {getRarityLabel(recruit.rarity)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="text-center bg-stone-50 rounded-lg p-2">
                    <Sword className="h-4 w-4 mx-auto mb-1 text-red-500" />
                    <div className="text-xs text-stone-500">Force</div>
                    <div className="font-semibold text-red-600">{recruit.stats.strength}</div>
                  </div>
                  <div className="text-center bg-stone-50 rounded-lg p-2">
                    <Activity className="h-4 w-4 mx-auto mb-1 text-green-500" />
                    <div className="text-xs text-stone-500">Agilité</div>
                    <div className="font-semibold text-green-600">{recruit.stats.agility}</div>
                  </div>
                  <div className="text-center bg-stone-50 rounded-lg p-2">
                    <Brain className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                    <div className="text-xs text-stone-500">Intelligence</div>
                    <div className="font-semibold text-blue-600">{recruit.stats.intelligence}</div>
                  </div>
                  <div className="text-center bg-stone-50 rounded-lg p-2">
                    <Heart className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                    <div className="text-xs text-stone-500">Vitalité</div>
                    <div className="font-semibold text-purple-600">{recruit.stats.vitality}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-stone-600 text-sm leading-relaxed">{recruit.biography}</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-stone-700">
                      {adjustedCost !== recruit.recruitmentCost && (
                        <span className="line-through text-stone-400 mr-1">{recruit.recruitmentCost}</span>
                      )}
                      {adjustedCost} po
                    </span>
                  </div>
                  <div className="text-xs text-stone-500">
                    {recruit.experience} XP
                  </div>
                </div>

                <button
                  onClick={() => onRecruit(recruit)}
                  disabled={!recruitmentPossible}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                    recruitmentPossible
                      ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  <UserPlus className="h-4 w-4" />
                  <span>
                    {!canRecruit() ? 'Capacité max' : 
                     !affordable ? 'Pas assez d\'or' : 'Recruter'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {gameData.availableRecruits.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-stone-200 text-center">
          <Users className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-stone-800 mb-2">Aucun aventurier disponible</h3>
          <p className="text-stone-600 mb-6">
            La taverne est vide pour le moment. Revenez plus tard ou actualisez la liste.
          </p>
          <button
            onClick={onRefreshRecruits}
            className="bg-fantasy-600 hover:bg-fantasy-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Chercher des aventuriers
          </button>
        </div>
      )}

      {/* Bonus du dirigeant pour le recrutement */}
      {(gameData.playerLeader.bonuses.some(b => b.type === 'recruitment') || 
        gameData.playerLeader.maluses.some(m => m.type === 'recruitment')) && (
        <div className="mt-6 bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-4 border border-fantasy-200">
          <h4 className="font-bold text-fantasy-800 mb-2">Bonus/Malus de Recrutement</h4>
          <div className="text-sm text-fantasy-700">
            {gameData.playerLeader.bonuses
              .filter(b => b.type === 'recruitment')
              .map((bonus, index) => (
                <div key={index}>• {bonus.description}</div>
              ))}
            {gameData.playerLeader.maluses
              .filter(m => m.type === 'recruitment')
              .map((malus, index) => (
                <div key={index}>• {malus.description}</div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruitmentPanel;