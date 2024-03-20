/**
 * Calculate pagination skip
 */
export const computePaginationSkip = (
  currentPage: number,
  pageSize: number,
): number => (currentPage - 1) * pageSize;
