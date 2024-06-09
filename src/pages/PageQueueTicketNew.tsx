import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { TicketPostBody, virtualqApi } from '../api/virtualq.api'

const PageQueueTicketNew = () => {
  const { queueId } = useParams()
  const { token, decodedToken } = useAuth()
  const navigate = useNavigate()

  const queryGetQueue = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.id
        .get(Number(queueId), token)
        .then((res) => res.data)
    },
  })

  const accessTokenData = decodedToken()
  const userId = accessTokenData?.user_id

  const queryGetUserQueueTickets = useQuery({
    queryKey: ['tickets', queueId, userId, 1, 2],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.tickets
        .get(
          {
            queue_id: Number(queueId),
            user__id: userId,
            status__in: [1, 2],
          },
          token
        )
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  const mutationPostTicket = useMutation({
    mutationFn: (formData: TicketPostBody) => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.tickets.post(formData, token)
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
