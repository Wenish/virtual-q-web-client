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
          <ul className="menu menu-horizontal px-1">
            <li>
              <details className="dropdown dropdown-end">
                <summary>{user?.username}</summary>
                <ul className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow">
                  <li>
                    <Link to="/me/tickets">My Tickets</Link>
                  </li>
                  <li>
                    <Link to="/me/queues">My Queues</Link>
                  </li>
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              <div className="w-10">jonas</div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link to="/me/tickets">My Tickets</Link>
              </li>
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
