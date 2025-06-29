import React from 'react';
import { Play, Trash2, Download, Upload, Settings } from 'lucide-react';

interface GameMenuProps {
  hasExistingSave: boolean;
  onNewGame: () => void;
  onContinueGame: () => void;
  onDeleteSave: () => void;
}

const GameMenu: React.FC<GameMenuProps> = ({
  hasExistingSave,
  onNewGame,
  onContinueGame,
  onDeleteSave
}) => {
  const handleExportSave = () => {
    const saveData = localStorage.getItem('dnd_guild_manager_save');
    if (saveData) {
      const blob = new Blob([saveData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dnd_guild_save_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImportSave = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const saveData = e.target?.result as string;
            JSON.parse(saveData); // Vérifier que c'est du JSON valide
            localStorage.setItem('dnd_guild_manager_save', saveData);
            window.location.reload(); // Recharger pour appliquer la sauvegarde
          } catch (error) {
            alert('Fichier de sauvegarde invalide');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fantasy-900 via-fantasy-800 to-stone-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Titre */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">⚔️</div>
          <h1 className="text-4xl font-bold text-white font-fantasy mb-2">
            Compagnie d'Aventuriers
          </h1>
          <p className="text-fantasy-200">
            Gérez votre guilde dans les Royaumes Oubliés
          </p>
        </div>

        {/* Menu principal */}
        <div className="bg-white rounded-xl shadow-2xl p-8 space-y-4">
          {hasExistingSave && (
            <button
              onClick={onContinueGame}
              className="w-full bg-fantasy-600 hover:bg-fantasy-700 text-white py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3 text-lg"
            >
              <Play className="h-6 w-6" />
              <span>Continuer la Partie</span>
            </button>
          )}

          <button
            onClick={onNewGame}
            className={`w-full py-4 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-3 text-lg ${
              hasExistingSave
                ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                : 'bg-fantasy-600 hover:bg-fantasy-700 text-white'
            }`}
          >
            <Settings className="h-6 w-6" />
            <span>Nouvelle Partie</span>
          </button>

          {hasExistingSave && (
            <>
              <div className="border-t border-stone-200 pt-4">
                <p className="text-stone-600 text-sm mb-3 text-center">Gestion des sauvegardes</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleExportSave}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Exporter</span>
                  </button>

                  <button
                    onClick={handleImportSave}
                    className="bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Importer</span>
                  </button>
                </div>
              </div>

              <button
                onClick={onDeleteSave}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Trash2 className="h-4 w-4" />
                <span>Supprimer la Sauvegarde</span>
              </button>
            </>
          )}
        </div>

        {/* Version */}
        <div className="text-center mt-8">
          <p className="text-fantasy-300 text-sm">Version 1.0.0 - Bêta</p>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;