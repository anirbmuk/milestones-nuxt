import { COOKIES } from '~/helpers/cookie';
import { getActivityEndPoint } from '~/helpers/rest';
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

  const { q = '' } = getQuery<SupportedQueryParams>(event);
  const endPoint = getActivityEndPoint(q);
  
  return q ? await $fetch<string[]>(`${hostUrl}${apiBasePath}/${endPoint}`, {
    headers: {
      Authorization: authorization!,
    },
  }) : [];
});
