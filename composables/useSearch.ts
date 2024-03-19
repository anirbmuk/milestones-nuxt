import type { SearchState } from "~/types/search";

const getInitialState = () => ({
  q: '',
  searchDepth: 'all',
  searchType: 'tag',
  sortDir: 'asc', 
} as SearchState);

export const useSearch = () => {
  const _search = useCookie<SearchState>('_search', {
    default: () => getInitialState(),
  });
  const state = useState<SearchState>('search', () => _search.value);

  watch(state, (value) => (_search.value = value));

  const searchType = computed(() => state.value.searchType);
  const sortDir = computed(() => state.value.sortDir);
  const searchDepth = computed(() => state.value.searchDepth);
  const q = computed(() => state.value.q.trim());
  watch([q, searchDepth, searchType, sortDir],
    ([q, searchDepth, searchType, sortDir]) => (state.value = {
      ...state.value,
      q,
      searchDepth,
      searchType,
      sortDir,
    }));

  // eslint-disable-next-line no-console
  const search = () => console.log('[SEARCH]', state.value);
  const reset = () => (state.value = getInitialState());

  return {
    state,
    search,
    reset,
  };
};