import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, expect, it, vi } from 'vitest'
import FormRegister from './FormRegister'

describe('FormRegister Component', () => {
  it('should render component', () => {
    render(<FormRegister />)
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Username')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Repeat Password')).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('should display validation errors when form is submitted without input', async () => {
    render(<FormRegister />)
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText('Please enter your email')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Please a your username')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Please enter a password')
    ).toBeInTheDocument()
    expect(await screen.findByText('Repeat your password')).toBeInTheDocument()
  })

  it('should disable input fields and button when disabled prop is passed', () => {
    render(<FormRegister disabled />)
    expect(screen.getByLabelText('Email')).toBeDisabled()
    expect(screen.getByLabelText('Username')).toBeDisabled()
    expect(screen.getByLabelText('Password')).toBeDisabled()
    expect(screen.getByLabelText('Repeat Password')).toBeDisabled()
    expect(screen.getByText('Register')).toBeDisabled()
  })

  it('should show loading spinner when isLoading prop is passed', () => {
    render(<FormRegister isLoading />)
    expect(screen.getByText('Register')).toContainHTML(
      '<span class="loading loading-spinner"></span>'
    )
  })

  it('should call onSubmit with form data when form is submitted', async () => {
    const handleSubmit = vi.fn()
    render(<FormRegister onSubmit={handleSubmit} />)

    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.input(screen.getByLabelText('Username'), {
      target: { value: 'testuser' },
    })
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    })
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'Password1!' },
    })
    fireEvent.click(screen.getByText('Register'))

    await screen.findByText('Register')

    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      password: 'Password1!',
      password2: 'Password1!',
    })
  })

  it('should display email validation error for invalid email format', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Email'), {
      target: { value: 'invalid-email' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText('Enter a valid email address')
    ).toBeInTheDocument()
  })

  it('should display password validation error for invalid password length', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'short' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText((content) =>
        content.includes('Password must be at least 8 characters long')
      )
    ).toBeInTheDocument()
  })

  it('should display password validation error for missing lowercase letter', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'PASSWORD1!' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText((content) =>
        content.includes('Password must include at least one lowercase letter')
      )
    ).toBeInTheDocument()
  })

  it('should display password validation error for missing uppercase letter', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'password1!' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText((content) =>
        content.includes('Password must include at least one uppercase letter')
      )
    ).toBeInTheDocument()
  })

  it('should display password validation error for missing digit', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password!' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText((content) =>
        content.includes('Password must include at least one digit')
      )
    ).toBeInTheDocument()
  })

  it('should display password validation error for missing special character', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password1' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText((content) =>
        content.includes('Password must include at least one special character')
      )
    ).toBeInTheDocument()
  })

  it('should display error when passwords do not match', async () => {
    render(<FormRegister />)
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'Password1!' },
    })
    fireEvent.input(screen.getByLabelText('Repeat Password'), {
      target: { value: 'Password2!' },
    })
    fireEvent.click(screen.getByText('Register'))
    expect(
      await screen.findByText('The passwords do not match')
    ).toBeInTheDocument()
  })
})
