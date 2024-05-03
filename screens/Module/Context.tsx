import {createContext, useContext} from 'react';

const ModuleContext = createContext({});

const useModuleContext = () => {
  const context = useContext(ModuleContext);

  if (!context) {
    throw new Error('useModuleContext must be used within ModuleProvider');
  }

  return context;
};
export {useModuleContext};
export default ModuleContext;
