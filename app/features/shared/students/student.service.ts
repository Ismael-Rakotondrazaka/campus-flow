import type { PaginationResult } from '@/features/shared/paginations/pagination.model';

import type {
  Student,
  StudentFilters,
  StudentInsert,
  StudentUpdate,
} from './student.model';

import { StudentConfig } from './student.config';

const STUDENT_SELECT = `
  *,
  user:user_id(*),
  faculty:faculty_id(*),
  academic_session:academic_session_id(*),
  lodgment:lodgment_id(*)
`;

export const getStudents = async (
  filters: StudentFilters
): Promise<PaginationResult<Student>> => {
  const client = useSupabaseClient();

  let query = client
    .from('students')
    .select(STUDENT_SELECT, { count: 'exact' });

  if (filters.faculty_id) {
    query = query.eq('faculty_id', filters.faculty_id);
  }

  if (filters.academic_session_id) {
    query = query.eq('academic_session_id', filters.academic_session_id);
  }

  if (filters.lodgment_id) {
    query = query.eq('lodgment_id', filters.lodgment_id);
  }

  if (filters.gender) {
    query = query.eq('gender', filters.gender);
  }

  if (filters.origin) {
    query = query.eq('origin', filters.origin);
  }

  const page = filters.page ?? StudentConfig.PAGE_DEFAULT;
  const limit = filters.limit ?? StudentConfig.PAGE_SIZE_DEFAULT;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  query = query.order('created_at', { ascending: false }).range(from, to);

  const { count, data, error } = await query;

  if (error) throw error;

  return {
    count: count ?? 0,
    data: (data ?? []) as unknown as Student[],
  };
};

export const getStudent = async (userId: string): Promise<null | Student> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('students')
    .select(STUDENT_SELECT)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;

  return data as unknown as null | Student;
};

export const createStudent = async (
  student: StudentInsert
): Promise<Student> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('students')
    .insert(student)
    .select(STUDENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Student;
};

export const updateStudent = async (
  userId: string,
  updates: StudentUpdate
): Promise<Student> => {
  const client = useSupabaseClient();

  const { data, error } = await client
    .from('students')
    .update(updates)
    .eq('user_id', userId)
    .select(STUDENT_SELECT)
    .single();

  if (error) throw error;

  return data as unknown as Student;
};

export const deleteStudent = async (userId: string): Promise<void> => {
  const client = useSupabaseClient();

  const { error } = await client
    .from('students')
    .delete()
    .eq('user_id', userId);

  if (error) throw error;
};
