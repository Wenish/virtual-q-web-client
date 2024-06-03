import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FormLogin, { LoginFormData } from '../components/FormLogin'
import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

const PageLogin: React.FC = () => {
  const [isSubmittingLoginForm, setIsSubmittingLoginForm] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const onLoginFormSubmit: SubmitHandler<LoginFormData> = async ({
    username,
    password,
  }) => {
    try {
      setIsSubmittingLoginForm(true)
      await login(username, password)
      const redirectUrl =
        new URLSearchParams(location.search).get('redirect') || '/'
      navigate(redirectUrl)
    } catch (error) {
      console.error('Login failed', error)
      setLoginError('Username or Password wrong')
    } finally {
      setIsSubmittingLoginForm(false)
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">Login</h1>
      <FormLogin
        onSubmit={onLoginFormSubmit}
        disabled={isSubmittingLoginForm}
        isLoading={isSubmittingLoginForm}
      />
      {loginError && (
        <div className="mx-auto grid">
          <div role="alert" className="alert alert-error">
            <button onClick={() => setLoginError('')}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <span>{loginError}</span>
          </div>
        </div>
      )}
      <div className="grid justify-center">
        <Link to="/register" className="link link-accent">
          I don't have an account
        </Link>
      </div>
    </div>
  )
}

export default PageLogin
