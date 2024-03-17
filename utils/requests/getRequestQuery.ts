export const getRequestQuery = (): Record<string, unknown> => {
  const query = getQuery(useEvent());

  const nestedParsed: Record<string, unknown> = parseNestedJSON(query);

  return nestedParsed;
};
