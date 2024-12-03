import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from "./pages/login";
import Main from "./pages/main";
import Registration from "./pages/registration";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/main',
        element: <Main />,
    },
    {
        path: '/registration',
        element: <Registration />,
    }
]);

export function Router() {
    return <RouterProvider router={router} />;
}