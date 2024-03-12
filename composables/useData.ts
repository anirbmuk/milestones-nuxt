import type { NuxtError } from '#app';

type BodyType = { [key: string]: any, [key: number]: any }

export const useData = async <T>(key: string, path: string, method: 'GET' | 'POST' = 'GET', body: BodyType | undefined = undefined) => {
  const { token } = useUser();
  const { signout } = useAuth();

  const handleError = async (error: NuxtError<unknown> | null) => {
    if (error?.statusCode === 401) {
      return await signout();
    }
    throw createError({
      fatal: true,
      statusCode: error?.statusCode,
      message: error?.statusMessage,
    });
  };

  const {
    data,
    refresh,
    error,
  } = await useAsyncData(key, async () => {
    return await $fetch<T>(path, {
      method,
      ...(body && {
        body,
      }),
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
  });

  const deleteFn = async (path: string) => await $fetch(path, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (error.value) {
    handleError(error.value);
  }

  return {
    data,
    refresh,
    deleteFn,
  };
};
