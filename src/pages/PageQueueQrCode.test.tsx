import { screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useQuery } from '@tanstack/react-query'
import PageQueueQrCode from './PageQueueQrCode'
import { Mock, describe, expect, it, vi } from 'vitest'
import { renderWithRouter } from '../../tests/testRenderWithRouter'

// Mock useQuery from @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const mockUseQuery = useQuery as Mock

describe('PageQueueQrCode Component', () => {
  it('should render loading state', async () => {
    mockUseQuery.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    })

    renderWithRouter(<PageQueueQrCode />, {
      route: '/queues/1/qr-code',
      path: '/queues/1/qr-code',
    })

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render error state', async () => {
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: new Error('Fetch error'),
    })

    renderWithRouter(<PageQueueQrCode />, {
      route: '/queues/1/qr-code',
      path: '/queues/1/qr-code',
    })

    expect(
      screen.getByText('An error has occurred: Fetch error')
    ).toBeInTheDocument()
  })

  it('should render data state', async () => {
    const mockData = {
      createdAt: '2024-06-15T12:00:00.000Z',
      modifiedAt: '2024-06-15T12:00:00.000Z',
      id: 1,
      name: 'Mock Queue',
      user: 123,
    }

    mockUseQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: mockData,
    })

    renderWithRouter(<PageQueueQrCode />, {
      route: '/queues/1/qr-code',
      path: '/queues/1/qr-code',
    })

    expect(screen.getByText(mockData.name)).toBeInTheDocument()
    expect(screen.getByRole('qr-code')).toBeInTheDocument()
  })
})
