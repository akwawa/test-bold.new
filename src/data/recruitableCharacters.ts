import { RecruitableCharacter } from '../types';

const characterNames = {
  human: {
    male: ['Gareth', 'Marcus', 'Aldric', 'Theron', 'Darius', 'Cedric', 'Roland', 'Tristan', 'Lucian', 'Adrian'],
    female: ['Lyanna', 'Seraphina', 'Elara', 'Cassandra', 'Isabella', 'Morgana', 'Vivienne', 'Ariana', 'Celeste', 'Evangeline']
  },
  elf: {
    male: ['Thalion', 'Aelar', 'Aramil', 'Aerdyl', 'Ahvak', 'Berrian', 'Dayereth', 'Enna', 'Galinndan', 'Hadarai'],
    female: ['Lyralei', 'Adrie', 'Althaea', 'Anastrianna', 'Andraste', 'Antinua', 'Bethrynna', 'Birel', 'Caelynn', 'Dara']
  },
  dwarf: {
    male: ['Thorek', 'Borin', 'Dain', 'Darrak', 'Delg', 'Eberk', 'Einkil', 'Fargrim', 'Flint', 'Gardain'],
    female: ['Amber', 'Bardryn', 'Diesa', 'Eldeth', 'Gunnloda', 'Greta', 'Helja', 'Hlin', 'Kathra', 'Kristryd']
  },
  halfling: {
    male: ['Alton', 'Ander', 'Cade', 'Corrin', 'Eldon', 'Errich', 'Finnan', 'Garret', 'Lindal', 'Lyle'],
    female: ['Andry', 'Bree', 'Callie', 'Cora', 'Euphemia', 'Jillian', 'Kithri', 'Lavinia', 'Lidda', 'Merla']
  }
};

const classData = {
  'Guerrier': { 
    avatar: '⚔️', 
    baseStats: { strength: 16, agility: 12, intelligence: 10, vitality: 14 },
    races: ['human', 'dwarf'],
    skills: ['Attaque Puissante', 'Défense Robuste']
  },
  'Guerrière': { 
    avatar: '🛡️', 
    baseStats: { strength: 15, agility: 13, intelligence: 11, vitality: 13 },
    races: ['human', 'elf'],
    skills: ['Attaque Puissante', 'Défense Robuste']
  },
  'Mage': { 
    avatar: '🧙‍♂️', 
    baseStats: { strength: 8, agility: 10, intelligence: 18, vitality: 10 },
    races: ['human', 'elf'],
    skills: ['Boule de Feu', 'Détection de la Magie']
  },
  'Magicienne': { 
    avatar: '🔮', 
    baseStats: { strength: 7, agility: 11, intelligence: 17, vitality: 11 },
    races: ['human', 'elf'],
    skills: ['Boule de Feu', 'Détection de la Magie']
  },
  'Rôdeur': { 
    avatar: '🏹', 
    baseStats: { strength: 13, agility: 16, intelligence: 14, vitality: 12 },
    races: ['human', 'elf', 'halfling'],
    skills: ['Tir de Précision', 'Furtivité']
  },
  'Rôdeuse': { 
    avatar: '🎯', 
    baseStats: { strength: 12, agility: 17, intelligence: 13, vitality: 13 },
    races: ['human', 'elf', 'halfling'],
    skills: ['Tir de Précision', 'Furtivité']
  },
  'Paladin': { 
    avatar: '✨', 
    baseStats: { strength: 15, agility: 10, intelligence: 12, vitality: 16 },
    races: ['human'],
    skills: ['Châtiment Divin', 'Soins Majeurs']
  },
  'Paladine': { 
    avatar: '⚡', 
    baseStats: { strength: 14, agility: 11, intelligence: 13, vitality: 15 },
    races: ['human'],
    skills: ['Châtiment Divin', 'Soins Majeurs']
  },
  'Druide': { 
    avatar: '🌿', 
    baseStats: { strength: 12, agility: 14, intelligence: 16, vitality: 13 },
    races: ['human', 'elf'],
    skills: ['Forme Sauvage', 'Soins Majeurs']
  },
  'Druidesse': { 
    avatar: '🍃', 
    baseStats: { strength: 11, agility: 15, intelligence: 15, vitality: 14 },
    races: ['human', 'elf'],
    skills: ['Forme Sauvage', 'Soins Majeurs']
  },
  'Roublard': { 
    avatar: '🗡️', 
    baseStats: { strength: 10, agility: 18, intelligence: 14, vitality: 10 },
    races: ['human', 'halfling'],
    skills: ['Attaque Sournoise', 'Furtivité']
  },
  'Roublarde': { 
    avatar: '🔪', 
    baseStats: { strength: 9, agility: 17, intelligence: 15, vitality: 11 },
    races: ['human', 'halfling'],
    skills: ['Attaque Sournoise', 'Furtivité']
  },
  'Clerc': { 
    avatar: '🙏', 
    baseStats: { strength: 12, agility: 10, intelligence: 16, vitality: 15 },
    races: ['human', 'dwarf'],
    skills: ['Soins Majeurs', 'Châtiment Divin']
  },
  'Clerc': { 
    avatar: '✝️', 
    baseStats: { strength: 11, agility: 11, intelligence: 15, vitality: 16 },
    races: ['human', 'dwarf'],
    skills: ['Soins Majeurs', 'Châtiment Divin']
  },
  'Barbare': { 
    avatar: '🪓', 
    baseStats: { strength: 18, agility: 14, intelligence: 8, vitality: 16 },
    races: ['human', 'dwarf'],
    skills: ['Rage Barbare', 'Attaque Puissante']
  },
  'Barbare': { 
    avatar: '⚔️', 
    baseStats: { strength: 17, agility: 15, intelligence: 9, vitality: 15 },
    races: ['human', 'dwarf'],
    skills: ['Rage Barbare', 'Attaque Puissante']
  }
};

