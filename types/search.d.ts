export type SearchState = {
  q: string;
  searchType: 'tag' | 'daterange';
  searchDepth: 'all' | 'in';
  limit: number;
  skip: number;
  sortdir: 'asc' | 'desc';
};
