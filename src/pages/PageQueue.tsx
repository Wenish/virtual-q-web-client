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

  const endpointTickets = (status: number) =>
    `${import.meta.env.VITE_HOST_API}/tickets/?queue_id=${queueId}&status=${status}`
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const getQueueTicketsByStatus = (status: number) =>
    axios
      .get<TicketsGetResponse>(endpointTickets(status), { headers })
      .then((res) => res.data)

  const queryGetQueueTicketsNew = useQuery({
    queryKey: ['tickets', queueId, 1],
    queryFn: () => getQueueTicketsByStatus(1),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  const queryGetQueueTicketsInProgress = useQuery({
    queryKey: ['tickets', queueId, 2],
    queryFn: () => getQueueTicketsByStatus(2),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  const queryGetQueueTicketsDone = useQuery({
    queryKey: ['tickets', queueId, 3],
    queryFn: () => getQueueTicketsByStatus(3),
    placeholderData: keepPreviousData,
    refetchInterval: 5000,
  })

  if (queryGetQueue.isPending) return 'Loading...'

  if (queryGetQueue.error)
    return 'An error has occurred: ' + queryGetQueue.error.message

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      <h1 className="break-all text-2xl font-bold md:text-4xl">
        {queryGetQueue.data.name}
      </h1>
      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Tickets "in progress"</h2>
        {queryGetQueueTicketsInProgress.isPending && 'Loading...'}
        {!!queryGetQueueTicketsInProgress.error &&
          'An error has occurred:' +
            queryGetQueueTicketsInProgress.error.message}
        {queryGetQueueTicketsInProgress.isSuccess && (
          <TicketsList
            list={queryGetQueueTicketsInProgress.data.results}
            infoTextEmptyList={`There are no tickets in the status "in progress".`}
          />
        )}
      </div>

      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Tickets "new"</h2>
        {queryGetQueueTicketsNew.isPending && 'Loading...'}
        {!!queryGetQueueTicketsNew.error &&
          'An error has occurred:' + queryGetQueueTicketsNew.error.message}
        {queryGetQueueTicketsNew.isSuccess && (
          <TicketsList
            list={queryGetQueueTicketsNew.data.results}
            infoTextEmptyList={`There are no tickets in the status "new".`}
          />
        )}
      </div>

      <div className="grid gap-2">
        <h2 className="text-xl font-bold">Tickets "done"</h2>
        {queryGetQueueTicketsDone.isPending && 'Loading...'}
        {!!queryGetQueueTicketsDone.error &&
          'An error has occurred:' + queryGetQueueTicketsDone.error.message}
        {queryGetQueueTicketsDone.isSuccess && (
          <TicketsList
            list={queryGetQueueTicketsDone.data.results}
            infoTextEmptyList={`There are no tickets in the status "done".`}
          />
        )}
      </div>
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
    createdAt: string
    modifiedAt: string
    id: number
    number: number
    status: number
    queue: number
    user: number
  }[]
}
