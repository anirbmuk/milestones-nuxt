export type SearchStatus = 'notstarted' | 'inprogress' | 'complete';

export type SearchState = {
  tq: string;
  dq: string;
  searchType: 'tag' | 'daterange';
  searchDepth: 'all' | 'in';
  limit: number;
  skip: number;
  sortDir: 'asc' | 'desc';
};
