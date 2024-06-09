import { useQuery } from '@tanstack/react-query'
import { QRCodeSVG } from 'qrcode.react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { virtualqApi } from '../api/virtualq.api'

const PageQueueQrCode = () => {
  const { queueId } = useParams()
  const { token } = useAuth()

  const urlQrCode = `${window.location.origin}/queues/${queueId}/ticket-new`

  const { isPending, error, data } = useQuery({
    queryKey: ['queues', queueId],
    queryFn: () => {
      if (!token) throw 'No token avaiable'
      return virtualqApi.queues.id
        .get(Number(queueId), token)
        .then((res) => res.data)
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <h1 className="break-all text-center text-2xl font-bold md:text-4xl">
        {data.name}
      </h1>
      <div className="grid justify-center">
        <QRCodeSVG
          role="qr-code"
          value={urlQrCode}
          height={'100%'}
          width={'100%'}
          imageSettings={{
            src: '/appIcon.svg',
            height: 10,
            width: 10,
            excavate: true,
          }}
        />
      </div>
      <div>
        <p className="text-center text-4xl">
          Scan the QR Code to get a queue ticket.
        </p>
        <div className="pt-4">
          <p className="text-center text-xl">Or go to:</p>
          <div className="grid justify-center">
            <Link
              to={urlQrCode}
              className="break-all text-center text-2xl font-bold underline"
            >
              {urlQrCode}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageQueueQrCode
