import { MantineProvider } from '@mantine/core';
import Navbar from './components/Navbar';
import Router from './routes';

function App() {
   return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
         <Navbar />
         <Router />
      </MantineProvider>
   );
}

export default App;
