import React from 'react';
import { Map, Clock, Star, Coins, Users } from 'lucide-react';

const QuestsPanel: React.FC = () => {
  const quests = [
    {
      id: 1,
      title: 'La Forêt Maudite',
      description: 'Explorez la forêt maudite et découvrez la source de la corruption.',
      difficulty: 3,
      duration: '2h 30min',
      reward: 500,
      type: 'Exploration',
      requiredLevel: 3,
      status: 'available'
    },
    {
      id: 2,
      title: 'Défense du Village',
      description: 'Protégez le village des attaques de bandits.',
      difficulty: 2,
      duration: '1h 45min',
      reward: 350,
      type: 'Combat',
      requiredLevel: 2,
      status: 'available'
    },
    {
      id: 3,
      title: 'Négociation Diplomatique',
      description: 'Négociez un traité de paix entre deux royaumes rivaux.',
      difficulty: 4,
      duration: '3h 15min',
      reward: 750,
      type: 'Diplomatie',
      requiredLevel: 4,
      status: 'in_progress'
    },
    {
      id: 4,
      title: 'Chasse au Trésor',
      description: 'Suivez les indices pour découvrir un trésor perdu.',
      difficulty: 3,
      duration: '2h 00min',
      reward: 600,
      type: 'Exploration',
      requiredLevel: 3,
      status: 'available'
    }
  ];

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Combat': return 'text-red-700 bg-red-100';
      case 'Exploration': return 'text-blue-700 bg-blue-100';
      case 'Diplomatie': return 'text-purple-700 bg-purple-100';
      default: return 'text-stone-700 bg-stone-100';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Quêtes Disponibles</h2>
        <p className="text-stone-600 mt-2">Choisissez des quêtes pour vos équipes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quests.map((quest) => (
          <div key={quest.id} className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-stone-800 mb-2">{quest.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{quest.description}</p>
                </div>
                <div className="ml-4">
                  <Map className="h-8 w-8 text-fantasy-500" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(quest.type)}`}>
                  {quest.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quest.difficulty)}`}>
                  Difficulté {quest.difficulty}/5
                </span>
                {quest.status === 'in_progress' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                  <span>{quest.reward} or</span>
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
    </div>
  );
};

export default QuestsPanel;