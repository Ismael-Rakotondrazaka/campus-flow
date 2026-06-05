import type { SitemapUrl } from '#sitemap/types';

export default defineCachedEventHandler(
  async (event): Promise<SitemapUrl[]> => {

    const announcements = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        illustrationUrl: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        status: 'published',
        deletedAt: null,
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
