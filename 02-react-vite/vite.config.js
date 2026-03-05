<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
>>>>>>> 47c1e1a41db400286093cca62066422b7272a173

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
})
=======
  server: {
    port: 3000, //Muda a porta vite(5173) para padrão react (3000)
    open: true, //Abre o navegador automaticamente
    host: true, //Permite que tenha acesso via IP na rede local
  },
});
>>>>>>> 47c1e1a41db400286093cca62066422b7272a173
