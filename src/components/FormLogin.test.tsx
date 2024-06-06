import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import FormLogin from './FormLogin'

describe('FormLogin Component', () => {
  it('should render component', () => {
    render(<FormLogin />)
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('should display validation errors when form is submitted without input', async () => {
    render(<FormLogin />)
    fireEvent.click(screen.getByText('Login'))
    expect(
      await screen.findByText('Please enter your username')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Please enter your password')
    ).toBeInTheDocument()
  })

  it('should disable input fields and button when disabled prop is passed', () => {
    render(<FormLogin disabled />)
    expect(screen.getByLabelText('Username')).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(screen.getByText('Login')).toBeDisabled()
  })

  it('should show loading spinner when isLoading prop is passed', () => {
    render(<FormLogin isLoading />)
    expect(screen.getByText('Login')).toContainHTML(
      '<span class="loading loading-spinner"></span>'
    )
  })

  it('should call onSubmit with form data when form is submitted', async () => {
    const handleSubmit = vi.fn()
    render(<FormLogin onSubmit={handleSubmit} />)

    fireEvent.input(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    })
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    })
    fireEvent.click(screen.getByText('Login'))

    await screen.findByText('Login')

    expect(handleSubmit).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password',
    })
  })
})
