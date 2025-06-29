import { QuestTemplate, QuestType } from '../types';

export const questTemplates: QuestTemplate[] = [
  // Quêtes de rang 1 (Débutant)
  {
    id: 'rats_sewers',
    title: 'Nettoyage des Égouts',
    descriptionTemplate: 'Éliminez l\'infestation de {enemy} dans les égouts de {location}.',
    type: 'Nettoyage',
    rank: 1,
    baseDifficulty: 1,
    baseDuration: 2,
    baseReward: 150,
    requiredLevel: 1,
    requiredReputation: 0,
    enemies: ['rats géants', 'rats-garous', 'vases grises'],
    locations: ['Eauprofonde', 'Neverwinter', 'Baldur\'s Gate', 'Elturel'],
    rarity: 'common',
    availabilityDays: 7,
    spawnChance: 0.8
  },
  {
    id: 'goblin_patrol',
    title: 'Patrouille Anti-Gobelins',
    descriptionTemplate: 'Éliminez la bande de {enemy} qui terrorise les routes près de {location}.',
    type: 'Chasse',
    rank: 1,
    baseDifficulty: 2,
    baseDuration: 3,
    baseReward: 250,
    requiredLevel: 2,
    requiredReputation: 50,
    enemies: ['gobelins', 'hobgobelins', 'worgs'],
    locations: ['Cormyr', 'Daggerdale', 'Sembia', 'Tethyr'],
    rarity: 'common',
    availabilityDays: 5,
    spawnChance: 0.7
  },
  {
    id: 'merchant_escort',
    title: 'Escorte de Marchand',
    descriptionTemplate: 'Escortez une caravane marchande de {location} à travers les terres dangereuses.',
    type: 'Escorte',
    rank: 1,
    baseDifficulty: 2,
    baseDuration: 4,
    baseReward: 300,
    requiredLevel: 2,
    requiredReputation: 100,
    enemies: ['bandits', 'loups', 'orques'],
    locations: ['Amn', 'Calimshan', 'Cormyr', 'Sembia'],
    rarity: 'common',
    availabilityDays: 3,
    spawnChance: 0.6
  },

  // Quêtes de rang 2 (Intermédiaire)
  {
    id: 'bandit_hideout',
    title: 'Repaire de Bandits',
    descriptionTemplate: 'Infiltrez et détruisez le repaire de {enemy} caché dans {location}.',
    type: 'Combat',
    rank: 2,
    baseDifficulty: 3,
    baseDuration: 6,
    baseReward: 600,
    requiredLevel: 4,
    requiredReputation: 300,
    enemies: ['bandits aguerris', 'mercenaires', 'assassins'],
    locations: ['Forêt de Cormanthor', 'Monts du Coucher du Soleil', 'Marais de Chelimber'],
    rarity: 'rare',
    availabilityDays: 5,
    spawnChance: 0.4
  },
  {
    id: 'noble_diplomacy',
    title: 'Mission Diplomatique',
    descriptionTemplate: 'Négociez un accord commercial entre les nobles de {location}.',
    type: 'Diplomatie',
    rank: 2,
    baseDifficulty: 3,
    baseDuration: 4,
    baseReward: 800,
    requiredLevel: 3,
    requiredReputation: 500,
    enemies: ['Aucun (Négociation)'],
    locations: ['Cormyr', 'Amn', 'Sembia', 'Tethyr'],
    rarity: 'rare',
    availabilityDays: 3,
    spawnChance: 0.3
  },
  {
    id: 'cursed_temple',
    title: 'Temple Maudit',
    descriptionTemplate: 'Purifiez le temple de {location} infesté de {enemy}.',
    type: 'Religieux',
    rank: 2,
    baseDifficulty: 4,
    baseDuration: 7,
    baseReward: 1000,
    requiredLevel: 5,
    requiredReputation: 400,
    enemies: ['morts-vivants', 'spectres', 'cultistes'],
    locations: ['Anauroch', 'Haute Lande', 'Terres Grises'],
    rarity: 'rare',
    availabilityDays: 4,
    spawnChance: 0.3
  },

  // Quêtes de rang 3 (Avancé)
  {
    id: 'ancient_dungeon',
    title: 'Donjon Ancien',
    descriptionTemplate: 'Explorez les ruines antiques de {location} et récupérez {artifact}.',
    type: 'Donjon',
    rank: 3,
    baseDifficulty: 4,
    baseDuration: 10,
    baseReward: 1500,
    requiredLevel: 6,
    requiredReputation: 800,
    enemies: ['golems', 'élémentaires', 'gardiens anciens'],
    locations: ['Netheril', 'Myth Drannor', 'Château-Zhentil'],
    rarity: 'epic',
    availabilityDays: 7,
    spawnChance: 0.2,
    artifacts: ['Orbe de Pouvoir', 'Grimoire Ancien', 'Sceptre Elfique', 'Couronne Naine']
  },
  {
    id: 'dragon_threat',
    title: 'Menace Draconique',
    descriptionTemplate: 'Affrontez le {enemy} qui terrorise {location} et réclamez son trésor.',
    type: 'Combat',
    rank: 3,
    baseDifficulty: 5,
    baseDuration: 12,
    baseReward: 2500,
    requiredLevel: 8,
    requiredReputation: 1200,
    enemies: ['dragon vert jeune', 'dragon rouge adulte', 'dragon noir ancien'],
    locations: ['Monts Earthfast', 'Pic du Tonnerre', 'Anauroch'],
    rarity: 'epic',
    availabilityDays: 10,
    spawnChance: 0.1
  },
  {
    id: 'artifact_recovery',
    title: 'Récupération d\'Artefact',
    descriptionTemplate: 'Récupérez {artifact} volé par {enemy} dans {location}.',
    type: 'Récupération',
    rank: 3,
    baseDifficulty: 4,
    baseDuration: 8,
    baseReward: 1800,
    requiredLevel: 7,
    requiredReputation: 1000,
    enemies: ['mages renégats', 'cultistes', 'voleurs de tombes'],
    locations: ['Tour de Sorcier', 'Crypte Oubliée', 'Sanctuaire Perdu'],
    rarity: 'epic',
    availabilityDays: 5,
    spawnChance: 0.15,
    artifacts: ['Bâton des Arcanes', 'Épée Sainte', 'Amulette de Résurrection', 'Livre des Morts']
  },

  // Quêtes de rang 4 (Expert)
  {
    id: 'planar_incursion',
    title: 'Incursion Planaire',
    descriptionTemplate: 'Fermez le portail planaire dans {location} et repoussez les {enemy}.',
    type: 'Donjon Épique',
    rank: 4,
    baseDifficulty: 5,
    baseDuration: 16,
    baseReward: 4000,
    requiredLevel: 10,
    requiredReputation: 2000,
    enemies: ['démons', 'diables', 'aberrations'],
    locations: ['Portail de Baldur', 'Sigil', 'Plan Astral'],
    rarity: 'legendary',
    availabilityDays: 14,
    spawnChance: 0.05
  },
  {
    id: 'lich_stronghold',
    title: 'Forteresse du Liche',
    descriptionTemplate: 'Détruisez le liche {enemy} dans sa forteresse de {location}.',
    type: 'Donjon Épique',
    rank: 4,
    baseDifficulty: 5,
    baseDuration: 20,
    baseReward: 6000,
    requiredLevel: 12,
    requiredReputation: 2500,
    enemies: ['Liche Ancien', 'Archliche', 'Dracoliche'],
    locations: ['Tour de Szass Tam', 'Citadelle Maudite', 'Nécropole Oubliée'],
    rarity: 'legendary',
    availabilityDays: 21,
    spawnChance: 0.03
  },

  // Quêtes quotidiennes (réputation)
  {
    id: 'daily_patrol',
    title: 'Patrouille Quotidienne',
    descriptionTemplate: 'Effectuez une patrouille de routine autour de {location}.',
    type: 'Patrouille',
    rank: 1,
    baseDifficulty: 1,
    baseDuration: 1,
    baseReward: 100,
    requiredLevel: 1,
    requiredReputation: 0,
    enemies: ['bandits mineurs', 'animaux sauvages'],
    locations: ['Eauprofonde', 'Neverwinter', 'Baldur\'s Gate'],
    rarity: 'common',
    availabilityDays: 1,
    spawnChance: 1.0,
    isDaily: true
  },
  {
    id: 'reputation_mission',
    title: 'Mission de Prestige',
    descriptionTemplate: 'Accomplissez une mission de prestige pour {location}.',
    type: 'Prestige',
    rank: 2,
    baseDifficulty: 2,
    baseDuration: 3,
    baseReward: 400,
    requiredLevel: 3,
    requiredReputation: 500,
    enemies: ['Divers'],
    locations: ['Cour Royale', 'Guilde Marchande', 'Temple Principal'],
    rarity: 'rare',
    availabilityDays: 1,
    spawnChance: 0.6,
    isDaily: true
  }
];

