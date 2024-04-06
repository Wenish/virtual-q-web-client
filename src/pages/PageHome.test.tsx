import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import PageHome from './PageHome'

describe('PageHome', () => {
  it('renders the App component', () => {
    render(<PageHome />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})