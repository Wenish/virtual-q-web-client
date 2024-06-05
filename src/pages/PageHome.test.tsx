import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import PageHome from './PageHome'
import { renderWithRouter } from '../../tests/testRenderWithRouter'

describe('PageHome Component', () => {
  it('should render component', () => {
    renderWithRouter(<PageHome />, { route: '/', path: '/' })
  })

  it('should have link /me/queues', () => {
    renderWithRouter(<PageHome />, { route: '/', path: '/' })

    const link = screen.getByRole('link', {
      name: 'My Queues',
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/me/queues')
  })
})
