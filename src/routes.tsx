import { useRoutes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth/RequireAuth';
import AuthenticationForm from './pages/Auth/';
import Home from './pages/Home';

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
               <Home />
            </RequireAuth>
         ),
      },
      {
         path: '/register',
         element: <AuthenticationForm />,
      },
   ]);
};
export default Router;
