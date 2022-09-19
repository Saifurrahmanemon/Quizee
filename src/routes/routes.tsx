import { RequireAdmin, RequireAuth } from 'components/RequireAuth';
import CreateQuizzes from 'pages/Admin/CreateQuizzes';
import ManageUsers from 'pages/Admin/ManageUsers';
import Home from 'pages/Home';
import Quiz from 'pages/Quiz';
import Quizzes from 'pages/Quizzes';
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
