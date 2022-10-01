import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '3r3p3v',
  e2e: {
    baseUrl: 'http://localhost:3000',
    experimentalStudio: true,
  },
});
