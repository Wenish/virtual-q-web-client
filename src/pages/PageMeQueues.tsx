import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import QueuesList from '../components/QueuesList'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const PageMeQueues = () => {
  const [page, setPage] = useState(1)
  const { token, decodedToken } = useAuth()
  const accessTokenData = decodedToken()
  const userId = accessTokenData?.user_id

  const endpointQueues = `${import.meta.env.VITE_HOST_API}/queues/?user__id=${userId}&page=${page}`
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['meQueues', userId, page],
    queryFn: () =>
      axios
        .get<QueuesResponse>(endpointQueues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  })

  const [deleteQueueSuccess, setDeleteQueueSuccess] = useState(false)

  const endpointQueue = (queueId: number) =>
    `${import.meta.env.VITE_HOST_API}/queues/${queueId}/`
  const mutationDeleteQueue = useMutation({
    mutationFn: (id: number) => {
      return axios.delete(endpointQueue(id), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    },
    onSuccess: () => {
      setDeleteQueueSuccess(true)
      setPage(1)
      refetch()
    },
  })

  const onItemDelete = (id: number) => {
    setDeleteQueueSuccess(false)
    mutationDeleteQueue.mutate(id)
  }

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold md:text-4xl">My Queues</h1>
        <div>
          <Link to="/queues-new" className="btn btn-secondary btn-sm">
            Add new queue
          </Link>
        </div>
      </div>
      {deleteQueueSuccess && (
        <div role="alert" className="alert alert-success">
          <button onClick={() => setDeleteQueueSuccess(false)}>
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
          <span>The queue has been successfully deleted!</span>
        </div>
      )}
      {(!!data.previous || !!data.next) && <div>Page: {page}</div>}
      <QueuesList
        list={data.results}
        infoTextEmptyList="You have not yet created a queue."
        onItemDelete={onItemDelete}
      />
      <div className="flex justify-center gap-2">
        {!!data.previous && (
          <button
            className="btn btn-link btn-sm"
            onClick={() => setPage((old) => old - 1)}
          >
            previous page
          </button>
        )}
        {!!data.next && (
          <button
            className="btn btn-link btn-sm"
            onClick={() => setPage((old) => old + 1)}
          >
            next page
          </button>
        )}
      </div>
    </div>
  )
}

export default PageMeQueues

type QueuesResponse = {
  count: number
  next: string
  previous: string
  results: {
    id: number
    name: string
  }[]
}
