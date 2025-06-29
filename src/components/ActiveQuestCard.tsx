import React from 'react';
import { Clock, Users, Star, Trophy, Sun, Moon } from 'lucide-react';
import { ActiveQuest } from '../types';

interface ActiveQuestCardProps {
  quest: ActiveQuest;
  currentCycle: { day: number; period: 'day' | 'night'; totalCycles: number };
}

const ActiveQuestCard: React.FC<ActiveQuestCardProps> = ({ quest, currentCycle }) => {
  const formatCycleTime = (cycles: number): string => {
    if (cycles === 0) return 'Terminé !';
    if (cycles === 1) return '1 cycle';
    
    const days = Math.floor(cycles / 2);
    const periods = cycles % 2;
    
    if (days > 0) {
      if (periods === 0) {
        return `${days} jour${days > 1 ? 's' : ''}`;
      } else {
        return `${days} jour${days > 1 ? 's' : ''} et ${periods === 1 ? '1 période' : '2 périodes'}`;
      }
    } else {
      return `${periods} période${periods > 1 ? 's' : ''}`;
    }
  };

  const getProgressColor = (progress: number): string => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
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

  const getCycleIcon = () => {
    return currentCycle.period === 'day' ? 
      <Sun className="h-3 w-3 text-yellow-500" /> : 
      <Moon className="h-3 w-3 text-blue-500" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-stone-200 p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-bold text-stone-800 text-sm mb-1">{quest.title}</h4>
          <div className="flex items-center space-x-1 mb-2">
            {getDifficultyStars(quest.difficulty)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-stone-500 flex items-center space-x-1">
            {getCycleIcon()}
            <span>Temps restant</span>
          </div>
          <div className="font-semibold text-stone-700 text-sm">
            {formatCycleTime(quest.cyclesRemaining)}
          </div>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
          <span>Progression</span>
          <span>{quest.progress}%</span>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(quest.progress)}`}
            style={{ width: `${quest.progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="h-3 w-3 text-stone-500" />
          <span className="text-xs text-stone-600">{quest.assignedTeam.name}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Trophy className="h-3 w-3 text-yellow-500" />
          <span className="text-xs font-medium text-stone-700">{quest.reward} or</span>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-stone-100">
        <div className="text-xs text-stone-500 mb-2">Équipe assignée:</div>
        <div className="flex flex-wrap gap-1">
          {quest.assignedTeam.members.map((character) => (
            <div
              key={character.id}
              className="flex items-center space-x-1 bg-stone-50 rounded-full px-2 py-1"
            >
              <span className="text-xs">{character.avatar}</span>
              <span className="text-xs font-medium text-stone-700">{character.name}</span>
              <span className="text-xs text-stone-500">Niv.{character.level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de cycle de début */}
      <div className="mt-2 pt-2 border-t border-stone-100">
        <div className="text-xs text-stone-500">
          Commencée: Jour {Math.floor(quest.startCycle / 2) + 1} - 
          {quest.startCycle % 2 === 0 ? ' Jour' : ' Nuit'}
        </div>
      </div>
    </div>
  );
};

export default ActiveQuestCard;