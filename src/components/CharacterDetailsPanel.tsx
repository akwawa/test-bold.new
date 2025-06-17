import React, { useState } from 'react';
import { ArrowLeft, Star, Heart, Zap, Sword, Shield, Brain, Activity, Calendar, Trophy, Coins } from 'lucide-react';
import { Character, Equipment, Skill } from '../types';
import { mockCharacters } from '../data/mockData';

interface CharacterDetailsPanelProps {
  characterId?: number;
  onBack: () => void;
}

const CharacterDetailsPanel: React.FC<CharacterDetailsPanelProps> = ({ characterId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'equipment' | 'skills' | 'history'>('stats');
  
  const character = mockCharacters.find(c => c.id === characterId);
  
  if (!character) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800">Personnage non trouvé</h2>
          <button
            onClick={onBack}
            className="mt-4 bg-fantasy-600 hover:bg-fantasy-700 text-white px-4 py-2 rounded-lg"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  const getClassColor = (characterClass: string): string => {
    switch (characterClass) {
      case 'Guerrière':
      case 'Guerrier':
        return 'from-red-500 to-red-600';
      case 'Mage':
        return 'from-blue-500 to-blue-600';
      case 'Rôdeur':
        return 'from-green-500 to-green-600';
      case 'Paladin':
        return 'from-yellow-500 to-yellow-600';
      case 'Druide':
        return 'from-emerald-500 to-emerald-600';
      case 'Assassin':
        return 'from-purple-500 to-purple-600';
      default:
        return 'from-stone-500 to-stone-600';
    }
  };

  const getRarityColor = (rarity: string): string => {
    switch (rarity) {
      case 'common': return 'text-stone-600 bg-stone-100 border-stone-300';
      case 'rare': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'epic': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'legendary': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const getSkillTypeColor = (type: string): string => {
    switch (type) {
      case 'combat': return 'text-red-600 bg-red-100';
      case 'magic': return 'text-blue-600 bg-blue-100';
      case 'utility': return 'text-green-600 bg-green-100';
      default: return 'text-stone-600 bg-stone-100';
    }
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTotalStats = () => {
    const baseStats = character.stats;
    const equipmentStats = {
      strength: 0,
      agility: 0,
      intelligence: 0,
      vitality: 0
    };

    Object.values(character.equipment).forEach(item => {
      if (item?.stats) {
        equipmentStats.strength += item.stats.strength || 0;
        equipmentStats.agility += item.stats.agility || 0;
        equipmentStats.intelligence += item.stats.intelligence || 0;
        equipmentStats.vitality += item.stats.vitality || 0;
      }
    });

    return {
      strength: baseStats.strength + equipmentStats.strength,
      agility: baseStats.agility + equipmentStats.agility,
      intelligence: baseStats.intelligence + equipmentStats.intelligence,
      vitality: baseStats.vitality + equipmentStats.vitality,
      equipmentBonus: equipmentStats
    };
  };

  const totalStats = getTotalStats();

  const renderEquipmentSlot = (slot: keyof typeof character.equipment, label: string) => {
    const item = character.equipment[slot];
    
    return (
      <div className="bg-stone-50 rounded-lg p-4 border-2 border-dashed border-stone-200">
        <div className="text-center">
          <div className="text-sm font-medium text-stone-600 mb-2">{label}</div>
          {item ? (
            <div className={`bg-white rounded-lg p-3 border-2 ${getRarityColor(item.rarity)}`}>
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="font-bold text-sm">{item.name}</div>
              <div className="text-xs text-stone-500 mb-2">{item.rarity}</div>
              <div className="text-xs text-stone-600">{item.description}</div>
              {item.stats && (
                <div className="mt-2 text-xs">
                  {Object.entries(item.stats).map(([stat, value]) => (
                    <div key={stat} className="flex justify-between">
                      <span className="capitalize">{stat}:</span>
                      <span className="text-green-600">+{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-stone-400 py-8">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-xs">Aucun équipement</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header avec bouton retour */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Retour</span>
        </button>
      </div>

      {/* Profil du personnage */}
      <div className={`bg-gradient-to-r ${getClassColor(character.class)} rounded-xl p-6 text-white mb-6 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-6xl">{character.avatar}</div>
            <div>
              <h1 className="text-3xl font-bold">{character.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xl">{character.class}</span>
                <div className="flex items-center space-x-1 ml-4">
                  <Star className="h-4 w-4 text-yellow-300 fill-current" />
                  <span>Niveau {character.level}</span>
                </div>
              </div>
              <div className="mt-2 text-sm opacity-90">
                {character.isAvailable ? (
                  <span className="bg-green-500 px-2 py-1 rounded-full text-xs">Disponible</span>
                ) : (
                  <span className="bg-orange-500 px-2 py-1 rounded-full text-xs">En mission</span>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm opacity-90">Expérience</div>
            <div className="text-2xl font-bold">{character.experience} XP</div>
            <div className="w-32 bg-white/20 rounded-full h-2 mt-1">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: `${(character.experience % 1000) / 10}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barres de vie et mana */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 shadow-md border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span className="font-medium text-stone-800">Points de Vie</span>
            </div>
            <span className="text-sm text-stone-600">{character.health}/{character.maxHealth}</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all"
              style={{ width: `${(character.health / character.maxHealth) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-stone-800">Points de Mana</span>
            </div>
            <span className="text-sm text-stone-600">{character.mana}/{character.maxMana}</span>
          </div>
          <div className="w-full bg-stone-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${(character.mana / character.maxMana) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white rounded-lg shadow-md border border-stone-200 mb-6">
        <div className="flex border-b border-stone-200">
          {[
            { id: 'stats', label: 'Statistiques', icon: Activity },
            { id: 'equipment', label: 'Équipement', icon: Shield },
            { id: 'skills', label: 'Compétences', icon: Brain },
            { id: 'history', label: 'Historique', icon: Calendar }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
                  activeTab === tab.id
                    ? 'bg-fantasy-50 text-fantasy-700 border-b-2 border-fantasy-500'
                    : 'text-stone-600 hover:text-stone-800 hover:bg-stone-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Onglet Statistiques */}
          {activeTab === 'stats' && (
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Statistiques</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Force', value: totalStats.strength, bonus: totalStats.equipmentBonus.strength, icon: Sword, color: 'text-red-600' },
                  { name: 'Agilité', value: totalStats.agility, bonus: totalStats.equipmentBonus.agility, icon: Activity, color: 'text-green-600' },
                  { name: 'Intelligence', value: totalStats.intelligence, bonus: totalStats.equipmentBonus.intelligence, icon: Brain, color: 'text-blue-600' },
                  { name: 'Vitalité', value: totalStats.vitality, bonus: totalStats.equipmentBonus.vitality, icon: Heart, color: 'text-purple-600' }
                ].map(stat => {
                  const Icon = stat.icon;
                  return (
                    <div key={stat.name} className="bg-stone-50 rounded-lg p-4 text-center">
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                      <div className="font-bold text-2xl text-stone-800">
                        {stat.value}
                        {stat.bonus > 0 && (
                          <span className="text-sm text-green-600 ml-1">(+{stat.bonus})</span>
                        )}
                      </div>
                      <div className="text-sm text-stone-600">{stat.name}</div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6 bg-stone-50 rounded-lg p-4">
                <h4 className="font-bold text-stone-800 mb-3">Biographie</h4>
                <p className="text-stone-600 leading-relaxed">{character.biography}</p>
              </div>
            </div>
          )}

          {/* Onglet Équipement */}
          {activeTab === 'equipment' && (
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Équipement</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {renderEquipmentSlot('weapon', 'Arme')}
                {renderEquipmentSlot('armor', 'Armure')}
                {renderEquipmentSlot('accessory', 'Accessoire')}
              </div>
            </div>
          )}

          {/* Onglet Compétences */}
          {activeTab === 'skills' && (
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Compétences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.skills.map(skill => (
                  <div key={skill.id} className="bg-stone-50 rounded-lg p-4 border border-stone-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{skill.icon}</div>
                        <div>
                          <h4 className="font-bold text-stone-800">{skill.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillTypeColor(skill.type)}`}>
                            {skill.type}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-stone-600">Niveau</div>
                        <div className="font-bold text-stone-800">{skill.level}/{skill.maxLevel}</div>
                      </div>
                    </div>
                    
                    <p className="text-stone-600 text-sm mb-3">{skill.description}</p>
                    
                    <div className="w-full bg-stone-200 rounded-full h-2">
                      <div
                        className="bg-fantasy-500 h-2 rounded-full"
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Historique */}
          {activeTab === 'history' && (
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">Historique</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-stone-50 rounded-lg p-4 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="font-bold text-2xl text-stone-800">{formatDate(character.joinDate)}</div>
                  <div className="text-sm text-stone-600">Date d'arrivée</div>
                </div>
                
                <div className="bg-stone-50 rounded-lg p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                  <div className="font-bold text-2xl text-stone-800">{character.questsCompleted}</div>
                  <div className="text-sm text-stone-600">Quêtes terminées</div>
                </div>
                
                <div className="bg-stone-50 rounded-lg p-4 text-center">
                  <Coins className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="font-bold text-2xl text-stone-800">{character.totalEarnings}</div>
                  <div className="text-sm text-stone-600">Or total gagné</div>
                </div>
              </div>
              
              <div className="bg-stone-50 rounded-lg p-4">
                <h4 className="font-bold text-stone-800 mb-3">Activités récentes</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-stone-700 font-medium">Quête "Forêt Maudite" terminée avec succès</p>
                      <p className="text-stone-500 text-sm">Il y a 2 jours - Récompense: 250 or</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-stone-700 font-medium">Niveau {character.level} atteint</p>
                      <p className="text-stone-500 text-sm">Il y a 5 jours</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-stone-700 font-medium">Nouvelle compétence apprise</p>
                      <p className="text-stone-500 text-sm">Il y a 1 semaine</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPanel;