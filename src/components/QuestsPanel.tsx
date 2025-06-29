import React, { useState } from 'react';
import { Map, Clock, Star, Coins, Users, Skull, Shield, Sword, Crown, Lock, X, Check, AlertTriangle, Sun, Moon, Calendar, Trophy, Zap } from 'lucide-react';
import { GameSave, Team, ActiveQuest, Quest } from '../types';
import { QuestGenerator } from '../services/questGenerator';

interface QuestsPanelProps {
  gameData: GameSave;
  onUpdateGameData?: (gameData: GameSave) => void;
}

const QuestsPanel: React.FC<QuestsPanelProps> = ({ gameData, onUpdateGameData }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [activeTab, setActiveTab] = useState<'available' | 'locked'>('available');

  // Obtenir les quêtes visibles et verrouillées
  const visibleQuests = QuestGenerator.getVisibleQuests(gameData);
  const maxRank = QuestGenerator.getMaxAccessibleRank(gameData.guild.reputation, gameData.guild.level);
  const questsByRank = QuestGenerator.getQuestsByRank(visibleQuests);
  
  // Équipes disponibles pour assignation
  const availableTeams = gameData.teams.filter(team => team.status === 'available');

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    if (difficulty <= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getRarityColor = (rarity?: string) => {
    switch (rarity) {
      case 'common': return 'text-stone-600 bg-stone-100 border-stone-300';
      case 'rare': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'epic': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-green-700 bg-green-100';
      case 2: return 'text-blue-700 bg-blue-100';
      case 3: return 'text-purple-700 bg-purple-100';
      case 4: return 'text-red-700 bg-red-100';
      default: return 'text-stone-700 bg-stone-100';
    }
  };

  const getRankLabel = (rank: number) => {
    switch (rank) {
      case 1: return 'Débutant';
      case 2: return 'Intermédiaire';
      case 3: return 'Avancé';
      case 4: return 'Expert';
      default: return 'Inconnu';
    }
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
      case 'Patrouille': return 'text-cyan-700 bg-cyan-100';
      case 'Prestige': return 'text-pink-700 bg-pink-100';
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
      case 'Patrouille': return <Users className="h-4 w-4" />;
      case 'Prestige': return <Trophy className="h-4 w-4" />;
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

  const formatCycleTime = (cycles: number): string => {
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

  const formatExpirationTime = (quest: Quest): string => {
    if (!quest.expirationCycle) return 'Permanent';
    
    const cyclesRemaining = quest.expirationCycle - gameData.cycle.totalCycles;
    if (cyclesRemaining <= 0) return 'Expiré';
    
    return `Expire dans ${formatCycleTime(cyclesRemaining)}`;
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

  // Calculer les chances de succès d'une équipe pour une quête
  const calculateSuccessChance = (team: Team, quest: Quest): number => {
    const teamLevel = team.level;
    const questLevel = quest.requiredLevel;
    const difficulty = quest.difficulty;
    
    // Base sur la différence de niveau
    let baseChance = 50;
    const levelDiff = teamLevel - questLevel;
    baseChance += levelDiff * 15; // +15% par niveau d'avance, -15% par niveau de retard
    
    // Ajustement selon la difficulté
    baseChance -= (difficulty - 1) * 10; // -10% par étoile de difficulté au-dessus de 1
    
    // Bonus selon le nombre de membres
    const memberBonus = Math.min(team.members.length * 5, 25); // +5% par membre, max 25%
    baseChance += memberBonus;
    
    // Bonus de spécialité
    const specialtyBonus = getSpecialtyBonus(team.specialty, quest.type);
    baseChance += specialtyBonus;
    
    return Math.max(10, Math.min(95, baseChance)); // Entre 10% et 95%
  };

  const getSpecialtyBonus = (specialty: string, questType: string): number => {
    const bonuses: { [key: string]: { [key: string]: number } } = {
      'Exploration de Donjons': { 'Donjon': 20, 'Donjon Épique': 25, 'Récupération': 10 },
      'Combat Rapproché': { 'Combat': 20, 'Chasse': 15, 'Nettoyage': 10 },
      'Magie Divine': { 'Religieux': 25, 'Donjon': 10 },
      'Infiltration': { 'Récupération': 20, 'Nettoyage': 15 },
      'Diplomatie': { 'Diplomatie': 30, 'Escorte': 10 },
      'Chasse aux Monstres': { 'Chasse': 25, 'Combat': 10, 'Nettoyage': 15 },
      'Récupération d\'Artefacts': { 'Récupération': 25, 'Donjon': 15 },
      'Escorte et Protection': { 'Escorte': 25, 'Diplomatie': 10 }
    };
    
    return bonuses[specialty]?.[questType] || 0;
  };

  const getSuccessChanceColor = (chance: number): string => {
    if (chance >= 80) return 'text-green-600';
    if (chance >= 60) return 'text-yellow-600';
    if (chance >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const handleAssignQuest = (quest: Quest) => {
    setSelectedQuest(quest);
    setSelectedTeam(null);
    setShowAssignModal(true);
  };

  const confirmAssignment = () => {
    if (!selectedQuest || !selectedTeam || !onUpdateGameData) return;

    const newActiveQuest: ActiveQuest = {
      ...selectedQuest,
      status: 'in_progress',
      assignedTeam: selectedTeam,
      startCycle: gameData.cycle.totalCycles,
      cyclesRemaining: selectedQuest.duration,
      progress: 0
    };

    // Mettre à jour le statut de l'équipe
    const updatedTeams = gameData.teams.map(team => 
      team.id === selectedTeam.id 
        ? { ...team, status: 'on_quest' as const }
        : team
    );

    // Mettre à jour les personnages de l'équipe
    const updatedCharacters = gameData.characters.map(character => {
      const isInAssignedTeam = selectedTeam.members.some(member => member.id === character.id);
      return isInAssignedTeam 
        ? { ...character, isAvailable: false }
        : character;
    });

    // Retirer la quête de la liste des quêtes disponibles
    const updatedAvailableQuests = gameData.availableQuests.filter(q => q.id !== selectedQuest.id);

    const updatedGameData = {
      ...gameData,
      teams: updatedTeams,
      characters: updatedCharacters,
      activeQuests: [...gameData.activeQuests, newActiveQuest],
      availableQuests: updatedAvailableQuests
    };

    onUpdateGameData(updatedGameData);
    setShowAssignModal(false);
    setSelectedQuest(null);
    setSelectedTeam(null);
  };

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

  const renderQuestCard = (quest: Quest) => {
    const adjustedReward = getAdjustedReward(quest.reward, quest.type);
    const isInProgress = gameData.activeQuests.some(aq => aq.id === quest.id);
    const canAssign = availableTeams.length > 0 && !isInProgress;
    const isExpired = quest.expirationCycle && gameData.cycle.totalCycles >= quest.expirationCycle;
    
    return (
      <div key={quest.id} className={`bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow ${isExpired ? 'opacity-60' : ''}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-xl font-bold text-stone-800">{quest.title}</h3>
                {quest.isDaily && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Quotidien</span>}
                {isExpired && <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">Expiré</span>}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-3">{quest.description}</p>
              
              {quest.enemy && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-stone-500 text-sm font-medium">Ennemis:</span>
                  <span className="text-stone-700 text-sm">{quest.enemy}</span>
                </div>
              )}
              
              {quest.location && (
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-stone-500 text-sm font-medium">Lieu:</span>
                  <span className="text-stone-700 text-sm">{quest.location}</span>
                </div>
              )}
            </div>
            <div className="ml-4 text-center">
              {getTypeIcon(quest.type)}
              <div className="text-xs text-stone-500 mt-1">{quest.type}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {quest.rank && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRankColor(quest.rank)}`}>
                {getRankLabel(quest.rank)}
              </span>
            )}
            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(quest.type)}`}>
              {getTypeIcon(quest.type)}
              <span>{quest.type}</span>
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(quest.difficulty)}`}>
              <div className="flex items-center space-x-1">
                {getDifficultyStars(quest.difficulty)}
              </div>
            </div>
            {quest.rarity && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRarityColor(quest.rarity)}`}>
                {quest.rarity}
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
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                {gameData.cycle.period === 'day' ? <Sun className="h-3 w-3 text-yellow-500" /> : <Moon className="h-3 w-3 text-blue-500" />}
              </div>
              <span>{formatCycleTime(quest.duration)}</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-600">
              <Coins className="h-4 w-4 text-yellow-500" />
              <span>
                {adjustedReward !== quest.reward && (
                  <span className="line-through text-stone-400 mr-1">{quest.reward}</span>
                )}
                {adjustedReward} po
              </span>
            </div>
            <div className="flex items-center space-x-2 text-stone-600">
              <Users className="h-4 w-4" />
              <span>Niv. {quest.requiredLevel}+</span>
            </div>
          </div>

          {quest.expirationCycle && (
            <div className="mb-4 text-xs text-stone-500 flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>{formatExpirationTime(quest)}</span>
            </div>
          )}

          <div className="flex space-x-2">
            {!isExpired && !isInProgress ? (
              <>
                <button 
                  onClick={() => handleAssignQuest(quest)}
                  disabled={!canAssign}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                    canAssign
                      ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {availableTeams.length === 0 ? 'Aucune équipe disponible' : 'Assigner équipe'}
                </button>
                <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg font-medium transition-colors">
                  Détails
                </button>
              </>
            ) : (
              <button className="flex-1 bg-stone-300 text-stone-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                {isExpired ? 'Expiré' : 'En cours...'}
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
          <p className="text-stone-600">Quêtes générées dynamiquement selon votre réputation</p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-fantasy-100 px-3 py-1 rounded-lg">
              <Crown className="h-4 w-4 text-fantasy-600" />
              <span className="text-fantasy-800 font-medium">Rang {maxRank} - {getRankLabel(maxRank)}</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-lg">
              <Trophy className="h-4 w-4 text-purple-600" />
              <span className="text-purple-800 font-medium">{gameData.guild.reputation} réputation</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-green-800 font-medium">{availableTeams.length} équipes disponibles</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-lg">
              {gameData.cycle.period === 'day' ? <Sun className="h-4 w-4 text-yellow-600" /> : <Moon className="h-4 w-4 text-blue-600" />}
              <span className="text-blue-800 font-medium">
                Jour {gameData.cycle.day} - {gameData.cycle.period === 'day' ? 'Jour' : 'Nuit'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques des quêtes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">Quêtes Disponibles</h4>
              <p className="text-2xl font-bold text-green-600">{visibleQuests.length}</p>
            </div>
            <Map className="h-8 w-8 text-green-500" />
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
        
        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">Terminées</h4>
              <p className="text-2xl font-bold text-yellow-600">{gameData.completedQuests.length}</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-4 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-stone-800">Quotidiennes</h4>
              <p className="text-2xl font-bold text-purple-600">{visibleQuests.filter(q => q.isDaily).length}</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Alerte si aucune équipe disponible */}
      {availableTeams.length === 0 && gameData.teams.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">Aucune équipe disponible</div>
              <div className="text-orange-700 text-sm">
                Toutes vos équipes sont actuellement en mission. Attendez qu'elles terminent ou faites avancer le temps pour assigner de nouvelles quêtes.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quêtes par rang */}
      {Object.keys(questsByRank).length > 0 ? (
        <div className="space-y-8">
          {[1, 2, 3, 4].map(rank => {
            const rankQuests = questsByRank[rank] || [];
            if (rankQuests.length === 0) return null;

            return (
              <div key={rank} className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <h3 className="text-2xl font-bold text-stone-800">
                    {getRankLabel(rank)} (Rang {rank})
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRankColor(rank)}`}>
                    {rankQuests.length} quête{rankQuests.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {rankQuests.map(quest => renderQuestCard(quest))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-stone-200 text-center">
          <Map className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-stone-800 mb-2">Aucune quête disponible</h3>
          <p className="text-stone-600 mb-6">
            Aucune quête n'est actuellement disponible pour votre niveau de réputation.
            Terminez des quêtes pour augmenter votre réputation et débloquer de nouveaux contrats.
          </p>
        </div>
      )}

      {/* Modal d'assignation d'équipe */}
      {showAssignModal && selectedQuest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-stone-800">Assigner une équipe</h3>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Détails de la quête */}
                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">📜 {selectedQuest.title}</h4>
                  <div className="bg-stone-50 rounded-lg p-4 mb-4">
                    <p className="text-stone-700 mb-3">{selectedQuest.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-stone-600">Difficulté:</span>
                        <div className="flex items-center space-x-1 mt-1">
                          {getDifficultyStars(selectedQuest.difficulty)}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-stone-600">Durée:</span>
                        <div className="text-stone-800 mt-1 flex items-center space-x-1">
                          {gameData.cycle.period === 'day' ? <Sun className="h-3 w-3 text-yellow-500" /> : <Moon className="h-3 w-3 text-blue-500" />}
                          <span>{formatCycleTime(selectedQuest.duration)}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-stone-600">Récompense:</span>
                        <div className="text-yellow-600 font-bold mt-1">{getAdjustedReward(selectedQuest.reward, selectedQuest.type)} po</div>
                      </div>
                      <div>
                        <span className="font-medium text-stone-600">Niveau requis:</span>
                        <div className="text-stone-800 mt-1">{selectedQuest.requiredLevel}+</div>
                      </div>
                    </div>
                    
                    {selectedQuest.enemy && (
                      <div className="mt-3 pt-3 border-t border-stone-200">
                        <span className="font-medium text-stone-600">Ennemis:</span>
                        <div className="text-stone-800 mt-1">{selectedQuest.enemy}</div>
                      </div>
                    )}

                    {selectedQuest.expirationCycle && (
                      <div className="mt-3 pt-3 border-t border-stone-200">
                        <span className="font-medium text-stone-600">Expiration:</span>
                        <div className="text-orange-600 mt-1">{formatExpirationTime(selectedQuest)}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sélection d'équipe */}
                <div>
                  <h4 className="text-xl font-bold text-stone-800 mb-4">⚔️ Choisir une équipe</h4>
                  {availableTeams.length > 0 ? (
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {availableTeams.map((team) => {
                        const successChance = calculateSuccessChance(team, selectedQuest);
                        const isSelected = selectedTeam?.id === team.id;
                        const meetsLevelRequirement = team.level >= selectedQuest.requiredLevel;

                        return (
                          <div
                            key={team.id}
                            onClick={() => meetsLevelRequirement && setSelectedTeam(team)}
                            className={`border-2 rounded-lg p-4 transition-all cursor-pointer ${
                              isSelected
                                ? 'border-fantasy-500 bg-fantasy-50'
                                : meetsLevelRequirement
                                ? 'border-stone-200 hover:border-fantasy-300 bg-white'
                                : 'border-red-200 bg-red-50 opacity-75 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h5 className="font-bold text-stone-800">{team.name}</h5>
                                <div className="flex items-center space-x-2 text-sm">
                                  <span className="text-stone-600">{team.specialty}</span>
                                  <span className="text-stone-400">•</span>
                                  <span className="text-stone-600">Niveau {team.level}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${getSuccessChanceColor(successChance)}`}>
                                  {successChance}%
                                </div>
                                <div className="text-xs text-stone-500">Succès</div>
                              </div>
                            </div>

                            {!meetsLevelRequirement && (
                              <div className="bg-red-100 border border-red-200 rounded p-2 mb-3">
                                <div className="text-red-800 text-sm font-medium">
                                  ⚠️ Niveau insuffisant (requis: {selectedQuest.requiredLevel})
                                </div>
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                              {team.members.slice(0, 4).map((member) => (
                                <div key={member.id} className="flex items-center space-x-2 bg-stone-100 rounded p-2">
                                  <span className="text-sm">{member.avatar}</span>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-medium text-stone-800 truncate">{member.name}</div>
                                    <div className="flex items-center space-x-1">
                                      <span className={`px-1 py-0.5 rounded text-xs ${getClassColor(member.class)}`}>
                                        {member.class}
                                      </span>
                                      <span className="text-xs text-stone-500">Niv.{member.level}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {team.members.length > 4 && (
                                <div className="flex items-center justify-center bg-stone-100 rounded p-2 text-stone-500 text-xs">
                                  +{team.members.length - 4} autres
                                </div>
                              )}
                            </div>

                            {isSelected && (
                              <div className="mt-3 pt-3 border-t border-fantasy-200">
                                <div className="flex items-center space-x-2 text-fantasy-700">
                                  <Check className="h-4 w-4" />
                                  <span className="text-sm font-medium">Équipe sélectionnée</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 text-stone-400 mx-auto mb-3" />
                      <p className="text-stone-600">Aucune équipe disponible</p>
                      <p className="text-stone-500 text-sm mt-1">Toutes vos équipes sont en mission</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-200">
                <div className="text-sm text-stone-600">
                  {selectedTeam && (
                    <div className="flex items-center space-x-2">
                      <span>Chances de succès:</span>
                      <span className={`font-bold ${getSuccessChanceColor(calculateSuccessChance(selectedTeam, selectedQuest))}`}>
                        {calculateSuccessChance(selectedTeam, selectedQuest)}%
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={confirmAssignment}
                    disabled={!selectedTeam || (selectedTeam && selectedTeam.level < selectedQuest.requiredLevel)}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      selectedTeam && selectedTeam.level >= selectedQuest.requiredLevel
                        ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
                        : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    Confirmer l'assignation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informations sur le système de génération */}
      <div className="mt-8 bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-6 border border-fantasy-200">
        <h3 className="text-xl font-bold text-fantasy-800 mb-4 flex items-center space-x-2">
          <Zap className="h-5 w-5" />
          <span>Système de Génération Dynamique</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-fantasy-800 mb-2">Mécaniques :</h4>
            <div className="space-y-1 text-sm text-fantasy-700">
              <div>• Nouvelles quêtes générées tous les jours</div>
              <div>• Quêtes quotidiennes basées sur la réputation</div>
              <div>• Durée de vie limitée pour certaines quêtes</div>
              <div>• Rang maximum accessible : {getRankLabel(maxRank)}</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-fantasy-800 mb-2">Progression :</h4>
            <div className="space-y-1 text-sm text-fantasy-700">
              <div>• Rang 2 : 300+ réputation, niveau 2+ guilde</div>
              <div>• Rang 3 : 800+ réputation, niveau 4+ guilde</div>
              <div>• Rang 4 : 2000+ réputation, niveau 5+ guilde</div>
              <div>• Réputation actuelle : {gameData.guild.reputation}</div>
            </div>
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