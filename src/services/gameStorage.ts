import { GameSave, PlayerLeader, Guild, Character, Team, ActiveQuest, Quest } from '../types';
import { playerLeaders } from '../data/playerLeaders';
import { mockBuildings } from '../data/mockData';

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
      
      // Reconstituer les dates des personnages
      if (gameData.characters) {
        gameData.characters = gameData.characters.map((char: any) => ({
          ...char,
          joinDate: new Date(char.joinDate)
        }));
      }

      // Reconstituer les dates des quêtes actives
      if (gameData.activeQuests) {
        gameData.activeQuests = gameData.activeQuests.map((quest: any) => ({
          ...quest,
          startTime: new Date(quest.startTime)
        }));
      }

      // Reconstituer les dates des bâtiments en amélioration
      if (gameData.guild?.buildings) {
        gameData.guild.buildings = gameData.guild.buildings.map((building: any) => ({
          ...building,
          upgradeStartTime: building.upgradeStartTime ? new Date(building.upgradeStartTime) : undefined
        }));
      }

      return gameData;
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

    // Créer les bâtiments de départ
    const startingBuildings = mockBuildings.filter(building => 
      leader.startingBuildings.includes(building.type)
    );

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

    const newGame: GameSave = {
      playerId: leaderId,
      playerLeader: leader,
      guild,
      characters: [],
      teams: [],
      activeQuests: [],
      completedQuests: [],
      gameTime: 0,
      lastSave: new Date(),
      achievements: []
    };

    return newGame;
  }

  static autoSave(gameData: GameSave): void {
    // Sauvegarde automatique toutes les 30 secondes
    this.saveGame({
      ...gameData,
      gameTime: gameData.gameTime + 0.5 // Ajouter 30 secondes
    });
  }
}