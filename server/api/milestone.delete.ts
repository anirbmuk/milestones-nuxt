import { Milestone } from '~/types/milestone';
import type { SupportedQueryParams } from '~/types/query';

export default defineEventHandler(async (event) => {
  const { middleware } = useRuntimeConfig();
  const authorization = getRequestHeader(event, 'Authorization');
  const [, token] = authorization?.toString()?.split('Bearer ') || [];

  if (!token) {
    setCookie(event, '_session', '', {
      maxAge: 0,
    });
    setCookie(event, '_calendar', '', {
      maxAge: 0,
    });
    throw new Error('You have been logged off');
  }

  const { id } = getQuery<SupportedQueryParams>(event);
  const endPoint = `milestone/${id}`;

  return await $fetch<Milestone[]>(`${middleware.hostUrl}${middleware.apiBasePath}/${endPoint}`, {
    method: 'DELETE',
    headers: {
      Authorization: authorization!,
    },
  });
});
