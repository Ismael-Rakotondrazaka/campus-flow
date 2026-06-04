import type {
  Announcement,
  AnnouncementQuery,
  CreateAnnouncement,
  UpdateAnnouncement,
} from '#shared/features/announcements';
import type { PaginationResult } from '#shared/features/paginations';

import { AnnouncementConfig } from '#shared/features/announcements';

export const getAnnouncements = async (
  filters: AnnouncementQuery
): Promise<PaginationResult<Announcement>> => {
  const page = filters.page ?? AnnouncementConfig.PAGE_DEFAULT;

  const limit = filters.limit ?? AnnouncementConfig.PAGE_SIZE_DEFAULT;

  const skip = (page - 1) * limit;

  const where = {
    deletedAt: null,
    ...(filters.status && { status: filters.status }),
    ...(filters.search && {
      title: { contains: filters.search, mode: 'insensitive' as const },
    }),
  };

  const [rows, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      orderBy: {
        [filters.orderBy ?? 'createdAt']: filters.sortOrder ?? 'desc',
      },
      skip,
      take: limit,
      where,
    }),
    prisma.announcement.count({ where }),
  ]);

  return { count, data: rows as Announcement[] };
};

export const getAnnouncementsCount = async (
  filters: Omit<AnnouncementQuery, 'limit' | 'orderBy' | 'page' | 'sortOrder'>
): Promise<number> => {
  return prisma.announcement.count({
    where: {
      deletedAt: null,
      ...(filters.status && { status: filters.status }),
      ...(filters.search && {
        title: { contains: filters.search, mode: 'insensitive' as const },
      }),
    },
  });
};

export const getAnnouncement = async (
  id: string
): Promise<Announcement | null> => {
  return prisma.announcement.findUnique({
    where: { deletedAt: null, id },
  }) as Promise<Announcement | null>;
};

export const createAnnouncement = async (
  input: CreateAnnouncement
): Promise<Announcement> => {
  return prisma.announcement.create({
    data: {
      content: input.content,
      illustrationUrl: input.illustrationUrl ?? undefined,
      status: input.status,
      title: input.title,
    },
  }) as Promise<Announcement>;
};

export const updateAnnouncement = async (
  id: string,
  input: UpdateAnnouncement
): Promise<Announcement> => {
  return prisma.announcement.update({
    data: {
      content: input.content,
      illustrationUrl: input.illustrationUrl,
      status: input.status,
      title: input.title,
    },
    where: { id },
  }) as Promise<Announcement>;
};

export const deleteAnnouncement = async (id: string): Promise<void> => {
  await prisma.announcement.update({
    data: { deletedAt: new Date() },
    where: { id },
  });
};
