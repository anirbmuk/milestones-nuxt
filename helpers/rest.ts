import type { SupportedQueryParams } from '~/types/query';

export const getMilestoneEndPoint = ({
  q,
  findBy = 'date',
  depth = 'in',
  limit = '10',
  skip = '0',
  sort = 'asc',
}: SupportedQueryParams) => {
  if (findBy === 'tag') {
    return `milestone?q=${q}&findBy=${findBy}&depth=${depth}&limit=${limit}&skip=${skip}&sort=${sort}`;
  } else if (findBy === 'daterange') {
    return `milestone?q=${q}&findBy=${findBy}&limit=${limit}&skip=${skip}&sort=${sort}`;
  }
  return `milestone?q=${q}&findBy=${findBy}`;
};

export const getActivityEndPoint = (q: string) => {
  return `activity?q=${q}`;
};