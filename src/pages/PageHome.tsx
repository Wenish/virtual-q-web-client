import { Link } from 'react-router-dom'

const PageHome = () => {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 text-center">
      <h1 className="text-4xl font-bold">Welcome to the digital queue.</h1>
      <p className="text-2xl">Create a queue now.</p>

      <div>
        <Link to="/me/queues" className="btn btn-primary btn-wide">
          My Queues
        </Link>
      </div>
    </div>
  )
}

export default PageHome
