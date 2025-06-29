import React, { useState } from 'react';
import { Crown, Sword, BookOpen, Coins, MapPin, Sparkles, ArrowRight, Info } from 'lucide-react';
import { PlayerLeader } from '../types';
import { playerLeaders } from '../data/playerLeaders';

interface CharacterSelectionProps {
  onSelectCharacter: (leaderId: string) => void;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({ onSelectCharacter }) => {
  const [selectedLeader, setSelectedLeader] = useState<PlayerLeader | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const getBackgroundColor = (background: string): string => {
    switch (background) {
      case 'Noble': return 'from-purple-600 to-purple-700';
      case 'Militaire': return 'from-red-600 to-red-700';
      case 'Érudit': return 'from-blue-600 to-blue-700';
      case 'Commerçant': return 'from-yellow-600 to-yellow-700';
      case 'Explorateur': return 'from-green-600 to-green-700';
      case 'Religieux': return 'from-pink-600 to-pink-700';
      default: return 'from-stone-600 to-stone-700';
    }
  };

  const getBackgroundIcon = (background: string) => {
    switch (background) {
      case 'Noble': return <Crown className="h-6 w-6" />;
      case 'Militaire': return <Sword className="h-6 w-6" />;
      case 'Érudit': return <BookOpen className="h-6 w-6" />;
      case 'Commerçant': return <Coins className="h-6 w-6" />;
      case 'Explorateur': return <MapPin className="h-6 w-6" />;
      case 'Religieux': return <Sparkles className="h-6 w-6" />;
      default: return <Crown className="h-6 w-6" />;
    }
  };

  const getBonusColor = (type: string): string => {
    switch (type) {
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'experience': return 'text-blue-600 bg-blue-100';
      case 'reputation': return 'text-purple-600 bg-purple-100';
      case 'quest_rewards': return 'text-green-600 bg-green-100';
      case 'building_cost': return 'text-orange-600 bg-orange-100';
      case 'recruitment': return 'text-pink-600 bg-pink-100';
      default: return 'text-stone-600 bg-stone-100';
    }
  };

  const getMalusColor = (type: string): string => {
    switch (type) {
      case 'gold': return 'text-red-600 bg-red-100';
      case 'experience': return 'text-red-600 bg-red-100';
      case 'reputation': return 'text-red-600 bg-red-100';
      case 'quest_rewards': return 'text-red-600 bg-red-100';
      case 'building_cost': return 'text-red-600 bg-red-100';
      case 'recruitment': return 'text-red-600 bg-red-100';
      default: return 'text-red-600 bg-red-100';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fantasy-900 via-fantasy-800 to-stone-900 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white font-fantasy mb-4">
            Choisissez Votre Destinée
          </h1>
          <p className="text-xl text-fantasy-200 max-w-3xl mx-auto">
            Incarnez un dirigeant légendaire et bâtissez votre propre compagnie d'aventuriers dans les Royaumes Oubliés. 
            Chaque leader apporte son histoire unique, ses avantages et ses défis.
          </p>
        </div>

        {/* Sélection des leaders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {playerLeaders.map((leader) => (
            <div
              key={leader.id}
              className={`bg-white rounded-xl shadow-xl border-4 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                selectedLeader?.id === leader.id
                  ? 'border-fantasy-500 ring-4 ring-fantasy-300'
                  : 'border-stone-200 hover:border-fantasy-300'
              }`}
              onClick={() => setSelectedLeader(leader)}
            >
              {/* Header du personnage */}
              <div className={`bg-gradient-to-r ${getBackgroundColor(leader.background)} p-6 text-white rounded-t-lg`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-4xl">{leader.portrait}</div>
                  <div className="flex items-center space-x-2 text-white/80">
                    {getBackgroundIcon(leader.background)}
                    <span className="text-sm font-medium">{leader.background}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{leader.name}</h3>
                <p className="text-sm opacity-90">{leader.title}</p>
              </div>

              {/* Contenu */}
              <div className="p-6">
                <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {leader.description}
                </p>

                {/* Ressources de départ */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    <Coins className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                    <div className="font-bold text-yellow-800">{leader.startingGold}</div>
                    <div className="text-xs text-yellow-600">Pièces d'Or</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="text-blue-600 text-lg mb-1">💎</div>
                    <div className="font-bold text-blue-800">{leader.startingGems}</div>
                    <div className="text-xs text-blue-600">Gemmes</div>
                  </div>
                </div>

                {/* Aperçu des bonus/malus */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs font-medium text-green-700">
                    ✓ {leader.bonuses.length} Bonus
                  </div>
                  <div className="text-xs font-medium text-red-700">
                    ✗ {leader.maluses.length} Malus
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDetails(showDetails === leader.id ? null : leader.id);
                    }}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Info className="h-4 w-4" />
                    <span>Détails</span>
                  </button>
                  {selectedLeader?.id === leader.id && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCharacter(leader.id);
                      }}
                      className="bg-fantasy-600 hover:bg-fantasy-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
                    >
                      <span>Choisir</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Détails du leader sélectionné */}
        {showDetails && (
          <div className="bg-white rounded-xl shadow-2xl p-8 border border-stone-200">
            {(() => {
              const leader = playerLeaders.find(l => l.id === showDetails);
              if (!leader) return null;

              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-5xl">{leader.portrait}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-stone-800">{leader.name}</h3>
                        <p className="text-stone-600">{leader.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          {getBackgroundIcon(leader.background)}
                          <span className="text-sm font-medium text-stone-700">{leader.background}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowDetails(null)}
                      className="text-stone-400 hover:text-stone-600 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Histoire */}
                    <div>
                      <h4 className="text-lg font-bold text-stone-800 mb-3">Histoire</h4>
                      <p className="text-stone-600 leading-relaxed mb-6">{leader.description}</p>

                      {/* Capacité spéciale */}
                      <div className="bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-lg p-4 border border-fantasy-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">{leader.specialAbility.icon}</span>
                          <h5 className="font-bold text-fantasy-800">{leader.specialAbility.name}</h5>
                        </div>
                        <p className="text-fantasy-700 text-sm">{leader.specialAbility.description}</p>
                      </div>
                    </div>

                    {/* Statistiques */}
                    <div>
                      <h4 className="text-lg font-bold text-stone-800 mb-3">Avantages</h4>
                      <div className="space-y-2 mb-6">
                        {leader.bonuses.map((bonus, index) => (
                          <div key={index} className={`px-3 py-2 rounded-lg text-sm ${getBonusColor(bonus.type)}`}>
                            <div className="font-medium">+{bonus.value}% {bonus.description}</div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-lg font-bold text-stone-800 mb-3">Inconvénients</h4>
                      <div className="space-y-2 mb-6">
                        {leader.maluses.map((malus, index) => (
                          <div key={index} className={`px-3 py-2 rounded-lg text-sm ${getMalusColor(malus.type)}`}>
                            <div className="font-medium">{malus.value > 0 ? '+' : ''}{malus.value}% {malus.description}</div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-lg font-bold text-stone-800 mb-3">Bâtiments de Départ</h4>
                      <div className="flex flex-wrap gap-2">
                        {leader.startingBuildings.map((building, index) => (
                          <span key={index} className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                            {building === 'tavern' ? '🍺 Taverne' :
                             building === 'quest_board' ? '📋 Tableau des Quêtes' :
                             building === 'armory' ? '⚒️ Forge' :
                             building === 'library' ? '📚 Bibliothèque' :
                             building === 'training_ground' ? '⚔️ Terrain d\'Entraînement' :
                             building === 'infirmary' ? '⛪ Temple de Soins' : building}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-fantasy-300 text-sm">
            Cliquez sur un personnage pour le sélectionner, puis sur "Choisir" pour commencer votre aventure
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;