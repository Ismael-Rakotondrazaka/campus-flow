import type { SitemapUrl } from '#sitemap/types';

export default defineCachedEventHandler(
  async (): Promise<SitemapUrl[]> => {
    const announcements = await prisma.announcement.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        illustrationUrl: true,
        title: true,
        updatedAt: true,
      },
      where: {
        deletedAt: null,
        status: 'published',
      },
    });

    if (!announcements) return [];

    return announcements.map(
      (announcement): SitemapUrl => ({
        _sitemap: 'announcements',
        images: announcement.illustrationUrl
          ? [
              {
                caption: `Illustration for ${announcement.title}`,
                loc: announcement.illustrationUrl,
                title: `Illustration for ${announcement.title}`,
              },
            ]
          : undefined,
        lastmod: announcement.updatedAt,
        loc: `/announcements/${announcement.id}`,
      })
    );
  },
  {
    maxAge: 60 * 60, // 1 hour
  }
);
