import type { AuthState } from '~/types/auth';

export const useUser = () => {
  const storage = useCookie<AuthState | undefined>('_session');
  const authState = useState<AuthState | undefined>('state', () => storage.value);

  const setAuthState = (state: AuthState | undefined) => (authState.value = state);

  const user = computed(() => authState.value?.user);
  const token = computed(() => authState.value?.token);

  const isLoggedIn = computed(() => Boolean(authState.value?.user));

  const fullName = computed(() => isLoggedIn.value ? `${user.value?.firstname || ''}${user.value?.lastname ? ' ' : ''}${user.value?.lastname || ''}` : '');

  return {
    user,
    token,
    setAuthState,
    isLoggedIn,
    fullName,
  };
};
