import { Character, Team, Quest, ActiveQuest, Building, Guild, Equipment, Skill } from '../types';

const mockEquipments: Equipment[] = [
  {
    id: 1,
    name: 'Épée Longue +1',
    type: 'weapon',
    rarity: 'rare',
    stats: { strength: 8, vitality: 2 },
    description: 'Une épée longue enchantée par les forgerons nains de Mithral Hall.',
    icon: '⚔️'
  },
  {
    id: 2,
    name: 'Arc Long Elfique',
    type: 'weapon',
    rarity: 'epic',
    stats: { agility: 12, intelligence: 3 },
    description: 'Un arc légendaire forgé dans les forêts de Cormanthor.',
    icon: '🏹'
  },
  {
    id: 3,
    name: 'Bâton de Guerre +2',
    type: 'weapon',
    rarity: 'rare',
    stats: { intelligence: 10, vitality: 4 },
    description: 'Un bâton magique gravé de runes draconiques anciennes.',
    icon: '🪄'
  },
  {
    id: 4,
    name: 'Armure de Plates Naine',
    type: 'armor',
    rarity: 'rare',
    stats: { strength: 4, vitality: 8 },
    description: 'Une armure forgée dans les mines profondes de Citadelle Felbarr.',
    icon: '🛡️'
  },
  {
    id: 5,
    name: 'Robe de l\'Archimage',
    type: 'armor',
    rarity: 'epic',
    stats: { intelligence: 8, agility: 3 },
    description: 'Une robe tissée avec des fils d\'argent et imprégnée de magie.',
    icon: '🧙‍♂️'
  },
  {
    id: 6,
    name: 'Armure de Cuir Clouté',
    type: 'armor',
    rarity: 'common',
    stats: { agility: 4, vitality: 2 },
    description: 'Une armure légère renforcée de clous en acier.',
    icon: '🦺'
  },
  {
    id: 7,
    name: 'Amulette de Protection',
    type: 'accessory',
    rarity: 'rare',
    stats: { vitality: 6, intelligence: 2 },
    description: 'Une amulette bénie par les prêtres de Tyr.',
    icon: '🔮'
  }
];

const mockSkills: Skill[] = [
  {
    id: 1,
    name: 'Attaque Puissante',
    level: 3,
    maxLevel: 5,
    description: 'Une attaque dévastatrice qui inflige des dégâts doublés.',
    type: 'combat',
    icon: '💥'
  },
  {
    id: 2,
    name: 'Tir de Précision',
    level: 4,
    maxLevel: 5,
    description: 'Un tir d\'une précision mortelle qui ignore l\'armure.',
    type: 'combat',
    icon: '🎯'
  },
  {
    id: 3,
    name: 'Boule de Feu',
    level: 5,
    maxLevel: 5,
    description: 'Invoque une sphère de flammes qui explose au contact.',
    type: 'magic',
    icon: '🔥'
  },
  {
    id: 4,
    name: 'Soins Majeurs',
    level: 3,
    maxLevel: 5,
    description: 'Canalise l\'énergie divine pour guérir les blessures.',
    type: 'magic',
    icon: '✨'
  },
  {
    id: 5,
    name: 'Furtivité',
    level: 4,
    maxLevel: 5,
    description: 'Se déplace dans l\'ombre sans être détecté.',
    type: 'utility',
    icon: '👤'
  },
  {
    id: 6,
    name: 'Rage Barbare',
    level: 2,
    maxLevel: 5,
    description: 'Entre dans une fureur qui augmente la force et la résistance.',
    type: 'combat',
    icon: '😡'
  },
  {
    id: 7,
    name: 'Détection de la Magie',
    level: 3,
    maxLevel: 5,
    description: 'Révèle la présence d\'auras magiques dans les environs.',
    type: 'magic',
    icon: '🔍'
  },
  {
    id: 8,
    name: 'Attaque Sournoise',
    level: 4,
    maxLevel: 5,
    description: 'Frappe les points vitaux pour infliger des dégâts critiques.',
    type: 'combat',
    icon: '🗡️'
  },
  {
    id: 9,
    name: 'Forme Sauvage',
    level: 2,
    maxLevel: 5,
    description: 'Se transforme en animal pour gagner ses capacités.',
    type: 'magic',
    icon: '🐺'
  },
  {
    id: 10,
    name: 'Châtiment Divin',
    level: 3,
    maxLevel: 5,
    description: 'Imprègne son arme d\'énergie sacrée contre le mal.',
    type: 'magic',
    icon: '⚡'
  }
];

