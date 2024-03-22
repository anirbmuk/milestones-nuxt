import { COOKIES } from '~/helpers/cookie';
import { Milestone } from '~/types/milestone';

export default defineEventHandler(async (event) => {
  const { middleware } = useRuntimeConfig();
  const authorization = getRequestHeader(event, 'Authorization');
  const [, token] = authorization?.toString()?.split('Bearer ') || [];

  if (!token) {
    for (const cookie of COOKIES) {
      setCookie(event, cookie, '', {
        maxAge: 0,
      });
    }
    throw new Error('You have been logged off');
  }

  const body = await readBody(event);

  return await $fetch<Milestone[]>(`${middleware.hostUrl}${middleware.apiBasePath}/milestone`, {
    method: 'POST',
    body,
    headers: {
      Authorization: authorization!,
    },
  });
});
