import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios, { AxiosResponse } from 'axios'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const PageQueueTicketNew = () => {
  const { queueId } = useParams()
  const { token, decodedToken } = useAuth()
  const navigate = useNavigate()

  const endpointQueue = `${import.meta.env.VITE_HOST_API}/queues/${queueId}/`
  const queryGetQueue = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () =>
      axios
        .get<QueueGetResponse>(endpointQueue, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  })

  const endpointTickets = `${import.meta.env.VITE_HOST_API}/tickets/`

  const accessTokenData = decodedToken()
  const userId = accessTokenData?.user_id
  const endpointTicketsQueueUser = `${endpointTickets}?queue_id=${queueId}&user__id=${userId}&status__in=1,2`

  const queryGetUserQueueTickets = useQuery({
    queryKey: ['tickets', queueId, userId, 1, 2],
    queryFn: () =>
      axios
        .get<TicketsGetResponse>(endpointTicketsQueueUser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  const mutationPostTicket = useMutation({
    mutationFn: (formData: TicketPostBody) => {
      return axios.post<
        TicketPostResponse,
        AxiosResponse<TicketPostResponse, TicketPostBody>,
        TicketPostBody
      >(endpointTickets, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: (response) => {
      navigate(`/tickets/${response.data.id}`)
    },
  })

  const onTicketPost = () => {
    const queue = Number(queueId)
    if (!queue) throw 'No queue id'

    const userId = decodedToken()?.user_id
    if (!userId) throw 'No user id'

    mutationPostTicket.mutate({
      queue: queue,
      status: 1,
      user: userId,
    })
  }

  useEffect(() => {
    if (!queryGetUserQueueTickets.isSuccess) return

    const userHasAlreadyTicket = !!queryGetUserQueueTickets.data.results.length

    if (!userHasAlreadyTicket) return

    navigate(`/tickets/${queryGetUserQueueTickets.data.results[0].id}`, {
      replace: true,
    })
  }, [
    queryGetUserQueueTickets.isSuccess,
    queryGetUserQueueTickets.data?.results,
    navigate,
  ])

  if (queryGetQueue.isPending) return 'Loading...'

  if (queryGetQueue.error)
    return 'An error has occurred: ' + queryGetQueue.error?.message

  return (
    <div className="grid gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">
        Get a Ticket
      </h1>
      <p className="text-center text-2xl">Welcome to the digital queue.</p>
      <p className="text-center text-2xl">
        Get a ticket for{' '}
        <b className="break-all">"{queryGetQueue.data.name}"</b> now.
      </p>
      <div className="grid justify-center">
        <button onClick={onTicketPost} className="btn btn-primary btn-lg">
          Press here to get a ticket
        </button>
      </div>
    </div>
  )
}

export default PageQueueTicketNew

type QueueGetResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}

type TicketPostResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  number: number
  queue: number
  status: number
  user: number
}

type TicketPostBody = {
  queue: number
  status: number
  user: number
}

type TicketsGetResponse = {
  count: number
  next: string
  previous: string
  results: {
    id: number
  }[]
}
