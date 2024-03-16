import type { H3Event, EventHandlerRequest } from "h3";

export const getRequestBody = async (): Promise<unknown> => {
  const event: H3Event<EventHandlerRequest> = useEvent();
  let result: unknown = {};

  const requestContentType: string | undefined = getHeader(
    event,
    "Content-Type",
  );

  if (requestContentType !== undefined) {
    if (requestContentType.startsWith("application/json")) {
      const JSONBody: unknown = await readBody(event);

      if (JSONBody !== undefined && JSONBody !== null) {
        result = JSONBody;
      }
    } else if (
      requestContentType.startsWith("application/x-www-form-urlencoded") ||
      requestContentType.startsWith("multipart/form-data")
    ) {
      result = await readFormData(event);
    }
  }

  return result;
};