const biographies = {
  'Guerrier': [
    'Ancien soldat de l\'armée royale, il a servi avec honneur avant de chercher fortune comme aventurier.',
    'Fils de forgeron devenu maître d\'armes, il manie l\'épée avec une précision redoutable.',
    'Vétéran de nombreuses batailles, ses cicatrices racontent l\'histoire de ses victoires.',
    'Garde du corps d\'un noble déchu, il cherche maintenant à prouver sa valeur.'
  ],
  'Mage': [
    'Diplômé de l\'Académie de Magie, il maîtrise les arts arcaniques avec brio.',
    'Ancien apprenti d\'un archimage, il continue ses recherches sur les mystères de la Trame.',
    'Érudit passionné par les artefacts anciens et les sorts oubliés.',
    'Mage de guerre ayant servi dans les conflits magiques des Royaumes.'
  ],
  'Rôdeur': [
    'Gardien des forêts, il connaît tous les secrets de la nature sauvage.',
    'Traqueur expérimenté, aucune proie n\'échappe à sa vigilance.',
    'Ancien guide de caravanes, il connaît toutes les routes dangereuses.',
    'Protecteur des villages frontaliers contre les incursions de monstres.'
  ],
  'Paladin': [
    'Chevalier consacré au service du bien, sa foi guide chacun de ses actes.',
    'Ancien templier ayant prêté serment de protéger les innocents.',
    'Guerrier saint dont la lame brille de lumière divine.',
    'Champion de la justice, il combat inlassablement contre les forces du mal.'
  ],
  'Druide': [
    'Gardien de l\'équilibre naturel, il communique avec les esprits de la forêt.',
    'Sage des bois ayant appris les secrets des anciens druides.',
    'Protecteur de la nature contre la corruption et la destruction.',
    'Ermite ayant passé des années à méditer dans les bosquets sacrés.'
  ],
  'Roublard': [
    'Ancien voleur repenti, il met maintenant ses talents au service du bien.',
    'Espion habile dans l\'art de l\'infiltration et de la discrétion.',
    'Acrobate de rue devenu aventurier par soif de liberté.',
    'Ancien membre d\'une guilde de voleurs cherchant la rédemption.'
  ],
  'Clerc': [
    'Prêtre dévoué dont la foi peut accomplir des miracles.',
    'Guérisseur itinérant apportant réconfort et soins aux nécessiteux.',
    'Missionnaire répandant la parole divine dans les terres sauvages.',
    'Ancien moine ayant quitté son monastère pour servir dans le monde.'
  ],
  'Barbare': [
    'Guerrier des tribus du Nord, sa rage au combat est légendaire.',
    'Survivant des terres gelées, endurci par les épreuves de la nature.',
    'Chasseur de géants ayant grandi dans les montagnes hostiles.',
    'Nomade des steppes, libre comme le vent et féroce comme l\'orage.'
  ]
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomStats(baseStats: any, rarity: string) {
  const multiplier = {
    'common': 0.8,
    'rare': 1.0,
    'epic': 1.2,
    'legendary': 1.5
  }[rarity] || 1.0;

  const variance = rarity === 'legendary' ? 0.3 : 0.2;

  return {
    strength: Math.round(baseStats.strength * multiplier * (1 + (Math.random() - 0.5) * variance)),
    agility: Math.round(baseStats.agility * multiplier * (1 + (Math.random() - 0.5) * variance)),
    intelligence: Math.round(baseStats.intelligence * multiplier * (1 + (Math.random() - 0.5) * variance)),
    vitality: Math.round(baseStats.vitality * multiplier * (1 + (Math.random() - 0.5) * variance))
  };
}

function calculateRecruitmentCost(level: number, rarity: string, characterClass: string): number {
  const baseCost = {
    'common': 100,
    'rare': 250,
    'epic': 500,
    'legendary': 1000
  }[rarity] || 100;

  const classCost = {
    'Guerrier': 1.0, 'Guerrière': 1.0,
    'Mage': 1.3, 'Magicienne': 1.3,
    'Rôdeur': 1.1, 'Rôdeuse': 1.1,
    'Paladin': 1.4, 'Paladine': 1.4,
    'Druide': 1.2, 'Druidesse': 1.2,
    'Roublard': 1.1, 'Roublarde': 1.1,
    'Clerc': 1.2,
    'Barbare': 1.0
  }[characterClass] || 1.0;

  return Math.round(baseCost * Math.pow(1.5, level - 1) * classCost);
}

export function generateRecruitableCharacter(): RecruitableCharacter {
  const rarities = ['common', 'common', 'common', 'rare', 'rare', 'epic', 'legendary'];
  const rarity = getRandomElement(rarities) as 'common' | 'rare' | 'epic' | 'legendary';
  
  const classes = Object.keys(classData);
  const characterClass = getRandomElement(classes);
  const classInfo = classData[characterClass as keyof typeof classData];
  
  const race = getRandomElement(classInfo.races);
  const gender = Math.random() > 0.5 ? 'male' : 'female';
  const name = getRandomElement(characterNames[race as keyof typeof characterNames][gender]);
  
  const level = rarity === 'legendary' ? Math.floor(Math.random() * 3) + 4 :
                rarity === 'epic' ? Math.floor(Math.random() * 2) + 3 :
                rarity === 'rare' ? Math.floor(Math.random() * 2) + 2 :
                Math.floor(Math.random() * 2) + 1;

  const stats = generateRandomStats(classInfo.baseStats, rarity);
  const maxHealth = 50 + (stats.vitality * 5) + (level * 10);
  const maxMana = characterClass.includes('Mage') || characterClass.includes('Clerc') || characterClass.includes('Druide') || characterClass.includes('Paladin') 
    ? 30 + (stats.intelligence * 3) + (level * 5) 
    : 0;

  const baseClassKey = characterClass.replace(/e$/, '').replace(/ère$/, 'er').replace(/sse$/, '');
  const biography = getRandomElement(biographies[baseClassKey as keyof typeof biographies] || biographies['Guerrier']);

  return {
    name,
    level,
    class: characterClass,
    stats,
    experience: (level - 1) * 1000 + Math.floor(Math.random() * 500),
    avatar: classInfo.avatar,
    isAvailable: true,
    health: maxHealth,
    maxHealth,
    mana: maxMana,
    maxMana,
    equipment: {},
    skills: [],
    biography,
    recruitmentCost: calculateRecruitmentCost(level, rarity, characterClass),
    rarity
  };
}

export function generateRecruitPool(count: number = 6): RecruitableCharacter[] {
  const recruits: RecruitableCharacter[] = [];
  for (let i = 0; i < count; i++) {
    recruits.push(generateRecruitableCharacter());
  }
  return recruits;
}