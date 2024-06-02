import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const PageLogin: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
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
      <form
        onSubmit={handleLogin}
        className="mx-auto grid w-full max-w-xl gap-2 md:gap-4"
      >
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered input-primary w-full"
          />
          <div className="label">
            <span className="label-text-alt">Bottom Left label</span>
          </div>
        </label>
        <div className="grid justify-center">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <div className="grid justify-center">
          <Link to="/register" className="link link-accent">
            I don't have an account
          </Link>
        </div>
      </form>
    </div>
  )
}

export default PageLogin
