import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAuth } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

const PageHome = () => {
  const url = `${import.meta.env.VITE_HOST_API}`
  const { isPending, error, data } = useQuery({
    queryKey: ['testData'],
    queryFn: () => axios.get(url).then((res) => res.data),
  })

  const { logout } = useAuth()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="grid gap-4">
      <div className="break-all">
        Hello from Page Home {JSON.stringify(data)}
      </div>
      <Link to="/me/queues" className="btn btn-primary">
        My Queues
      </Link>
      <button className="btn" onClick={logout}>
        Logout
      </button>
    </div>
  )
}

export default PageHome
