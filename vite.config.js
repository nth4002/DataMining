import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      "cc25-2001-ee0-4fca-2f80-dceb-5f46-fd06-31f9.ngrok-free.app",
    ],
  },
});
