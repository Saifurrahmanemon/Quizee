import { MantineProvider } from '@mantine/core';
import Banner from './components/Banner';
import Navbar from './components/Navbar';

function App() {
   return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
         <Navbar />
         <Banner />
      </MantineProvider>
   );
}

export default App;
