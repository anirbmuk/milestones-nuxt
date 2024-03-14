import type { UiNotification } from '~/types/notification';

const notifications = ref<UiNotification[]>([]);

export const useNotification = () => {
  const show = (message: string, duration = 3) => {
    notifications.value = [...notifications.value, {
      id: _getUniqueId(message),
      message,
      duration,
    }];
  };

  const hide = (id: string) => (notifications.value = [...notifications.value.filter((notification) => notification.id !== id)]);

  const _getUniqueId = (str: string) => {
    const base = str.split(' ').join('_').toLowerCase();
    const random = Math.ceil(Math.random() * 1_00_000);
    return `${base}_${random}`;
  };

  return {
    notifications,
    show,
    hide,
  };
};
