import { withQuery } from 'ufo';

export interface UseUserImageUrlProps {
  firstName?: null | string;
  imageUrl?: null | string;
  lastName?: null | string;
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
  if (user.imageUrl) {
    return user.imageUrl;
  }

  return formatFallbackUrl(user.firstName, user.lastName, defaultOptions);
};

export const useUserImageUrl = <
  T extends MaybeRefOrGetter<UseUserImageUrlProps>,
>(
  user: T
) => {
  return computed(() => formatUserImageUrl(toValue(user)));
};

export const formatFallbackUrl = (
  firstName?: null | string,
  lastName?: null | string,
  options: FormatFallbackUrlOptions = {}
) => {
  // Determine the name to display
  let displayName = 'Utilisateur';

  const parts: string[] = [];
  if (firstName?.trim()) parts.push(firstName.trim());
  if (lastName?.trim()) parts.push(lastName.trim());

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
