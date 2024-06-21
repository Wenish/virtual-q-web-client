import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutBasic from './layouts/LayoutBasic'
import PageHome from './pages/PageHome'
import PageNotFound from './pages/PageNotFound'
import PageLogin from './pages/PageLogin'
import PageRegister from './pages/PageRegister'
import PageQueueTicketNew from './pages/PageQueueTicketNew'
import ProtectedRoute from './components/ProtectedRoute'
import PageMeQueues from './pages/PageMeQueues'
import PageQueueQrCode from './pages/PageQueueQrCode'
import PageQueueNew from './pages/PageQueueNew'
import PageQueueNewSuccess from './pages/PageQueueNewSuccess'
import PageQueueEdit from './pages/PageQueueEdit'
import PageQueueEditSuccess from './pages/PageQueueEditSuccess'
import PageQueue from './pages/PageQueue'
import PageTicket from './pages/PageTicket'
import PageQueueTicketsCall from './pages/PageQueueTicketsCall'
import PageStats from './pages/PageStats'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <LayoutBasic />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <PageHome />,
      },
    ],
  },
  {
    path: '/login',
    element: <LayoutBasic />,
    children: [
      {
        path: '',
        element: <PageLogin />,
      },
    ],
  },
  {
    path: '/register',
    element: <LayoutBasic />,
    children: [
      {
        path: '',
        element: <PageRegister />,
      },
    ],
  },
  {
    path: '/me/queues',
    element: (
      <ProtectedRoute>
        <LayoutBasic />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <PageMeQueues />,
      },
    ],
  },
  {
    path: '/queues',
    element: (
      <ProtectedRoute>
        <LayoutBasic />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ':queueId',
        children: [
          {
            path: '',
            element: <PageQueue />,
          },
          {
            path: 'edit',
            element: <PageQueueEdit />,
          },
          {
            path: 'edit/success',
            element: <PageQueueEditSuccess />,
          },
          {
            path: 'ticket-new',
            element: <PageQueueTicketNew />,
          },
          {
            path: 'qr-code',
            element: <PageQueueQrCode />,
          },
          {
            path: 'tickets-call',
            element: <PageQueueTicketsCall />,
          },
        ],
      },
    ],
  },
  {
    path: '/queues-new',
    element: (
      <ProtectedRoute>
        <LayoutBasic />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <PageQueueNew />,
      },
      {
        path: 'success',
        element: <PageQueueNewSuccess />,
      },
    ],
  },
  {
    path: '/tickets/:ticketId',
    element: (
      <ProtectedRoute>
        <LayoutBasic />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <PageTicket />,
      },
    ],
  },
  {
    path: '/stats',
    element: <LayoutBasic />,
    children: [
      {
        path: '',
        element: <PageStats />,
      },
    ],
  },
  {
    path: '*',
    element: <LayoutBasic />,
    children: [
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

const TheRouter = () => {
  return <RouterProvider router={router}></RouterProvider>
}

export default TheRouter
