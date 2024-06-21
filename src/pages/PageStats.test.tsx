import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Mock, describe, expect, it, vi } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import PageStats from './PageStats'

// Mock useQuery from @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const mockUseQuery = useQuery as Mock

describe('PageStats Component', () => {
  it('should display loading state', () => {
    mockUseQuery.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    })

    render(<PageStats />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    const errorMessage = 'An error occurred'
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: { message: errorMessage },
      data: null,
    })

    render(<PageStats />)

    expect(
      screen.getByText(`An error has occurred: ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('should display data state', () => {
    const mockData = {
      total_queues: 10,
      total_tickets: 100,
      tickets_by_status: {
        1: 50,
        2: 30,
        3: 20,
      },
    }
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: mockData,
    })

    render(<PageStats />)

    expect(screen.getByText('Overall app stats')).toBeInTheDocument()
    expect(screen.getByText('Total Queues')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('Total Tickets')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('Tickets New')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('Tickets In Progress')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Tickets Done')).toBeInTheDocument()
    expect(screen.getByText('20')).toBeInTheDocument()
  })
})
