import axios, { AxiosResponse } from 'axios'

export const useRegister = () => {
  const endpointRegister = `${import.meta.env.VITE_HOST_API}/auth/register/`
  const register = async (body: AuthRegisterBody) => {
    const response = await axios.post<
      AuthRegisterResponse,
      AxiosResponse<AuthRegisterResponse, AuthRegisterBody>,
      AuthRegisterBody
    >(endpointRegister, body)
    return response.data
  }

  return {
    register,
  }
}

type AuthRegisterResponse = {
  username: string
  email: string
}

type AuthRegisterBody = {
  email: string
  username: string
  password: string
  password2: string
}
