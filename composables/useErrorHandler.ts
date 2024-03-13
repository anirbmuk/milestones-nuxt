import type { NuxtError } from '#app';

export const useErrorhandler = () => {
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
  return {
    handleError,
  };
};
