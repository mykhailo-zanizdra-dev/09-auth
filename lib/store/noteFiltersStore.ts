import { NoteTag } from '@/types/note';
import { create } from 'zustand';

interface NoteFiltersStore {
  filter: NoteTag | '';
  setFilter: (newFilter: NoteTag | '') => void;
}

const noteFiltersStore = create<NoteFiltersStore>()(set => ({
  filter: '',
  setFilter: newFilter => set(() => ({ filter: newFilter })),
  clearFilter: () => set(() => ({ filter: '' })),
}));

export default noteFiltersStore;
