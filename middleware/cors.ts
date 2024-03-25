import { corsEventHandler } from "nitro-cors";

export default corsEventHandler(
  () => {},
  (() => {
    const runtimeConfig = useRuntimeConfig();
    const clientUrls: string[] = runtimeConfig.clientUrl.split(",");

    return {
      origin: clientUrls,
      methods: "*",
      allowHeaders: ["Authorization", "authorization"],
      credentials: true,
    };
  })(),
);
