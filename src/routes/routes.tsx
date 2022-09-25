import { RequireAdmin, RequireAuth } from 'components/RequireAuth';
import CreateQuizzes from 'pages/Admin/CreateQuizzes';
import Dashboard from 'pages/Admin/Dashboard';
import ManageQuizzes from 'pages/Admin/ManageQuizzes';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Payment from 'pages/Payment';
import Quiz from 'pages/Quiz';
import Quizzes from 'pages/Quizzes';
import Settings from 'pages/Settings';
import { useRoutes } from 'react-router-dom';
import AuthenticationForm from '../pages/Auth';
const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
      index: true,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/quizzes',
      element: (
        <RequireAuth>
          <Quizzes />
        </RequireAuth>
      ),
    },
    {
      path: '/settings',
      element: (
        <RequireAuth>
          <Settings />
        </RequireAuth>
      ),
    },
    {
      path: '/quiz/:id',
      element: (
        <RequireAuth>
          <Quiz />
        </RequireAuth>
      ),
    },
    {
      path: '/createquizzes',
      element: (
        <RequireAdmin>
          <CreateQuizzes />
        </RequireAdmin>
      ),
    },
    {
      path: '/managequizzes',
      element: (
        <RequireAdmin>
          <ManageQuizzes />
        </RequireAdmin>
      ),
    },

    {
      path: '/dashboard',
      element: (
        <RequireAdmin>
          <Dashboard />
        </RequireAdmin>
      ),
    },
    {
      path: '/register',
      element: <AuthenticationForm />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/payment/:id',
      element: (
        <RequireAuth>
          <Payment />
        </RequireAuth>
      ),
    },
  ]);
};
export default Router;
