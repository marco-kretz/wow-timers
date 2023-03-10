import devtoolsPlugin from "solid-devtools/vite";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    plugins: [solidPlugin(), devtoolsPlugin()],
    server: {
        port: 3000,
    },
    build: {
        target: "esnext",
    },
});
