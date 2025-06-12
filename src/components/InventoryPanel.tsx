import React from 'react';
import { Package, Sword, Shield, Gem, Option as Potion } from 'lucide-react';

const InventoryPanel: React.FC = () => {
  const inventory = [
    {
      id: 1,
      name: 'Épée de Flammes',
      type: 'Arme',
      rarity: 'Rare',
      quantity: 1,
      description: 'Une épée enchantée qui brûle les ennemis.',
      icon: Sword
    },
    {
      id: 2,
      name: 'Bouclier de Fer',
      type: 'Armure',
      rarity: 'Commun',
      quantity: 3,
      description: 'Un bouclier solide pour la défense.',
      icon: Shield
    },
    {
      id: 3,
      name: 'Potion de Soin',
      type: 'Consommable',
      rarity: 'Commun',
      quantity: 12,
      description: 'Restaure la santé de l\'utilisateur.',
      icon: Potion
    },
    {
      id: 4,
      name: 'Cristal de Mana',
      type: 'Matériau',
      rarity: 'Épique',
      quantity: 2,
      description: 'Un cristal rare contenant de la magie pure.',
      icon: Gem
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
      case 'Matériau': return 'text-purple-500';
      default: return 'text-stone-500';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Inventaire</h2>
        <p className="text-stone-600 mt-2">Gérez vos objets et équipements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                
                <p className="text-sm text-stone-600 leading-relaxed">{item.description}</p>
                
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-fantasy-100 hover:bg-fantasy-200 text-fantasy-700 py-2 px-3 rounded text-sm font-medium transition-colors">
                    Utiliser
                  </button>
                  <button className="bg-stone-100 hover:bg-stone-200 text-stone-700 py-2 px-3 rounded text-sm font-medium transition-colors">
                    Info
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-stone-200">
        <h3 className="text-xl font-bold text-stone-800 mb-4">Statistiques de l'inventaire</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-stone-800">18</div>
            <div className="text-sm text-stone-600">Objets totaux</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">4</div>
            <div className="text-sm text-stone-600">Types différents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">2</div>
            <div className="text-sm text-stone-600">Objets épiques</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">85%</div>
            <div className="text-sm text-stone-600">Espace utilisé</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPanel;