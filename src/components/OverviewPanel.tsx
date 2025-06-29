import React from 'react';
import { Users, Map, Trophy, Clock, Sword, Lock, ArrowRight, Sun, Moon, Gift, Star, Coins } from 'lucide-react';
import { GameSave, CompletedQuest } from '../types';
import ActiveQuestCard from './ActiveQuestCard';
import CharacterCard from './CharacterCard';

interface OverviewPanelProps {
  onViewCharacterDetails: (characterId: number) => void;
  gameData: GameSave;
  onUpdateGameData?: (gameData: GameSave) => void;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ onViewCharacterDetails, gameData, onUpdateGameData }) => {
  const availableCharacters = gameData.characters.filter(char => char.isAvailable);
  const busyCharacters = gameData.characters.filter(char => !char.isAvailable);

  // Quêtes en attente de collecte
  const questsAwaitingCollection = gameData.completedQuests.filter(q => q.status === 'awaiting_collection');

  // Vérifier les conditions de déverrouillage pour afficher des conseils
  const hasRecruitment = gameData.guild.buildings.some(b => b.type === 'tavern');
  const hasQuestBoard = gameData.guild.buildings.some(b => b.type === 'quest_board');
  const canFormTeams = gameData.characters.length >= 2;
  const canDoQuests = hasQuestBoard && gameData.characters.length >= 1;

  const getProgressTips = () => {
    const tips = [];
    
    if (!hasRecruitment) {
      tips.push({
        icon: '🏠',
        title: 'Construire une Taverne',
        description: 'Construisez une taverne dans votre guilde pour débloquer le recrutement d\'aventuriers.',
        action: 'Aller à la Guilde'
      });
    } else if (gameData.characters.length === 0) {
      tips.push({
        icon: '👥',
        title: 'Recruter des Aventuriers',
        description: 'Visitez la taverne pour recruter vos premiers aventuriers.',
        action: 'Aller au Recrutement'
      });
    }
    
    if (!hasQuestBoard && gameData.characters.length > 0) {
      tips.push({
        icon: '📋',
        title: 'Construire un Tableau des Quêtes',
        description: 'Construisez un tableau des quêtes pour débloquer les missions.',
        action: 'Aller à la Guilde'
      });
    }
    
    if (!canFormTeams && gameData.characters.length === 1) {
      tips.push({
        icon: '⚔️',
        title: 'Former des Équipes',
        description: 'Recrutez au moins 2 aventuriers pour former des équipes.',
        action: 'Recruter plus'
      });
    }
    
    return tips;
  };

  const progressTips = getProgressTips();

  const getCycleIcon = () => {
    return gameData.cycle.period === 'day' ? 
      <Sun className="h-12 w-12 text-yellow-400" /> : 
      <Moon className="h-12 w-12 text-blue-400" />;
  };

  const getCycleColor = () => {
    return gameData.cycle.period === 'day' ? 
      'from-yellow-500 to-orange-600' : 
      'from-blue-500 to-purple-600';
  };

  const handleCollectReward = (questId: string | number) => {
    if (!onUpdateGameData) return;
    
    const updatedGameData = require('../services/gameStorage').GameStorage.collectQuestReward(gameData, questId);
    onUpdateGameData(updatedGameData);
  };

  const formatCycleTime = (cycles: number): string => {
    if (cycles === 0) return 'Maintenant';
    if (cycles === 1) return '1 cycle';
    
    const days = Math.floor(cycles / 2);
    const periods = cycles % 2;
    
    if (days > 0) {
      if (periods === 0) {
        return `${days} jour${days > 1 ? 's' : ''}`;
      } else {
        return `${days} jour${days > 1 ? 's' : ''} et ${periods === 1 ? '1 période' : '2 périodes'}`;
      }
    } else {
      return `${periods} période${periods > 1 ? 's' : ''}`;
    }
  };

  const renderCompletedQuestCard = (quest: CompletedQuest) => {
    const cyclesSinceCompletion = gameData.cycle.totalCycles - quest.completionCycle;
    
    return (
      <div key={quest.id} className={`bg-white rounded-lg shadow-md border-2 p-4 transition-all ${
        quest.success ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h4 className="font-bold text-stone-800 text-sm">{quest.title}</h4>
              {quest.success ? (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Réussie</span>
              ) : (
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Échouée</span>
              )}
            </div>
            <p className="text-stone-600 text-xs mb-2">{quest.description}</p>
            <div className="text-xs text-stone-500">
              Terminée il y a {formatCycleTime(cyclesSinceCompletion)}
            </div>
          </div>
          <Gift className="h-6 w-6 text-yellow-500" />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-white rounded-lg p-2 text-center">
            <Coins className="h-4 w-4 text-yellow-500 mx-auto mb-1" />
            <div className="font-bold text-yellow-600">{quest.actualReward}</div>
            <div className="text-xs text-stone-500">Pièces d'Or</div>
          </div>
          <div className="bg-white rounded-lg p-2 text-center">
            <Star className="h-4 w-4 text-blue-500 mx-auto mb-1" />
            <div className="font-bold text-blue-600">{quest.experienceReward}</div>
            <div className="text-xs text-stone-500">Expérience</div>
          </div>
        </div>

        <div className="mb-3">
          <div className="text-xs font-medium text-stone-700 mb-1">Équipe:</div>
          <div className="text-xs text-stone-600">{quest.assignedTeam.name}</div>
        </div>

        <button
          onClick={() => handleCollectReward(quest.id)}
          className="w-full bg-fantasy-600 hover:bg-fantasy-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Gift className="h-4 w-4" />
          <span>Récupérer la récompense</span>
        </button>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Vue d'ensemble</h2>
        <p className="text-stone-600 mt-2">Gérez vos équipes et suivez vos quêtes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {/* Indicateur de cycle */}
        <div className={`bg-gradient-to-br ${getCycleColor()} rounded-xl p-6 text-white shadow-lg`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Cycle Actuel</p>
              <p className="text-2xl font-bold">Jour {gameData.cycle.day}</p>
              <p className="text-white/90 text-sm">
                {gameData.cycle.period === 'day' ? 'Période diurne' : 'Période nocturne'}
              </p>
            </div>
            {getCycleIcon()}
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Personnages</p>
              <p className="text-3xl font-bold">{gameData.characters.length}</p>
            </div>
            <Sword className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Disponibles</p>
              <p className="text-3xl font-bold">{availableCharacters.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Quêtes complétées</p>
              <p className="text-3xl font-bold">{gameData.completedQuests.filter(q => q.status === 'completed').length}</p>
            </div>
            <Trophy className="h-12 w-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Quêtes en cours</p>
              <p className="text-3xl font-bold">{gameData.activeQuests.length}</p>
            </div>
            <Clock className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Quêtes en attente de collecte */}
      {questsAwaitingCollection.length > 0 && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-stone-800 mb-4 flex items-center space-x-2">
            <Gift className="h-6 w-6 text-yellow-500" />
            <span>Récompenses à Récupérer</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
              {questsAwaitingCollection.length}
            </span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {questsAwaitingCollection.map(quest => renderCompletedQuestCard(quest))}
          </div>
        </div>
      )}

      {/* Conseils de progression */}
      {progressTips.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-stone-800 mb-4">🎯 Prochaines Étapes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressTips.map((tip, index) => (
              <div key={index} className="bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-4 border border-fantasy-200">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">{tip.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-fantasy-800 mb-1">{tip.title}</h4>
                    <p className="text-fantasy-700 text-sm mb-3">{tip.description}</p>
                    <button className="bg-fantasy-600 hover:bg-fantasy-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors flex items-center space-x-1">
                      <span>{tip.action}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quêtes en cours */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Quêtes en cours</h3>
        {gameData.activeQuests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {gameData.activeQuests.map((quest) => (
              <ActiveQuestCard key={quest.id} quest={quest} currentCycle={gameData.cycle} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200 text-center">
            <Map className="h-12 w-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600">Aucune quête en cours</p>
            {!canDoQuests ? (
              <p className="text-stone-500 text-sm mt-1">
                {!hasQuestBoard ? 'Construisez un tableau des quêtes' : 'Recrutez des aventuriers'} pour commencer
              </p>
            ) : (
              <p className="text-stone-500 text-sm mt-1">Assignez des équipes à des quêtes pour commencer</p>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personnages disponibles */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Personnages disponibles</h3>
          {availableCharacters.length > 0 ? (
            <div className="space-y-3">
              {availableCharacters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  onViewDetails={onViewCharacterDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Users className="h-8 w-8 text-stone-400 mx-auto mb-2" />
              <p className="text-stone-600">
                {gameData.characters.length === 0 
                  ? 'Aucun personnage recruté' 
                  : 'Tous vos personnages sont en mission'
                }
              </p>
              {gameData.characters.length === 0 && hasRecruitment && (
                <p className="text-stone-500 text-sm mt-1">Visitez la taverne pour recruter des aventuriers</p>
              )}
            </div>
          )}
        </div>

        {/* Activité récente */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Activité récente</h3>
          <div className="space-y-3">
            {gameData.completedQuests.filter(q => q.status === 'completed').length > 0 ? (
              gameData.completedQuests
                .filter(q => q.status === 'completed')
                .slice(-4)
                .reverse()
                .map((quest, index) => (
                  <div key={quest.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${quest.success ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div>
                      <p className="text-stone-700 font-medium">
                        Quête "{quest.title}" {quest.success ? 'réussie' : 'échouée'}
                      </p>
                      <p className="text-stone-500 text-sm">
                        Récompense: {quest.actualReward} po • {quest.experienceReward} XP
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-4">
                <Trophy className="h-8 w-8 text-stone-400 mx-auto mb-2" />
                <p className="text-stone-600">Aucune activité récente</p>
                <p className="text-stone-500 text-sm mt-1">Commencez des quêtes pour voir l'activité ici</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bonus du dirigeant */}
      {gameData.playerLeader.bonuses.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-6 border border-fantasy-200">
          <h3 className="text-xl font-bold text-fantasy-800 mb-4">
            Bonus de {gameData.playerLeader.name}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameData.playerLeader.bonuses.map((bonus, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white rounded-lg p-3">
                <div className="text-2xl">✨</div>
                <div>
                  <div className="font-medium text-fantasy-800">+{bonus.value}%</div>
                  <div className="text-fantasy-600 text-sm">{bonus.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPanel;