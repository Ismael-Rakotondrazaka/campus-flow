import type { EventHandlerFn } from '#server/core/requests/requestToEventHandler';
import type { Request } from '#shared/utils/request';
import type { z } from 'zod';

import { FacultyQuerySchema } from '#shared/features/faculties';
import { IndexFacultyAbility } from '#shared/features/faculties/faculty.ability';

export const FacultyCountQuerySchema = FacultyQuerySchema.omit({
  limit: true,
  orderBy: true,
  page: true,
  sortOrder: true,
});

export type CountFacultyRequest = Request<
  { count: number },
  Record<string, never>,
  Record<string, never>,
  FacultyCountQuery
>;

export type FacultyCountQuery = z.infer<typeof FacultyCountQuerySchema>;

export const countFacultyEventHandlerFn: EventHandlerFn<
  CountFacultyRequest
> = async ({ ability, query }) => {
  await ability.authorize(IndexFacultyAbility);

  const count = await getFacultiesCount(query);

  return { count };
};
