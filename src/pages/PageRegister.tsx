import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FormRegister, { FormRegisterData } from '../components/FormRegister'
import { useState } from 'react'
import { SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { virtualqApi } from '../api/virtualq.api'

const PageRegister = () => {
  const [isSubmittingRegisterForm, setIsSubmittingRegisterForm] =
    useState(false)
  const [registerError, setRegisterError] = useState<string[]>([])
  const [searchParams] = useSearchParams()
  const redirect = searchParams.get('redirect')

  const navigate = useNavigate()

  const onRegisterFormSubmit: SubmitHandler<FormRegisterData> = async (
    formData
  ) => {
    try {
      setIsSubmittingRegisterForm(true)
      await virtualqApi.auth.register.post(formData)
      navigate(`/login?redirect=${encodeURIComponent(redirect || '')}`)
    } catch (error) {
      console.error('Register failed', error)
      if (axios.isAxiosError(error)) {
        const errorMessages = Object.keys(error.response?.data).map(
          (key) => `${key} - ${JSON.stringify(error.response?.data[key])}`
        )
        setRegisterError(errorMessages)
      }
    } finally {
      setIsSubmittingRegisterForm(false)
    }
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">Register</h1>
      <FormRegister
        onSubmit={onRegisterFormSubmit}
        disabled={isSubmittingRegisterForm}
        isLoading={isSubmittingRegisterForm}
      />

      {!!registerError.length && (
        <div className="mx-auto grid">
          <div role="alert" className="alert alert-error">
            <button onClick={() => setRegisterError([])}>
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
            <span>
              <ul>
                {registerError.map((error) => {
                  return <li>{error}</li>
                })}
              </ul>
            </span>
          </div>
        </div>
      )}

      <div className="grid justify-center">
        <Link
          to={`/login?redirect=${encodeURIComponent(redirect || '')}`}
          className="link link-secondary"
        >
          I already have an account
        </Link>
      </div>
    </div>
  )
}

export default PageRegister
