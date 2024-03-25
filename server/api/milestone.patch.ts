import { COOKIES } from '~/helpers/cookie';
import { Milestone } from '~/types/milestone';
import type { SupportedQueryParams } from '~/types/query';

export default defineEventHandler(async (event) => {
  const {
    middleware: {
      hostUrl,
      apiBasePath, 
    }, 
  } = useRuntimeConfig();
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

  const { id } = getQuery<SupportedQueryParams>(event);
  const endPoint = `milestone/${id}`;

  const body = await readBody(event);

  return await $fetch<Milestone[]>(`${hostUrl}${apiBasePath}/${endPoint}`, {
    method: 'PATCH',
    body,
    headers: {
      Authorization: authorization!,
    },
  });
});
