import type { NuxtError } from "#app";

export const useGetData = <T extends Array<any>>() => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

  const data = ref<T | Array<any>>();

  const getFn = async (path: string) => {
    const data = await $fetch<T>(path, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return data as T;
  };

  const fetch = async (path: string) => {
    if (!path) {
      data.value = [];
      return;
    }
    try {
      data.value = await getFn(path);
    } catch (e) {
      data.value = [];
      handleError(e as NuxtError);
    }
  };

  return {
    fetch,
    data,
  };
};
