import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Navbar from 'components/Navbar';
import Router from './routes';

function App() {
	return (
		<MantineProvider withGlobalStyles withNormalizeCSS>
			<NotificationsProvider>
				<Navbar />
				<Router />
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default App;
