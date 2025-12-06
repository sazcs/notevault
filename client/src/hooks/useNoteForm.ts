import { useState } from 'react';

export const useNoteForm = (initialData?: {
	title: string;
	content: string;
	tags: string[];
}) => {
	const [title, setTitle] = useState(initialData?.title || '');
	const [content, setContent] = useState(initialData?.content || '');
	const [tags, setTags] = useState(initialData?.tags.join(', ') || '');

	const reset = () => {
		setTitle('');
		setContent('');
		setTags('');
	};

	const getFormData = () => ({
		title,
		content,
		tags: tags
			.split(',')
			.map((tag) => tag.trim())
			.filter((tag) => tag !== ''),
	});

	return {
		title,
		setTitle,
		content,
		setContent,
		tags,
		setTags,
		reset,
		getFormData,
	};
};
