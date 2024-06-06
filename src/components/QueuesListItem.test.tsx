import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import QueuesListItem from './QueuesListItem'

// Mock QueuesListItemDelete to isolate the testing of QueuesListItem
vi.mock('./QueuesListItemDelete', () => ({
  __esModule: true,
  default: ({
    item,
    onItemDelete,
  }: {
    item: { name: string; id: number }
    onItemDelete?: (id: number) => void
  }) => (
    <div role="button" onClick={() => onItemDelete && onItemDelete(item.id)}>
      Mock Delete
    </div>
  ),
}))

describe('QueuesListItem Component', () => {
  const item = { name: 'Queue 1', id: 1 }

  it('should render the component', () => {
    render(
      <BrowserRouter>
        <QueuesListItem item={item} />
      </BrowserRouter>
    )
    expect(screen.getByText('Queue 1')).toBeInTheDocument()
    expect(screen.getByText('Open')).toBeInTheDocument()
    expect(screen.getByText('QR-Code site')).toBeInTheDocument()
    expect(screen.getByText('Tickets call site')).toBeInTheDocument()
    expect(screen.getByText('Delete tickets')).toBeInTheDocument()
    expect(screen.getByText('Edit queue')).toBeInTheDocument()
    expect(screen.getByText('Mock Delete')).toBeInTheDocument()
  })

  it('should navigate to the correct URLs', () => {
    render(
      <BrowserRouter>
        <QueuesListItem item={item} />
      </BrowserRouter>
    )

    expect(screen.getByText('Queue 1').closest('a')).toHaveAttribute(
      'href',
      '/queues/1'
    )
    expect(screen.getByText('Open').closest('a')).toHaveAttribute(
      'href',
      '/queues/1'
    )
    expect(screen.getByText('QR-Code site').closest('a')).toHaveAttribute(
      'href',
      '/queues/1/qr-code'
    )
    expect(screen.getByText('Tickets call site').closest('a')).toHaveAttribute(
      'href',
      '/queues/1/tickets-call'
    )
    expect(screen.getByText('Edit queue').closest('a')).toHaveAttribute(
      'href',
      '/queues/1/edit'
    )
  })

  it('should call onItemDelete when delete button is clicked', () => {
    const handleDelete = vi.fn()
    render(
      <BrowserRouter>
        <QueuesListItem item={item} onItemDelete={handleDelete} />
      </BrowserRouter>
    )

    fireEvent.click(screen.getByText('Mock Delete'))
    expect(handleDelete).toHaveBeenCalledWith(1)
  })
})
