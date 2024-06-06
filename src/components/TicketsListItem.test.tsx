import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TicketsListItem from './TicketsListItem'

vi.mock('./TicketsListItemChangeStatus', () => ({
  __esModule: true,
  default: ({
    item,
    onStatusChange,
  }: {
    item: { id: number; number: number; status: number }
    onStatusChange?: (id: number, newStatus: number) => void
  }) => (
    <button
      data-testid="change-status-button"
      onClick={() => onStatusChange && onStatusChange(item.id, item.status + 1)}
    >
      Change Status
    </button>
  ),
}))

describe('TicketsListItem Component', () => {
  const item = { id: 1, number: 123, status: 1 }
  const handleStatusChange = vi.fn()

  beforeEach(() => {
    render(
      <BrowserRouter>
        <TicketsListItem item={item} onStatusChange={handleStatusChange} />
      </BrowserRouter>
    )
  })

  it('renders the ticket item with a link to the ticket', () => {
    const linkElement = screen.getByRole('link', { name: /ticket 123/i })
    expect(linkElement).toBeInTheDocument()
    expect(linkElement).toHaveAttribute('href', '/tickets/1')
  })

  it('renders the dropdown button', () => {
    const dropdownButton = screen.getByTestId('dropdown-button')
    expect(dropdownButton).toBeInTheDocument()
  })

  it('calls onStatusChange when the change status button is clicked', async () => {
    const changeStatusButton = screen.getByTestId('change-status-button')
    userEvent.click(changeStatusButton)

    await waitFor(() => {
      expect(handleStatusChange).toHaveBeenCalledWith(1, 2)
    })
  })
})
