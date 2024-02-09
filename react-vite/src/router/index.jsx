import { createBrowserRouter } from 'react-router-dom';
<<<<<<< HEAD
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
=======
import Layout from './Layout';
import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignupPage';
>>>>>>> master

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
<<<<<<< HEAD
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
=======
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
    ],
  },
]);
>>>>>>> master
