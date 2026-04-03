import { defineQueryOptions } from '@pinia/colada';

import type { PostFilters } from './post.model';

import { getPost, getPosts, getPostsCount } from './post.service';

export const POST_QUERY_KEYS = {
  byId: (id: string) => [...POST_QUERY_KEYS.root, id] as const,

  count: (filters: PostFilters = {}) =>
    [...POST_QUERY_KEYS.root, 'count', filters] as const,

  list: (filters: PostFilters = {}) =>
    [...POST_QUERY_KEYS.root, 'list', filters] as const,

  root: ['posts'] as const,
};

export const postListQuery = defineQueryOptions(
  (filters: PostFilters = {}) => ({
    key: POST_QUERY_KEYS.list(filters),
    query: () => getPosts(filters),
  })
);

export const postByIdQuery = defineQueryOptions(({ id }: { id: string }) => ({
  key: POST_QUERY_KEYS.byId(id),
  query: () => getPost(id),
}));

export const postCountQuery = defineQueryOptions(
  (filters: PostFilters = {}) => ({
    key: POST_QUERY_KEYS.count(filters),
    query: () => getPostsCount(filters),
  })
);