export const mockCharacters: Character[] = [
  {
    id: 1,
    name: 'Ser Gareth Forteépée',
    level: 6,
    class: 'Paladin',
    stats: { strength: 18, agility: 12, intelligence: 14, vitality: 16 },
    experience: 1850,
    avatar: '⚔️',
    isAvailable: false,
    health: 95,
    maxHealth: 110,
    mana: 45,
    maxMana: 60,
    equipment: {
      weapon: mockEquipments[0],
      armor: mockEquipments[3],
      accessory: mockEquipments[6]
    },
    skills: [mockSkills[0], mockSkills[3], mockSkills[9]],
    biography: 'Ancien chevalier de l\'Ordre de la Rose d\'Argent, Gareth a prêté serment de protéger les innocents contre les forces du mal. Sa foi inébranlable en Tyr lui confère des pouvoirs divins.',
    joinDate: new Date('2024-01-15'),
    questsCompleted: 28,
    totalEarnings: 5200
  },
  {
    id: 2,
    name: 'Lyralei Feuilledor',
    level: 5,
    class: 'Rôdeur',
    stats: { strength: 14, agility: 20, intelligence: 16, vitality: 12 },
    experience: 1320,
    avatar: '🏹',
    isAvailable: false,
    health: 78,
    maxHealth: 85,
    mana: 35,
    maxMana: 45,
    equipment: {
      weapon: mockEquipments[1],
      armor: mockEquipments[5]
    },
    skills: [mockSkills[1], mockSkills[4], mockSkills[6]],
    biography: 'Élevée par les elfes de la Haute Forêt, Lyralei maîtrise l\'art de la traque et connaît tous les secrets de la nature. Elle traque inlassablement les orques qui ont détruit son village natal.',
    joinDate: new Date('2024-02-03'),
    questsCompleted: 22,
    totalEarnings: 3800
  },
  {
    id: 3,
    name: 'Thalion Luneargent',
    level: 7,
    class: 'Magicien',
    stats: { strength: 8, agility: 12, intelligence: 22, vitality: 10 },
    experience: 2100,
    avatar: '🧙‍♂️',
    isAvailable: false,
    health: 65,
    maxHealth: 70,
    mana: 95,
    maxMana: 110,
    equipment: {
      weapon: mockEquipments[2],
      armor: mockEquipments[4]
    },
    skills: [mockSkills[2], mockSkills[6], mockSkills[3]],
    biography: 'Diplômé de l\'Académie de Magie de Eauprofonde, Thalion est un érudit des arts arcaniques. Il recherche des artefacts magiques anciens pour percer les mystères de la Trame.',
    joinDate: new Date('2023-12-10'),
    questsCompleted: 35,
    totalEarnings: 7500
  },
  {
    id: 4,
    name: 'Thorek Barbe-de-Fer',
    level: 5,
    class: 'Guerrier',
    stats: { strength: 20, agility: 10, intelligence: 12, vitality: 18 },
    experience: 1180,
    avatar: '🪓',
    isAvailable: false,
    health: 100,
    maxHealth: 120,
    mana: 0,
    maxMana: 0,
    equipment: {
      weapon: mockEquipments[0],
      armor: mockEquipments[3]
    },
    skills: [mockSkills[0], mockSkills[5]],
    biography: 'Guerrier nain du clan Barbe-de-Fer, Thorek a quitté les Monts du Coucher du Soleil pour prouver sa valeur au combat. Sa hache a goûté le sang de nombreux gobelins et orques.',
    joinDate: new Date('2024-01-28'),
    questsCompleted: 25,
    totalEarnings: 4200
  },
  {
    id: 5,
    name: 'Silvana Coeur-de-Chêne',
    level: 4,
    class: 'Druide',
    stats: { strength: 12, agility: 16, intelligence: 18, vitality: 14 },
    experience: 950,
    avatar: '🌿',
    isAvailable: true,
    health: 85,
    maxHealth: 90,
    mana: 70,
    maxMana: 80,
    equipment: {
      weapon: mockEquipments[2]
    },
    skills: [mockSkills[8], mockSkills[3], mockSkills[6]],
    biography: 'Gardienne du Bosquet Sacré de Cormanthor, Silvana communique avec les esprits de la nature. Elle a juré de protéger l\'équilibre naturel contre la corruption.',
    joinDate: new Date('2024-03-12'),
    questsCompleted: 18,
    totalEarnings: 2800
  },
  {
    id: 6,
    name: 'Kael Ombrelame',
    level: 5,
    class: 'Roublard',
    stats: { strength: 12, agility: 22, intelligence: 16, vitality: 10 },
    experience: 1250,
    avatar: '🗡️',
    isAvailable: true,
    health: 70,
    maxHealth: 80,
    mana: 25,
    maxMana: 35,
    equipment: {
      weapon: mockEquipments[1],
      armor: mockEquipments[5]
    },
    skills: [mockSkills[4], mockSkills[7]],
    biography: 'Ancien membre de la Guilde des Voleurs d\'Athkatla, Kael a choisi la voie de la rédemption. Ses talents d\'infiltration sont inégalés, mais il préfère maintenant les utiliser pour le bien.',
    joinDate: new Date('2024-02-20'),
    questsCompleted: 21,
    totalEarnings: 3200
  },
  {
    id: 7,
    name: 'Grimjaw Crâne-Brisé',
    level: 4,
    class: 'Barbare',
    stats: { strength: 19, agility: 14, intelligence: 8, vitality: 17 },
    experience: 880,
    avatar: '🪓',
    isAvailable: true,
    health: 95,
    maxHealth: 105,
    mana: 0,
    maxMana: 0,
    equipment: {
      armor: mockEquipments[5]
    },
    skills: [mockSkills[5], mockSkills[0]],
    biography: 'Guerrier des Terres Barbares du Nord, Grimjaw descend des tribus qui combattent les géants. Sa rage au combat est légendaire, et peu d\'ennemis survivent à sa fureur.',
    joinDate: new Date('2024-03-05'),
    questsCompleted: 15,
    totalEarnings: 2100
  },
  {
    id: 8,
    name: 'Sœur Miriel Lumière-d\'Aube',
    level: 5,
    class: 'Clerc',
    stats: { strength: 14, agility: 10, intelligence: 18, vitality: 16 },
    experience: 1150,
    avatar: '✨',
    isAvailable: true,
    health: 88,
    maxHealth: 95,
    mana: 85,
    maxMana: 90,
    equipment: {
      armor: mockEquipments[4],
      accessory: mockEquipments[6]
    },
    skills: [mockSkills[3], mockSkills[6], mockSkills[9]],
    biography: 'Prêtresse de Lathandre, le Seigneur du Matin, Miriel apporte la lumière dans les ténèbres. Ses pouvoirs de guérison ont sauvé d\'innombrables vies lors des batailles contre les morts-vivants.',
    joinDate: new Date('2024-02-14'),
    questsCompleted: 19,
    totalEarnings: 2900
  }
];

