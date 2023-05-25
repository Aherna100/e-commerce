import './App.css';

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import RootPage from './routes/Root';
import LoginPage from './routes/login/LoginPage';
import SignupPage from './routes/signup/SignupPage';
import ErrorPage from './routes/ErrorPage';
import WelcomePage from './routes/welcome/WelcomePage';
import ProtectedRoute from './routes/protectedRoute/ProtectedRoute';
import DashboardPage from './routes/dashboard/DashboardPage';
import ProductPage from './routes/product/Product';
import CartPage from './routes/cart/CartPage';
import PaymentPage from './routes/payment/PaymentPage';
import CompletePage from './components/CompletePage';

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <WelcomePage />
      },
      {
        path: '/signup',
        element: <SignupPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      }, {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />
          },
          {
            path: '/product/:id',
            element: <ProductPage />
          },
          {
            path: '/cart',
            element: <CartPage />
          },
          {
            path: '/payment',
            element: <PaymentPage />
          },
          {
            path: '/complete',
            element: <CompletePage />
          }
        ]
      }
    ]
  }])
  return (
    <RouterProvider router={router} />
  );

}

export default App;
