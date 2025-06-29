import { Character, Team, Quest, CompletedQuest } from '../types';

export class ExperienceSystem {
  // Calculer l'expérience gagnée par une quête
  static calculateQuestExperience(quest: Quest): number {
    const baseExp = quest.difficulty * 100;
    const rankMultiplier = (quest.rank || 1) * 0.5;
    const rarityMultiplier = {
      'common': 1.0,
      'rare': 1.3,
      'epic': 1.6,
      'legendary': 2.0
    }[quest.rarity || 'common'];

    return Math.round(baseExp * (1 + rankMultiplier) * rarityMultiplier);
  }

  // Calculer le niveau d'un personnage basé sur son expérience
  static calculateLevel(experience: number): number {
    // Formule: niveau = floor(sqrt(exp / 100)) + 1
    // Niveaux: 1 (0 exp), 2 (100 exp), 3 (400 exp), 4 (900 exp), etc.
    return Math.floor(Math.sqrt(experience / 100)) + 1;
  }

  // Calculer l'expérience nécessaire pour le prochain niveau
  static getExperienceForLevel(level: number): number {
    return (level - 1) * (level - 1) * 100;
  }

  // Calculer l'expérience nécessaire pour atteindre le prochain niveau
  static getExperienceToNextLevel(currentExp: number): number {
    const currentLevel = this.calculateLevel(currentExp);
    const nextLevelExp = this.getExperienceForLevel(currentLevel + 1);
    return nextLevelExp - currentExp;
  }

  // Faire monter de niveau un personnage
  static levelUpCharacter(character: Character): Character {
    const newLevel = this.calculateLevel(character.experience);
    
    if (newLevel > character.level) {
      const levelDifference = newLevel - character.level;
      
      // Augmentation des stats par niveau
      const statIncrease = {
        strength: Math.floor(Math.random() * 3) + 1, // 1-3 points
        agility: Math.floor(Math.random() * 3) + 1,
        intelligence: Math.floor(Math.random() * 3) + 1,
        vitality: Math.floor(Math.random() * 3) + 1
      };

      // Bonus spécialisé selon la classe
      const classBonus = this.getClassStatBonus(character.class);
      statIncrease[classBonus.stat] += classBonus.bonus;

      // Augmentation de la santé et mana
      const healthIncrease = (statIncrease.vitality * 5 + 10) * levelDifference;
      const manaIncrease = this.isMagicClass(character.class) 
        ? (statIncrease.intelligence * 3 + 5) * levelDifference 
        : 0;

      return {
        ...character,
        level: newLevel,
        stats: {
          strength: character.stats.strength + statIncrease.strength * levelDifference,
          agility: character.stats.agility + statIncrease.agility * levelDifference,
          intelligence: character.stats.intelligence + statIncrease.intelligence * levelDifference,
          vitality: character.stats.vitality + statIncrease.vitality * levelDifference
        },
        maxHealth: character.maxHealth + healthIncrease,
        health: character.health + healthIncrease, // Soigner lors du level up
        maxMana: character.maxMana + manaIncrease,
        mana: character.mana + manaIncrease
      };
    }

    return character;
  }

  // Obtenir le bonus de stat principal selon la classe
  static getClassStatBonus(characterClass: string): { stat: keyof Character['stats'], bonus: number } {
    const classMap: { [key: string]: { stat: keyof Character['stats'], bonus: number } } = {
      'Guerrier': { stat: 'strength', bonus: 2 },
      'Guerrière': { stat: 'strength', bonus: 2 },
      'Mage': { stat: 'intelligence', bonus: 2 },
      'Magicienne': { stat: 'intelligence', bonus: 2 },
      'Rôdeur': { stat: 'agility', bonus: 2 },
      'Rôdeuse': { stat: 'agility', bonus: 2 },
      'Paladin': { stat: 'vitality', bonus: 2 },
      'Paladine': { stat: 'vitality', bonus: 2 },
      'Druide': { stat: 'intelligence', bonus: 1 },
      'Druidesse': { stat: 'intelligence', bonus: 1 },
      'Roublard': { stat: 'agility', bonus: 2 },
      'Roublarde': { stat: 'agility', bonus: 2 },
      'Clerc': { stat: 'intelligence', bonus: 1 },
      'Barbare': { stat: 'strength', bonus: 2 }
    };

    return classMap[characterClass] || { stat: 'strength', bonus: 1 };
  }

