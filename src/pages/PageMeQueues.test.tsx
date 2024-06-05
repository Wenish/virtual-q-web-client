import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Mock, describe, expect, it, vi } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import { renderWithRouter } from '../../tests/testRenderWithRouter'
import PageMeQueues from './PageMeQueues'

// Mock useQuery from @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  useMutation: vi.fn(),
  keepPreviousData: vi.fn(),
}))

const mockUseQuery = useQuery as Mock

describe('PageMeQueues Component', () => {
  it('should display loading state', () => {
    mockUseQuery.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    })

    renderWithRouter(<PageMeQueues />, {
      route: '/me/queues',
      path: '/me/queues',
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    const errorMessage = 'An error occurred'
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: { message: errorMessage },
      data: null,
    })

    renderWithRouter(<PageMeQueues />, {
      route: '/me/queues',
      path: '/me/queues',
    })

    expect(
      screen.getByText(`An error has occurred: ${errorMessage}`)
    ).toBeInTheDocument()
  })

  it('should display data state', () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          id: 3,
          name: 'Dener Stand',
        },

        {
          id: 4,
          name: 'Berger Stand',
        },
      ],
    }
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: mockData,
    })

    renderWithRouter(<PageMeQueues />, {
      route: '/me/queues',
      path: '/me/queues',
    })

    expect(screen.getByText('Add new queue')).toBeInTheDocument()

    const elements = screen.queryAllByText(mockData.results[0].name)
    expect(elements.length).eq(2)

    const elements2 = screen.queryAllByText(mockData.results[1].name)
    expect(elements2.length).eq(2)
  })

  it('should have link /queues-new', () => {
    const mockData = {
      count: 1,
      next: null,
      previous: null,
      results: [],
    }
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: mockData,
    })

    renderWithRouter(<PageMeQueues />, {
      route: '/me/queues',
      path: '/me/queues',
    })

    const link = screen.getByRole('link', {
      name: 'Add new queue',
    })

    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/queues-new')
  })
})
