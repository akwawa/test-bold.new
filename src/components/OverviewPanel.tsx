import React from 'react';
import { Users, Map, Trophy, Clock, Sword, Lock, ArrowRight } from 'lucide-react';
import { GameSave } from '../types';
import ActiveQuestCard from './ActiveQuestCard';
import CharacterCard from './CharacterCard';

interface OverviewPanelProps {
  onViewCharacterDetails: (characterId: number) => void;
  gameData: GameSave;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ onViewCharacterDetails, gameData }) => {
  const availableCharacters = gameData.characters.filter(char => char.isAvailable);
  const busyCharacters = gameData.characters.filter(char => !char.isAvailable);

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

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Vue d'ensemble</h2>
        <p className="text-stone-600 mt-2">Gérez vos équipes et suivez vos quêtes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <p className="text-3xl font-bold">{gameData.completedQuests.length}</p>
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
              <ActiveQuestCard key={quest.id} quest={quest} />
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
            {gameData.completedQuests.length > 0 ? (
              gameData.completedQuests.slice(-4).reverse().map((quest, index) => (
                <div key={quest.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-stone-700 font-medium">Quête "{quest.title}" terminée</p>
                    <p className="text-stone-500 text-sm">Récompense: {quest.reward} po</p>
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