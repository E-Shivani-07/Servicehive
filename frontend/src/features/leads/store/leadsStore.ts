import { create } from 'zustand';

interface LeadsState {
  search: string;
  status: string;
  source: string;
  sort: 'latest' | 'oldest';
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setSource: (source: string) => void;
  setSort: (sort: 'latest' | 'oldest') => void;
  resetFilters: () => void;
}

export const useLeadsStore = create<LeadsState>((set) => ({
  search: '',
  status: '',
  source: '',
  sort: 'latest',
  setSearch: (search) => set({ search }),
  setStatus: (status) => set({ status }),
  setSource: (source) => set({ source }),
  setSort: (sort) => set({ sort }),
  resetFilters: () => set({ search: '', status: '', source: '', sort: 'latest' }),
}));
