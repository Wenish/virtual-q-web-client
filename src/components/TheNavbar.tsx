import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const TheNavbar = () => {
  const { user, logout, isLoggedIn } = useAuth()
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Virtual Q
        </Link>
      </div>
      {isLoggedIn() && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 scale-x-[-1]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <div className="break-all px-3">
                <div>
                  Hello <b>{user?.username}</b>
                </div>
              </div>
              <hr className="my-2" />
              <li>
                <Link to="/me/queues">My Queues</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default TheNavbar
