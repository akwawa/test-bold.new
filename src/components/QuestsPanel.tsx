import React from 'react';
import { Map, Clock, Star, Coins, Users, Skull, Shield, Sword, Crown } from 'lucide-react';

const QuestsPanel: React.FC = () => {
  const quests = [
    {
      id: 1,
      title: 'Les Cryptes de Château-Suif',
      description: 'Explorez les cryptes hantées sous l\'ancien château et éliminez le nécromancien qui terrorise la région.',
      difficulty: 4,
      duration: '4h 00min',
      reward: 1200,
      type: 'Donjon',
      requiredLevel: 5,
      status: 'in_progress',
      enemies: 'Squelettes, Zombies, Nécromancien'
    },
    {
      id: 2,
      title: 'Raid Orque sur Pierrehavre',
      description: 'Défendez le paisible village de Pierrehavre contre une horde d\'orques menée par un chef de guerre brutal.',
      difficulty: 3,
      duration: '3h 00min',
      reward: 800,
      type: 'Combat',
      requiredLevel: 4,
      status: 'in_progress',
      enemies: 'Orques, Chef de Guerre Orque'
    },
    {
      id: 3,
      title: 'Le Trésor du Dragon Vert',
      description: 'Infiltrez le repaire de Chlorophylle l\'Ancienne et dérobez une partie de son trésor légendaire.',
      difficulty: 5,
      duration: '6h 00min',
      reward: 2500,
      type: 'Donjon',
      requiredLevel: 7,
      status: 'available',
      enemies: 'Dragon Vert Ancien, Kobolds, Pièges'
    },
    {
      id: 4,
      title: 'Escorte de Caravane',
      description: 'Escortez une caravane marchande à travers les Terres Sauvages infestées de bandits et de monstres.',
      difficulty: 2,
      duration: '2h 30min',
      reward: 450,
      type: 'Escorte',
      requiredLevel: 3,
      status: 'available',
      enemies: 'Bandits, Loups, Gobelins'
    },
    {
      id: 5,
      title: 'Négociation avec les Elfes',
      description: 'Négociez un traité commercial avec les Seigneurs Elfes de la Cour d\'Été dans leur domaine féerique.',
      difficulty: 3,
      duration: '2h 00min',
      reward: 600,
      type: 'Diplomatie',
      requiredLevel: 4,
      status: 'available',
      enemies: 'Aucun (Négociation)'
    },
    {
      id: 6,
      title: 'Purification du Temple Maudit',
      description: 'Purifiez l\'ancien temple de Lathandre souillé par des cultistes de Cyric et leurs démons.',
      difficulty: 4,
      duration: '3h 30min',
      reward: 1000,
      type: 'Religieux',
      requiredLevel: 5,
      status: 'available',
      enemies: 'Cultistes, Démons Mineurs, Prêtre Déchu'
    },
    {
      id: 7,
      title: 'Chasse au Basilic',
      description: 'Traquez et éliminez le basilic qui pétrifie les voyageurs sur la Route du Commerce.',
      difficulty: 3,
      duration: '2h 45min',
      reward: 750,
      type: 'Chasse',
      requiredLevel: 4,
      status: 'available',
      enemies: 'Basilic, Lézards Géants'
    },
    {
      id: 8,
      title: 'Récupération d\'Artefact',
      description: 'Récupérez l\'Orbe de Contrôle Élémentaire volé par des mages renégats dans leur tour flottante.',
      difficulty: 5,
      duration: '5h 00min',
      reward: 1800,
      type: 'Récupération',
      requiredLevel: 6,
      status: 'available',
      enemies: 'Mages Renégats, Élémentaires, Golems'
    }
  ];

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    if (difficulty <= 4) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Combat': return 'text-red-700 bg-red-100';
      case 'Donjon': return 'text-purple-700 bg-purple-100';
      case 'Escorte': return 'text-blue-700 bg-blue-100';
      case 'Diplomatie': return 'text-green-700 bg-green-100';
      case 'Religieux': return 'text-yellow-700 bg-yellow-100';
      case 'Chasse': return 'text-orange-700 bg-orange-100';
      case 'Récupération': return 'text-indigo-700 bg-indigo-100';
      default: return 'text-stone-700 bg-stone-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Combat': return <Sword className="h-4 w-4" />;
      case 'Donjon': return <Skull className="h-4 w-4" />;
      case 'Escorte': return <Shield className="h-4 w-4" />;
      case 'Diplomatie': return <Crown className="h-4 w-4" />;
      case 'Religieux': return <Star className="h-4 w-4" />;
      case 'Chasse': return <Map className="h-4 w-4" />;
      case 'Récupération': return <Coins className="h-4 w-4" />;
      default: return <Map className="h-4 w-4" />;
    }
  };

  const getDifficultyStars = (difficulty: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < difficulty ? 'text-yellow-400 fill-current' : 'text-stone-300'
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Contrats Disponibles</h2>
        <p className="text-stone-600 mt-2">Choisissez des quêtes pour vos équipes d'aventuriers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <div key={quest.id} className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{quest.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-3">{quest.description}</p>
                  
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-stone-500 text-sm font-medium">Ennemis:</span>
                    <span className="text-stone-700 text-sm">{quest.enemies}</span>
                  </div>
                </div>
                <div className="ml-4 text-center">
                  {getTypeIcon(quest.type)}
                  <div className="text-xs text-stone-500 mt-1">{quest.type}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getTypeColor(quest.type)}`}>
                  {getTypeIcon(quest.type)}
                  <span>{quest.type}</span>
                </span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(quest.difficulty)}`}>
                  <div className="flex items-center space-x-1">
                    {getDifficultyStars(quest.difficulty)}
                  </div>
                </div>
                {quest.status === 'in_progress' && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    En cours
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center space-x-2 text-stone-600">
                  <Clock className="h-4 w-4" />
                  <span>{quest.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <Coins className="h-4 w-4 text-yellow-500" />
                  <span>{quest.reward} po</span>
                </div>
                <div className="flex items-center space-x-2 text-stone-600">
                  <Users className="h-4 w-4" />
                  <span>Niv. {quest.requiredLevel}+</span>
                </div>
              </div>

              <div className="flex space-x-2">
                {quest.status === 'available' ? (
                  <>
                    <button className="flex-1 bg-fantasy-600 hover:bg-fantasy-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Assigner équipe
                    </button>
                    <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-4 rounded-lg font-medium transition-colors">
                      Détails
                    </button>
                  </>
                ) : (
                  <button className="flex-1 bg-stone-300 text-stone-500 py-2 px-4 rounded-lg font-medium cursor-not-allowed">
                    En cours...
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Légende des difficultés */}
      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-lg font-bold text-stone-800 mb-4">Guide des Difficultés</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(1)}
            </div>
            <span className="text-green-600 font-medium">Facile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(2)}
            </div>
            <span className="text-green-600 font-medium">Modéré</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(3)}
            </div>
            <span className="text-yellow-600 font-medium">Difficile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(4)}
            </div>
            <span className="text-orange-600 font-medium">Très Difficile</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {getDifficultyStars(5)}
            </div>
            <span className="text-red-600 font-medium">Légendaire</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestsPanel;