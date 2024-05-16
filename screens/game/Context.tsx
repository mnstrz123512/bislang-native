import {createContext, useContext} from 'react';

const GameContext = createContext({});

const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within ModuleProvider');
  }

  return context;
};
export {useGameContext};
export default GameContext;
