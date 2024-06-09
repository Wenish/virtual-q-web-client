import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import QueueTicket from '../components/QueueTicket'
import { useAuth } from '../hooks/useAuth'
import { virtualqApi } from '../api/virtualq.api'

const PageTicket = () => {
  const { ticketId } = useParams()
  const { token, decodedToken } = useAuth()

  const queryGetTicket = useQuery({
    queryKey: ['tickets', ticketId],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.tickets.id
        .get(Number(ticketId), token)
        .then((res) => res.data)
    },
    refetchInterval: 5000,
  })

  const queueId = queryGetTicket.data?.queue

  const queryGetQueue = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () => {
      if (!queueId) throw 'No queueId avaiable'
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.id.get(queueId, token).then((res) => res.data)
    },
    enabled: !!queueId,
  })

  if (queryGetTicket.isPending || queryGetQueue.isPending) return 'Loading...'

  if (queryGetTicket.error || queryGetQueue.error)
    return (
      'An error has occurred: ' +
      queryGetTicket.error?.message +
      queryGetQueue.error?.message
    )

  const headingText =
    decodedToken()?.user_id == queryGetTicket.data.user
      ? 'Your Ticket'
      : 'The Ticket'

  return (
    <div className="mx-auto grid max-w-4xl gap-4 text-center">
      <h1 className="text-4xl font-bold">{headingText}</h1>
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