export const mockTeams: Team[] = [
  {
    id: 1,
    name: 'Les Gardiens de la Lumière',
    level: 6,
    members: [mockCharacters[0], mockCharacters[1], mockCharacters[2]],
    status: 'on_quest',
    specialty: 'Exploration de Donjons',
    experience: 2850
  },
  {
    id: 2,
    name: 'Marteau et Enclume',
    level: 5,
    members: [mockCharacters[3], mockCharacters[6]],
    status: 'on_quest',
    specialty: 'Combat Rapproché',
    experience: 1680
  },
  {
    id: 3,
    name: 'Cercle de la Nature',
    level: 4,
    members: [mockCharacters[4], mockCharacters[7]],
    status: 'available',
    specialty: 'Magie Divine',
    experience: 1050
  },
  {
    id: 4,
    name: 'Lames Silencieuses',
    level: 5,
    members: [mockCharacters[5]],
    status: 'available',
    specialty: 'Infiltration',
    experience: 1250
  }
];

export const mockActiveQuests: ActiveQuest[] = [
  {
    id: 1,
    title: 'Les Cryptes de Château-Suif',
    description: 'Explorez les cryptes hantées sous l\'ancien château et éliminez le nécromancien qui y réside.',
    difficulty: 4,
    duration: 240, // 4h
    reward: 1200,
    type: 'Donjon',
    requiredLevel: 5,
    status: 'in_progress',
    assignedTeam: mockTeams[0],
    startTime: new Date(Date.now() - 90 * 60 * 1000), // Commencée il y a 1h30
    progress: 37,
    timeRemaining: 150 // 2h30 restantes
  },
  {
    id: 2,
    title: 'Raid Orque sur Pierrehavre',
    description: 'Défendez le village de Pierrehavre contre une horde d\'orques menée par un chef de guerre.',
    difficulty: 3,
    duration: 180, // 3h
    reward: 800,
    type: 'Combat',
    requiredLevel: 4,
    status: 'in_progress',
    assignedTeam: mockTeams[1],
    startTime: new Date(Date.now() - 45 * 60 * 1000), // Commencée il y a 45min
    progress: 25,
    timeRemaining: 135 // 2h15 restantes
  }
];

