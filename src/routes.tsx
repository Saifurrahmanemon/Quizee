import { useRoutes } from 'react-router-dom';
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
         path: '/register',
         element: <AuthenticationForm />,
      },
   ]);
};
export default Router;
