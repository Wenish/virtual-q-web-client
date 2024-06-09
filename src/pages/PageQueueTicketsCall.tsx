import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useAuth } from '../hooks/useAuth'
import { useParams } from 'react-router-dom'
import { virtualqApi } from '../api/virtualq.api'

const PageQueueTicketsCall = () => {
  const { queueId } = useParams()
  const { token } = useAuth()

  const queryGetQueue = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () => {
      if (!token) throw 'No Token avaiable'
      return virtualqApi.queues.id
        .get(Number(queueId), token)
        .then((res) => res.data)
    },
  })

  const queryGetQueueTicketsNew = useQuery({
    queryKey: ['tickets', queueId, 1],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.tickets
        .get({ queue_id: Number(queueId), status: 1 }, token)
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
  })

  const queryGetQueueTicketsInProgress = useQuery({
    queryKey: ['tickets', queueId, 2],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.tickets
        .get({ queue_id: Number(queueId), status: 2 }, token)
        .then((res) => res.data)
    },
    placeholderData: keepPreviousData,
    refetchInterval: 10000,
  })

  if (queryGetQueue.isPending) return 'Loading...'

  if (queryGetQueue.error)
    return 'An error has occurred: ' + queryGetQueue.error.message

  return (
    <div className="grid w-full gap-4">
      <h1 className="break-all text-2xl font-bold md:text-4xl">
        Ticket Call {queryGetQueue.data.name}
      </h1>
      <div className="grid grid-cols-2">
        <div className="bg-info p-2 text-4xl font-extrabold">Wait</div>
        <div className="bg-success p-2 text-4xl font-extrabold">Ready</div>

        <div>
          {queryGetQueueTicketsNew.isPending && 'Loading...'}
          {!!queryGetQueueTicketsNew.error &&
            'An error has occurred:' + queryGetQueueTicketsNew.error.message}
          {queryGetQueueTicketsNew.isSuccess && (
            <div className="p-2">
              {queryGetQueueTicketsNew.data.results.map((item) => (
                <div className="text-4xl font-extrabold" key={item.id}>
                  {item.number}
                </div>
              ))}
              {!queryGetQueueTicketsNew.data.results.length && (
                <div className="text-2xl font-bold">No ticket in "wait"</div>
              )}
            </div>
          )}
        </div>

        <div>
          {queryGetQueueTicketsInProgress.isPending && 'Loading...'}
          {!!queryGetQueueTicketsInProgress.error &&
            'An error has occurred:' +
              queryGetQueueTicketsInProgress.error.message}
          {queryGetQueueTicketsInProgress.isSuccess && (
            <div className="p-2">
              {queryGetQueueTicketsInProgress.data.results.map((item) => (
                <div className="text-4xl font-extrabold" key={item.id}>
                  {item.number}
                </div>
              ))}

              {!queryGetQueueTicketsInProgress.data.results.length && (
                <div className="text-2xl font-bold">No ticket in "ready"</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageQueueTicketsCall
