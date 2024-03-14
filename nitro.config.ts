//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: "server",
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "Node",
        noImplicitAny: true,
      },
      exclude: [
        "../../node_modules/**/*",
        "../../dist/**/*",
        "../../.output/**/*",
      ],
    },
  },
  routeRules: {
    "/api/**": {
      cors: true,
    },
  },
});
