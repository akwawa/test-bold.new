import { GameSave, UnlockCondition, NavigationItem } from '../types';

export function checkUnlockCondition(condition: UnlockCondition, gameData: GameSave): boolean {
  switch (condition.type) {
    case 'always':
      return true;
      
    case 'building':
      // Vérifie si un bâtiment spécifique existe
      return gameData.guild.buildings.some(building => building.type === condition.value);
      
    case 'characters':
      // Vérifie si on a au moins X personnages
      return gameData.characters.length >= (condition.value || 1);
      
    case 'quests_completed':
      // Vérifie si on a terminé au moins X quêtes
      return gameData.completedQuests.length >= (condition.value || 1);
      
    case 'guild_level':
      // Vérifie si la guilde a atteint un niveau minimum
      return gameData.guild.level >= (condition.value || 1);
      
    case 'gold':
      // Vérifie si on a au moins X pièces d'or
      return gameData.guild.gold >= (condition.value || 100);
      
    default:
      return false;
  }
}

export function checkAllUnlockConditions(conditions: UnlockCondition[], gameData: GameSave): boolean {
  return conditions.every(condition => checkUnlockCondition(condition, gameData));
}

export function getUnlockedNavigationItems(navigationItems: NavigationItem[], gameData: GameSave): NavigationItem[] {
  return navigationItems.map(item => ({
    ...item,
    isUnlocked: checkAllUnlockConditions(item.unlockConditions, gameData)
  })).filter(item => item.isUnlocked);
}

export function getNextUnlockHint(navigationItems: NavigationItem[], gameData: GameSave): string | null {
  const lockedItems = navigationItems.filter(item => 
    !checkAllUnlockConditions(item.unlockConditions, gameData)
  );
  
  if (lockedItems.length === 0) return null;
  
  // Trouve le prochain élément à débloquer (le plus proche)
  const nextItem = lockedItems[0];
  const failedCondition = nextItem.unlockConditions.find(condition => 
    !checkUnlockCondition(condition, gameData)
  );
  
  if (failedCondition) {
    return `Pour débloquer "${nextItem.label}": ${failedCondition.description}`;
  }
  
  return null;
}