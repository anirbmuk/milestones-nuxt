import type { AuthState } from '~/types/auth';

export const useAuth = () => {
  const { setAuthState } = useUser();

  const signin = async (email: string, password: string) => {
    return await $fetch<AuthState>('/api/login', {
      body: {
        email,
        password,
      },
      method: 'POST',
    });
  };

  const signout = async () => {
    try {
      await $fetch<{ auth: boolean }>('/api/logout', {
        method: 'POST',
      });
    } finally {
      setAuthState(undefined);
    }
    return navigateTo('/');
  };

  return {
    signin,
    signout,
  };
};
