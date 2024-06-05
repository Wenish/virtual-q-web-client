const QueueTicket: React.FC<{
  ticketNumber: number
  ticketStatus: number
  queueName: string
}> = ({ ticketNumber, ticketStatus, queueName }) => {
  const getStatusText = (status: number) => {
    switch (status) {
      case 1:
        return 'wait'
      case 2:
        return 'ready'
      case 3:
        return 'done'
      default:
        return 'undefined'
    }
  }

  return (
    <div className="grid max-w-96 rounded-lg border text-left">
      <div className="rounded-t-lg bg-red-500">
        <div className="p-4 text-left text-2xl text-white">
          <b>Virtual Q</b> <span>Ticket</span>
        </div>
      </div>
      <div className="grid grid-cols-[2fr_1fr]">
        <div className="grid grid-rows-2 gap-4 border-r p-4">
          <div className="uppercase">
            <div className="break-all text-sm font-bold text-gray-700">
              {queueName}
            </div>
            <div className="text-sm font-light text-gray-400">Queue</div>
          </div>
          <div className="flex flex-col justify-end uppercase">
            <div className="break-all text-sm font-bold text-gray-700">
              {getStatusText(ticketStatus)}
            </div>
            <div className="text-sm font-light text-gray-400">Status</div>
          </div>
        </div>
        <div className="grid items-center p-4">
          <div className="text-center">
            <div className="break-all text-4xl font-bold text-red-400">
              {ticketNumber}
            </div>
            <div className="text-md uppercase text-gray-400">Number</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="grid max-w-96 grid-cols-[2fr_1fr] rounded-lg border text-left">
      <div className="grid grid-rows-[2fr_4fr]">
        <div className="rounded-tl-lg bg-red-500">
          <div className="p-4 text-left text-2xl text-white">
            <b>Virtual Q</b> <span>Ticket</span>
          </div>
        </div>
        <div className="grid grid-rows-2 border-r p-4">
          <div className="uppercase">
            <div className="break-all text-sm font-bold text-gray-700">
              {queueName}
            </div>
            <div className="text-sm font-light text-gray-400">Queue</div>
          </div>
          <div className="flex flex-col justify-end uppercase">
            <div className="break-all text-sm font-bold text-gray-700">
              {getStatusText(ticketStatus)}
            </div>
            <div className="text-sm font-light text-gray-400">Status</div>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-[2fr_4fr]">
        <div className="rounded-tr-lg bg-red-500"></div>
        <div className="grid items-center">
          <div className="text-center">
            <div className="break-all text-4xl font-bold text-red-400">
              {ticketNumber}
            </div>
            <div className="text-md uppercase text-gray-400">Number</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueTicket
