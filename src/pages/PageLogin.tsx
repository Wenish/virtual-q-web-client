import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FormLogin, { FormLoginData } from '../components/FormLogin'
import { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

const PageLogin: React.FC = () => {
  const [isSubmittingLoginForm, setIsSubmittingLoginForm] = useState(false)
  const [loginError, setLoginError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  const onLoginFormSubmit: SubmitHandler<FormLoginData> = async ({
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
    <div className="hero h-full">
      <div className="hero-content w-full flex-col lg:flex-row-reverse lg:gap-20">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Login into the Virtual Q application.</p>
        </div>
        <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
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
              <Link
                to={`/register?redirect=${encodeURIComponent(redirect || '')}`}
                className="link link-secondary"
              >
                I don't have an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageLogin
