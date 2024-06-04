import { ReactElement, ReactNode } from 'react';

import AuthProvider from '../src/components/AuthProvider'
import { RenderOptions, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';


const AllProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
      <AuthProvider>
            { children }
      </AuthProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllProviders, ...options });

const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', path = '/' }: { route?: string; path?: string } = {},
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return customRender(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>,
    options
  );
};

export { customRender as render, renderWithRouter };