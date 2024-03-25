import { COOKIES } from '~/helpers/cookie';
import { getMilestoneEndPoint } from '~/helpers/rest';
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

  const query = getQuery<SupportedQueryParams>(event);
  const endPoint = getMilestoneEndPoint(query);

  return await $fetch<Milestone[]>(`${hostUrl}${apiBasePath}/${endPoint}`, {
    headers: {
      Authorization: authorization!,
    },
  });
});
