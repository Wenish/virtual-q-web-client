import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Mock, describe, expect, it, vi } from 'vitest'
import { useQuery } from '@tanstack/react-query'
import PageHome from './PageHome'

// Mock useQuery from @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
}))

const mockUseQuery = useQuery as Mock

describe('PageHome Component', () => {
  it('should display loading state', () => {
    mockUseQuery.mockReturnValue({
      isPending: true,
      error: null,
      data: null,
    })

    render(<PageHome />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    const errorMessage = 'An error occurred'
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: { message: errorMessage },
      data: null,
    })

    render(<PageHome />)

    expect(screen.getByText(`An error has occurred: ${errorMessage}`)).toBeInTheDocument()
  })

  it('should display data state', () => {
    const mockData = { message: 'Hello, World!' }
    mockUseQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: mockData,
    })

    render(<PageHome />)

    expect(screen.getByText(`Hello from Page Home ${JSON.stringify(mockData)}`)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /button/i })).toBeInTheDocument()
  })
})