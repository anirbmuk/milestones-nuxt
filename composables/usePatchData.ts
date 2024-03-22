import type { NuxtError } from "#app";

export const usePatchData = <T>() => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

  const data = ref<T>();

  const patchFn = async (path: string, body: Partial<T>) => {
    const data = await $fetch<T>(path, {
      method: 'PATCH',
      body,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return data as T;
  };

  const patch = async (path: string, body: Partial<T>) => {
    data.value = undefined;
    if (!path) {
      return;
    }
    try {
      data.value = await patchFn(path, body);
    } catch (e) {
      handleError(e as NuxtError);
    }
  };

  return {
    patch,
    data,
  };
};
