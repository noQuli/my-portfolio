import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // lub odpowiedni plugin dla Twojego frameworka

export default defineConfig({
  plugins: [react()],
  
  // DODAJ TĘ SEKCJĘ:
  server: {
    host: '0.0.0.0', // wymusza słuchanie na wszystkich interfejsach
    port: 5173,      // możesz też ustawić sztywny port (domyślnie 5173)
  }
})