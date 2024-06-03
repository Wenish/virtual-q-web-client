import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'

const PageMeQueues = () => {
  const { token, logout, decodedToken } = useAuth()
  const accessTokenData = decodedToken()
  const userId = accessTokenData?.user_id
  const endpointQueues = `${import.meta.env.VITE_HOST_API}/queues/?user__id=${userId}`
  const { isPending, error, data } = useQuery({
    queryKey: ['meQueues'],
    queryFn: () =>
      axios
        .get<QueuesResponse>(endpointQueues, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="grid gap-4">
      <div className="break-all">
        Hello from Page Me Queues {JSON.stringify(data)}
      </div>
      {data.results.map((queue) => (
        <div key={queue.id}>
          {queue.id} - {queue.name}
        </div>
      ))}
      <button className="btn">Button</button>
      <button className="btn" onClick={logout}>
        Logout
      </button>
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
