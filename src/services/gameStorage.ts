import { GameSave, PlayerLeader, Guild, Character, Team, ActiveQuest, Quest, GameCycle, CompletedQuest } from '../types';
import { playerLeaders } from '../data/playerLeaders';
import { mockBuildings } from '../data/mockData';
import { generateRecruitPool } from '../data/recruitableCharacters';
import { QuestGenerator } from './questGenerator';
import { ExperienceSystem } from './experienceSystem';

const STORAGE_KEY = 'dnd_guild_manager_save';

export class GameStorage {
  static saveGame(gameData: GameSave): void {
    try {
      const serializedData = JSON.stringify({
        ...gameData,
        lastSave: new Date().toISOString()
      });
      localStorage.setItem(STORAGE_KEY, serializedData);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }

  static loadGame(): GameSave | null {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) return null;

      const gameData = JSON.parse(savedData);
      
      // Reconstituer les dates
      if (gameData.lastSave) {
        gameData.lastSave = new Date(gameData.lastSave);
      }
      
      if (gameData.lastRecruitRefresh) {
        gameData.lastRecruitRefresh = new Date(gameData.lastRecruitRefresh);
      }
      
      // Reconstituer les dates des personnages
      if (gameData.characters) {
        gameData.characters = gameData.characters.map((char: any) => ({
          ...char,
          joinDate: new Date(char.joinDate)
        }));
      }

      // Migration du système de temps vers les cycles
      if (gameData.gameTime !== undefined && !gameData.cycle) {
        const totalCycles = Math.floor(gameData.gameTime / 30); // 30 minutes = 1 cycle
        gameData.cycle = {
          day: Math.floor(totalCycles / 2) + 1,
          period: totalCycles % 2 === 0 ? 'day' : 'night',
          totalCycles
        };
        delete gameData.gameTime;
      }

      // S'assurer que le cycle existe
      if (!gameData.cycle) {
        gameData.cycle = {
          day: 1,
          period: 'day',
          totalCycles: 0
        };
      }

      // Migration du système de recrutement vers les cycles
      if (gameData.lastRecruitRefresh && !gameData.lastRecruitRefreshCycle) {
        // Estimer le cycle basé sur la différence de temps
        const timeDiff = Date.now() - gameData.lastRecruitRefresh.getTime();
        const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
        const cyclesDiff = Math.floor(hoursDiff / 12); // 12 heures = 1 cycle approximativement
        gameData.lastRecruitRefreshCycle = Math.max(0, gameData.cycle.totalCycles - cyclesDiff);
      }

      // S'assurer que lastRecruitRefreshCycle existe
      if (gameData.lastRecruitRefreshCycle === undefined) {
        gameData.lastRecruitRefreshCycle = gameData.cycle.totalCycles;
      }

      // Migrer les équipes pour ajouter les nouvelles propriétés
      if (gameData.teams) {
        gameData.teams = gameData.teams.map((team: any) => ({
          ...team,
          reputation: team.reputation || 0,
          questsCompleted: team.questsCompleted || 0
        }));
      }

      // Migrer les quêtes actives vers le système de cycles
      if (gameData.activeQuests) {
        gameData.activeQuests = gameData.activeQuests.map((quest: any) => {
          if (quest.startTime && !quest.startCycle) {
            // Migration des anciennes quêtes
            return {
              ...quest,
              startCycle: gameData.cycle.totalCycles,
              cyclesRemaining: Math.max(1, Math.floor(quest.duration / 30)) // Convertir minutes en cycles
            };
          }
          return quest;
        });
      }

      // Migrer les bâtiments en amélioration vers le système de cycles
      if (gameData.guild?.buildings) {
        gameData.guild.buildings = gameData.guild.buildings.map((building: any) => {
          if (building.upgradeStartTime && !building.upgradeStartCycle) {
            // Migration des anciens bâtiments
            return {
              ...building,
              upgradeStartCycle: gameData.cycle.totalCycles,
              upgradeTime: Math.max(1, Math.floor(building.upgradeTime / 30)) // Convertir minutes en cycles
            };
          }
          return building;
        });
      }

      // S'assurer que les recrues sont initialisées
      if (!gameData.availableRecruits) {
        gameData.availableRecruits = generateRecruitPool();
        gameData.lastRecruitRefresh = new Date();
        gameData.lastRecruitRefreshCycle = gameData.cycle.totalCycles;
      }

      // Initialiser le système de quêtes dynamiques
      if (!gameData.availableQuests) {
        gameData.availableQuests = [];
        gameData.lastQuestGeneration = 0;
      }

      // Mettre à jour le pool de quêtes
      const updatedGameData = QuestGenerator.updateQuestPool(gameData);

      return updatedGameData;
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      return null;
    }
  }

  static hasExistingSave(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  }

  static deleteSave(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  static createNewGame(leaderId: string): GameSave {
    const leader = playerLeaders.find(l => l.id === leaderId);
    if (!leader) {
      throw new Error('Leader non trouvé');
    }

    // Créer les bâtiments de départ avec des durées en cycles
    const startingBuildings = mockBuildings.filter(building => 
      leader.startingBuildings.includes(building.type)
    ).map(building => ({
      ...building,
      upgradeTime: Math.max(1, Math.floor(building.upgradeTime / 30)) // Convertir minutes en cycles
    }));

    const guild: Guild = {
      id: 1,
      name: `Compagnie de ${leader.name}`,
      level: 1,
      experience: 0,
      reputation: leader.background === 'Noble' ? 200 : 100,
      gold: leader.startingGold,
      gems: leader.startingGems,
      buildings: startingBuildings,
      maxMembers: 8,
      currentMembers: 0
    };

    const initialCycle: GameCycle = {
      day: 1,
      period: 'day',
      totalCycles: 0
    };

    const newGame: GameSave = {
      playerId: leaderId,
      playerLeader: leader,
      guild,
      characters: [],
      teams: [],
      activeQuests: [],
      completedQuests: [],
      availableQuests: [],
      cycle: initialCycle,
      lastSave: new Date(),
      achievements: [],
      availableRecruits: generateRecruitPool(),
      lastRecruitRefresh: new Date(),
      lastRecruitRefreshCycle: 0,
      lastQuestGeneration: 0
    };

    // Générer les quêtes initiales
    const updatedGame = QuestGenerator.updateQuestPool(newGame);

    return updatedGame;
  }

  static autoSave(gameData: GameSave): void {
    // Sauvegarde automatique
    this.saveGame(gameData);
  }

  static advanceCycle(gameData: GameSave): GameSave {
    const newCycle = { ...gameData.cycle };
    
    if (newCycle.period === 'day') {
      // Passer à la nuit du même jour
      newCycle.period = 'night';
    } else {
      // Passer au jour suivant
      newCycle.period = 'day';
      newCycle.day += 1;
    }
    
    newCycle.totalCycles += 1;

    // Mettre à jour les quêtes actives
    const updatedActiveQuests = gameData.activeQuests.map(quest => {
      const cyclesRemaining = Math.max(0, quest.cyclesRemaining - 1);
      const progress = quest.duration > 0 ? 
        Math.round(((quest.duration - cyclesRemaining) / quest.duration) * 100) : 100;
      
      return {
        ...quest,
        cyclesRemaining,
        progress
      };
    });

    // Terminer les quêtes complétées
    const finishedQuests = updatedActiveQuests.filter(quest => quest.cyclesRemaining <= 0);
    const stillActiveQuests = updatedActiveQuests.filter(quest => quest.cyclesRemaining > 0);

    // Convertir les quêtes terminées en quêtes complétées avec calcul de succès
    const newCompletedQuests: CompletedQuest[] = finishedQuests.map(quest => {
      const success = ExperienceSystem.determineQuestSuccess(quest.assignedTeam, quest);
      const experienceReward = ExperienceSystem.calculateQuestExperience(quest);
      
      // Appliquer les bonus du dirigeant aux récompenses
      let actualReward = quest.reward;
      gameData.playerLeader.bonuses.forEach(bonus => {
        if (bonus.type === 'quest_rewards') {
          actualReward = Math.round(actualReward * (1 + bonus.value / 100));
        }
      });

      // Réduire les récompenses en cas d'échec
      if (!success) {
        actualReward = Math.round(actualReward * 0.3); // 30% des récompenses en cas d'échec
      }

      return {
        ...quest,
        status: 'awaiting_collection' as const,
        completionCycle: newCycle.totalCycles,
        experienceReward,
        success,
        actualReward
      };
    });

    // Libérer les équipes et personnages des quêtes terminées (mais pas encore collectées)
    let updatedTeams = [...gameData.teams];
    let updatedCharacters = [...gameData.characters];

    finishedQuests.forEach(quest => {
      // Libérer l'équipe
      updatedTeams = updatedTeams.map(team => 
        team.id === quest.assignedTeam.id 
          ? { ...team, status: 'available' as const }
          : team
      );

      // Libérer les personnages
      quest.assignedTeam.members.forEach(member => {
        updatedCharacters = updatedCharacters.map(char => 
          char.id === member.id 
            ? { ...char, isAvailable: true }
            : char
        );
      });
    });

    // Mettre à jour les bâtiments en amélioration
    let updatedGuild = { ...gameData.guild };
    const updatedBuildings = gameData.guild.buildings.map(building => {
      if (building.isUpgrading && building.upgradeStartCycle !== undefined) {
        const cyclesElapsed = newCycle.totalCycles - building.upgradeStartCycle;
        if (cyclesElapsed >= building.upgradeTime) {
          // Amélioration terminée
          return {
            ...building,
            level: building.level + 1,
            isUpgrading: false,
            upgradeStartCycle: undefined
          };
        }
      }
      return building;
    });

    updatedGuild.buildings = updatedBuildings;

    let updatedGameData = {
      ...gameData,
      cycle: newCycle,
      activeQuests: stillActiveQuests,
      completedQuests: [...gameData.completedQuests, ...newCompletedQuests],
      teams: updatedTeams,
      characters: updatedCharacters,
      guild: updatedGuild
    };

    // Mettre à jour le pool de quêtes
    updatedGameData = QuestGenerator.updateQuestPool(updatedGameData);

    return updatedGameData;
  }

  // Nouvelle méthode pour collecter les récompenses d'une quête
  static collectQuestReward(gameData: GameSave, questId: string | number): GameSave {
    const questIndex = gameData.completedQuests.findIndex(q => q.id === questId && q.status === 'awaiting_collection');
    
    if (questIndex === -1) {
      return gameData; // Quête non trouvée ou déjà collectée
    }

    const quest = gameData.completedQuests[questIndex];
    
    // Distribuer l'expérience
    const { updatedCharacters, updatedTeams } = ExperienceSystem.distributeQuestExperience(
      quest, 
      gameData.characters, 
      gameData.teams
    );

    // Ajouter les récompenses à la guilde
    const updatedGuild = {
      ...gameData.guild,
      gold: gameData.guild.gold + quest.actualReward,
      experience: gameData.guild.experience + (quest.difficulty * 50),
      reputation: gameData.guild.reputation + (quest.success ? quest.difficulty * 10 : quest.difficulty * 2)
    };

    // Marquer la quête comme collectée
    const updatedCompletedQuests = [...gameData.completedQuests];
    updatedCompletedQuests[questIndex] = {
      ...quest,
      status: 'completed'
    };

    return {
      ...gameData,
      characters: updatedCharacters,
      teams: updatedTeams,
      guild: updatedGuild,
      completedQuests: updatedCompletedQuests
    };
  }
}