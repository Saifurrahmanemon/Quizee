import { useRoutes } from 'react-router-dom';

import RequireAdmin from '../components/RequireAuth/RequireAdmin';
import RequireAuth from '../components/RequireAuth/RequireAuth';
import CreateQuizes from '../pages/Admin/CreateQuizes';
import ManageUsers from '../pages/Admin/ManageUsers';
import AuthenticationForm from '../pages/Auth';
import Home from '../pages/Home';
import Quizes from '../pages/Quizes';
import Quiz from '../pages/Quizes/Quiz';

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
         path: '/quizes',
         element: (
            <RequireAuth>
               <Quizes />
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
         path: '/createquizes',
         element: (
            <RequireAdmin>
               <CreateQuizes />
            </RequireAdmin>
         ),
      },
      {
         path: '/manageusers',
         element: (
            <RequireAdmin>
               <ManageUsers />
            </RequireAdmin>
         ),
      },
      {
         path: '/register',
         element: <AuthenticationForm />,
      },
   ]);
};
export default Router;
