export const noteTags = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
] as const;

export type NoteTag = (typeof noteTags)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: NoteTag;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}
