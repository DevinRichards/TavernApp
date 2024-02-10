import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
import ServerDetail from '../components/Servers/ServerDetail/ServerDetail';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/login",
        element: <LoginPage/>,
      },
      {
        path: "/register",
        element: <SignupPage/>,
      },
      {
        path: "/",
        element: <SignupPage/>,
      },
      {
        path: "servers/:serverId",
        element: <ServerDetail />
      }
    ],
  },
]);