  // Vérifier si une classe utilise la magie
  static isMagicClass(characterClass: string): boolean {
    const magicClasses = ['Mage', 'Magicienne', 'Clerc', 'Druide', 'Druidesse', 'Paladin', 'Paladine'];
    return magicClasses.includes(characterClass);
  }

  // Calculer le niveau d'une équipe basé sur l'expérience
  static calculateTeamLevel(experience: number): number {
    // Formule similaire mais plus lente pour les équipes
    return Math.floor(Math.sqrt(experience / 200)) + 1;
  }

  // Faire monter de niveau une équipe
  static levelUpTeam(team: Team): Team {
    const newLevel = this.calculateTeamLevel(team.experience);
    
    if (newLevel > team.level) {
      const levelDifference = newLevel - team.level;
      
      // Augmentation de la réputation de l'équipe
      const reputationIncrease = levelDifference * 50;

      return {
        ...team,
        level: newLevel,
        reputation: team.reputation + reputationIncrease
      };
    }

    return team;
  }

  // Distribuer l'expérience après une quête
  static distributeQuestExperience(
    quest: CompletedQuest, 
    characters: Character[], 
    teams: Team[]
  ): { updatedCharacters: Character[], updatedTeams: Team[] } {
    const questExp = quest.experienceReward;
    const successMultiplier = quest.success ? 1.0 : 0.5; // Moitié de l'exp en cas d'échec
    const finalExp = Math.round(questExp * successMultiplier);

    // Distribuer l'expérience aux membres de l'équipe
    const updatedCharacters = characters.map(character => {
      const isInTeam = quest.assignedTeam.members.some(member => member.id === character.id);
      
      if (isInTeam) {
        const characterExpGain = Math.round(finalExp / quest.assignedTeam.members.length);
        const updatedCharacter = {
          ...character,
          experience: character.experience + characterExpGain,
          questsCompleted: character.questsCompleted + 1,
          totalEarnings: character.totalEarnings + (quest.success ? Math.round(quest.actualReward / quest.assignedTeam.members.length) : 0)
        };
        
        // Vérifier le level up
        return this.levelUpCharacter(updatedCharacter);
      }
      
      return character;
    });

    // Donner de l'expérience à l'équipe
    const updatedTeams = teams.map(team => {
      if (team.id === quest.assignedTeam.id) {
        const updatedTeam = {
          ...team,
          experience: team.experience + finalExp,
          questsCompleted: team.questsCompleted + 1,
          reputation: team.reputation + (quest.success ? quest.difficulty * 10 : quest.difficulty * 2)
        };
        
        // Vérifier le level up de l'équipe
        return this.levelUpTeam(updatedTeam);
      }
      
      return team;
    });

    return { updatedCharacters, updatedTeams };
  }

  // Calculer les chances de succès d'une quête
  static calculateSuccessChance(team: Team, quest: Quest): number {
    const teamLevel = team.level;
    const questLevel = quest.requiredLevel;
    const difficulty = quest.difficulty;
    
    // Base sur la différence de niveau
    let baseChance = 50;
    const levelDiff = teamLevel - questLevel;
    baseChance += levelDiff * 15;
    
    // Ajustement selon la difficulté
    baseChance -= (difficulty - 1) * 10;
    
    // Bonus selon le nombre de membres
    const memberBonus = Math.min(team.members.length * 5, 25);
    baseChance += memberBonus;
    
    // Bonus de réputation de l'équipe
    const reputationBonus = Math.min(team.reputation / 100, 20);
    baseChance += reputationBonus;
    
    return Math.max(10, Math.min(95, baseChance));
  }

  // Déterminer le succès d'une quête
  static determineQuestSuccess(team: Team, quest: Quest): boolean {
    const successChance = this.calculateSuccessChance(team, quest);
    return Math.random() * 100 < successChance;
  }
}