import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Reservation,
  ReservationFilters,
  ReservationInsert,
  ReservationUpdate,
} from './reservation.model';

import { ReservationConfig } from './reservation.config';

const RESERVATION_SELECT = `
  *,
  faculty:faculty_id(*),
  academic_session:academic_session_id(*),
  lodgment:lodgment_id(*)
`;

export const getReservations = async (
  filters: ReservationFilters
): Promise<PaginationResult<Reservation>> => {
  const client = useSupabaseClient();

  let query = client
    .from('reservations')
    .select(RESERVATION_SELECT, { count: 'exact' });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const page = filters.page ?? ReservationConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? ReservationConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Reservation[],
  };
};

export const getReservation = async (
  id: string
): Promise<null | Reservation> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('reservations')
    .select(RESERVATION_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as null | Reservation;
};

export const createReservation = async (
  reservation: ReservationInsert
): Promise<Reservation> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('reservations')
    .insert(reservation)
    .select(RESERVATION_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Reservation;
};

export const updateReservation = async (
  id: string,
  updates: ReservationUpdate
): Promise<Reservation> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('reservations')
    .update(updates)
    .eq('id', id)
    .select(RESERVATION_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Reservation;
};

export const getReservationsCount = async (
  filters: Omit<ReservationFilters, 'limit' | 'page'>
): Promise<number> => {
  const client = useSupabaseClient();

  let query = client
    .from('reservations')
    .select('*', { count: 'exact', head: true });

  if (filters.status) {
    query = query.eq('status', filters.status);
  }

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    );
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
};

export const deleteReservation = async (id: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client.from('reservations').delete().eq('id', id);

  if (error) throw error;
};
