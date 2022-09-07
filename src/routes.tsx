import { useRoutes } from 'react-router-dom';
import RequireAdmin from './components/RequireAuth/RequireAdmin';
import AuthenticationForm from './pages/Auth/';
import Home from './pages/Home';
import Quizes from './pages/Quizes/';

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
            <RequireAdmin>
               <Quizes />
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
