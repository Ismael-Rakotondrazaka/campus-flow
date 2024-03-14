//https://nitro.unjs.io/config
export default defineNitroConfig({
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
  experimental: {
    asyncContext: true,
  },
});
