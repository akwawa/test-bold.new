import { Character, Team, Quest, ActiveQuest, Building, Guild, Equipment, Skill } from '../types';

const mockEquipments: Equipment[] = [
  {
    id: 1,
    name: 'Épée de Flammes',
    type: 'weapon',
    rarity: 'rare',
    stats: { strength: 8, vitality: 2 },
    description: 'Une épée enchantée qui brûle les ennemis au contact.',
    icon: '🔥'
  },
  {
    id: 2,
    name: 'Arc Elfique',
    type: 'weapon',
    rarity: 'epic',
    stats: { agility: 12, intelligence: 3 },
    description: 'Un arc léger et précis forgé par les elfes.',
    icon: '🏹'
  },
  {
    id: 3,
    name: 'Bâton de Cristal',
    type: 'weapon',
    rarity: 'rare',
    stats: { intelligence: 10, vitality: 4 },
    description: 'Un bâton magique amplifiant les sorts.',
    icon: '🔮'
  },
  {
    id: 4,
    name: 'Armure de Plates',
    type: 'armor',
    rarity: 'rare',
    stats: { strength: 4, vitality: 8 },
    description: 'Une armure lourde offrant une excellente protection.',
    icon: '🛡️'
  },
  {
    id: 5,
    name: 'Robe de Mage',
    type: 'armor',
    rarity: 'common',
    stats: { intelligence: 6, agility: 2 },
    description: 'Une robe légère favorisant la concentration magique.',
    icon: '👘'
  }
];

