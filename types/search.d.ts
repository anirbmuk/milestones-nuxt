export type SearchState = {
  q: string;
  searchType: 'tag' | 'daterange';
  searchDepth: 'all' | 'in';
  limit: number;
  skip: number;
  sortDir: 'asc' | 'desc';
};

export type SearchStatus = 'notstarted' | 'inprogress' | 'complete';
