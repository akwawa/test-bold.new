import React from 'react';
import { Users, Map, Trophy, Clock } from 'lucide-react';

const OverviewPanel: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Vue d'ensemble</h2>
        <p className="text-stone-600 mt-2">Gérez vos équipes et suivez vos quêtes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Équipes actives</p>
              <p className="text-3xl font-bold">3</p>
            </div>
            <Users className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Quêtes disponibles</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <Map className="h-12 w-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Quêtes complétées</p>
              <p className="text-3xl font-bold">28</p>
            </div>
            <Trophy className="h-12 w-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Quêtes en cours</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            <Clock className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Équipes récentes</h3>
          <div className="space-y-3">
            {['Les Lames d\'Acier', 'Gardiens de la Forêt', 'Mages de Cristal'].map((team, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="font-medium text-stone-700">{team}</span>
                <span className="text-sm text-stone-500">Niveau {index + 3}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Activité récente</h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-700 font-medium">Quête "Forêt Maudite" terminée</p>
                <p className="text-stone-500 text-sm">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-700 font-medium">Nouvelle équipe créée</p>
                <p className="text-stone-500 text-sm">Il y a 5 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-700 font-medium">Équipement amélioré</p>
                <p className="text-stone-500 text-sm">Il y a 1 jour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;