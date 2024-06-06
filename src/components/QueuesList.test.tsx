import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import QueuesList from './QueuesList'

vi.mock('./QueuesListItem', () => ({
  __esModule: true,
  default: ({
    item,
    onItemDelete,
  }: {
    item: { name: string; id: number }
    onItemDelete?: (id: number) => void
  }) => (
    <div>
      <span>{item.name}</span>
      <button onClick={() => onItemDelete && onItemDelete(item.id)}>
        Delete
      </button>
    </div>
  ),
}))

describe('QueuesList Component', () => {
  it('should render the empty list message when list is empty', () => {
    render(<QueuesList list={[]} infoTextEmptyList="No items available" />)
    expect(screen.getByRole('alert')).toHaveTextContent('No items available')
  })

  it('should render the list items when list is not empty', () => {
    const list = [
      { name: 'Queue 1', id: 1 },
      { name: 'Queue 2', id: 2 },
    ]
    render(<QueuesList list={list} infoTextEmptyList="No items available" />)
    expect(screen.getByText('Queue 1')).toBeInTheDocument()
    expect(screen.getByText('Queue 2')).toBeInTheDocument()
  })

  it('should call onItemDelete when delete button is clicked', () => {
    const list = [{ name: 'Queue 1', id: 1 }]
    const handleDelete = vi.fn()
    render(
      <QueuesList
        list={list}
        infoTextEmptyList="No items available"
        onItemDelete={handleDelete}
      />
    )

    fireEvent.click(screen.getByText('Delete'))

    expect(handleDelete).toHaveBeenCalledWith(1)
  })
})
