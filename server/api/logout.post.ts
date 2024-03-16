import type { AuthState } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { middleware } = useRuntimeConfig();
  const { token } = JSON.parse(getCookie(event, '_session') || '{}') as AuthState;

  setCookie(event, '_session', '', {
    maxAge: 0,
  });
  setCookie(event, '_calendar', '', {
    maxAge: 0,
  });

  try {
    if (token) {
      await $fetch(`${middleware.hostUrl}${middleware.apiBasePath}/user/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch { /* NOTHING TO DO IF THERE'S AN ERROR */ }

  return {
    auth: false,
  };
});
