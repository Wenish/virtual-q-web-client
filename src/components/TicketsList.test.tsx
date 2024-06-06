import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import TicketsList from './TicketsList'

// Mock TicketsListItem to isolate the testing of TicketsList
vi.mock('./TicketsListItem', () => ({
  __esModule: true,
  default: ({
    item,
    onStatusChange,
  }: {
    item: { id: number; number: number; status: number }
    onStatusChange?: (id: number, newStatus: number) => void
  }) => (
    <div data-testid="ticket-item">
      {/* Mock select element for status change */}
      <select
        data-testid="status-select"
        value={item.status}
        onChange={(e) =>
          onStatusChange && onStatusChange(item.id, parseInt(e.target.value))
        }
      >
        {/* Mock options for the sake of the test */}
        <option value="1">Status 1</option>
        <option value="2">Status 2</option>
      </select>
    </div>
  ),
}))

describe('TicketsList Component', () => {
  it('should render the component with an empty list message', () => {
    const infoTextEmptyList = 'No tickets available'
    render(<TicketsList list={[]} infoTextEmptyList={infoTextEmptyList} />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(infoTextEmptyList)).toBeInTheDocument()
  })

  it('should render the component with a list of tickets', () => {
    const list = [
      { id: 1, number: 123, status: 1 },
      { id: 2, number: 124, status: 2 },
    ]
    render(<TicketsList list={list} infoTextEmptyList="No tickets available" />)

    expect(screen.getAllByTestId('ticket-item')).toHaveLength(2)
  })

  it('should call onStatusChange when ticket status is changed', () => {
    const list = [{ id: 1, number: 123, status: 1 }]
    const handleStatusChange = vi.fn()
    render(
      <TicketsList
        list={list}
        infoTextEmptyList="No tickets available"
        onStatusChange={handleStatusChange}
      />
    )

    const statusSelect = screen.getByTestId('status-select')
    fireEvent.change(statusSelect, { target: { value: '2' } })

    expect(handleStatusChange).toHaveBeenCalledWith(1, 2)
  })
})
