import React from 'react';
import { Plus, Users, Star, Sword } from 'lucide-react';

const TeamsPanel: React.FC = () => {
  const teams = [
    {
      id: 1,
      name: 'Les Lames d\'Acier',
      level: 5,
      members: 4,
      status: 'Disponible',
      specialty: 'Combat',
      experience: 1250
    },
    {
      id: 2,
      name: 'Gardiens de la Forêt',
      level: 3,
      members: 3,
      status: 'En mission',
      specialty: 'Exploration',
      experience: 750
    },
    {
      id: 3,
      name: 'Mages de Cristal',
      level: 4,
      members: 2,
      status: 'Disponible',
      specialty: 'Magie',
      experience: 980
    }
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Mes Équipes</h2>
          <p className="text-stone-600 mt-2">Gérez vos équipes d'aventuriers</p>
        </div>
        <button className="bg-fantasy-600 hover:bg-fantasy-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg">
          <Plus className="h-5 w-5" />
          <span>Nouvelle équipe</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-fantasy-600 to-fantasy-700 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">{team.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm">Niveau {team.level}</span>
                </div>
              </div>
              <p className="text-fantasy-100 text-sm mt-1">{team.specialty}</p>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-stone-500" />
                  <span className="text-stone-600">{team.members} membres</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  team.status === 'Disponible' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {team.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-stone-600 mb-1">
                  <span>Expérience</span>
                  <span>{team.experience} XP</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-2">
                  <div 
                    className="bg-fantasy-500 h-2 rounded-full" 
                    style={{ width: `${(team.experience % 1000) / 10}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors">
                  Voir détails
                </button>
                <button className="flex-1 bg-fantasy-100 hover:bg-fantasy-200 text-fantasy-700 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
                  <Sword className="h-4 w-4" />
                  <span>Assigner</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPanel;