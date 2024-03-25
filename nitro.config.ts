//https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: {
    /* ----------------------------------- App ---------------------------------- */
    appUrl: "",

    /* -------------------------------- Database -------------------------------- */
    databaseUrl: "",

    /* ---------------------------------- Token --------------------------------- */
    accessTokenSecret: "",
    /**
      access token life in milliseconds
     */
    accessTokenLife: 0,
    refreshTokenSecret: "",
    /**
      refresh token life in milliseconds
     */
    refreshTokenLife: 0,
    resetPasswordTokenSecret: "",
    resetPasswordTokenLife: 0,
    /* --------------------------------- Bucket --------------------------------- */
    bucketEntryPoint: "",
    bucketName: "",
    /* ---------------------------------- Email --------------------------------- */
    smtpHost: "",
    smtpPort: 0,
    smtpUser: "",
    smtpPassword: "",
    informationEmail: "",
    informationPhoneNumber: "",
    /* --------------------------------- Client --------------------------------- */
    clientUrl: "",
    clientLoginUrl: "",
  },
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: "Node",
        noImplicitAny: true,
        paths: {
          "~": ["../.."],
          "~/*": ["../../*"],
        },
      },
      exclude: [
        "../../node_modules/**/*",
        "../../dist/**/*",
        "../../.output/**/*",
      ],
    },
  },
  experimental: {
    asyncContext: true,
    openAPI: true,
  },
  imports: {
    imports: [
      {
        from: "@prisma/client",
        name: "*",
        as: "prismaCtx",
      },
      {
        from: "zod-form-data",
        name: "zfd",
      },
      {
        from: "zod",
        name: "z",
      },
      {
        from: "is-type-of",
        name: "default",
        as: "is",
      },
      {
        from: "http-status-codes",
        name: "*",
        as: "httpStatusCodes",
      },
    ],
  },
});