export const mockBuildings: Building[] = [
  {
    id: 1,
    name: 'Taverne du Dragon Doré',
    type: 'tavern',
    level: 3,
    maxLevel: 5,
    description: 'Le cœur de votre guilde où les aventuriers se reposent entre leurs quêtes périlleuses.',
    benefits: [
      'Récupération +15% plus rapide',
      'Capacité: 12 aventuriers',
      'Bonus moral: +10%',
      'Rumeurs et informations'
    ],
    upgradeCost: 800,
    upgradeTime: 120,
    isUpgrading: false,
    icon: '🍺'
  },
  {
    id: 2,
    name: 'Tableau des Contrats',
    type: 'quest_board',
    level: 2,
    maxLevel: 5,
    description: 'Affiche les contrats disponibles des nobles, marchands et autorités locales.',
    benefits: [
      '3 quêtes simultanées max',
      'Bonus récompenses: +5%',
      'Accès aux quêtes nobles',
      'Contrats de guilde'
    ],
    upgradeCost: 600,
    upgradeTime: 90,
    isUpgrading: true,
    upgradeStartTime: new Date(Date.now() - 30 * 60 * 1000),
    icon: '📋'
  },
  {
    id: 3,
    name: 'Forge Enchantée',
    type: 'armory',
    level: 2,
    maxLevel: 5,
    description: 'Atelier de maître-forgeron capable d\'enchanter les armes et armures.',
    benefits: [
      'Réparation automatique',
      'Enchantements mineurs',
      'Création d\'armes +1',
      'Bonus équipement: +8%'
    ],
    upgradeCost: 1000,
    upgradeTime: 150,
    isUpgrading: false,
    icon: '⚒️'
  },
  {
    id: 4,
    name: 'Bibliothèque Arcaniste',
    type: 'library',
    level: 1,
    maxLevel: 5,
    description: 'Collection de grimoires et parchemins pour l\'étude des arts magiques.',
    benefits: [
      'Recherche de sorts',
      'Bonus XP magie: +10%',
      'Identification d\'objets',
      'Création de parchemins'
    ],
    upgradeCost: 500,
    upgradeTime: 60,
    isUpgrading: false,
    icon: '📚'
  },
  {
    id: 5,
    name: 'Arène d\'Entraînement',
    type: 'training_ground',
    level: 2,
    maxLevel: 5,
    description: 'Terrain d\'entraînement pour perfectionner les techniques de combat.',
    benefits: [
      'Entraînement au combat',
      'Bonus XP combat: +12%',
      'Duels amicaux',
      'Amélioration des stats'
    ],
    upgradeCost: 750,
    upgradeTime: 100,
    isUpgrading: false,
    icon: '⚔️'
  },
  {
    id: 6,
    name: 'Temple de Soins',
    type: 'infirmary',
    level: 1,
    maxLevel: 5,
    description: 'Sanctuaire dédié aux dieux guérisseurs pour soigner les blessés.',
    benefits: [
      'Soins divins',
      'Guérison des maladies',
      'Résurrection mineure',
      'Bénédictions'
    ],
    upgradeCost: 400,
    upgradeTime: 80,
    isUpgrading: false,
    icon: '⛪'
  }
];

export const mockGuild: Guild = {
  id: 1,
  name: 'Compagnie de l\'Épée et du Bouclier',
  level: 4,
  experience: 2850,
  reputation: 1200,
  gold: 1250,
  gems: 45,
  buildings: mockBuildings,
  maxMembers: 15,
  currentMembers: 8
};