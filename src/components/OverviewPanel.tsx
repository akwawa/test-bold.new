import React from 'react';
import { Users, Map, Trophy, Clock, Sword } from 'lucide-react';
import { mockActiveQuests, mockCharacters } from '../data/mockData';
import ActiveQuestCard from './ActiveQuestCard';
import CharacterCard from './CharacterCard';

interface OverviewPanelProps {
  onViewCharacterDetails: (characterId: number) => void;
}

const OverviewPanel: React.FC<OverviewPanelProps> = ({ onViewCharacterDetails }) => {
  const availableCharacters = mockCharacters.filter(char => char.isAvailable);
  const busyCharacters = mockCharacters.filter(char => !char.isAvailable);

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
              <p className="text-blue-100 text-sm">Personnages</p>
              <p className="text-3xl font-bold">{mockCharacters.length}</p>
            </div>
            <Sword className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Disponibles</p>
              <p className="text-3xl font-bold">{availableCharacters.length}</p>
            </div>
            <Users className="h-12 w-12 text-green-200" />
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
              <p className="text-3xl font-bold">{mockActiveQuests.length}</p>
            </div>
            <Clock className="h-12 w-12 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Quêtes en cours */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-stone-800 mb-4">Quêtes en cours</h3>
        {mockActiveQuests.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockActiveQuests.map((quest) => (
              <ActiveQuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200 text-center">
            <Map className="h-12 w-12 text-stone-400 mx-auto mb-3" />
            <p className="text-stone-600">Aucune quête en cours</p>
            <p className="text-stone-500 text-sm mt-1">Assignez des équipes à des quêtes pour commencer</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personnages disponibles */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Personnages disponibles</h3>
          {availableCharacters.length > 0 ? (
            <div className="space-y-3">
              {availableCharacters.map((character) => (
                <CharacterCard 
                  key={character.id} 
                  character={character} 
                  onViewDetails={onViewCharacterDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <Users className="h-8 w-8 text-stone-400 mx-auto mb-2" />
              <p className="text-stone-600">Tous vos personnages sont en mission</p>
            </div>
          )}
        </div>

        {/* Activité récente */}
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
                <p className="text-stone-700 font-medium">Aria Lamevent a gagné un niveau</p>
                <p className="text-stone-500 text-sm">Il y a 3 heures</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-700 font-medium">Nouvelle quête "Négociation Diplomatique" commencée</p>
                <p className="text-stone-500 text-sm">Il y a 45 minutes</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div>
                <p className="text-stone-700 font-medium">Équipement "Épée de Flammes" obtenu</p>
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