const mockSkills: Skill[] = [
  {
    id: 1,
    name: 'Frappe Puissante',
    level: 3,
    maxLevel: 5,
    description: 'Augmente les dégâts des attaques physiques.',
    type: 'combat',
    icon: '⚔️'
  },
  {
    id: 2,
    name: 'Tir de Précision',
    level: 4,
    maxLevel: 5,
    description: 'Améliore la précision des attaques à distance.',
    type: 'combat',
    icon: '🎯'
  },
  {
    id: 3,
    name: 'Boule de Feu',
    level: 5,
    maxLevel: 5,
    description: 'Lance une boule de feu dévastatrice.',
    type: 'magic',
    icon: '🔥'
  },
  {
    id: 4,
    name: 'Soins',
    level: 2,
    maxLevel: 5,
    description: 'Restaure la santé de l\'utilisateur ou d\'un allié.',
    type: 'magic',
    icon: '💚'
  },
  {
    id: 5,
    name: 'Furtivité',
    level: 3,
    maxLevel: 5,
    description: 'Permet de se déplacer sans être détecté.',
    type: 'utility',
    icon: '👤'
  }
];

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Aria Lamevent',
    level: 5,
    class: 'Guerrière',
    stats: { strength: 18, agility: 12, intelligence: 8, vitality: 15 },
    experience: 1250,
    avatar: '⚔️',
    isAvailable: false,
    health: 85,
    maxHealth: 100,
    mana: 20,
    maxMana: 30,
    equipment: {
      weapon: mockEquipments[0],
      armor: mockEquipments[3]
    },
    skills: [mockSkills[0], mockSkills[3]],
    biography: 'Ancienne garde royale, Aria a rejoint la guilde après avoir sauvé un village des bandits. Sa loyauté et son courage sont légendaires.',
    joinDate: new Date('2024-01-15'),
    questsCompleted: 23,
    totalEarnings: 4500
  },
  {
    id: 2,
    name: 'Zephyr Ombresilencieuse',
    level: 4,
    class: 'Rôdeur',
    stats: { strength: 10, agility: 20, intelligence: 14, vitality: 12 },
    experience: 980,
    avatar: '🏹',
    isAvailable: false,
    health: 78,
    maxHealth: 85,
    mana: 45,
    maxMana: 50,
    equipment: {
      weapon: mockEquipments[1],
      armor: mockEquipments[4]
    },
    skills: [mockSkills[1], mockSkills[4]],
    biography: 'Élevé dans les forêts du Nord, Zephyr maîtrise l\'art de la traque et du tir à l\'arc. Il préfère la solitude mais reste fidèle à ses compagnons.',
    joinDate: new Date('2024-02-03'),
    questsCompleted: 18,
    totalEarnings: 3200
  },
  {
    id: 3,
    name: 'Lyra Cristalbleu',
    level: 6,
    class: 'Mage',
    stats: { strength: 6, agility: 10, intelligence: 22, vitality: 10 },
    experience: 1580,
    avatar: '🔮',
    isAvailable: false,
    health: 65,
    maxHealth: 70,
    mana: 95,
    maxMana: 100,
    equipment: {
      weapon: mockEquipments[2],
      armor: mockEquipments[4]
    },
    skills: [mockSkills[2], mockSkills[3]],
    biography: 'Diplômée de l\'Académie de Magie de Crystalheim, Lyra est une prodige des arts arcaniques. Elle cherche constamment à perfectionner ses sorts.',
    joinDate: new Date('2023-12-10'),
    questsCompleted: 31,
    totalEarnings: 6800
  },
  {
    id: 4,
    name: 'Thorin Marteaufer',
    level: 5,
    class: 'Paladin',
    stats: { strength: 16, agility: 8, intelligence: 12, vitality: 20 },
    experience: 1100,
    avatar: '🛡️',
    isAvailable: false,
    health: 100,
    maxHealth: 120,
    mana: 40,
    maxMana: 60,
    equipment: {
      weapon: mockEquipments[0],
      armor: mockEquipments[3]
    },
    skills: [mockSkills[0], mockSkills[3]],
    biography: 'Ancien prêtre-guerrier du Temple de la Lumière, Thorin protège les innocents avec une détermination inébranlable.',
    joinDate: new Date('2024-01-28'),
    questsCompleted: 19,
    totalEarnings: 3800
  },
  {
    id: 5,
    name: 'Sage Vertfeuille',
    level: 3,
    class: 'Druide',
    stats: { strength: 8, agility: 14, intelligence: 18, vitality: 16 },
    experience: 750,
    avatar: '🌿',
    isAvailable: true,
    health: 90,
    maxHealth: 95,
    mana: 70,
    maxMana: 80,
    equipment: {
      weapon: mockEquipments[2]
    },
    skills: [mockSkills[3], mockSkills[4]],
    biography: 'Gardien de la forêt ancienne, Sage communique avec la nature et utilise ses pouvoirs pour guérir et protéger.',
    joinDate: new Date('2024-03-12'),
    questsCompleted: 12,
    totalEarnings: 2100
  },
  {
    id: 6,
    name: 'Raven Nocturne',
    level: 4,
    class: 'Assassin',
    stats: { strength: 12, agility: 22, intelligence: 16, vitality: 8 },
    experience: 920,
    avatar: '🗡️',
    isAvailable: true,
    health: 60,
    maxHealth: 75,
    mana: 35,
    maxMana: 45,
    equipment: {
      weapon: mockEquipments[1]
    },
    skills: [mockSkills[1], mockSkills[4]],
    biography: 'Ancien membre d\'une guilde d\'assassins, Raven a choisi la voie de la rédemption en rejoignant les Gardiens de l\'Aube.',
    joinDate: new Date('2024-02-20'),
    questsCompleted: 15,
    totalEarnings: 2800
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

export const mockBuildings: Building[] = [
  {
    id: 1,
    name: 'Taverne',
    type: 'tavern',
    level: 3,
    maxLevel: 5,
    description: 'Le cœur de votre guilde où les aventuriers se reposent et récupèrent.',
    benefits: [
      'Récupération +15% plus rapide',
      'Capacité: 12 aventuriers',
      'Bonus moral: +10%'
    ],
    upgradeCost: 800,
    upgradeTime: 120,
    isUpgrading: false,
    icon: '🍺'
  },
  {
    id: 2,
    name: 'Tableau des Quêtes',
    type: 'quest_board',
    level: 2,
    maxLevel: 5,
    description: 'Affiche les quêtes disponibles et permet de mieux les organiser.',
    benefits: [
      '3 quêtes simultanées max',
      'Bonus récompenses: +5%',
      'Quêtes rares disponibles'
    ],
    upgradeCost: 600,
    upgradeTime: 90,
    isUpgrading: true,
    upgradeStartTime: new Date(Date.now() - 30 * 60 * 1000),
    icon: '📋'
  },
  {
    id: 3,
    name: 'Armurerie',
    type: 'armory',
    level: 2,
    maxLevel: 5,
    description: 'Forge et répare les équipements de vos aventuriers.',
    benefits: [
      'Réparation automatique',
      'Bonus équipement: +8%',
      'Création d\'objets rares'
    ],
    upgradeCost: 1000,
    upgradeTime: 150,
    isUpgrading: false,
    icon: '⚒️'
  },
  {
    id: 4,
    name: 'Bibliothèque',
    type: 'library',
    level: 1,
    maxLevel: 5,
    description: 'Centre de recherche et d\'apprentissage pour vos mages.',
    benefits: [
      'Bonus XP magie: +10%',
      'Recherche de sorts',
      'Formation accélérée'
    ],
    upgradeCost: 500,
    upgradeTime: 60,
    isUpgrading: false,
    icon: '📚'
  },
  {
    id: 5,
    name: 'Terrain d\'Entraînement',
    type: 'training_ground',
    level: 2,
    maxLevel: 5,
    description: 'Permet à vos aventuriers de s\'entraîner et gagner de l\'expérience.',
    benefits: [
      'Entraînement passif',
      'Bonus XP combat: +12%',
      'Amélioration des stats'
    ],
    upgradeCost: 750,
    upgradeTime: 100,
    isUpgrading: false,
    icon: '🎯'
  },
  {
    id: 6,
    name: 'Infirmerie',
    type: 'infirmary',
    level: 1,
    maxLevel: 5,
    description: 'Soigne les blessures et maladies de vos aventuriers.',
    benefits: [
      'Soins automatiques',
      'Résistance aux maladies',
      'Récupération rapide'
    ],
    upgradeCost: 400,
    upgradeTime: 80,
    isUpgrading: false,
    icon: '🏥'
  }
];

export const mockGuild: Guild = {
  id: 1,
  name: 'Les Gardiens de l\'Aube',
  level: 4,
  experience: 2850,
  reputation: 1200,
  gold: 1250,
  gems: 45,
  buildings: mockBuildings,
  maxMembers: 15,
  currentMembers: 6
};