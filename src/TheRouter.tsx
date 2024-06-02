import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutBasic from './layouts/LayoutBasic'
import PageHome from './pages/PageHome'
import PageNotFound from './pages/PageNotFound'
import PageLogin from './pages/PageLogin'
import PageRegister from './pages/PageRegister'
import PageTicketNew from './pages/PageTicketNew'
import ProtectedRoute from './components/ProtectedRoute'
import PageMeQueues from './pages/PageMeQueues'

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
    element: <PageLogin />,
  },
  {
    path: '/register',
    element: <PageRegister />,
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
            path: 'ticket-new',
            element: <PageTicketNew />,
          },
        ],
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
