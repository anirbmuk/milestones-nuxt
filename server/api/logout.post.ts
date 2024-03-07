import { AuthState } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { mongodb } = useRuntimeConfig();
  const { token } = JSON.parse(getCookie(event, '_session') || '{}') as AuthState;

  setCookie(event, '_session', '', { maxAge: 0 });

  try {
    if (token) {
      await $fetch(`${mongodb.hostUrl}${mongodb.apiBasePath}/user/logout`, { method: 'POST', headers: { Authorization: `Bearer ${token}` } });
    }
  } catch {}

  return { auth: false };
});
