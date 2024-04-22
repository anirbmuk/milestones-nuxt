import type { AuthState } from '~/types/auth';

export const useAuth = () => {
  const { setAuthState } = useUser();
  const {
    startProcessing: startSignin,
    endProcessing: endSignin,
    processing,
  } = useUIState('signin');

  const {
    startProcessing,
    endProcessing,
  } = useUIState();

  const signin = async (email: string, password: string) => {
    if (processing.value) {
      return;
    }
    startSignin();
    try {
      return await $fetch<AuthState>('/api/login', {
        body: {
          email,
          password,
        },
        method: 'POST',
      });
    } finally {
      endSignin();
    }
  };

  const signout = async () => {
    if (processing.value) {
      return;
    }
    startProcessing();
    try {
      await $fetch<{ auth: boolean }>('/api/logout', {
        method: 'POST',
      });
    } finally {
      endProcessing();
      setAuthState(undefined);
    }
    return navigateTo('/');
  };

  return {
    signin,
    signout,
    processing,
  };
};
