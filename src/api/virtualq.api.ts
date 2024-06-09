import axios, { AxiosResponse } from 'axios'

const baseUrl = `${import.meta.env.VITE_HOST_API}`

export const virtualqApi = {
  queues: {
    post: async (body: QueuePostBody, token: string) => {
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
