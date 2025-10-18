import axios from 'axios';
import { Note, NewFormNote } from '@/types/note';

interface notesHttpResponse {
  notes: Note[];
  totalPages: number;
}

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const sui = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number = 12,
  tag?: string
): Promise<notesHttpResponse> {
  if (tag === 'All') {
    tag = undefined;
  }
  const response = await axios.get<notesHttpResponse>('/notes', {
    params: {
      search: search,
      page,
      perPage,
      tag,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${sui}`,
    },
  });
  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${sui}`,
    },
  });
  return res.data;
};

export async function createNote(data: NewFormNote) {
  const response = await axios.post<Note>('/notes', data, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${sui}`,
    },
  });
  return response.data;
}

export async function deleteNote(noteId: string) {
  const response = await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${sui}`,
    },
  });
  return response.data;
}
