import React from 'react';
import { Package, Sword, Shield, Gem, Scroll, Option as Potion } from 'lucide-react';

const InventoryPanel: React.FC = () => {
  const inventory = [
    {
      id: 1,
      name: 'Épée Longue +2',
      type: 'Arme',
      rarity: 'Rare',
      quantity: 1,
      description: 'Une épée longue enchantée par les forgerons de Mithral Hall.',
      icon: Sword,
      value: 500
    },
    {
      id: 2,
      name: 'Bouclier de Résistance au Feu',
      type: 'Armure',
      rarity: 'Rare',
      quantity: 1,
      description: 'Un bouclier gravé de runes qui protège contre les flammes.',
      icon: Shield,
      value: 400
    },
    {
      id: 3,
      name: 'Potion de Soins Majeurs',
      type: 'Consommable',
      rarity: 'Commun',
      quantity: 8,
      description: 'Restaure 4d4+4 points de vie instantanément.',
      icon: Potion,
      value: 50
    },
    {
      id: 4,
      name: 'Parchemin de Boule de Feu',
      type: 'Parchemin',
      rarity: 'Rare',
      quantity: 3,
      description: 'Permet de lancer le sort Boule de Feu (niveau 3).',
      icon: Scroll,
      value: 150
    },
    {
      id: 5,
      name: 'Gemme de Pouvoir',
      type: 'Matériau',
      rarity: 'Épique',
      quantity: 2,
      description: 'Une gemme rare utilisée pour enchanter les objets magiques.',
      icon: Gem,
      value: 1000
    },
    {
      id: 6,
      name: 'Arc Long Elfique',
      type: 'Arme',
      rarity: 'Épique',
      quantity: 1,
      description: 'Un arc légendaire forgé dans les forêts de Cormanthor.',
      icon: Sword,
      value: 800
    },
    {
      id: 7,
      name: 'Armure de Plates Naine',
      type: 'Armure',
      rarity: 'Rare',
      quantity: 1,
      description: 'Une armure forgée dans les mines profondes de Citadelle Felbarr.',
      icon: Shield,
      value: 750
    },
    {
      id: 8,
      name: 'Potion d\'Invisibilité',
      type: 'Consommable',
      rarity: 'Rare',
      quantity: 2,
      description: 'Rend invisible pendant 1 heure.',
      icon: Potion,
      value: 200
    },
    {
      id: 9,
      name: 'Parchemin de Résurrection',
      type: 'Parchemin',
      rarity: 'Légendaire',
      quantity: 1,
      description: 'Permet de ramener un personnage à la vie.',
      icon: Scroll,
      value: 5000
    },
    {
      id: 10,
      name: 'Bâton de Guerre +1',
      type: 'Arme',
      rarity: 'Commun',
      quantity: 2,
      description: 'Un bâton de combat renforcé magiquement.',
      icon: Sword,
      value: 200
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Commun': return 'text-stone-600 bg-stone-100 border-stone-300';
      case 'Rare': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'Épique': return 'text-purple-600 bg-purple-100 border-purple-300';
      case 'Légendaire': return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      default: return 'text-stone-600 bg-stone-100 border-stone-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Arme': return 'text-red-500';
      case 'Armure': return 'text-blue-500';
      case 'Consommable': return 'text-green-500';
      case 'Parchemin': return 'text-purple-500';
      case 'Matériau': return 'text-yellow-500';
      default: return 'text-stone-500';
    }
  };

  const totalValue = inventory.reduce((sum, item) => sum + (item.value * item.quantity), 0);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Inventaire de la Guilde</h2>
        <p className="text-stone-600 mt-2">Gérez vos objets magiques et équipements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {inventory.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className={`bg-white rounded-lg shadow-md border-2 ${getRarityColor(item.rarity)} overflow-hidden hover:shadow-lg transition-shadow`}>
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-stone-100 ${getTypeIcon(item.type)}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-stone-800">×{item.quantity}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-stone-800 mb-1">{item.name}</h3>
                <p className="text-xs text-stone-500 mb-2">{item.type}</p>
                
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(item.rarity)}`}>
                    {item.rarity}
                  </span>
                </div>
                
                <p className="text-sm text-stone-600 leading-relaxed mb-3">{item.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-stone-500">Valeur unitaire:</span>
                  <span className="text-sm font-medium text-yellow-600">{item.value} po</span>
                </div>
                
                <div className="flex space-x-2">
                  <button className="flex-1 bg-fantasy-100 hover:bg-fantasy-200 text-fantasy-700 py-2 px-3 rounded text-xs font-medium transition-colors">
                    Équiper
                  </button>
                  <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-3 rounded text-xs font-medium transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistiques de l'inventaire */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Statistiques de l'Inventaire</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-800">{inventory.reduce((sum, item) => sum + item.quantity, 0)}</div>
              <div className="text-sm text-stone-600">Objets totaux</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{inventory.length}</div>
              <div className="text-sm text-stone-600">Types différents</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{inventory.filter(item => item.rarity === 'Épique').length}</div>
              <div className="text-sm text-stone-600">Objets épiques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{inventory.filter(item => item.rarity === 'Légendaire').length}</div>
              <div className="text-sm text-stone-600">Objets légendaires</div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-stone-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-stone-700">Valeur totale:</span>
              <span className="text-xl font-bold text-yellow-600">{totalValue.toLocaleString()} po</span>
            </div>
          </div>
        </div>

        {/* Répartition par rareté */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
          <h3 className="text-xl font-bold text-stone-800 mb-4">Répartition par Rareté</h3>
          <div className="space-y-3">
            {['Commun', 'Rare', 'Épique', 'Légendaire'].map(rarity => {
              const count = inventory.filter(item => item.rarity === rarity).length;
              const percentage = (count / inventory.length) * 100;
              
              return (
                <div key={rarity} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(rarity)}`}>
                      {rarity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-stone-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          rarity === 'Commun' ? 'bg-stone-500' :
                          rarity === 'Rare' ? 'bg-blue-500' :
                          rarity === 'Épique' ? 'bg-purple-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-stone-700">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPanel;