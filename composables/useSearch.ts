import type { SearchState } from "~/types/search";

const getInitialState = () => ({
  q: '',
  searchDepth: 'all',
  searchType: 'tag',
  sortdir: 'asc', 
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

  return {
    state,
    setSearchType,
  };
};