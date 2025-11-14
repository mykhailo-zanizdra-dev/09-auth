import { User } from '@/types/user';
import endpoints from '../../const/endpoints';
import type { NewNoteData, Note } from '../../types/note';
import notehubApi from './api';

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface AuthParams {
  email: string;
  password: string;
}

interface SessionState {
  success: boolean;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams = {}) {
  const response = await notehubApi.get<FetchNotesResponse>(endpoints.notes(), {
    params: {
      page,
      perPage,
      search,
      ...(!!tag && { tag }),
    },
  });
  return response.data;
}

export async function fetchNoteById(id: string) {
  const response = await notehubApi.get<Note>(endpoints.noteById(id));
  return response.data;
}

export async function createNote(newNote: NewNoteData) {
  const response = await notehubApi.post<Note>(endpoints.notes(), newNote);
  return response.data;
}

export async function deleteNote(id: string) {
  const response = await notehubApi.delete<Note>(endpoints.noteById(id));
  return response.data;
}

export async function register({ email, password }: AuthParams) {
  const response = await notehubApi.post<User>(endpoints.register(), {
    email,
    password,
  });
  return response.data;
}
export async function login({ email, password }: AuthParams) {
  const response = await notehubApi.post<User>(endpoints.login(), {
    email,
    password,
  });
  return response.data;
}

export async function logout() {
  await notehubApi.post<void>(endpoints.logout());
}

export async function checkSession() {
  const { data } = await notehubApi.get<SessionState>(endpoints.session());
  return data.success;
}

export async function getMe() {
  const { data } = await notehubApi.get<User>(endpoints.userMe());
  return data;
}

export async function updateMe({ username }: { username: string }) {
  const { data } = await notehubApi.patch<User>(endpoints.userMe(), {
    username,
  });
  return data;
}
