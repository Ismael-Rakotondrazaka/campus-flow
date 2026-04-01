import { defineQueryOptions } from '@pinia/colada';

import type { ReservationFilters } from './reservation.model';

import { getReservation, getReservations } from './reservation.service';

export const RESERVATION_QUERY_KEYS = {
  byId: (id: string) => [...RESERVATION_QUERY_KEYS.root, id] as const,

  list: (filters: ReservationFilters = {}) =>
    [...RESERVATION_QUERY_KEYS.root, 'list', filters] as const,

  root: ['reservations'] as const,
};

export const reservationListQuery = defineQueryOptions(
  (filters: ReservationFilters = {}) => ({
    key: RESERVATION_QUERY_KEYS.list(filters),
    query: () => getReservations(filters),
  })
);

export const reservationByIdQuery = defineQueryOptions(
  ({ id }: { id: string }) => ({
    key: RESERVATION_QUERY_KEYS.byId(id),
    query: () => getReservation(id),
  })
);
