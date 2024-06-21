import { screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, Mock } from 'vitest'
import PageTicket from './PageTicket'
import { useQuery } from '@tanstack/react-query'
import { renderWithRouter } from '../../tests/testRenderWithRouter'

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn().mockReturnValue({
    token: 'mocked-token',
    decodedToken: vi.fn().mockReturnValue({ user_id: 1 }),
  }),
}))

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const mockUseQuery = useQuery as Mock

describe('PageTicket Component', () => {
  it('renders loading state when queries are pending', () => {
    mockUseQuery.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    })

    renderWithRouter(<PageTicket />, {
      route: '/tickets/123',
      path: '/tickets/:ticketId',
    })

    expect(screen.getByText(/loading.../i)).toBeInTheDocument()
  })

  it('renders error state when queries have errors', () => {
    // Mock queries with errors
    mockUseQuery.mockReturnValue({
      isPending: false,
      data: null,
      error: { message: 'An error has occurred' },
    })

    renderWithRouter(<PageTicket />, {
      route: '/tickets/123',
      path: '/tickets/:ticketId',
    })

    expect(screen.getByText(/an error has occurred/i)).toBeInTheDocument()
  })

  it('renders the ticket and queue information when data is available', async () => {
    // Mock ticket and queue data
    const ticketData = {
      id: 123,
      number: 456,
      queue: 789,
      status: 1,
      user: 1,
    }
    const queueData = {
      id: 789,
      name: 'Queue Name',
      user: 1,
    }

    // Mocking the queryGetTicket useQuery call
    mockUseQuery.mockImplementationOnce(() => ({
      data: ticketData,
      isPending: false,
      error: null,
    }))

    // Mocking the queryGetQueue useQuery call
    mockUseQuery.mockImplementationOnce(() => ({
      data: queueData,
      isPending: false,
      error: null,
    }))

    renderWithRouter(<PageTicket />, {
      route: '/tickets/123',
      path: '/tickets/:ticketId',
    })

    await waitFor(() => {
      // Check for ticket and queue information in the document
      expect(screen.getByText(/your ticket/i)).toBeInTheDocument()
      expect(screen.getByText(/queue name/i)).toBeInTheDocument()
    })
  })
})
