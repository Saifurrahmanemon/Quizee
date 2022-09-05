import { MantineProvider } from '@mantine/core';
import { Navbar } from './components/Navbar';

function App() {
   return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
         <Navbar />
      </MantineProvider>
   );
}

export default App;
