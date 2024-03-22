import type { NuxtError } from "#app";

export const useDeleteData = () => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

  const deleteFn = async (path: string) => {
    try {
      await $fetch<void>(path, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (e) {
      handleError(e as NuxtError);
    }
  };

  return {
    deleteFn,
  };
};
