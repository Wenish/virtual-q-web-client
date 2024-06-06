import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import PageQueueNewSuccess from './PageQueueNewSuccess'

describe('PageQueueNewSuccess Component', () => {
  it('should render the component with success message and link', () => {
    render(
      <MemoryRouter>
        <PageQueueNewSuccess />
      </MemoryRouter>
    )

    expect(screen.getByText('Queue successfully created')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'To my queues' })).toHaveAttribute(
      'href',
      '/me/queues'
    )
  })
})
