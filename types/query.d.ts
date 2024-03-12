export type SupportedQueryParams = {
  findBy: 'id' | 'tag' | 'date' | 'daterange';
  depth: 'in' | 'all';
  q: string | undefined;
  sort: 'asc' | 'desc' | undefined;
  limit: string | undefined;
  skip: string | undefined;
  id: string;
};
