import { ReactNode } from 'react';

import AuthProvider from '../src/components/AuthProvider'


const testAllProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
      <AuthProvider>
            { children }
      </AuthProvider>
  );
};

export default testAllProviders