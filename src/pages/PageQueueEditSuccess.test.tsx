import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import PageQueueEditSuccess from './PageQueueEditSuccess'

describe('PageQueueEditSuccess Component', () => {
  it('should render the component with success message and link', () => {
    render(
      <MemoryRouter>
        <PageQueueEditSuccess />
      </MemoryRouter>
    )

    expect(screen.getByText('Queue successfully edited')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'To my queues' })).toHaveAttribute(
      'href',
      '/me/queues'
    )
  })
})
