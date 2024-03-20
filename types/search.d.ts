export type SearchState = {
  tq: string;
  dq: string;
  searchType: 'tag' | 'daterange';
  searchDepth: 'all' | 'in';
  limit: number;
  skip: number;
  sortDir: 'asc' | 'desc';
};

export type SearchStatus = 'notstarted' | 'inprogress' | 'complete';
