import React, { useState } from 'react';
import { Map, Clock, Star, Coins, Users, Skull, Shield, Sword, Crown, Lock, X, Check, AlertTriangle } from 'lucide-react';
import { GameSave, Team, ActiveQuest } from '../types';

interface QuestsPanelProps {
  gameData: GameSave;
  onUpdateGameData?: (gameData: GameSave) => void;
}

const QuestsPanel: React.FC<QuestsPanelProps> = ({ gameData, onUpdateGameData }) => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedQuest, setSelectedQuest] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

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
      maxGuildLevel: 4,
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

  // Équipes disponibles pour assignation
  const availableTeams = gameData.teams.filter(team => team.status === 'available');

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

  // Calculer les chances de succès d'une équipe pour une quête
  const calculateSuccessChance = (team: Team, quest: any): number => {
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

  const handleAssignQuest = (quest: any) => {
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
      startTime: new Date(),
      progress: 0,
      timeRemaining: selectedQuest.duration
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

    const updatedGameData = {
      ...gameData,
      teams: updatedTeams,
      characters: updatedCharacters,
      activeQuests: [...gameData.activeQuests, newActiveQuest]
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

  const renderQuestCard = (quest: any, isLocked: boolean = false) => {
    const adjustedReward = getAdjustedReward(quest.reward, quest.type);
    const isInProgress = gameData.activeQuests.some(aq => aq.id === quest.id);
    const canAssign = availableTeams.length > 0 && !isLocked && !isInProgress;
    
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
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-fantasy-100 px-3 py-1 rounded-lg">
              <Crown className="h-4 w-4 text-fantasy-600" />
              <span className="text-fantasy-800 font-medium">Guilde Niveau {gameData.guild.level}</span>
            </div>
            <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-lg">
              <Users className="h-4 w-4 text-green-600" />
              <span className="text-green-800 font-medium">{availableTeams.length} équipes disponibles</span>
            </div>
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

      {/* Alerte si aucune équipe disponible */}
      {availableTeams.length === 0 && gameData.teams.length > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">Aucune équipe disponible</div>
              <div className="text-orange-700 text-sm">
                Toutes vos équipes sont actuellement en mission. Attendez qu'elles terminent pour assigner de nouvelles quêtes.
              </div>
            </div>
          </div>
        </div>
      )}

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
                        <div className="text-stone-800 mt-1">{formatTime(selectedQuest.duration)}</div>
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
                    
                    <div className="mt-3 pt-3 border-t border-stone-200">
                      <span className="font-medium text-stone-600">Ennemis:</span>
                      <div className="text-stone-800 mt-1">{selectedQuest.enemies}</div>
                    </div>
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