import type { NuxtError } from '#app';

export const useDeleteData = () => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();
  const {
    startProcessing,
    endProcessing, 
  } = useUIState();

  const deleteFn = async (path: string) => {
    startProcessing();
    try {
      await $fetch<void>(path, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
    } catch (e) {
      handleError(e as NuxtError);
    } finally {
      endProcessing();
    }
  };

  return {
    deleteFn,
  };
};
