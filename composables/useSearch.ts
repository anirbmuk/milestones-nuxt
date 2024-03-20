import { getMilestoneEndPoint } from "~/helpers/rest";
import type { Milestone } from "~/types/milestone";
import type {
  SearchState,
  SearchStatus, 
} from "~/types/search";
import type { KeyValue } from "~/types/toggle";

const searchStatus = ref<SearchStatus>('notstarted');

const getInitialState = () => ({
  tq: '',
  dq: '',
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

  // const wait = (delay = 2000) =>
  //   new Promise<void>((resolve) => setTimeout(resolve, delay));

  const {
    fetch,
    data, 
  } = useGetData<Milestone[]>();

  const searchType = computed(() => state.value.searchType);
  const sortDir = computed(() => state.value.sortDir);
  const searchDepth = computed(() => state.value.searchDepth);
  const tq = computed(() => state.value.tq.trim());
  const dq = computed(() => state.value.dq.trim());
  watch([tq, dq, searchDepth, sortDir],
    ([tq, dq, searchDepth, sortDir]) => (state.value = {
      ...state.value,
      tq,
      dq,
      searchDepth,
      sortDir,
    }));
  watch(searchType,
    (searchType) => {
      state.value = {
        ...state.value,
        searchType,
      };
      searchStatus.value = 'notstarted';
      data.value = [];
    });

  const search = async () => {
    if ((state.value.searchType === 'tag' && !state.value.tq) || (state.value.searchType === 'daterange' && !state.value.dq) || searchStatus.value === 'inprogress') {
      return;
    }
    searchStatus.value = 'inprogress';
    const endPoint = getMilestoneEndPoint({
      q: state.value.searchType === 'tag' ? state.value.tq : state.value.dq,
      findBy: state.value.searchType,
      depth: state.value.searchDepth,
      sort: state.value.sortDir,
      limit: `${state.value.limit}`,
      skip: `${state.value.skip}`,
    });
    await fetch(`/api/${endPoint}`);
    // await wait();
    searchStatus.value = 'complete';
  };
  const reset = () => {
    state.value = {
      ...getInitialState(),
      searchType: state.value.searchType,
    };
    data.value = [];
    searchStatus.value = 'notstarted';
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
    searchStatus,
    initState,
    search,
    data,
    reset,
    SORT_OPTIONS,
    DEPTH_OPTIONS,
  };
};