import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useParams } from 'react-router-dom'
import TicketsList from '../components/TicketsList'

const PageQueue = () => {
  const { queueId } = useParams()
  const { token } = useAuth()

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

  const endpointTickets = `${import.meta.env.VITE_HOST_API}/tickets/?queue__id=${queueId}`
  const queryGetQueueTickets = useQuery({
    queryKey: ['tickets', queueId],
    queryFn: () =>
      axios
        .get<TicketsGetResponse>(endpointTickets, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  if (queryGetQueue.isPending || queryGetQueueTickets.isPending)
    return 'Loading...'

  if (queryGetQueue.error || queryGetQueueTickets.error)
    return (
      'An error has occurred: ' +
      queryGetQueue.error?.message +
      queryGetQueueTickets.error?.message
    )

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">
        {queryGetQueue.data.name}
      </h1>
      <TicketsList
        list={queryGetQueueTickets.data.results}
        infoTextEmptyList="There are no tickets for this queue."
      />
    </div>
  )
}

export default PageQueue

type QueueGetResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
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
