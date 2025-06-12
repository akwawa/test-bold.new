import { Character, Team, Quest, ActiveQuest } from '../types';

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Aria Lamevent',
    level: 5,
    class: 'Guerrière',
    stats: { strength: 18, agility: 12, intelligence: 8, vitality: 15 },
    experience: 1250,
    avatar: '⚔️',
    isAvailable: false
  },
  {
    id: 2,
    name: 'Zephyr Ombresilencieuse',
    level: 4,
    class: 'Rôdeur',
    stats: { strength: 10, agility: 20, intelligence: 14, vitality: 12 },
    experience: 980,
    avatar: '🏹',
    isAvailable: false
  },
  {
    id: 3,
    name: 'Lyra Cristalbleu',
    level: 6,
    class: 'Mage',
    stats: { strength: 6, agility: 10, intelligence: 22, vitality: 10 },
    experience: 1580,
    avatar: '🔮',
    isAvailable: false
  },
  {
    id: 4,
    name: 'Thorin Marteaufer',
    level: 5,
    class: 'Paladin',
    stats: { strength: 16, agility: 8, intelligence: 12, vitality: 20 },
    experience: 1100,
    avatar: '🛡️',
    isAvailable: false
  },
  {
    id: 5,
    name: 'Sage Vertfeuille',
    level: 3,
    class: 'Druide',
    stats: { strength: 8, agility: 14, intelligence: 18, vitality: 16 },
    experience: 750,
    avatar: '🌿',
    isAvailable: true
  },
  {
    id: 6,
    name: 'Raven Nocturne',
    level: 4,
    class: 'Assassin',
    stats: { strength: 12, agility: 22, intelligence: 16, vitality: 8 },
    experience: 920,
    avatar: '🗡️',
    isAvailable: true
  }
];

export const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Les Lames d\'Acier',
    level: 5,
    members: [mockCharacters[0], mockCharacters[1], mockCharacters[2]],
    status: 'on_quest',
    specialty: 'Combat',
    experience: 1250
  },
  {
    id: 2,
    name: 'Gardiens de la Forêt',
    level: 3,
    members: [mockCharacters[4]],
    status: 'available',
    specialty: 'Exploration',
    experience: 750
  },
  {
    id: 3,
    name: 'Mages de Cristal',
    level: 4,
    members: [mockCharacters[3], mockCharacters[5]],
    status: 'on_quest',
    specialty: 'Magie',
    experience: 980
  }
];

export const mockActiveQuests: ActiveQuest[] = [
  {
    id: 1,
    title: 'Négociation Diplomatique',
    description: 'Négociez un traité de paix entre deux royaumes rivaux.',
    difficulty: 4,
    duration: 195, // 3h 15min
    reward: 750,
    type: 'Diplomatie',
    requiredLevel: 4,
    status: 'in_progress',
    assignedTeam: mockTeams[0],
    startTime: new Date(Date.now() - 45 * 60 * 1000), // Commencée il y a 45 minutes
    progress: 23,
    timeRemaining: 150 // 2h 30min restantes
  },
  {
    id: 2,
    title: 'Exploration des Ruines Anciennes',
    description: 'Explorez les ruines mystérieuses découvertes récemment.',
    difficulty: 3,
    duration: 120, // 2h
    reward: 500,
    type: 'Exploration',
    requiredLevel: 3,
    status: 'in_progress',
    assignedTeam: mockTeams[2],
    startTime: new Date(Date.now() - 90 * 60 * 1000), // Commencée il y a 1h 30min
    progress: 75,
    timeRemaining: 30 // 30min restantes
  }
];