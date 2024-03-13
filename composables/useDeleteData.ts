export const useDeleteData = () => {
  const { token } = useUser();
  const { handleError } = useErrorhandler();

  const deleteFn = async (path: string) => await $fetch(path, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  }).catch((e) => handleError(e));

  return {
    deleteFn,
  };
};
