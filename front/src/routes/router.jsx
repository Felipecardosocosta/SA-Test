import { createBrowserRouter } from "react-router"
import Home from "../pages/Home"
import Main from "../layouts/Main"
import Login from "../pages/Login"
import DashBoard from "../pages/DashBoard"
import PrivateRouter from "../components/PrivateRoute"
import DashboardLayouts from "../layouts/DashboardLayouts"
import Product from "../components/Product"
import Products from "../pages/Products"
import Compra from "../pages/Compra"



const router = createBrowserRouter([

    {
        path: '/',
        element: <Login />

    },
    {
        element: (
            <PrivateRouter>
                <DashboardLayouts />
            </PrivateRouter>
        ), children: [
            { path: "/dashboard", element: <DashBoard /> },
            { path: "/produtos/", element: <Products /> },
            { path: "/compra/", element: <Compra /> },
            { path: "/compra/:id", element: <Compra /> },
            { path: "/products/:id", element: <Product /> }
        ]
    },
])



export default router