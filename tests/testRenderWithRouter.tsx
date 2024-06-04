import { RenderOptions } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from './testRender';


const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', path = '/' }: { route?: string; path?: string } = {},
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path={path} element={ui} />
      </Routes>
    </MemoryRouter>,
    options
  );
};

export { renderWithRouter };