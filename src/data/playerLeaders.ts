import { PlayerLeader } from '../types';

export const playerLeaders: PlayerLeader[] = [
  {
    id: 'lord_blackwater',
    name: 'Lord Aldric Blackwater',
    title: 'Seigneur Déchu de Cormyr',
    background: 'Noble',
    description: 'Ancien seigneur de Cormyr déchu après un scandale politique, Aldric possède encore de nombreuses connexions dans la noblesse et une fortune considérable. Sa réputation ternie lui ferme certaines portes mais ouvre d\'autres opportunités.',
    portrait: '👑',
    startingGold: 2500,
    startingGems: 75,
    bonuses: [
      {
        type: 'gold',
        value: 25,
        description: '+25% de revenus des quêtes diplomatiques'
      },
      {
        type: 'reputation',
        value: 15,
        description: '+15% de gain de réputation'
      }
    ],
    maluses: [
      {
        type: 'recruitment',
        value: 20,
        description: '+20% de coût de recrutement (réputation)'
      }
    ],
    startingBuildings: ['tavern', 'quest_board'],
    specialAbility: {
      name: 'Connexions Nobles',
      description: 'Accès à des quêtes exclusives de la noblesse avec des récompenses doublées',
      icon: '🏰'
    }
  },
  {
    id: 'captain_ironforge',
    name: 'Capitaine Thora Ironforge',
    title: 'Vétérane des Guerres Orques',
    background: 'Militaire',
    description: 'Ancienne capitaine de l\'armée de Mithral Hall, Thora a dirigé de nombreuses campagnes contre les hordes orques. Son expérience militaire lui permet de former des équipes redoutables au combat.',
    portrait: '⚔️',
    startingGold: 1800,
    startingGems: 45,
    bonuses: [
      {
        type: 'experience',
        value: 30,
        description: '+30% d\'expérience de combat pour tous les personnages'
      },
      {
        type: 'quest_rewards',
        value: 20,
        description: '+20% de récompenses des quêtes de combat'
      }
    ],
    maluses: [
      {
        type: 'gold',
        value: 15,
        description: '-15% de revenus des quêtes diplomatiques'
      }
    ],
    startingBuildings: ['training_ground', 'armory'],
    specialAbility: {
      name: 'Tactiques Militaires',
      description: 'Peut envoyer deux équipes sur la même quête de combat pour garantir le succès',
      icon: '🛡️'
    }
  },
  {
    id: 'sage_moonwhisper',
    name: 'Sage Elara Moonwhisper',
    title: 'Archiviste de Candlekeep',
    background: 'Érudit',
    description: 'Ancienne archiviste de la légendaire bibliothèque de Candlekeep, Elara possède une connaissance encyclopédique des arts magiques et des créatures mystiques. Sa sagesse attire les aventuriers les plus talentueux.',
    portrait: '📚',
    startingGold: 1200,
    startingGems: 90,
    bonuses: [
      {
        type: 'experience',
        value: 25,
        description: '+25% d\'expérience magique pour tous les personnages'
      },
      {
        type: 'building_cost',
        value: 30,
        description: '-30% de coût pour les bâtiments magiques'
      }
    ],
    maluses: [
      {
        type: 'gold',
        value: 20,
        description: '-20% de revenus des quêtes de combat'
      }
    ],
    startingBuildings: ['library', 'quest_board'],
    specialAbility: {
      name: 'Savoir Ancien',
      description: 'Peut identifier instantanément tous les objets magiques et révéler des quêtes secrètes',
      icon: '🔮'
    }
  },
  {
    id: 'merchant_goldbeard',
    name: 'Marchand Borin Goldbeard',
    title: 'Roi des Caravanes',
    background: 'Commerçant',
    description: 'Nain marchand ayant bâti un empire commercial à travers les Royaumes. Ses connexions avec les guildes marchandes lui permettent d\'obtenir les meilleurs prix et d\'accéder à des ressources rares.',
    portrait: '💰',
    startingGold: 3500,
    startingGems: 60,
    bonuses: [
      {
        type: 'gold',
        value: 40,
        description: '+40% de revenus de toutes les quêtes'
      },
      {
        type: 'building_cost',
        value: 25,
        description: '-25% de coût de construction'
      }
    ],
    maluses: [
      {
        type: 'reputation',
        value: 25,
        description: '-25% de gain de réputation (réputation mercantile)'
      }
    ],
    startingBuildings: ['tavern', 'armory'],
    specialAbility: {
      name: 'Réseau Commercial',
      description: 'Accès à un marché spécial avec des objets rares et peut vendre les objets à 150% de leur valeur',
      icon: '🏪'
    }
  },
  {
    id: 'ranger_stormwind',
    name: 'Rôdeur Kael Stormwind',
    title: 'Gardien des Terres Sauvages',
    background: 'Explorateur',
    description: 'Rôdeur légendaire ayant exploré les régions les plus dangereuses des Royaumes. Sa connaissance du terrain et des créatures sauvages fait de lui un guide inestimable pour les expéditions périlleuses.',
    portrait: '🏹',
    startingGold: 1500,
    startingGems: 35,
    bonuses: [
      {
        type: 'quest_rewards',
        value: 35,
        description: '+35% de récompenses des quêtes d\'exploration'
      },
      {
        type: 'experience',
        value: 20,
        description: '+20% d\'expérience pour les compétences de survie'
      }
    ],
    maluses: [
      {
        type: 'building_cost',
        value: 15,
        description: '+15% de coût pour les bâtiments urbains'
      }
    ],
    startingBuildings: ['training_ground', 'infirmary'],
    specialAbility: {
      name: 'Pistage Légendaire',
      description: 'Peut découvrir des donjons cachés et réduire de moitié le temps des quêtes d\'exploration',
      icon: '🗺️'
    }
  },
  {
    id: 'priestess_dawnbringer',
    name: 'Prêtresse Lyanna Dawnbringer',
    title: 'Haute Prêtresse de Lathandre',
    background: 'Religieux',
    description: 'Haute prêtresse du dieu du matin, Lyanna a consacré sa vie à combattre les ténèbres et à soigner les affligés. Sa foi rayonnante attire les paladins et clercs les plus dévoués.',
    portrait: '✨',
    startingGold: 1000,
    startingGems: 50,
    bonuses: [
      {
        type: 'experience',
        value: 40,
        description: '+40% d\'expérience divine pour paladins et clercs'
      },
      {
        type: 'recruitment',
        value: 30,
        description: '-30% de coût de recrutement pour les classes divines'
      }
    ],
    maluses: [
      {
        type: 'gold',
        value: 25,
        description: '-25% de revenus des quêtes impliquant des morts-vivants (éthique)'
      }
    ],
    startingBuildings: ['infirmary', 'quest_board'],
    specialAbility: {
      name: 'Bénédiction Divine',
      description: 'Peut bénir une équipe pour garantir sa survie même en cas d\'échec critique',
      icon: '🙏'
    }
  }
];