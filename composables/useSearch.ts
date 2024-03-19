import type { SearchState } from "~/types/search";
import type { KeyValue } from "~/types/toggle";

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

  const SORT_OPTIONS: KeyValue<SearchState['sortDir']>[] = [{
    label: 'Asc',
    value: 'asc', 
  }, {
    label: 'Desc',
    value: 'desc', 
  }];
  
  const DEPTH_OPTIONS: KeyValue<SearchState['searchDepth']>[] = [{
    label: 'Match all',
    value: 'all', 
  }, {
    label: 'Match any',
    value: 'in', 
  }];

  return {
    state,
    search,
    reset,
    SORT_OPTIONS,
    DEPTH_OPTIONS,
  };
};