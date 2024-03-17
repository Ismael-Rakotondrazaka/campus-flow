export const isRecordOfStringString = <K extends string>(
  value: unknown,
  keys?: K[],
): value is Record<K, string> => {
  if (!is.object(value) || is.null(value)) {
    return false;
  }

  if (keys && keys.length > 0) {
    for (const key of keys) {
      if (!is.string((value as Record<string, unknown>)[key])) {
        return false;
      }
    }
  } else {
    for (const key in value) {
      if (!is.string((value as Record<string, unknown>)[key])) {
        return false;
      }
    }
  }

  return true;
};
