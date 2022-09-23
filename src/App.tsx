import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import Navbar from 'components/Navbar';
import { useState } from 'react';
import Router from './routes';

function App() {
	// for changing theme
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');

	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

	return (
		<ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
			<MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
				<NotificationsProvider>
					<Navbar />
					<Router />
				</NotificationsProvider>
			</MantineProvider>
		</ColorSchemeProvider>
	);
}

export default App;
