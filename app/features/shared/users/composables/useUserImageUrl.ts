import { withQuery } from 'ufo';

export interface UseUserImageUrlProps {
  first_name?: null | string;
  image_url?: null | string;
  last_name?: null | string;
}

interface FormatFallbackUrlOptions {
  background?: string;
  bold?: boolean;
  color?: string;
  format?: 'jpeg' | 'jpg' | 'png' | 'webp';
  length?: number;
  size?: number;
}

// Default options merged with custom options
const defaultOptions: FormatFallbackUrlOptions = {
  // background: 'random',
  bold: true,
  color: 'ffffff',
  format: 'png' as const,
  length: 1,
  size: 200,
};

export const formatUserImageUrl = <T extends UseUserImageUrlProps>(user: T) => {
  if (user.image_url) {
    return user.image_url;
  }

  return formatFallbackUrl(user.first_name, user.last_name, defaultOptions);
};

export const useUserImageUrl = <
  T extends MaybeRefOrGetter<UseUserImageUrlProps>,
>(
  user: T
) => {
  return computed(() => formatUserImageUrl(toValue(user)));
};

export const formatFallbackUrl = (
  first_name?: null | string,
  last_name?: null | string,
  options: FormatFallbackUrlOptions = {}
) => {
  // Determine the name to display
  let displayName = 'Utilisateur';

  const parts: string[] = [];
  if (first_name?.trim()) parts.push(first_name.trim());
  if (last_name?.trim()) parts.push(last_name.trim());

  if (parts.length > 0) {
    displayName = parts.join(' ');
  }

  // Merge options (custom options override defaults)
  const params = {
    ...options,
    name: displayName,
  };

  // Clean up undefined values
  Object.keys(params).forEach(key => {
    const paramKey = key as keyof typeof params;
    if (params[paramKey] === undefined || params[paramKey] === null) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete params[paramKey];
    }
  });

  // UFO handles all the encoding and URL construction
  return withQuery('https://ui-avatars.com/api/', params);
};
