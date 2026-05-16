import { LeadsQuery } from './leads.types';

export const buildLeadQuery = (query: LeadsQuery) => {
  const filter: any = {};

  if (query.status) {
    filter.status = query.status;
  }

  if (query.source) {
    filter.source = query.source;
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
    ];
  }

  const sortOptions: any = {};
  if (query.sort === 'oldest') {
    sortOptions.createdAt = 1;
  } else {
    // Default to latest
    sortOptions.createdAt = -1;
  }

  return { filter, sortOptions };
};
