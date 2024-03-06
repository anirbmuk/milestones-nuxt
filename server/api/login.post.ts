import type { AuthState } from '~/types/auth';

export default defineEventHandler(async (event) => {
  const { mongodb } = useRuntimeConfig();
  const body = await readBody(event);

  const { auth, user, token } = await $fetch<AuthState>(`${mongodb.hostUrl}${mongodb.apiBasePath}/user/login`, { body, method: 'POST' });

  if (auth && token) {
    setCookie(event, '_auth', token, { httpOnly: true, maxAge: 24 * 3600 });
    return { auth, user };
  }
});
