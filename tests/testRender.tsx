import { ReactElement } from 'react';
import { RenderOptions, render } from '@testing-library/react';
import testAllProviders from './testAllProviders';

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: testAllProviders, ...options });


export { customRender as render };