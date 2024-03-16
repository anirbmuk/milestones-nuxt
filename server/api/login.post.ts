import type { AuthState } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { middleware } = useRuntimeConfig();
  const body = await readBody(event);

  const {
    auth,
    user,
    token,
  } = await $fetch<AuthState>(`${middleware.hostUrl}${middleware.apiBasePath}/user/login`, {
    method: 'POST',
    body,
  });

  if (auth && token) {
    setCookie(event, '_session', JSON.stringify({
      user,
      token,
    }), {
      httpOnly: true,
      maxAge: 24 * 3600,
    });
    return {
      auth,
      user,
      token,
    } as AuthState;
  }
});
