import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, //Muda a porta vite(5173) para padrão react (3000)
    open: true, //Abre o navegador automaticamente
    host: true, //Permite que tenha acesso via IP na rede local
  },
});
