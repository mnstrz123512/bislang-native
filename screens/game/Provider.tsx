import React from 'react';
import ModuleContext from './Context';

interface ModuleProviderProps {
  children: React.ReactNode;
}

const ModuleProvider = ({children}: ModuleProviderProps) => {
  const payload = {};

  return (
    <ModuleContext.Provider value={payload}>{children}</ModuleContext.Provider>
  );
};

export default ModuleProvider;
