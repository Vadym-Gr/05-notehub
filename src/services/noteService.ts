import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const res: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search },
  });
  return res.data;
};

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (
  data: CreateNoteParams
): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.post('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return res.data;
};