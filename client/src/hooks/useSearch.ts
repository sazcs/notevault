import { useState, useMemo } from 'react';
import type { Note } from '../types';

export const useSearch = (notes: Note[]) => {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredNotes = useMemo(() => {
		if (!searchQuery.trim()) return notes;

		const query = searchQuery.toLowerCase();

		return notes.filter((note) => {
			const titleMatch = note.title.toLowerCase().includes(query);
			const contentMatch = note.content.toLowerCase().includes(query);
			const tagsMatch = note.tags.some((tag) =>
				tag.toLowerCase().includes(query)
			);

			return titleMatch || contentMatch || tagsMatch;
		});
	}, [notes, searchQuery]);

	const clearSearch = () => setSearchQuery('');

	return {
		searchQuery,
		setSearchQuery,
		filteredNotes,
		clearSearch,
		hasActiveSearch: searchQuery.trim().length > 0,
	};
};
