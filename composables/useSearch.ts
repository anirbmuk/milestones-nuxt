import { getMilestoneEndPoint } from "~/helpers/rest";
import type { Milestone } from "~/types/milestone";
import type { SearchState } from "~/types/search";
import type { KeyValue } from "~/types/toggle";

const getInitialState = () => ({
  q: '',
  searchDepth: 'all',
  searchType: 'tag',
  sortDir: 'asc',
  limit: 8,
  skip: 0,
} as SearchState);

export const useSearch = () => {
  const _search = useCookie<SearchState>('_search', {
    default: () => getInitialState(),
  });
  const state = useState<SearchState>('search', () => _search.value);

  const initState = () => (state.value = getInitialState());

  watch(state, (value) => (_search.value = value));

  const {
    fetch,
    data, 
  } = useGetData<Milestone[]>();

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

  const search = async () => {
    if (!state.value.q) {
      return;
    }
    const endPoint = getMilestoneEndPoint({
      q: state.value.q,
      findBy: state.value.searchType,
      depth: state.value.searchDepth,
      sort: state.value.sortDir,
      limit: `${state.value.limit}`,
      skip: `${state.value.skip}`,
    });
    await fetch(`/api/${endPoint}`);
  };
  const reset = () => {
    state.value = getInitialState();
    data.value = [];
  };

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
    initState,
    search,
    data,
    reset,
    SORT_OPTIONS,
    DEPTH_OPTIONS,
  };
};