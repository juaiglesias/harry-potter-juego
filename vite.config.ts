import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  // Build con rutas relativas y todo empaquetado en un único index.html:
  // Vite marca los <script>/<link> del build con crossorigin, lo que Chromium
  // bloquea por CORS al abrir el archivo directo con file://. Empaquetar todo
  // en un solo archivo evita que existan esas etiquetas.
  base: './',
  plugins: [react(), viteSingleFile()],
})
