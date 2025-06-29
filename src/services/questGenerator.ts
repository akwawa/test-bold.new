import { Quest, GameSave, QuestTemplate } from '../types';
import { questTemplates, generateQuestFromTemplate, getRandomElement } from '../data/questTemplates';

export class QuestGenerator {
  static generateDailyQuests(gameData: GameSave): Quest[] {
    const dailyQuests: Quest[] = [];
    const reputation = gameData.guild.reputation;
    const guildLevel = gameData.guild.level;
    
    // Quêtes quotidiennes basées sur la réputation
    const dailyTemplates = questTemplates.filter(template => template.isDaily);
    
    for (const template of dailyTemplates) {
      if (reputation >= template.requiredReputation && Math.random() < template.spawnChance) {
        const quest = generateQuestFromTemplate(template);
        quest.expirationCycle = gameData.cycle.totalCycles + (template.availabilityDays * 2); // Convertir jours en cycles
        dailyQuests.push(quest);
      }
    }
    
    return dailyQuests;
  }

  static generateRandomQuests(gameData: GameSave, count: number = 3): Quest[] {
    const newQuests: Quest[] = [];
    const reputation = gameData.guild.reputation;
    const guildLevel = gameData.guild.level;
    
    // Déterminer le rang maximum accessible
    const maxRank = this.getMaxAccessibleRank(reputation, guildLevel);
    
    // Filtrer les templates accessibles
    const accessibleTemplates = questTemplates.filter(template => 
      !template.isDaily && 
      template.rank <= maxRank &&
      reputation >= template.requiredReputation
    );
    
    // Générer des quêtes avec probabilités pondérées
    const attempts = count * 3; // Plus de tentatives pour assurer la variété
    
    for (let i = 0; i < attempts && newQuests.length < count; i++) {
      const template = this.selectWeightedTemplate(accessibleTemplates, reputation);
      
      if (template && Math.random() < template.spawnChance) {
        const quest = generateQuestFromTemplate(template);
        quest.expirationCycle = gameData.cycle.totalCycles + (template.availabilityDays * 2);
        
        // Éviter les doublons
        if (!newQuests.some(q => q.templateId === quest.templateId)) {
          newQuests.push(quest);
        }
      }
    }
    
    return newQuests;
  }

  static getMaxAccessibleRank(reputation: number, guildLevel: number): number {
    // Rang basé sur la réputation et le niveau de guilde
    if (reputation >= 2000 && guildLevel >= 5) return 4; // Expert
    if (reputation >= 800 && guildLevel >= 4) return 3;  // Avancé
    if (reputation >= 300 && guildLevel >= 2) return 2;  // Intermédiaire
    return 1; // Débutant
  }

  static selectWeightedTemplate(templates: QuestTemplate[], reputation: number): QuestTemplate | null {
    if (templates.length === 0) return null;
    
    // Pondération basée sur la rareté et la réputation
    const weights = templates.map(template => {
      let weight = 1.0;
      
      // Bonus de poids pour les quêtes de rang approprié
      const reputationRank = Math.floor(reputation / 500) + 1;
      if (template.rank === reputationRank) weight *= 1.5;
      
      // Ajustement selon la rareté
      switch (template.rarity) {
        case 'common': weight *= 1.0; break;
        case 'rare': weight *= 0.6; break;
        case 'epic': weight *= 0.3; break;
        case 'legendary': weight *= 0.1; break;
      }
      
      return weight;
    });
    
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < templates.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return templates[i];
      }
    }
    
    return templates[templates.length - 1];
  }

  static removeExpiredQuests(gameData: GameSave): Quest[] {
    return gameData.availableQuests.filter(quest => {
      if (quest.expirationCycle === null) return true;
      return gameData.cycle.totalCycles < quest.expirationCycle;
    });
  }

  static shouldGenerateNewQuests(gameData: GameSave): boolean {
    const lastGeneration = gameData.lastQuestGeneration || 0;
    const cyclesSinceLastGeneration = gameData.cycle.totalCycles - lastGeneration;
    
    // Générer de nouvelles quêtes tous les 2 cycles (1 jour complet)
    return cyclesSinceLastGeneration >= 2;
  }

  static updateQuestPool(gameData: GameSave): GameSave {
    let availableQuests = [...gameData.availableQuests];
    
    // Supprimer les quêtes expirées
    availableQuests = this.removeExpiredQuests(gameData);
    
    // Générer de nouvelles quêtes si nécessaire
    if (this.shouldGenerateNewQuests(gameData)) {
      // Quêtes quotidiennes
      const dailyQuests = this.generateDailyQuests(gameData);
      
      // Quêtes aléatoires (limiter le nombre total)
      const maxQuests = 8 + Math.floor(gameData.guild.level / 2);
      const currentNonDailyQuests = availableQuests.filter(q => !q.isDaily).length;
      const questsToGenerate = Math.max(0, maxQuests - currentNonDailyQuests);
      
      const randomQuests = this.generateRandomQuests(gameData, questsToGenerate);
      
      // Remplacer les quêtes quotidiennes expirées
      availableQuests = availableQuests.filter(q => !q.isDaily);
      availableQuests = [...availableQuests, ...dailyQuests, ...randomQuests];
      
      return {
        ...gameData,
        availableQuests,
        lastQuestGeneration: gameData.cycle.totalCycles
      };
    }
    
    return {
      ...gameData,
      availableQuests
    };
  }

  static getQuestsByRank(quests: Quest[]): { [rank: number]: Quest[] } {
    const questsByRank: { [rank: number]: Quest[] } = {};
    
    quests.forEach(quest => {
      const rank = quest.rank || 1;
      if (!questsByRank[rank]) {
        questsByRank[rank] = [];
      }
      questsByRank[rank].push(quest);
    });
    
    return questsByRank;
  }

  static getVisibleQuests(gameData: GameSave): Quest[] {
    const maxRank = this.getMaxAccessibleRank(gameData.guild.reputation, gameData.guild.level);
    
    return gameData.availableQuests.filter(quest => {
      const questRank = quest.rank || 1;
      return questRank <= maxRank && 
             (quest.requiredReputation || 0) <= gameData.guild.reputation;
    });
  }
}