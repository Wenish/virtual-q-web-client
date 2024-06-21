import { useQuery } from '@tanstack/react-query'
import { virtualqApi } from '../api/virtualq.api'

const PageStats = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ['stats'],
    queryFn: () => {
      return virtualqApi.stats.get().then((res) => res.data)
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto grid max-w-4xl gap-4">
      <h1 className="text-4xl font-bold">Overall app stats</h1>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Queues</div>
          <div className="stat-value">{data.total_queues}</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Tickets</div>
          <div className="stat-value">{data.total_tickets}</div>
        </div>
      </div>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Tickets New</div>
          <div className="stat-value">{data.tickets_by_status[1]}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Tickets In Progress</div>
          <div className="stat-value">{data.tickets_by_status[2] || 0}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Tickets Done</div>
          <div className="stat-value">{data.tickets_by_status[3] || 0}</div>
        </div>
      </div>
    </div>
  )
}

export default PageStats
