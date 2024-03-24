import { validateDateRangeAsString } from '~/helpers/date';
import { getMilestoneEndPoint } from '~/helpers/rest';
import type { Milestone } from '~/types/milestone';
import type {
  SearchState,
  SearchStatus, 
} from '~/types/search';
import type { KeyValue } from '~/types/toggle';

const getInitialState = () => ({
  tq: '',
  dq: '',
  searchDepth: 'all',
  searchType: 'tag',
  sortDir: 'asc',
  limit: 8,
  skip: 0,
  allFetched: false,
} satisfies SearchState);

export const useSearch = () => {
  const _search = useCookie<SearchState>('_search', {
    default: () => getInitialState(),
  });
  const state = useState<SearchState>('search', () => _search.value);

  const initState = () => (state.value = getInitialState());

  watch(state, (value) => (_search.value = value));

  const status = ref<SearchStatus>('notstarted');
  const error = ref<string | undefined>('');

  const {
    fetch,
    data, 
  } = useGetData<Milestone[]>({
    showLoading: false, 
  });

  const searchData = ref<Milestone[]>([]);

  const updateState = (key: keyof SearchState, value: any) => (state.value = {
    ...state.value,
    [key]: value,
  });

  const searchType = computed(() => state.value.searchType);
  const sortDir = computed(() => state.value.sortDir);
  const searchDepth = computed(() => state.value.searchDepth);
  const tq = computed(() => state.value.tq.trim());
  const dq = computed(() => state.value.dq.trim());
  const allFetched = computed(() => state.value.allFetched);

  watch([tq, dq, searchDepth, sortDir, allFetched],
    ([tq, dq, searchDepth, sortDir, allFetched]) => (state.value = {
      ...state.value,
      tq,
      dq,
      searchDepth,
      sortDir,
      allFetched,
    }));

  watch(searchType,
    (searchType) => {
      state.value = {
        ...state.value,
        searchType,
      };
      status.value = 'notstarted';
      error.value = '';
      searchData.value = [];
    });

  const validateSearchState = () => {
    error.value = '';
    if (status.value === 'inprogress') {
      return;
    }
    if (state.value.searchType === 'tag' && !state.value.tq) {
      error.value = 'At least one tag is required';
      return false;
    }
    if (state.value.searchType === 'daterange') {
      const [start, end] = state.value.dq?.split(',') || [];
      const [dd1, mm1, yyyy1] = start?.split('-') || [];
      const [dd2, mm2, yyyy2] = end?.split('-') || [];
      if (!(dd1 && dd2 && mm1 && mm2 && yyyy1 && yyyy2)) {
        error.value = 'Please enter both start and end dates';
        return false;
      }
      if (!validateDateRangeAsString(`${yyyy1}-${mm1}-${dd1}`, `${yyyy2}-${mm2}-${dd2}`)) {
        error.value = 'End date must be on or after start date';
        return false;
      }
    }
    return true;
  };

  const search = async () => {
    if (!validateSearchState()) {
      return;
    }
    updateState('skip', 0);
    updateState('allFetched', false);

    status.value = 'inprogress';
    const endPoint = getMilestoneEndPoint({
      q: state.value.searchType === 'tag' ? state.value.tq : state.value.dq,
      findBy: state.value.searchType,
      depth: state.value.searchDepth,
      sort: state.value.sortDir,
      limit: `${state.value.limit}`,
      skip: `${state.value.skip}`,
      id: '',
    });
    await fetch(`/api/${endPoint}`);
    searchData.value = [...data.value || []];
    updateState('allFetched', data.value?.length < state.value.limit);
    status.value = 'complete';
  };

  const loadmoreResults = async () => {
    if (state.value.allFetched) {
      return;
    }
    updateState('skip', state.value.skip + state.value.limit);
    status.value = 'loadmore';
    const endPoint = getMilestoneEndPoint({
      q: state.value.searchType === 'tag' ? state.value.tq : state.value.dq,
      findBy: state.value.searchType,
      depth: state.value.searchDepth,
      sort: state.value.sortDir,
      limit: `${state.value.limit}`,
      skip: `${state.value.skip}`,
      id: '',
    });

    await fetch(`/api/${endPoint}`);
    updateState('allFetched', data.value?.length < state.value.limit);
    searchData.value.push(...(data.value || []));
    status.value = 'complete';
  };

  const reset = () => {
    state.value = {
      ...getInitialState(),
      searchType: state.value.searchType,
    };
    searchData.value = [];
    error.value = '';
    status.value = 'notstarted';
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
    status,
    initState,
    search,
    loadmoreResults,
    data: computed(() => searchData.value),
    reset,
    error,
    SORT_OPTIONS,
    DEPTH_OPTIONS,
  };
};