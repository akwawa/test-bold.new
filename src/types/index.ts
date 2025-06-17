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
}

export interface Team {
  id: number;
  name: string;
  level: number;
  members: Character[];
  status: 'available' | 'on_quest' | 'resting';
  specialty: string;
  experience: number;
}

export interface Quest {
  id: number;
  title: string;
  description: string;
  difficulty: number;
  duration: number; // en minutes
  reward: number;
  type: string;
  requiredLevel: number;
  status: 'available' | 'in_progress' | 'completed';
  assignedTeam?: Team;
  startTime?: Date;
  progress?: number; // 0-100
}

export interface ActiveQuest extends Quest {
  status: 'in_progress';
  assignedTeam: Team;
  startTime: Date;
  progress: number;
  timeRemaining: number; // en minutes
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
  upgradeTime: number; // en minutes
  isUpgrading: boolean;
  upgradeStartTime?: Date;
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