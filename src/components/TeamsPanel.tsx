import React, { useState } from 'react';
import { Plus, Users, Star, Edit, X, Check, AlertCircle, Crown } from 'lucide-react';
import { GameSave, Character, Team } from '../types';

interface TeamsPanelProps {
  gameData: GameSave;
  onUpdateGameData?: (gameData: GameSave) => void;
}

const TeamsPanel: React.FC<TeamsPanelProps> = ({ gameData, onUpdateGameData }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [teamSpecialty, setTeamSpecialty] = useState('');

  // Calculer la taille maximale d'équipe basée sur le niveau de la guilde et des personnages
  const calculateMaxTeamSize = (characters: Character[]): number => {
    const guildLevel = gameData.guild.level;
    const baseSize = Math.min(2 + Math.floor(guildLevel / 2), 6); // 2-6 membres selon niveau guilde
    
    if (characters.length === 0) return baseSize;
    
    // Bonus basé sur le niveau moyen des personnages sélectionnés
    const avgLevel = characters.reduce((sum, char) => sum + char.level, 0) / characters.length;
    const levelBonus = Math.floor(avgLevel / 3); // +1 membre tous les 3 niveaux moyens
    
    return Math.min(baseSize + levelBonus, 8); // Maximum absolu de 8
  };

  const maxTeamSize = calculateMaxTeamSize(selectedCharacters);
  const availableCharacters = gameData.characters.filter(char => 
    char.isAvailable && !gameData.teams.some(team => 
      team.members.some(member => member.id === char.id)
    )
  );

  const specialties = [
    'Exploration de Donjons',
    'Combat Rapproché', 
    'Magie Divine',
    'Infiltration',
    'Diplomatie',
    'Chasse aux Monstres',
    'Récupération d\'Artefacts',
    'Escorte et Protection'
  ];

  const handleCreateTeam = () => {
    if (!newTeamName.trim() || selectedCharacters.length < 2) return;

    const newTeam: Team = {
      id: Date.now(),
      name: newTeamName.trim(),
      level: Math.floor(selectedCharacters.reduce((sum, char) => sum + char.level, 0) / selectedCharacters.length),
      members: selectedCharacters,
      status: 'available',
      specialty: teamSpecialty || specialties[0],
      experience: 0
    };

    const updatedGameData = {
      ...gameData,
      teams: [...gameData.teams, newTeam]
    };

    if (onUpdateGameData) {
      onUpdateGameData(updatedGameData);
    }

    // Reset form
    setNewTeamName('');
    setSelectedCharacters([]);
    setTeamSpecialty('');
    setShowCreateModal(false);
  };

  const handleEditTeam = (team: Team) => {
    setEditingTeam(team);
    setNewTeamName(team.name);
    setSelectedCharacters(team.members);
    setTeamSpecialty(team.specialty);
    setShowEditModal(true);
  };

  const handleUpdateTeam = () => {
    if (!editingTeam || !newTeamName.trim() || selectedCharacters.length < 2) return;

    const updatedTeam: Team = {
      ...editingTeam,
      name: newTeamName.trim(),
      level: Math.floor(selectedCharacters.reduce((sum, char) => sum + char.level, 0) / selectedCharacters.length),
      members: selectedCharacters,
      specialty: teamSpecialty
    };

    const updatedGameData = {
      ...gameData,
      teams: gameData.teams.map(team => 
        team.id === editingTeam.id ? updatedTeam : team
      )
    };

    if (onUpdateGameData) {
      onUpdateGameData(updatedGameData);
    }

    // Reset form
    setEditingTeam(null);
    setNewTeamName('');
    setSelectedCharacters([]);
    setTeamSpecialty('');
    setShowEditModal(false);
  };

  const toggleCharacterSelection = (character: Character) => {
    if (selectedCharacters.find(char => char.id === character.id)) {
      setSelectedCharacters(selectedCharacters.filter(char => char.id !== character.id));
    } else if (selectedCharacters.length < maxTeamSize) {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const getAvailableCharactersForEdit = (team: Team): Character[] => {
    // Pour l'édition, inclure les personnages de l'équipe actuelle + les personnages disponibles
    const teamMemberIds = team.members.map(member => member.id);
    const availableForEdit = gameData.characters.filter(char => 
      char.isAvailable || teamMemberIds.includes(char.id)
    ).filter(char => 
      !gameData.teams.some(otherTeam => 
        otherTeam.id !== team.id && otherTeam.members.some(member => member.id === char.id)
      )
    );
    return availableForEdit;
  };

  const getClassColor = (characterClass: string): string => {
    switch (characterClass) {
      case 'Guerrière':
      case 'Guerrier':
        return 'text-red-600 bg-red-100';
      case 'Mage':
      case 'Magicienne':
        return 'text-blue-600 bg-blue-100';
      case 'Rôdeur':
      case 'Rôdeuse':
        return 'text-green-600 bg-green-100';
      case 'Paladin':
      case 'Paladine':
        return 'text-yellow-600 bg-yellow-100';
      case 'Druide':
      case 'Druidesse':
        return 'text-emerald-600 bg-emerald-100';
      case 'Roublard':
      case 'Roublarde':
        return 'text-purple-600 bg-purple-100';
      case 'Clerc':
        return 'text-pink-600 bg-pink-100';
      case 'Barbare':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-stone-600 bg-stone-100';
    }
  };

  const getTeamSynergy = (characters: Character[]): { score: number; description: string } => {
    if (characters.length < 2) return { score: 0, description: 'Équipe incomplète' };

    const classes = characters.map(char => char.class);
    let score = 50; // Score de base
    let bonuses: string[] = [];

    // Bonus pour diversité des classes
    const uniqueClasses = new Set(classes).size;
    if (uniqueClasses >= 3) {
      score += 20;
      bonuses.push('Diversité des classes');
    }

    // Bonus pour combinaisons spécifiques
    const hasHealer = classes.some(c => c.includes('Clerc') || c.includes('Druide') || c.includes('Paladin'));
    const hasTank = classes.some(c => c.includes('Guerrier') || c.includes('Paladin'));
    const hasDPS = classes.some(c => c.includes('Mage') || c.includes('Rôdeur') || c.includes('Roublard'));

    if (hasHealer && hasTank && hasDPS) {
      score += 25;
      bonuses.push('Formation équilibrée');
    }

    // Bonus pour niveaux similaires
    const levels = characters.map(char => char.level);
    const levelDiff = Math.max(...levels) - Math.min(...levels);
    if (levelDiff <= 1) {
      score += 15;
      bonuses.push('Niveaux homogènes');
    }

    const description = bonuses.length > 0 ? bonuses.join(', ') : 'Synergie standard';
    return { score: Math.min(score, 100), description };
  };

  const synergy = getTeamSynergy(selectedCharacters);

  const renderTeamModal = (isEdit: boolean = false) => {
    const currentAvailableCharacters = isEdit && editingTeam 
      ? getAvailableCharactersForEdit(editingTeam)
      : availableCharacters;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-stone-800">
                {isEdit ? `Modifier l'équipe "${editingTeam?.name}"` : 'Créer une nouvelle équipe'}
              </h3>
              <button
                onClick={() => {
                  if (isEdit) {
                    setShowEditModal(false);
                    setEditingTeam(null);
                  } else {
                    setShowCreateModal(false);
                  }
                  setNewTeamName('');
                  setSelectedCharacters([]);
                  setTeamSpecialty('');
                }}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration de l'équipe */}
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Nom de l'équipe
                  </label>
                  <input
                    type="text"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Ex: Les Gardiens de la Lumière"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-fantasy-500 focus:border-fantasy-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Spécialité
                  </label>
                  <select
                    value={teamSpecialty}
                    onChange={(e) => setTeamSpecialty(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-fantasy-500 focus:border-fantasy-500"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Informations sur l'équipe */}
                <div className="bg-stone-50 rounded-lg p-4 mb-4">
                  <h4 className="font-bold text-stone-800 mb-2">Informations de l'équipe</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Membres sélectionnés :</span>
                      <span className={selectedCharacters.length >= 2 ? 'text-green-600' : 'text-red-600'}>
                        {selectedCharacters.length}/{maxTeamSize}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Niveau moyen :</span>
                      <span>
                        {selectedCharacters.length > 0 
                          ? Math.floor(selectedCharacters.reduce((sum, char) => sum + char.level, 0) / selectedCharacters.length)
                          : 0
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Synergie :</span>
                      <span className={synergy.score >= 70 ? 'text-green-600' : synergy.score >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                        {synergy.score}% - {synergy.description}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Équipe sélectionnée */}
                {selectedCharacters.length > 0 && (
                  <div className="bg-fantasy-50 rounded-lg p-4">
                    <h4 className="font-bold text-fantasy-800 mb-2">Équipe actuelle</h4>
                    <div className="space-y-2">
                      {selectedCharacters.map((character) => (
                        <div key={character.id} className="flex items-center space-x-2 bg-white rounded-lg p-2">
                          <span className="text-lg">{character.avatar}</span>
                          <div className="flex-1">
                            <div className="font-medium text-stone-800 text-sm">{character.name}</div>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getClassColor(character.class)}`}>
                                {character.class}
                              </span>
                              <span className="text-xs text-stone-500">Niv. {character.level}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleCharacterSelection(character)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sélection des personnages */}
              <div>
                <h4 className="font-bold text-stone-800 mb-4">
                  Aventuriers disponibles ({currentAvailableCharacters.length})
                </h4>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {currentAvailableCharacters.map((character) => {
                    const isSelected = selectedCharacters.find(char => char.id === character.id);
                    const canSelect = !isSelected && selectedCharacters.length < maxTeamSize;

                    return (
                      <div
                        key={character.id}
                        onClick={() => canSelect && toggleCharacterSelection(character)}
                        className={`border-2 rounded-lg p-3 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-fantasy-500 bg-fantasy-50'
                            : canSelect
                            ? 'border-stone-200 hover:border-fantasy-300 bg-white'
                            : 'border-stone-200 bg-stone-50 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{character.avatar}</span>
                          <div className="flex-1">
                            <div className="font-bold text-stone-800">{character.name}</div>
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
                          {isSelected && (
                            <Check className="h-5 w-5 text-fantasy-600" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-stone-200">
              <div className="text-sm text-stone-600">
                {selectedCharacters.length < 2 && (
                  <span className="text-red-600">Sélectionnez au moins 2 aventuriers</span>
                )}
                {selectedCharacters.length >= maxTeamSize && (
                  <span className="text-orange-600">Équipe à capacité maximale</span>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    if (isEdit) {
                      setShowEditModal(false);
                      setEditingTeam(null);
                    } else {
                      setShowCreateModal(false);
                    }
                    setNewTeamName('');
                    setSelectedCharacters([]);
                    setTeamSpecialty('');
                  }}
                  className="px-4 py-2 text-stone-600 hover:text-stone-800 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={isEdit ? handleUpdateTeam : handleCreateTeam}
                  disabled={!newTeamName.trim() || selectedCharacters.length < 2}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    newTeamName.trim() && selectedCharacters.length >= 2
                      ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
                      : 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  }`}
                >
                  {isEdit ? 'Modifier l\'équipe' : 'Créer l\'équipe'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-stone-800 font-fantasy">Mes Équipes</h2>
          <p className="text-stone-600 mt-2">Gérez vos équipes d'aventuriers</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          disabled={availableCharacters.length < 2}
          className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg ${
            availableCharacters.length >= 2
              ? 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
              : 'bg-stone-300 text-stone-500 cursor-not-allowed'
          }`}
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle équipe</span>
        </button>
      </div>

      {/* Informations sur les limitations */}
      <div className="bg-gradient-to-r from-fantasy-50 to-fantasy-100 rounded-xl p-4 border border-fantasy-200 mb-6">
        <div className="flex items-start space-x-3">
          <Crown className="h-6 w-6 text-fantasy-600 mt-1" />
          <div>
            <h4 className="font-bold text-fantasy-800 mb-2">Règles de Formation d'Équipes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-fantasy-700">
              <div>
                <div className="font-medium mb-1">Taille d'équipe :</div>
                <div>• Minimum : 2 aventuriers</div>
                <div>• Maximum : {2 + Math.floor(gameData.guild.level / 2)} membres (niveau guilde {gameData.guild.level})</div>
                <div>• Bonus niveau : +1 membre tous les 3 niveaux moyens</div>
              </div>
              <div>
                <div className="font-medium mb-1">Bonus de synergie :</div>
                <div>• Diversité des classes : +20%</div>
                <div>• Formation équilibrée : +25%</div>
                <div>• Niveaux homogènes : +15%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {availableCharacters.length < 2 && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <div>
              <div className="font-medium text-orange-800">Pas assez d'aventuriers disponibles</div>
              <div className="text-orange-700 text-sm">
                Vous avez besoin d'au moins 2 aventuriers disponibles pour former une équipe.
                {gameData.characters.length < 2 ? ' Recrutez plus d\'aventuriers.' : ' Attendez que vos équipes terminent leurs missions.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {gameData.teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameData.teams.map((team) => (
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
                    <span className="text-stone-600">{team.members.length} membres</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    team.status === 'available' 
                      ? 'bg-green-100 text-green-800' 
                      : team.status === 'on_quest'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {team.status === 'available' ? 'Disponible' : 
                     team.status === 'on_quest' ? 'En mission' : 'Au repos'}
                  </span>
                </div>

                {/* Membres de l'équipe */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-stone-700 mb-2">Membres :</div>
                  <div className="space-y-1">
                    {team.members.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2 bg-stone-50 rounded-lg p-2">
                        <span className="text-lg">{member.avatar}</span>
                        <div className="flex-1">
                          <div className="font-medium text-stone-800 text-sm">{member.name}</div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getClassColor(member.class)}`}>
                              {member.class}
                            </span>
                            <span className="text-xs text-stone-500">Niv. {member.level}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
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
                  <button 
                    onClick={() => handleEditTeam(team)}
                    disabled={team.status === 'on_quest'}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1 ${
                      team.status !== 'on_quest'
                        ? 'bg-fantasy-100 hover:bg-fantasy-200 text-fantasy-700'
                        : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                    }`}
                  >
                    <Edit className="h-4 w-4" />
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg p-12 border border-stone-200 text-center">
          <Users className="h-16 w-16 text-stone-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-stone-800 mb-2">Aucune équipe formée</h3>
          <p className="text-stone-600 mb-6">
            Créez votre première équipe d'aventuriers pour commencer à accepter des quêtes.
          </p>
          {availableCharacters.length >= 2 ? (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-fantasy-600 hover:bg-fantasy-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-lg mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Créer une équipe</span>
            </button>
          ) : (
            <p className="text-stone-500 text-sm">
              Recrutez au moins 2 aventuriers pour former une équipe.
            </p>
          )}
        </div>
      )}

      {/* Modal de création d'équipe */}
      {showCreateModal && renderTeamModal(false)}

      {/* Modal de modification d'équipe */}
      {showEditModal && renderTeamModal(true)}
    </div>
  );
};

export default TeamsPanel;