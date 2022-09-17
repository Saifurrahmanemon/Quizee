import { RequireAdmin, RequireAuth } from 'components/RequireAuth';
import CreateQuizes from 'pages/Admin/CreateQuizes';
import ManageUsers from 'pages/Admin/ManageUsers';
import Home from 'pages/Home';
import Quizes from 'pages/Quizes';
import Quiz from 'pages/Quiz';
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
