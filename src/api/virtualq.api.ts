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
      return axios.get<QueuesGetResponse>(url, { headers })
    },
    id: {
      get: (id: number, token: string) => {
        const url = `${baseUrl}/queues/${id}/`
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        return axios.get<QueueGetResponse>(url, { headers })
      },
      delete: (id: number, token: string) => {
        const url = `${baseUrl}/queues/${id}/`
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        return axios.delete(url, { headers })
      },
    },
  },
  tickets: {
    get: (params: TicketsGetParams, token: string) => {
      const urlWithParams = new URL(`${baseUrl}/tickets/`)
      urlWithParams.search = objectToSearchParams(params).toString()
      const url = urlWithParams.toString()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      return axios.get<TicketsGetResponse>(url, { headers })
    },
    id: {
      patch: (id: number, body: TicketPatchBody, token: string) => {
        const url = `${baseUrl}/tickets/${id}/`
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        return axios.patch<
          TicketPatchResponse,
          AxiosResponse<TicketPatchResponse, TicketPatchBody>,
          TicketPatchBody
        >(url, body, { headers })
      },
    },
  },
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

/* -------------------- Types Queue ------------------------ */
export type Queue = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}

export type QueuesGetResponse = {
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

type QueueGetResponse = Queue

export type QueuePostBody = {
  name: string
  user: number
}

/* --------------------- Types Ticket ---------------------- */

type Ticket = {
  createdAt: string
  modifiedAt: string
  id: number
  number: number
  status: number
  queue: number
  user: number
}

type TicketsGetResponse = {
  count: number
  next: string
  previous: string
  results: Ticket[]
}

type TicketPatchBody = {
  status?: number
}

type TicketPatchResponse = Ticket

export type TicketsGetParams = {
  queue_id?: number
  status?: number
}

/* ---------------------- Types Token ---------------------- */

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
