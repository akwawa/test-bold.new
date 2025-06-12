import React from 'react';
import { Star, Zap } from 'lucide-react';
import { Character } from '../types';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const getClassColor = (characterClass: string): string => {
    switch (characterClass) {
      case 'Guerrière':
      case 'Guerrier':
        return 'text-red-600 bg-red-100';
      case 'Mage':
        return 'text-blue-600 bg-blue-100';
      case 'Rôdeur':
        return 'text-green-600 bg-green-100';
      case 'Paladin':
        return 'text-yellow-600 bg-yellow-100';
      case 'Druide':
        return 'text-emerald-600 bg-emerald-100';
      case 'Assassin':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-stone-600 bg-stone-100';
    }
  };

  const getAvailabilityStatus = () => {
    if (character.isAvailable) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
          Disponible
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-1"></div>
          En mission
        </span>
      );
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md border border-stone-200 p-4 ${
      !character.isAvailable ? 'opacity-75' : ''
    } hover:shadow-lg transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{character.avatar}</div>
          <div>
            <h3 className="font-bold text-stone-800 text-sm">{character.name}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassColor(character.class)}`}>
                {character.class}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium text-stone-600">Niv. {character.level}</span>
              </div>
            </div>
          </div>
        </div>
        {getAvailabilityStatus()}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="text-center">
          <div className="text-xs text-stone-500">Force</div>
          <div className="font-semibold text-red-600">{character.stats.strength}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-stone-500">Agilité</div>
          <div className="font-semibold text-green-600">{character.stats.agility}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-stone-500">Intelligence</div>
          <div className="font-semibold text-blue-600">{character.stats.intelligence}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-stone-500">Vitalité</div>
          <div className="font-semibold text-purple-600">{character.stats.vitality}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
          <span>Expérience</span>
          <span>{character.experience} XP</span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className="bg-fantasy-500 h-2 rounded-full transition-all"
            style={{ width: `${(character.experience % 1000) / 10}%` }}
          />
        </div>
      </div>

      <div className="flex space-x-2">
        <button
          className={`flex-1 py-2 px-3 rounded text-xs font-medium transition-colors ${
            character.isAvailable
              ? 'bg-fantasy-100 hover:bg-fantasy-200 text-fantasy-700'
              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
          disabled={!character.isAvailable}
        >
          Assigner
        </button>
        <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-3 rounded text-xs font-medium transition-colors">
          Détails
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;