export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateQuestFromTemplate(template: QuestTemplate): any {
  const enemy = getRandomElement(template.enemies);
  const location = getRandomElement(template.locations);
  const artifact = template.artifacts ? getRandomElement(template.artifacts) : '';
  
  let description = template.descriptionTemplate
    .replace('{enemy}', enemy)
    .replace('{location}', location);
    
  if (artifact) {
    description = description.replace('{artifact}', artifact);
  }

  // Variation des stats basée sur la rareté
  const rarityMultiplier = {
    'common': 1.0,
    'rare': 1.2,
    'epic': 1.5,
    'legendary': 2.0
  }[template.rarity];

  const variance = 0.2; // ±20% de variation
  const difficultyVariance = Math.random() * variance * 2 - variance;
  const rewardVariance = Math.random() * variance * 2 - variance;
  const durationVariance = Math.random() * variance * 2 - variance;

  return {
    id: `${template.id}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    templateId: template.id,
    title: template.title,
    description,
    difficulty: Math.max(1, Math.round(template.baseDifficulty * (1 + difficultyVariance))),
    duration: Math.max(1, Math.round(template.baseDuration * (1 + durationVariance))),
    reward: Math.round(template.baseReward * rarityMultiplier * (1 + rewardVariance)),
    type: template.type,
    rank: template.rank,
    requiredLevel: template.requiredLevel,
    requiredReputation: template.requiredReputation,
    rarity: template.rarity,
    enemy,
    location,
    artifact,
    expirationCycle: null, // Sera défini lors de la génération
    isDaily: template.isDaily || false
  };
}