import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import FormLogin, { LoginFormData } from '../components/FormLogin'
import { SubmitHandler } from 'react-hook-form'

const PageLogin: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()


  const onLoginFormSubmit: SubmitHandler<LoginFormData> = async ({username, password}) => {
    try {
      await login(username, password)
      const redirectUrl =
        new URLSearchParams(location.search).get('redirect') || '/'
      navigate(redirectUrl)
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">Login</h1>
      <FormLogin onSubmit={onLoginFormSubmit} />
      <div className="grid justify-center">
          <Link to="/register" className="link link-accent">
            I don't have an account
          </Link>
        </div>
    </div>
  )
}

export default PageLogin
