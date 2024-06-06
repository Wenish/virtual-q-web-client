import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import FormQueue, { FormQueueData } from './FormQueue'

describe('FormQueue Component', () => {
  it('should render the component', () => {
    render(<FormQueue />)
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('should display required error when value is invalid', async () => {
    render(<FormQueue />)

    fireEvent.submit(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(screen.getByText('Please enter a queue name')).toBeInTheDocument()
    })
  })

  it('should display max length error when value is too long', async () => {
    render(<FormQueue />)

    fireEvent.input(screen.getByLabelText('Name'), {
      target: { value: 'a'.repeat(256) },
    })

    fireEvent.submit(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(
        screen.getByText('Name must be 255 characters or fewer')
      ).toBeInTheDocument()
    })
  })

  it('should submit the form with valid data', async () => {
    const handleSubmit = vi.fn()

    render(<FormQueue onSubmit={handleSubmit} />)

    fireEvent.input(screen.getByLabelText('Name'), {
      target: { value: 'Valid Queue Name' },
    })

    fireEvent.submit(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        name: 'Valid Queue Name',
      })
    })
  })

  it('should render with default values', () => {
    const defaultValues: FormQueueData = { name: 'Default Queue' }

    render(<FormQueue defaultValues={defaultValues} />)

    expect(screen.getByLabelText('Name')).toHaveValue('Default Queue')
  })

  it('should disable the input and button when disabled is true', () => {
    render(<FormQueue disabled={true} />)

    expect(screen.getByLabelText('Name')).toBeDisabled()
    expect(screen.getByRole('button', { name: /save/i })).toBeDisabled()
  })

  it('should show loading spinner when isLoading is true', () => {
    render(<FormQueue isLoading={true} />)

    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /save/i })).toContainHTML(
      '<span class="loading loading-spinner"></span>'
    )
  })

  it('should render with a custom button label', () => {
    render(<FormQueue buttonLabel="Custom Label" />)

    expect(
      screen.getByRole('button', { name: /custom label/i })
    ).toBeInTheDocument()
  })
})
