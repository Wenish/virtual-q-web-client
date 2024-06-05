import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import QueueTicket from '../components/QueueTicket'
import { useAuth } from '../hooks/useAuth'

const PageTicket = () => {
  const { ticketId } = useParams()
  const { token } = useAuth()

  const endpointTicket = `${import.meta.env.VITE_HOST_API}/tickets/${ticketId}/`
  const queryGetTicket = useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: () =>
      axios
        .get<TicketGetResponse>(endpointTicket, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    refetchInterval: 5000,
  })

  const queueId = queryGetTicket.data?.queue

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
    enabled: !!queueId,
  })

  if (queryGetTicket.isPending || queryGetQueue.isPending) return 'Loading...'

  if (queryGetTicket.error || queryGetQueue.error)
    return (
      'An error has occurred: ' +
      queryGetTicket.error?.message +
      queryGetQueue.error?.message
    )

  return (
    <div className="mx-auto grid max-w-4xl gap-4 text-center">
      <h1 className="text-4xl font-bold">Your Ticket</h1>
      <div className="grid justify-center">
        <QueueTicket
          queueName={queryGetQueue.data?.name}
          ticketStatus={queryGetTicket.data.status}
          ticketNumber={queryGetTicket.data.number}
        />
      </div>
    </div>
  )
}

export default PageTicket

type QueueGetResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  name: string
  user: number
}

type TicketGetResponse = {
  createdAt: string
  modifiedAt: string
  id: number
  number: number
  queue: number
  status: number
  user: number
}
