import axios, { AxiosResponse } from 'axios'

const baseUrl = `${import.meta.env.VITE_HOST_API}`

export const virtualqApi = {
  queues: {
    post: (body: QueuePostBody, token: string) => {
      const url = `${baseUrl}/queues/`
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      return axios.post<
        QueuePostResponse,
        AxiosResponse<QueuePostResponse, QueuePostBody>,
        QueuePostBody
      >(url, body, { headers })
    },
  },
  tickets: {},
  auth: {
    token: {
      post: (body: AuthTokenPostBody) => {
        const url = `${baseUrl}/auth/token/`
        return axios.post<
          AuthTokenPostResponse,
          AxiosResponse<AuthTokenPostResponse, AuthTokenPostBody>,
          AuthTokenPostBody
        >(url, body)
      },
      refresh: {
        post: (body: AuthTokenRefreshPostBody) => {
          const url = `${baseUrl}/auth/token/refresh/`
          return axios.post<
            AuthTokenRefreshPostResponse,
            AxiosResponse<
              AuthTokenRefreshPostResponse,
              AuthTokenRefreshPostBody
            >,
            AuthTokenRefreshPostBody
          >(url, body)
        },
      },
    },
  },
}

export type QueuePostResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}

export type QueuePostBody = {
  name: string
  user: number
}

type AuthTokenPostResponse = {
  refresh: string
  access: string
}

type AuthTokenPostBody = {
  username: string
  password: string
}

type AuthTokenRefreshPostResponse = {
  access: string
}

type AuthTokenRefreshPostBody = {
  refresh: string
}
