import type { NuxtError } from "#app";

export const useGetData = <T extends Array<any>>({
  showLoading = true, stateKey = 'global', 
}: { showLoading?: boolean, stateKey?: string } = {
  showLoading: true,
  stateKey: 'global',
}) => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();
  const {
    startProcessing,
    endProcessing,
    processing,
  } = useUIState(stateKey);

  const data = ref<T>([] as any);

  const getFn = async (path: string) => {
    const data = await $fetch<T>(path, {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return data as T;
  };

  const fetch = async (path: string) => {
    if (processing.value) {
      return;
    }
    data.value = [] as any;
    if (!path) {
      return;
    }
    showLoading && startProcessing();
    try {
      // @ts-ignore
      data.value = await getFn(path);
    } catch (e) {
      handleError(e as NuxtError);
    } finally {
      endProcessing();
    }
  };

  return {
    processing,
    fetch,
    data,
  };
};
