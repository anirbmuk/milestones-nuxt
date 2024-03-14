import type { UiNotification } from '~/types/notification';

const notifications = ref<UiNotification[]>([]);

export const useNotification = () => {
  const show = (message: string, duration = 4) => {
    notifications.value = [...notifications.value, {
      id: _getUniqueId(message),
      message,
      duration,
    }];
  };

  const hide = (id: string) => (notifications.value = [...notifications.value.filter((notification) => notification.id !== id)]);

  const _getUniqueId = (str: string) => {
    const base = str.length;
    const random = Math.ceil(Math.random() * base * 1_00_000);
    return `notification_${base}_${random}`;
  };

  return {
    notifications,
    show,
    hide,
  };
};
