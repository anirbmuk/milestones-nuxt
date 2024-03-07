import type { User } from '~/types/user';

export const useUser = () => {
  const storage = useCookie<User | undefined>('_user');
  const userState = useState<User | undefined>('user', () => storage.value);

  const setUser = (user: User | undefined) => (userState.value = user);

  const user = computed(() => userState.value);

  const isLoggedIn = computed(() => Boolean(userState.value));

  return {
    user,
    setUser,
    isLoggedIn,
  };
};
