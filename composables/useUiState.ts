export const useUIState = (key = 'global') => {
  const _processing = useState(key, () => false);

  const startProcessing = () => _processing.value = true;
  const endProcessing = () => _processing.value = false;

  const wait = (delay = 5000) =>
    new Promise<void>((resolve) => setTimeout(resolve, delay));

  return {
    processing: _processing,
    startProcessing,
    endProcessing,
    wait,
  };
};