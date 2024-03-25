import { COOKIES } from '~/helpers/cookie';
import type { AuthState } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const {
    middleware: {
      hostUrl,
      apiBasePath, 
    }, 
  } = useRuntimeConfig();
  const { token } = JSON.parse(getCookie(event, '_session') || '{}') as AuthState;

  for (const cookie of COOKIES) {
    setCookie(event, cookie, '', {
      maxAge: 0,
    });
  }

  try {
    if (token) {
      await $fetch(`${hostUrl}${apiBasePath}/user/logout`, {
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
