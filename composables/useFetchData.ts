type BodyType = { [key: string]: any, [key: number]: any }

export const useFetchData = async <T>(key: string, path: string, method: 'GET' | 'POST' = 'GET', body: BodyType | undefined = undefined) => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

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

  if (error.value) {
    handleError(error.value);
  }

  return {
    data,
    refresh,
  };
};
