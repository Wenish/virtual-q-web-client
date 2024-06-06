import '@testing-library/jest-dom'
import { Mock, describe, expect, it, vi } from 'vitest'
import ProtectedRoute from './ProtectedRoute'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { renderWithRouter } from '../../tests/testRenderWithRouter'

vi.mock('../hooks/useAuth')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    Navigate: vi.fn(),
  }
})

describe('ProtectedRoute Component', () => {
  it('should render children when the user is logged in', () => {
    const mockUseAuth = useAuth as Mock
    mockUseAuth.mockReturnValue({ isLoggedIn: () => true })

    const { getByText } = renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { route: '/protected', path: '/protected' }
    )

    expect(getByText('Protected Content')).toBeInTheDocument()
  })

  it('should navigate to login when the user is not logged in', () => {
    const mockUseAuth = useAuth as Mock
    mockUseAuth.mockReturnValue({ isLoggedIn: () => false })

    const mockedNavigate = Navigate as Mock

    renderWithRouter(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>,
      { route: '/protected', path: '/protected' }
    )

    expect(mockedNavigate).toHaveBeenCalledWith(
      { to: '/login?redirect=%2Fprotected' },
      {}
    )
  })
})
