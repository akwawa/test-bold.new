export interface Character {
  id: number;
  name: string;
  level: number;
  class: string;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
  };
  experience: number;
  avatar: string;
  isAvailable: boolean;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  equipment: {
    weapon?: Equipment;
    armor?: Equipment;
    accessory?: Equipment;
  };
  skills: Skill[];
  biography: string;
  joinDate: Date;
  questsCompleted: number;
  totalEarnings: number;
  recruitmentCost?: number; // Coût de recrutement
}

export interface Equipment {
  id: number;
  name: string;
  type: 'weapon' | 'armor' | 'accessory';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  stats: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    vitality?: number;
  };
  description: string;
  icon: string;
}

export interface Skill {
  id: number;
  name: string;
  level: number;
  maxLevel: number;
  description: string;
  type: 'combat' | 'magic' | 'utility';
  icon: string;
}

export interface Team {
  id: number;
  name: string;
  level: number;
  members: Character[];
  status: 'available' | 'on_quest' | 'resting';
  specialty: string;
  experience: number;
  reputation: number; // Nouvelle propriété pour la notoriété de l'équipe
  questsCompleted: number; // Nombre de quêtes terminées par l'équipe
}

export type QuestType = 'Nettoyage' | 'Chasse' | 'Escorte' | 'Combat' | 'Diplomatie' | 'Religieux' | 'Donjon' | 'Donjon Épique' | 'Récupération' | 'Patrouille' | 'Prestige';

export interface Quest {
  id: number | string;
  templateId?: string;
  title: string;
  description: string;
  difficulty: number;
  duration: number; // en cycles
  reward: number;
  type: QuestType;
  rank?: number;
  requiredLevel: number;
  requiredReputation?: number;
  status: 'available' | 'in_progress' | 'completed' | 'expired' | 'awaiting_collection';
  assignedTeam?: Team;
  startTime?: Date;
  progress?: number; // 0-100
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
  enemy?: string;
  location?: string;
  artifact?: string;
  expirationCycle?: number | null; // Cycle d'expiration
  isDaily?: boolean;
  experienceReward?: number; // Expérience gagnée par la quête
  completionCycle?: number; // Cycle de fin de la quête
}

export interface ActiveQuest extends Quest {
  status: 'in_progress';
  assignedTeam: Team;
  startCycle: number; // Cycle de début
  cyclesRemaining: number; // Cycles restants
  progress: number;
}

export interface CompletedQuest extends Quest {
  status: 'completed' | 'awaiting_collection';
  assignedTeam: Team;
  startCycle: number;
  completionCycle: number;
  experienceReward: number;
  success: boolean; // Si la quête a été réussie ou échouée
  actualReward: number; // Récompense finale (peut être réduite en cas d'échec)
}

export interface Building {
  id: number;
  name: string;
  type: 'tavern' | 'quest_board' | 'armory' | 'library' | 'training_ground' | 'infirmary';
  level: number;
  maxLevel: number;
  description: string;
  benefits: string[];
  upgradeCost: number;
  upgradeTime: number; // en cycles
  isUpgrading: boolean;
  upgradeStartCycle?: number;
  icon: string;
}

export interface Guild {
  id: number;
  name: string;
  level: number;
  experience: number;
  reputation: number;
  gold: number;
  gems: number;
  buildings: Building[];
  maxMembers: number;
  currentMembers: number;
}

export interface PlayerLeader {
  id: string;
  name: string;
  title: string;
  background: string;
  description: string;
  portrait: string;
  startingGold: number;
  startingGems: number;
  bonuses: {
    type: 'gold' | 'experience' | 'reputation' | 'quest_rewards' | 'building_cost' | 'recruitment';
    value: number;
    description: string;
  }[];
  maluses: {
    type: 'gold' | 'experience' | 'reputation' | 'quest_rewards' | 'building_cost' | 'recruitment';
    value: number;
    description: string;
  }[];
  startingBuildings: string[];
  specialAbility: {
    name: string;
    description: string;
    icon: string;
  };
}

export interface RecruitableCharacter extends Omit<Character, 'id' | 'joinDate' | 'questsCompleted' | 'totalEarnings'> {
  recruitmentCost: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Nouveau système de cycles
export interface GameCycle {
  day: number; // Numéro du jour (commence à 1)
  period: 'day' | 'night'; // Période actuelle
  totalCycles: number; // Nombre total de cycles écoulés
}

export interface QuestTemplate {
  id: string;
  title: string;
  descriptionTemplate: string;
  type: QuestType;
  rank: number; // 1-4 (Débutant, Intermédiaire, Avancé, Expert)
  baseDifficulty: number;
  baseDuration: number;
  baseReward: number;
  requiredLevel: number;
  requiredReputation: number;
  enemies: string[];
  locations: string[];
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  availabilityDays: number; // Nombre de jours avant expiration
  spawnChance: number; // 0-1, chance d'apparition
  artifacts?: string[];
  isDaily?: boolean;
}

export interface GameSave {
  playerId: string;
  playerLeader: PlayerLeader;
  guild: Guild;
  characters: Character[];
  teams: Team[];
  activeQuests: ActiveQuest[];
  completedQuests: CompletedQuest[]; // Changé pour utiliser CompletedQuest
  availableQuests: Quest[]; // Quêtes générées disponibles
  cycle: GameCycle; // Remplace gameTime
  lastSave: Date;
  achievements: string[];
  availableRecruits: RecruitableCharacter[]; // Personnages disponibles au recrutement
  lastRecruitRefresh: Date; // Dernière actualisation des recrues (legacy)
  lastRecruitRefreshCycle?: number; // Cycle de la dernière actualisation des recrues
  lastQuestGeneration?: number; // Dernier cycle de génération de quêtes
}

// Nouvelles interfaces pour le système de progression
export interface UnlockCondition {
  type: 'building' | 'characters' | 'quests_completed' | 'guild_level' | 'gold' | 'always';
  value?: any;
  description: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  icon: any;
  unlockConditions: UnlockCondition[];
  isUnlocked?: boolean;
}