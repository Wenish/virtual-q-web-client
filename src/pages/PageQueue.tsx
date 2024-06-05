import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { useParams } from 'react-router-dom'
import TicketsList from '../components/TicketsList'
import { useState } from 'react'

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

  const [changeTicketStatusSuccess, setChangeTicketStatusSuccess] =
    useState(false)

  const endpointTicket = (ticketId: number) =>
    `${import.meta.env.VITE_HOST_API}/tickets/${ticketId}/`
  const mutationTicketStatus = useMutation({
    mutationFn: (item: { id: number; status: number }) => {
      return axios.patch(
        endpointTicket(item.id),
        { status: item.status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
    },
    onSuccess: () => {
      setChangeTicketStatusSuccess(true)
      queryGetQueueTicketsNew.refetch()
      queryGetQueueTicketsInProgress.refetch()
      queryGetQueueTicketsDone.refetch()
    },
  })

  const onStatusChange = (id: number, status: number) => {
    setChangeTicketStatusSuccess(false)
    mutationTicketStatus.mutate({ id, status })
  }

  if (queryGetQueue.isPending) return 'Loading...'

  if (queryGetQueue.error)
    return 'An error has occurred: ' + queryGetQueue.error.message

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      <h1 className="break-all text-2xl font-bold md:text-4xl">
        {queryGetQueue.data.name}
      </h1>
      {changeTicketStatusSuccess && (
        <div role="alert" className="alert alert-success">
          <button onClick={() => setChangeTicketStatusSuccess(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span>The ticket status has been successfully changed!</span>
        </div>
      )}
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
            onStatusChange={onStatusChange}
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
            onStatusChange={onStatusChange}
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
            onStatusChange={onStatusChange}
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
