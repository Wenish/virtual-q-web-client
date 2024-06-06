import { BrowserRouter } from 'react-router-dom'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import TheNavbar from './TheNavbar'

const logoutMock = vi.fn()
const isLoggedInMock = vi.fn()

vi.mock('../hooks/useAuth', () => ({
  useAuth: () => ({
    user: { username: 'testuser' },
    logout: logoutMock,
    isLoggedIn: isLoggedInMock,
  }),
}))

describe('TheNavbar Component', () => {
  beforeEach(() => {
    logoutMock.mockClear()
    isLoggedInMock.mockReturnValue(true)
  })

  it('renders navbar with the application title', () => {
    render(
      <BrowserRouter>
        <TheNavbar />
      </BrowserRouter>
    )

    expect(screen.getByText(/virtual q/i)).toBeInTheDocument()
  })

  it('displays the username when logged in', () => {
    render(
      <BrowserRouter>
        <TheNavbar />
      </BrowserRouter>
    )

    expect(screen.getByText('testuser')).toBeInTheDocument()
  })

  it('renders the logout button when logged in', () => {
    render(
      <BrowserRouter>
        <TheNavbar />
      </BrowserRouter>
    )

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    expect(logoutButton).toBeInTheDocument()
  })

  it('calls logout function when logout button is clicked', async () => {
    render(
      <BrowserRouter>
        <TheNavbar />
      </BrowserRouter>
    )

    const logoutButton = screen.getByRole('button', { name: /logout/i })
    userEvent.click(logoutButton)

    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalled()
    })
  })

  it('does not render the logout button when not logged in', () => {
    isLoggedInMock.mockReturnValue(false)

    render(
      <BrowserRouter>
        <TheNavbar />
      </BrowserRouter>
    )

    const logoutButton = screen.queryByRole('button', { name: /logout/i })
    expect(logoutButton).not.toBeInTheDocument()
  })
})
