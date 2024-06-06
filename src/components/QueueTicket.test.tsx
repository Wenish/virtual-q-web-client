import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import QueueTicket from './QueueTicket'

describe('QueueTicket Component', () => {
  it('should render the component with provided props', () => {
    render(
      <QueueTicket ticketNumber={123} ticketStatus={1} queueName="Test Queue" />
    )

    expect(screen.getByText('Test Queue')).toBeInTheDocument()
    expect(screen.getByText('wait')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('should render the component with different status', () => {
    render(
      <QueueTicket
        ticketNumber={456}
        ticketStatus={2}
        queueName="Another Queue"
      />
    )

    expect(screen.getByText('Another Queue')).toBeInTheDocument()
    expect(screen.getByText('ready')).toBeInTheDocument()
    expect(screen.getByText('456')).toBeInTheDocument()
  })
})
