import type { AuthState } from '~/types/auth';
import type { User } from '~/types/user';

export const useUser = () => {
  const storage = useCookie<AuthState | undefined>('_session');
  const userState = useState<User | undefined>('user', () => storage.value?.user);

  const setUser = (user: User | undefined) => (userState.value = user);

  const user = computed(() => userState.value);

  const isLoggedIn = computed(() => Boolean(userState.value));

  return {
    user,
    setUser,
    isLoggedIn,
  };
};
