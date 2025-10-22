import { Note, NewFormNote } from '@/types/note';
import { User } from '@/types/user';
import { nextServer } from './api';

interface notesHttpResponse {
  notes: Note[];
  totalPages: number;
}

// const sui = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export async function fetchNotes(
  search: string,
  page: number,
  perPage: number = 12,
  tag?: string
): Promise<notesHttpResponse> {
  if (tag === 'All') {
    tag = undefined;
  }
  const response = await nextServer.get<notesHttpResponse>('/notes', {
    params: {
      search: search,
      page,
      perPage,
      tag,
    },
  });
  return response.data;
}

export const fetchNoteById = async (id: string) => {
  const res = await nextServer.get<Note>(`/notes/${id}`);
  return res.data;
};

export async function createNote(data: NewFormNote) {
  const response = await nextServer.post<Note>('/notes', data);
  return response.data;
}

export async function deleteNote(noteId: string) {
  const response = await nextServer.delete<Note>(`/notes/${noteId}`);
  return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};
export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  console.log(res);
  return res.data;
};

export type LoginRequest = {
  email: string;
  password: string;
};
export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  console.log(res);
  return res.data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout');
};

export type CheckSessionRequest = {
  success: boolean;
};
export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export type UpdateUserRequest = {
  email: string;
  username: string;
  avatar?: string;
};
export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
