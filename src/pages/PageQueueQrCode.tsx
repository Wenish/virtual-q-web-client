import { QRCodeSVG } from 'qrcode.react'
import { useParams } from 'react-router-dom'

const PageQueueQrCode = () => {
  const { queueId } = useParams()
  const urlQrCode = `${window.location.origin}/queues/${queueId}/ticket-new`
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-4">
      <h1 className="text-center text-2xl font-bold md:text-4xl">
        Stand Getränke
      </h1>
      <div className="grid justify-center">
        <QRCodeSVG value={urlQrCode} height={'100%'} width={'100%'} />
      </div>
      <div>
        <p className="text-center text-4xl">
          Scan the QR Code to get a queue ticket.
        </p>
        <div className="pt-4">
          <p className="text-center text-xl">Or go to:</p>
          <p className="text-center text-2xl font-bold underline">
            {urlQrCode}
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageQueueQrCode
