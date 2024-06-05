import { keepPreviousData, useQuery } from '@tanstack/react-query'
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
  const { isPending, error, data } = useQuery({
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
      {(!!data.previous || !!data.next) && <div>Page: {page}</div>}
      <QueuesList
        list={data.results}
        infoTextEmptyList="You have not yet created a queue."
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
