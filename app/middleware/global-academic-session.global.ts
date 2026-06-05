export default defineNuxtRouteMiddleware((to, from) => {
  const normalize = (val: unknown) => (Array.isArray(val) ? val[0] : val);

  const toId = normalize(to.query.g_academic_session_id);
  const fromId = normalize(from.query.g_academic_session_id);

  const id = toId || fromId;

  const localeRoute = useLocaleRoute();

  // Only redirect if the normalized value is different
  if (id && toId !== id) {
    return navigateTo(
      localeRoute({
        path: to.path,
        query: {
          ...to.query,
          g_academic_session_id: id,
        },
      })
    );
  }
});
