import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Note } from '../types';
import api from '../lib/api';

interface NotesContextType {
	notes: Note[];
	loading: boolean;
	error: string | null;
	fetchNotes: () => Promise<void>;
	fetchNoteById: (id: string) => Promise<Note>;
	createNote: (data: {
		title: string;
		content: string;
		tags: string[];
	}) => Promise<void>;
	updateNote: (id: string, data: Partial<Note>) => Promise<void>;
	deleteNote: (id: string) => Promise<void>;
	clearError: () => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
	const [notes, setNotes] = useState<Note[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const clearError = () => setError(null);

	const fetchNotes = async () => {
		setLoading(true);
		setError(null);
		try {
			const response = await api.get('/notes');
			setNotes(response.data.data);
		} catch (err: any) {
			setError(err.response?.data?.message || 'Failed to fetch notes');
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const fetchNoteById = async (id: string): Promise<Note> => {
		try {
			const response = await api.get(`/notes/${id}`);
			return response.data.data;
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Failed to fetch note';
			setError(errorMsg);
			throw new Error(errorMsg);
		}
	};

	const createNote = async (data: {
		title: string;
		content: string;
		tags: string[];
	}) => {
		try {
			const response = await api.post('/notes', data);
			setNotes([response.data.data, ...notes]);
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Failed to create note';
			setError(errorMsg);
			throw new Error(errorMsg);
		}
	};

	const updateNote = async (id: string, data: Partial<Note>) => {
		try {
			const response = await api.put(`/notes/${id}`, data);
			setNotes(
				notes.map((note) => (note._id === id ? response.data.data : note))
			);
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Failed to update note';
			setError(errorMsg);
			throw new Error(errorMsg);
		}
	};

	const deleteNote = async (id: string) => {
		try {
			await api.delete(`/notes/${id}`);
			setNotes(notes.filter((note) => note._id !== id));
		} catch (err: any) {
			const errorMsg = err.response?.data?.message || 'Failed to delete note';
			setError(errorMsg);
			throw new Error(errorMsg);
		}
	};

	return (
		<NotesContext.Provider
			value={{
				notes,
				loading,
				error,
				fetchNotes,
				fetchNoteById,
				createNote,
				updateNote,
				deleteNote,
				clearError,
			}}
		>
			{children}
		</NotesContext.Provider>
	);
};

export const useNotes = () => {
	const context = useContext(NotesContext);
	if (!context) {
		throw new Error('useNotes must be used within NotesProvider');
	}
	return context;
};
