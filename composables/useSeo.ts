export const useSeo = () => {
  const { fullPath } = useRoute();
  const { public: { baseUrl } } = useRuntimeConfig();

  const stripUrlParams = (path: string) => {
    const [root] = path.split('?');
    return root;
  };

  const getCanonical = (path = fullPath) =>
    stripUrlParams(`${baseUrl}${path}`);

  return {
    getCanonical,
  };
};
