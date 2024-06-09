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
    get: (params: QueuesGetParams, token: string) => {
      const urlWithParams = new URL(`${baseUrl}/queues/`)
      urlWithParams.search = objectToSearchParams(params).toString()
      const url = urlWithParams.toString()

      const headers = {
        Authorization: `Bearer ${token}`,
      }
      return axios.get<QueuesResponse>(url, { headers })
    },
    id: {
      delete: (id: number, token: string) => {
        const url = `${baseUrl}/queues/${id}/`
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        return axios.delete(url, { headers })
      },
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

function objectToSearchParams(params: SearchParams): URLSearchParams {
  const searchParams = new URLSearchParams()
  for (const param in params) {
    if (typeof params[param] === 'object') {
      ;(params[param] as string[]).forEach((item) => {
        searchParams.append(param, item)
      })
    } else {
      searchParams.append(param, params[param] as string)
    }
  }
  return searchParams
}

type SearchParams = {
  [key: string]: string | number | string[]
}

export type Queue = {
  id: number
  name: string
}

export type QueuesResponse = {
  count: number
  next: string
  previous: string
  results: Queue[]
}

export type QueuesGetParams = {
  user__id?: number
  page?: number
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
