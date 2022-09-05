import { MantineProvider } from '@mantine/core';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
   return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
         <Navbar />
         <Home />
      </MantineProvider>
   );
}

export default App;
