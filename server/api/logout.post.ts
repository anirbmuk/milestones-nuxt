export default defineEventHandler(async (event) => {
  const { mongodb } = useRuntimeConfig();
  const token = getCookie(event, '_auth');

  setCookie(event, '_auth', '', { maxAge: 0 });
  setCookie(event, '_user', '', { maxAge: 0 });

  try {
    if (token) {
      await $fetch(`${mongodb.hostUrl}${mongodb.apiBasePath}/user/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    }
  } catch {}

  return { auth: false };
});
