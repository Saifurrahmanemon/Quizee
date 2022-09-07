import { useRoutes } from 'react-router-dom';
import RequireAdmin from './components/RequireAuth/RequireAdmin';
import RequireAuth from './components/RequireAuth/RequireAuth';
import CreateQuizes from './pages/Admin/CreateQuizes';
import AuthenticationForm from './pages/Auth/';
import Home from './pages/Home';
import Quizes from './pages/Quizes';

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
         path: '/createquizes',
         element: (
            <RequireAdmin>
               <CreateQuizes />
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
