import React from 'react'
import { Link } from 'react-router-dom'
import QueuesListItemDelete from './QueuesListItemDelete'

const QueuesListItem: React.FC<{
  item: { name: string; id: number }
  onItemDelete?: (id: number) => void
}> = ({ item, onItemDelete }) => {
  return (
    <div className="grid grid-cols-[1fr_auto] rounded-md bg-base-200 hover:bg-base-300">
      <Link
        to={`/queues/${item.id}`}
        className="flex items-center break-all pl-2 font-semibold text-base-content md:pl-3"
      >
        {item.name}
      </Link>
      <div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost btn-sm m-1"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm0-2.6A2.2 2.2 0 1 0 9.999.8a2.2 2.2 0 0 0 .002 4.4zm0 9.6a2.2 2.2 0 1 0 0 4.402 2.2 2.2 0 0 0 0-4.402z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link to={`/queues/${item.id}`}>Open</Link>
            </li>
            <li>
              <Link to={`/queues/${item.id}/qr-code`}>QR-Code site</Link>
            </li>
            <li>
              <Link to={`/queues/${item.id}/tickets-call`}>
                Tickets call site
              </Link>
            </li>
            <li>
              <Link to={`/queues/${item.id}/edit`}>Edit queue</Link>
            </li>
            <li>
              <QueuesListItemDelete item={item} onItemDelete={onItemDelete} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default QueuesListItem
