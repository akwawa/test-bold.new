import React from 'react';
import { Crown, Users, Star, Coins, Gem, Trophy, TrendingUp } from 'lucide-react';
import { mockGuild } from '../data/mockData';
import BuildingCard from './BuildingCard';

const GuildPanel: React.FC = () => {
  const guild = mockGuild;

  const handleUpgradeBuilding = (buildingId: number) => {
    console.log(`Amélioration du bâtiment ${buildingId}`);
    // Ici on implémenterait la logique d'amélioration
  };

  const getReputationLevel = (reputation: number): string => {
    if (reputation < 500) return 'Novice';
    if (reputation < 1000) return 'Reconnue';
    if (reputation < 2000) return 'Respectée';
    if (reputation < 3000) return 'Célèbre';
    return 'Légendaire';
  };

  const getExperienceProgress = (): number => {
    const baseXP = guild.level * 1000;
    const nextLevelXP = (guild.level + 1) * 1000;
    const currentProgress = guild.experience - baseXP;
    const totalNeeded = nextLevelXP - baseXP;
    return (currentProgress / totalNeeded) * 100;
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Ma Guilde</h2>
        <p className="text-stone-600 mt-2">Gérez et améliorez votre guilde d'aventuriers</p>
      </div>

      {/* Informations de la guilde */}
      <div className="bg-gradient-to-r from-fantasy-800 to-fantasy-900 rounded-xl p-6 text-white mb-8 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-fantasy-600 p-3 rounded-lg">
              <Crown className="h-8 w-8 text-fantasy-100" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">{guild.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < guild.level ? 'text-yellow-300 fill-current' : 'text-white/30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-fantasy-200">Niveau {guild.level}</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-fantasy-200 text-sm">Réputation</div>
            <div className="text-xl font-bold">{getReputationLevel(guild.reputation)}</div>
            <div className="text-fantasy-300 text-sm">{guild.reputation} points</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-fantasy-700/50 rounded-lg p-3 text-center">
            <Users className="h-6 w-6 mx-auto mb-1 text-fantasy-200" />
            <div className="text-lg font-bold">{guild.currentMembers}/{guild.maxMembers}</div>
            <div className="text-fantasy-300 text-xs">Membres</div>
          </div>
          
          <div className="bg-fantasy-700/50 rounded-lg p-3 text-center">
            <Coins className="h-6 w-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold">{guild.gold}</div>
            <div className="text-fantasy-300 text-xs">Or</div>
          </div>
          
          <div className="bg-fantasy-700/50 rounded-lg p-3 text-center">
            <Gem className="h-6 w-6 mx-auto mb-1 text-blue-400" />
            <div className="text-lg font-bold">{guild.gems}</div>
            <div className="text-fantasy-300 text-xs">Gemmes</div>
          </div>
          
          <div className="bg-fantasy-700/50 rounded-lg p-3 text-center">
            <Trophy className="h-6 w-6 mx-auto mb-1 text-yellow-400" />
            <div className="text-lg font-bold">{guild.buildings.length}</div>
            <div className="text-fantasy-300 text-xs">Bâtiments</div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-sm text-fantasy-200 mb-1">
            <span>Progression vers le niveau {guild.level + 1}</span>
            <span>{guild.experience} XP</span>
          </div>
          <div className="w-full bg-fantasy-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all"
              style={{ width: `${getExperienceProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-stone-800">Efficacité</h4>
              <p className="text-2xl font-bold text-green-600">87%</p>
              <p className="text-stone-500 text-sm">Taux de réussite des quêtes</p>
            </div>
            <TrendingUp className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-stone-800">Revenus</h4>
              <p className="text-2xl font-bold text-yellow-600">2,450</p>
              <p className="text-stone-500 text-sm">Or gagné cette semaine</p>
            </div>
            <Coins className="h-12 w-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-bold text-stone-800">Activité</h4>
              <p className="text-2xl font-bold text-blue-600">12</p>
              <p className="text-stone-500 text-sm">Quêtes terminées</p>
            </div>
            <Trophy className="h-12 w-12 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Infrastructures */}
      <div>
        <h3 className="text-2xl font-bold text-stone-800 mb-6">Infrastructures de la Guilde</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guild.buildings.map((building) => (
            <BuildingCard
              key={building.id}
              building={building}
              onUpgrade={handleUpgradeBuilding}
            />
          ))}
        </div>
      </div>

      {/* Conseils d'amélioration */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h4 className="text-lg font-bold text-blue-800 mb-3">💡 Conseils d'amélioration</h4>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span className="text-sm">Améliorez la Taverne pour augmenter la capacité de votre guilde</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span className="text-sm">Le Tableau des Quêtes en cours d'amélioration permettra plus de quêtes simultanées</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-500 mt-1">•</span>
            <span className="text-sm">Construisez une Infirmerie de niveau supérieur pour réduire les temps de récupération</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GuildPanel;