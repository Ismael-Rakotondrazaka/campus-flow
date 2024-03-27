import { corsEventHandler } from "nitro-cors";

export default corsEventHandler(
  () => {},
  (() => {
    const runtimeConfig = useRuntimeConfig();
    const clientUrls: string[] = runtimeConfig.clientUrl.split(",");

    console.log(clientUrls);

    return {
      origin: clientUrls,
      methods: "*",
      allowHeaders: ["Authorization", "authorization", "content-type"],
      credentials: true,
    };
  })()
);
