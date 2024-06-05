import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

const PageHome = () => {
  const url = `${import.meta.env.VITE_HOST_API}`
  const { isPending, error, data } = useQuery({
    queryKey: ['testData'],
    queryFn: () => axios.get(url).then((res) => res.data),
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="mx-auto grid max-w-4xl gap-4 text-center">
      <h1 className="text-4xl font-bold">Welcome to the digital queue.</h1>
      <p className="text-2xl">Create a queue now.</p>
      <div className="break-all">
        Hello from Page Home {JSON.stringify(data)}
      </div>
      <div>
        <Link to="/me/queues" className="btn btn-primary btn-wide">
          My Queues
        </Link>
      </div>
    </div>
  )
}

export default PageHome
