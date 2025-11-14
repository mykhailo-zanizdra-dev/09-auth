import endpoints from '@/const/endpoints';
import { cookies } from 'next/headers';
import notehubApi from './api';
import { User } from '@/types/user';
import { Note } from '@/types/note';

interface SuccessResponse {
  message: string;
}

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchServerNotes = async ({
  page = 1,
  perPage = 12,
  search = '',
  tag,
}: FetchNotesParams = {}) => {
  const cookieStore = await cookies();
  const response = await notehubApi.get<FetchNotesResponse>(endpoints.notes(), {
    params: {
      page,
      perPage,
      search,
      ...(!!tag && { tag }),
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export const fetchServerNoteById = async (id: string) => {
  const cookieStore = await cookies();
  const response = await notehubApi.get<Note>(endpoints.noteById(id), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};

export async function getServerMe() {
  const cookieStore = await cookies();
  const { data } = await notehubApi.get<User>(endpoints.userMe(), {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export const checkServerSession = async () => {
  const cookieData = await cookies();
  const response = await notehubApi.get<SuccessResponse>(endpoints.session(), {
    headers: {
      Cookie: cookieData.toString(),
    },
  });
  return response;
};
