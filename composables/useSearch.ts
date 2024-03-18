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

  const setSearchType = (searchType: SearchState['searchType']) => {
    state.value = {
      ...state.value,
      searchType,
    };
  };
  const setSortDir = (sortDir: SearchState['sortDir']) => {
    state.value = {
      ...state.value,
      sortDir,
    };
  };
  const setSearchDepth = (searchDepth: SearchState['searchDepth']) => {
    state.value = {
      ...state.value,
      searchDepth,
    };
  };

  return {
    state,
    setSearchType,
    setSortDir,
    setSearchDepth,
  };
};