import type { NuxtError } from "#app";

export const usePostData = <T>() => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

  const data = ref<T | undefined>();

  const postFn = async (path: string, body: Partial<T>) => {
    const data = await $fetch<T>(path, {
      method: 'POST',
      body,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return data as T;
  };

  const post = async (path: string, body: Partial<T>) => {
    data.value = undefined;
    if (!path) {
      return;
    }
    try {
      data.value = await postFn(path, body);
    } catch (e) {
      handleError(e as NuxtError);
    }
  };

  return {
    post,
    data,
  };
};
