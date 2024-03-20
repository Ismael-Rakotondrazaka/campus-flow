import { withQuery } from "ufo";

export const makePaginationLinks = (
  currentPage: number,
  totalPages: number,
  pageSize: number,
): PaginationLinks => {
  const event = useEvent();

  const url: URL = getRequestURL(event);
  const query = getQuery(event);

  query.pageSize = pageSize;

  const makeCurrentLink = () =>
    withQuery(url.pathname, {
      ...query,
      page: currentPage,
    });

  const makePreviousLink = () =>
    withQuery(url.pathname, {
      ...query,
      page: currentPage - 1,
    });

  const makeNextLink = () =>
    withQuery(url.pathname, {
      ...query,
      page: currentPage + 1,
    });

  const links: PaginationLinks = {
    current: makeCurrentLink(),
    previous: currentPage > 1 ? makePreviousLink() : null,
    next: currentPage < totalPages ? makeNextLink() : null,
  };

  return links;
};
