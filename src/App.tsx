import React, { useState, useEffect } from 'react';
import { Sword, Users, Package, Map, Settings, Crown, Home, UserPlus } from 'lucide-react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import TeamsPanel from './components/TeamsPanel';
import QuestsPanel from './components/QuestsPanel';
import InventoryPanel from './components/InventoryPanel';
import OverviewPanel from './components/OverviewPanel';
import GuildPanel from './components/GuildPanel';
import CharacterDetailsPanel from './components/CharacterDetailsPanel';
import RecruitmentPanel from './components/RecruitmentPanel';
import GameMenu from './components/GameMenu';
import CharacterSelection from './components/CharacterSelection';
import { GameStorage } from './services/gameStorage';
import { GameSave, RecruitableCharacter, NavigationItem } from './types';
import { generateRecruitPool } from './data/recruitableCharacters';
import { getUnlockedNavigationItems, getNextUnlockHint } from './utils/unlockSystem';

type ActivePanel = 'overview' | 'guild' | 'teams' | 'quests' | 'inventory' | 'recruitment' | 'settings' | 'character-details';
type GameState = 'menu' | 'character-selection' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [activePanel, setActivePanel] = useState<ActivePanel>('overview');
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | undefined>();
  const [gameData, setGameData] = useState<GameSave | null>(null);
  const [hasExistingSave, setHasExistingSave] = useState(false);

  // Définition des éléments de navigation avec leurs conditions de déverrouillage
  const allNavigationItems: NavigationItem[] = [
    { 
      id: 'overview', 
      label: 'Vue d\'ensemble', 
      icon: Crown,
      unlockConditions: [{ type: 'always', description: 'Toujours disponible' }]
    },
    { 
      id: 'guild', 
      label: 'Guilde', 
      icon: Home,
      unlockConditions: [{ type: 'always', description: 'Toujours disponible' }]
    },
    { 
      id: 'recruitment', 
      label: 'Recrutement', 
      icon: UserPlus,
      unlockConditions: [
        { type: 'building', value: 'tavern', description: 'Construire une taverne' }
      ]
    },
    { 
      id: 'teams', 
      label: 'Équipes', 
      icon: Users,
      unlockConditions: [
        { type: 'characters', value: 2, description: 'Recruter au moins 2 aventuriers' }
      ]
    },
    { 
      id: 'quests', 
      label: 'Quêtes', 
      icon: Map,
      unlockConditions: [
        { type: 'building', value: 'quest_board', description: 'Construire un tableau des quêtes' },
        { type: 'characters', value: 1, description: 'Recruter au moins 1 aventurier' }
      ]
    },
    { 
      id: 'inventory', 
      label: 'Inventaire', 
      icon: Package,
      unlockConditions: [
        { type: 'quests_completed', value: 1, description: 'Terminer au moins 1 quête' }
      ]
    },
    { 
      id: 'settings', 
      label: 'Paramètres', 
      icon: Settings,
      unlockConditions: [{ type: 'always', description: 'Toujours disponible' }]
    }
  ];

  useEffect(() => {
    // Vérifier s'il y a une sauvegarde existante
    setHasExistingSave(GameStorage.hasExistingSave());
    
    // Auto-sauvegarde toutes les 30 secondes
    const autoSaveInterval = setInterval(() => {
      if (gameData && gameState === 'playing') {
        GameStorage.autoSave(gameData);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [gameData, gameState]);

  const handleNewGame = () => {
    setGameState('character-selection');
  };

  const handleContinueGame = () => {
    const savedGame = GameStorage.loadGame();
    if (savedGame) {
      // S'assurer que les recrues sont initialisées
      if (!savedGame.availableRecruits || savedGame.availableRecruits.length === 0) {
        savedGame.availableRecruits = generateRecruitPool();
        savedGame.lastRecruitRefresh = new Date();
      }
      setGameData(savedGame);
      setGameState('playing');
    }
  };

  const handleDeleteSave = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre sauvegarde ? Cette action est irréversible.')) {
      GameStorage.deleteSave();
      setHasExistingSave(false);
      setGameData(null);
      setGameState('menu');
    }
  };

  const handleSelectCharacter = (leaderId: string) => {
    try {
      const newGame = GameStorage.createNewGame(leaderId);
      // Initialiser les recrues disponibles
      newGame.availableRecruits = generateRecruitPool();
      newGame.lastRecruitRefresh = new Date();
      
      GameStorage.saveGame(newGame);
      setGameData(newGame);
      setGameState('playing');
    } catch (error) {
      console.error('Erreur lors de la création du jeu:', error);
      alert('Erreur lors de la création du jeu');
    }
  };

  const handleViewCharacterDetails = (characterId: number) => {
    setSelectedCharacterId(characterId);
    setActivePanel('character-details');
  };

  const handleBackFromCharacterDetails = () => {
    setActivePanel('overview');
    setSelectedCharacterId(undefined);
  };

  const handleRecruit = (recruit: RecruitableCharacter) => {
    if (!gameData) return;

    // Calculer le coût ajusté
    let costMultiplier = 1;
    gameData.playerLeader.bonuses.forEach(bonus => {
      if (bonus.type === 'recruitment') {
        costMultiplier -= bonus.value / 100;
      }
    });
    gameData.playerLeader.maluses.forEach(malus => {
      if (malus.type === 'recruitment') {
        costMultiplier += Math.abs(malus.value) / 100;
      }
    });

    const finalCost = Math.round(recruit.recruitmentCost * costMultiplier);

    // Vérifier si on peut recruter
    if (gameData.guild.gold < finalCost) {
      alert('Pas assez d\'or pour recruter cet aventurier !');
      return;
    }

    if (gameData.guild.currentMembers >= gameData.guild.maxMembers) {
      alert('Votre compagnie a atteint sa capacité maximale !');
      return;
    }

    // Créer le nouveau personnage
    const newCharacter = {
      ...recruit,
      id: Date.now(), // ID unique basé sur le timestamp
      joinDate: new Date(),
      questsCompleted: 0,
      totalEarnings: 0
    };

    // Supprimer recruitmentCost et rarity qui ne sont pas dans Character
    const { recruitmentCost, rarity, ...characterData } = newCharacter;

    // Mettre à jour les données du jeu
    const updatedGameData = {
      ...gameData,
      characters: [...gameData.characters, characterData],
      guild: {
        ...gameData.guild,
        gold: gameData.guild.gold - finalCost,
        currentMembers: gameData.guild.currentMembers + 1
      },
      availableRecruits: gameData.availableRecruits.filter((_, index) => 
        gameData.availableRecruits.indexOf(recruit) !== index
      )
    };

    setGameData(updatedGameData);
    GameStorage.saveGame(updatedGameData);
  };

  const handleRefreshRecruits = () => {
    if (!gameData) return;

    const timeSinceLastRefresh = gameData.lastRecruitRefresh 
      ? Math.floor((Date.now() - gameData.lastRecruitRefresh.getTime()) / (1000 * 60 * 60))
      : 24;

    const canRefreshFree = timeSinceLastRefresh >= 24;
    const refreshCost = 50;

    if (!canRefreshFree && gameData.guild.gold < refreshCost) {
      alert('Pas assez d\'or pour actualiser la liste !');
      return;
    }

    const updatedGameData = {
      ...gameData,
      availableRecruits: generateRecruitPool(),
      lastRecruitRefresh: new Date(),
      guild: {
        ...gameData.guild,
        gold: canRefreshFree ? gameData.guild.gold : gameData.guild.gold - refreshCost
      }
    };

    setGameData(updatedGameData);
    GameStorage.saveGame(updatedGameData);
  };

  const handleUpdateGameData = (updatedGameData: GameSave) => {
    setGameData(updatedGameData);
    GameStorage.saveGame(updatedGameData);
  };

  // Obtenir les éléments de navigation déverrouillés
  const unlockedNavigationItems = gameData ? getUnlockedNavigationItems(allNavigationItems, gameData) : [];
  
  // Obtenir l'indice pour le prochain déverrouillage
  const nextUnlockHint = gameData ? getNextUnlockHint(allNavigationItems, gameData) : null;

  // Vérifier si le panel actuel est déverrouillé, sinon revenir à overview
  useEffect(() => {
    if (gameData && unlockedNavigationItems.length > 0) {
      const currentPanelUnlocked = unlockedNavigationItems.some(item => item.id === activePanel);
      if (!currentPanelUnlocked && activePanel !== 'character-details') {
        setActivePanel('overview');
      }
    }
  }, [gameData, unlockedNavigationItems, activePanel]);

  const renderActivePanel = () => {
    if (!gameData) return null;

    switch (activePanel) {
      case 'overview':
        return <OverviewPanel onViewCharacterDetails={handleViewCharacterDetails} gameData={gameData} />;
      case 'guild':
        return <GuildPanel gameData={gameData} />;
      case 'teams':
        return <TeamsPanel gameData={gameData} onUpdateGameData={handleUpdateGameData} />;
      case 'quests':
        return <QuestsPanel gameData={gameData} onUpdateGameData={handleUpdateGameData} />;
      case 'recruitment':
        return (
          <RecruitmentPanel 
            gameData={gameData} 
            onRecruit={handleRecruit}
            onRefreshRecruits={handleRefreshRecruits}
          />
        );
      case 'inventory':
        return <InventoryPanel gameData={gameData} />;
      case 'character-details':
        return (
          <CharacterDetailsPanel 
            characterId={selectedCharacterId}
            onBack={handleBackFromCharacterDetails}
            gameData={gameData}
          />
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-stone-800 mb-4">Paramètres</h2>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-stone-200">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2">Dirigeant Actuel</h3>
                  <div className="flex items-center space-x-3 bg-stone-50 rounded-lg p-4">
                    <div className="text-3xl">{gameData.playerLeader.portrait}</div>
                    <div>
                      <div className="font-bold text-stone-800">{gameData.playerLeader.name}</div>
                      <div className="text-stone-600 text-sm">{gameData.playerLeader.title}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2">Statistiques de Jeu</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-stone-50 rounded-lg p-3 text-center">
                      <div className="font-bold text-stone-800">{Math.floor(gameData.gameTime / 60)}h {gameData.gameTime % 60}min</div>
                      <div className="text-stone-600 text-sm">Temps de jeu</div>
                    </div>
                    <div className="bg-stone-50 rounded-lg p-3 text-center">
                      <div className="font-bold text-stone-800">{gameData.completedQuests.length}</div>
                      <div className="text-stone-600 text-sm">Quêtes terminées</div>
                    </div>
                  </div>
                </div>

                {/* Progression et déverrouillages */}
                <div>
                  <h3 className="text-lg font-bold text-stone-800 mb-2">Progression</h3>
                  <div className="bg-stone-50 rounded-lg p-4">
                    <div className="mb-3">
                      <div className="text-sm font-medium text-stone-700 mb-1">
                        Fonctionnalités déverrouillées: {unlockedNavigationItems.length}/{allNavigationItems.length}
                      </div>
                      <div className="w-full bg-stone-200 rounded-full h-2">
                        <div
                          className="bg-fantasy-500 h-2 rounded-full transition-all"
                          style={{ width: `${(unlockedNavigationItems.length / allNavigationItems.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {nextUnlockHint && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="text-sm font-medium text-blue-800 mb-1">Prochain objectif:</div>
                        <div className="text-sm text-blue-700">{nextUnlockHint}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <button
                    onClick={() => {
                      if (confirm('Retourner au menu principal ? Votre progression sera sauvegardée.')) {
                        GameStorage.saveGame(gameData);
                        setGameState('menu');
                        setHasExistingSave(true);
                      }
                    }}
                    className="w-full bg-stone-600 hover:bg-stone-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Retour au Menu Principal
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <OverviewPanel onViewCharacterDetails={handleViewCharacterDetails} gameData={gameData} />;
    }
  };

  // Écran de menu principal
  if (gameState === 'menu') {
    return (
      <GameMenu
        hasExistingSave={hasExistingSave}
        onNewGame={handleNewGame}
        onContinueGame={handleContinueGame}
        onDeleteSave={handleDeleteSave}
      />
    );
  }

  // Écran de sélection de personnage
  if (gameState === 'character-selection') {
    return <CharacterSelection onSelectCharacter={handleSelectCharacter} />;
  }

  // Jeu principal
  if (gameState === 'playing' && gameData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-fantasy-50 to-fantasy-100 bg-parchment">
        <div className="flex flex-col h-screen">
          <Header gameData={gameData} />
          
          <div className="flex flex-1 overflow-hidden">
            <Navigation 
              items={unlockedNavigationItems}
              activePanel={activePanel}
              onPanelChange={setActivePanel}
              nextUnlockHint={nextUnlockHint}
            />
            
            <main className="flex-1 overflow-y-auto bg-white/80 backdrop-blur-sm border-l border-fantasy-200">
              {renderActivePanel()}
            </main>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;