import { maskEmail } from '~/helpers/mask';
import type { User } from '~/types/user';

export const useUser = () => {
  const storage = useCookie<User | undefined>('_user');
  const userState = useState<User | undefined>('user', () => storage.value);

  const setUser = (user: User | undefined) => {
    let maskedUser = { ...user } as User | undefined;
    if (user) {
      maskedUser = { ...user, email: maskEmail(user.email) };
    } else {
      maskedUser = undefined;
    }
    storage.value = maskedUser;
    userState.value = maskedUser;
  };

  const user = computed(() => userState.value);

  const isLoggedIn = computed(() => Boolean(userState.value));

  return {
    user,
    setUser,
    isLoggedIn,
  };
};
