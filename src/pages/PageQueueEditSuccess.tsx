import { Link } from 'react-router-dom'

const PageQueueEditSuccess = () => {
  return (
    <div className="mx-auto grid max-w-2xl gap-4">
      <h1 className="text-2xl font-bold md:text-4xl">
        Queue successfully edited
      </h1>
      <div>
        <Link className="btn btn-primary" to={`/me/queues`}>
          To my queues
        </Link>
      </div>
    </div>
  )
}

export default PageQueueEditSuccess
