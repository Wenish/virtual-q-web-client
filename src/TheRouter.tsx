import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayoutBasic from './layouts/LayoutBasic'
import PageHome from './pages/PageHome'
import PageNotFound from './pages/PageNotFound'
import PageLogin from './pages/PageLogin'
import PageRegister from './pages/PageRegister'
import PageTicketNew from './pages/PageTicketNew'
import ProtectedRoute from './components/ProtectedRoute'

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
