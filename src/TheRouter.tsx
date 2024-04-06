import { RouterProvider, createBrowserRouter  } from "react-router-dom"
import LayoutBasic from "./layouts/LayoutBasic"
import PageHome from "./pages/PageHome"
import PageNotFound from "./pages/PageNotFound"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutBasic />,
        children: [
            {
                path: '',
                element: <PageHome />
            }
        ]
    },
    {
        path: "*",
        element: <LayoutBasic />,
        children: [
            {
                path: '*',
                element: <PageNotFound />
            }
        ]
    }
])

const TheRouter = () => {
    return (
        <RouterProvider router={router}></RouterProvider>
    )
}

export default TheRouter