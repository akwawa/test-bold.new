import React from 'react';
import { Map, Clock, Star, Coins, Users, Skull, Shield, Sword, Crown, Lock } from 'lucide-react';
import { GameSave } from '../types';

interface QuestsPanelProps {
  gameData: GameSave;
}

const QuestsPanel: React.FC<QuestsPanelProps> = ({ gameData }) => {
  const allQuests = [
    {
      id: 1,
      title: 'Les Cryptes de Château-Suif',
      description: 'Explorez les cryptes hantées sous l\'ancien château et éliminez le nécromancien qui terrorise la région.',
      difficulty: 4,
      duration: 240,
      reward: 1200,
      type: 'Donjon',
      requiredLevel: 5,
      maxGuildLevel: 4, // Niveau max de guilde requis
      status: 'available' as const,
      enemies: 'Squelettes, Zombies, Nécromancien'
    },
    {
      id: 2,
      title: 'Raid Orque sur Pierrehavre',
      description: 'Défendez le paisible village de Pierrehavre contre une horde d\'orques menée par un chef de guerre brutal.',
      difficulty: 3,
      duration: 180,
      reward: 800,
      type: 'Combat',
      requiredLevel: 4,
      maxGuildLevel: 3,
      status: 'available' as const,
      enemies: 'Orques, Chef de Guerre Orque'
    },
    {
      id: 3,
      title: 'Le Trésor du Dragon Vert',
      description: 'Infiltrez le repaire de Chlorophylle l\'Ancienne et dérobez une partie de son trésor légendaire.',
      difficulty: 5,
      duration: 360,
      reward: 2500,
      type: 'Donjon',
      requiredLevel: 7,
      maxGuildLevel: 5,
      status: 'available' as const,
      enemies: 'Dragon Vert Ancien, Kobolds, Pièges'
    },
    {
      id: 4,
      title: 'Escorte de Caravane',
      description: 'Escortez une caravane marchande à travers les Terres Sauvages infestées de bandits et de monstres.',
      difficulty: 2,
      duration: 150,
      reward: 450,
      type: 'Escorte',
      requiredLevel: 3,
      maxGuildLevel: 2,
      status: 'available' as const,
      enemies: 'Bandits, Loups, Gobelins'
    },
    {
      id: 5,
      title: 'Négociation avec les Elfes',
      description: 'Négociez un traité commercial avec les Seigneurs Elfes de la Cour d\'Été dans leur domaine féerique.',
      difficulty: 3,
      duration: 120,
      reward: 600,
      type: 'Diplomatie',
      requiredLevel: 4,
      maxGuildLevel: 3,
      status: 'available' as const,
      enemies: 'Aucun (Négociation)'
    },
    {
      id: 6,
      title: 'Purification du Temple Maudit',
      description: 'Purifiez l\'ancien temple de Lathandre souillé par des cultistes de Cyric et leurs démons.',
      difficulty: 4,
      duration: 210,
      reward: 1000,
      type: 'Religieux',
      requiredLevel: 5,
      maxGuildLevel: 4,
      status: 'available' as const,
      enemies: 'Cultistes, Démons Mineurs, Prêtre Déchu'
    },
    {
      id: 7,
      title: 'Contrat de Nettoyage - Rats Géants',
      description: 'Éliminez l\'infestation de rats géants dans les égouts de la ville.',
      difficulty: 1,
      duration: 90,
      reward: 200,
      type: 'Nettoyage',
      requiredLevel: 1,
      maxGuildLevel: 1,
      status: 'available' as const,
      enemies: 'Rats Géants, Rats-Garous'
    },
    {
      id: 8,
      title: 'Chasse aux Gobelins',
      description: 'Traquez et éliminez une bande de gobelins qui attaque les fermes locales.',
      difficulty: 2,
      duration: 120,
      reward: 350,
      type: 'Chasse',
      requiredLevel: 2,
      maxGuildLevel: 2,
      status: 'available' as const,
      enemies: 'Gobelins, Chef Gobelin'
    },
    {
      id: 9,
      title: 'L\'Antre du Liche Ancien',
      description: 'Affrontez un liche millénaire dans son donjon fortifié, gardé par des légions de morts-vivants.',
      difficulty: 5,
      duration: 480,
      reward: 5000,
      type: 'Donjon Épique',
      requiredLevel: 10,
      maxGuildLevel: 6,
      status: 'available' as const,
      enemies: 'Liche Ancien, Dracoliche, Armée de Morts-Vivants'
    },
    {
      id: 10,
      title: 'Récupération d\'Artefact',
      description: 'Récupérez un artefact magique volé dans une tour de mage abandonnée.',
      difficulty: 3,
      duration: 180,
      reward: 750,
      type: 'Récupération',
      requiredLevel: 4,
      maxGuildLevel: 3,
      status: 'available' as const,
      enemies: 'Golems, Élémentaires, Pièges Magiques'
    }
  ];

  // Filtrer les quêtes selon le niveau de la guilde
  const availableQuests = allQuests.filter(quest => quest.maxGuildLevel <= gameData.guild.level);
  const lockedQuests = allQuests.filter(quest => quest.maxGuildLevel > gameData.guild.level);

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    if (difficulty <= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Combat': return 'text-red-700 bg-red-100';
      case 'Donjon': return 'text-purple-700 bg-purple-100';
      case 'Donjon Épique': return 'text-purple-900 bg-purple-200';
      case 'Escorte': return 'text-blue-700 bg-blue-100';
      case 'Diplomatie': return 'text-green-700 bg-green-100';
      case 'Religieux': return 'text-yellow-700 bg-yellow-100';
      case 'Chasse': return 'text-orange-700 bg-orange-100';
      case 'Récupération': return 'text-indigo-700 bg-indigo-100';
      case 'Nettoyage': return 'text-stone-700 bg-stone-100';
      default: return 'text-stone-700 bg-stone-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Combat': return <Sword className="h-4 w-4" />;
      case 'Donjon': return <Skull className="h-4 w-4" />;
      case 'Donjon Épique': return <Crown className="h-4 w-4" />;
      case 'Escorte': return <Shield className="h-4 w-4" />;
      case 'Diplomatie': return <Crown className="h-4 w-4" />;
      case 'Religieux': return <Star className="h-4 w-4" />;
      case 'Chasse': return <Map className="h-4 w-4" />;
      case 'Récupération': return <Coins className="h-4 w-4" />;
      case 'Nettoyage': return <Sword className="h-4 w-4" />;
      default: return <Map className="h-4 w-4" />;
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-stone-300'
        }`}
      />
    ));
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins > 0 ? mins + 'min' : ''}`;
    }
    return `${mins}min`;
  };

  // Appliquer les bonus du dirigeant
  const getAdjustedReward = (baseReward: number, questType: string): number => {
    let multiplier = 1;
    
    gameData.playerLeader.bonuses.forEach(bonus => {
      if (bonus.type === 'quest_rewards') {
        multiplier += bonus.value / 100;
      } else if (bonus.type === 'gold' && questType === 'Diplomatie') {
        multiplier += bonus.value / 100;
      }
    });

    gameData.playerLeader.maluses.forEach(malus => {
      if (malus.type === 'quest_rewards') {
        multiplier -= Math.abs(malus.value) / 100;
      } else if (malus.type === 'gold' && questType === 'Diplomatie') {
        multiplier -= Math.abs(malus.value) / 100;
      }
    });

    return Math.round(baseReward * multiplier);
  };

  const renderQuestCard = (quest: any, isLocked: boolean = false) => {
    const adjustedReward = getAdjustedReward(quest.reward, quest.type);
    const isInProgress = gameData.activeQuests.some(aq => aq.id === quest.id);
    
    return (
      <div key={quest.id} className={`bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow ${isLocked ? 'opacity-60' : ''}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-stone-800">{quest.title}</h3>
                {isLocked && <Lock className="h-5 w-5 text-stone-400" />}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">{quest.description}</p>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-stone-500 text-sm font-medium">Ennemis:</span>
                <span className="text-stone-700 text-sm">{quest.enemies}</span>
              </div>
            </div>
            <div className="ml-4 text-center">
              {getTypeIcon(quest.type)}
              <div className="text-xs text-stone-500 mt-1">{quest.type}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(quest.type)}`}>
              {getTypeIcon(quest.type)}
              <span>{quest.type}</span>
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(quest.difficulty)}`}>
              <div className="flex items-center space-x-1">
                {getDifficultyStars(quest.difficulty)}
              </div>
            </div>
            {isLocked && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-stone-200 text-stone-600 flex items-center space-x-1">
                <Lock className="h-3 w-3" />
                <span>Niveau {quest.maxGuildLevel} requis</span>
              </span>
            )}
            {isInProgress && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                En cours
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
            <div className="flex items-center space-x-2 text-stone-600">
              <Clock className="h-4 w-4" />
              <span>{formatTime(quest.duration)}</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-600">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span>
                {!isLocked && adjustedReward !== quest.reward && (
                  <span className="line-through text-stone-400 mr-1">{quest.reward}</span>
                )}
                {isLocked ? quest.reward : adjustedReward} po
              </span>
            </div>
            <div className="flex items-center space-x-2 text-stone-600">
              <Users className="h-4 w-4" />
              <span>Niv. {quest.requiredLevel}+</span>
            </div>
          </div>

          <div className="flex space-x-2">
            {isLocked ? (
              <button className="flex-1 bg-stone-200 text-stone-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Guilde niveau {quest.maxGuildLevel} requis</span>
              </button>
            ) : !isInProgress ? (
              <>
                <button 
                  className="flex-1 bg-fantasy-600 hover:bg-fantasy-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  disabled={gameData.teams.length === 0}
                >
                  {gameData.teams.length === 0 ? 'Aucune équipe' : 'Assigner équipe'}
                </button>
                <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Détails
                </button>
              </>
            ) : (
              <button className="flex-1 bg-stone-300 text-stone-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                En cours...
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Contrats Disponibles</h2>
        <div className="flex items-center justify-between mt-2">
          <p className="text-stone-600">Choisissez des quêtes pour vos équipes d'aventuriers</p>
          <div className="flex items-center space-x-2 bg-fantasy-100 px-3 py-1 rounded-lg">
            <Crown className="h-4 w-4 text-fantasy-600" />
            <span className="text-fantasy-800 font-medium">Guilde Niveau {gameData.guild.level}</span>
          </div>
        </div>
      </div>

      {/* Statistiques des quêtes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">Quêtes Disponibles</h4>
              <p className="text-2xl font-bold text-green-600">{availableQuests.length}</p>
            </div>
            <Map className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">Quêtes Verrouillées</h4>
              <p className="text-2xl font-bold text-orange-600">{lockedQuests.length}</p>
            </div>
            <Lock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">En Cours</h4>
              <p className="text-2xl font-bold text-blue-600">{gameData.activeQuests.length}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Quêtes disponibles */}
      {availableQuests.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">🗺️ Contrats Accessibles</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableQuests.map((quest) => renderQuestCard(quest, false))}
          </div>
        </div>
      )}

      {/* Quêtes verrouillées */}
      {lockedQuests.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-stone-800 mb-4">🔒 Contrats de Haut Niveau</h3>
          <p className="text-stone-600 mb-4">
            Ces quêtes nécessitent une guilde de niveau supérieur. Améliorez votre guilde pour y accéder !
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lockedQuests.map((quest) => renderQuestCard(quest, true))}
          </div>
        </div>
      )}

      {/* Progression de la guilde */}
      <div className="bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-6 border border-fantasy-200 mb-8">
        <h3 className="text-xl font-bold text-fantasy-800 mb-4">📈 Progression de la Guilde</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-fantasy-700 font-medium">Niveau actuel</span>
              <span className="text-fantasy-800 font-bold">{gameData.guild.level}</span>
            </div>
            <div className="w-full bg-fantasy-200 rounded-full h-3">
              <div
                className="bg-fantasy-600 h-3 rounded-full transition-all"
                style={{ width: `${Math.min((gameData.guild.experience % 1000) / 10, 100)}%` }}
              />
            </div>
            <div className="text-fantasy-600 text-sm mt-1">
              {gameData.guild.experience} / {(gameData.guild.level + 1) * 1000} XP
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-fantasy-800 mb-2">Prochains déverrouillages :</h4>
            <div className="space-y-1 text-sm text-fantasy-700">
              {lockedQuests.slice(0, 3).map((quest, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Lock className="h-3 w-3" />
                  <span>Niveau {quest.maxGuildLevel}: {quest.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Légende des difficultés */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Guide des Difficultés</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(1)}
            </div>
            <span className="text-green-600 font-medium">Facile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(2)}
            </div>
            <span className="text-green-600 font-medium">Modéré</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(3)}
            </div>
            <span className="text-yellow-600 font-medium">Difficile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(4)}
            </div>
            <span className="text-orange-600 font-medium">Très Difficile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(5)}
            </div>
            <span className="text-red-600 font-medium">Légendaire</span>
          </div>
        </div>
      </div>

      {/* Bonus du dirigeant pour les quêtes */}
      {gameData.playerLeader.bonuses.some(b => b.type === 'quest_rewards' || b.type === 'gold') && (
        <div className="mt-6 bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-4 border border-fantasy-200">
          <h4 className="font-bold text-fantasy-800 mb-2">Bonus de {gameData.playerLeader.name}</h4>
          <div className="text-sm text-fantasy-700">
            {gameData.playerLeader.bonuses
              .filter(b => b.type === 'quest_rewards' || b.type === 'gold')
              .map((bonus, index) => (
                <div key={index}>• {bonus.description}</div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestsPanel;